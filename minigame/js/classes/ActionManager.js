var ACTION_ENUM = {
	MOVE:"move",
	JUMP:"jump",
	COOK:"cook",
	SLEEP:"sleep",
};

/**
*	Action : classe définissant une action
*		type : type d'action (move, jump, cook, reboot, eat, sleep...)
*		subject : ID du sujet. Les sujets peuvent être des characters, des shadoks, des pommes, des poires et même des tartes à la banane
*		target : la plus part du temps le point sur lequel s'applique l'action que le sujet soit effectuer
*			Ex :
*				Action.type = MOVE
*				Action.sujet = "user"
*				Action.target = Point(x, y, z) de destination
*/
var Action = {
	type:ACTION_ENUM.MOVE,
	subject:null,
	target:null,
};

/**
*	Classe Actions : contient une liste d'action (actionList) et une liste d'ID de sujets (subjectList)
*/
var Actions = {
	actionList:null,
	subjectList:null,
};

var ActionManager = {	
	init:function() {
		Actions.actionList = new Array();
		Actions.subjectList = new Array();
	},
	
	getActionList:function() {
		return Actions.actionList;
	},
	
	getSubjectList:function() {
		return Actions.subjectList;
	},
	
	addSubject:function(subject) {
		var subjectID = CharacterHelper.getID(subject);
		Actions.subjectList[subjectID] = subject;
	},
	
	addAction:function(type, subject, target) {
		var action = newObject(Action);
		action.type = type;
		action.target = target;
		action.subject = subject;
		
		Actions.actionList.push(action);
	},
	
	moveTo:function(mapID, character, destination) {
		var characterID = CharacterHelper.getID(character);
		var position = CharacterHelper.getPersoPosition2D(character);

		if(PointHelper.equals(position, destination) || mapOrig[destination.x][destination.y] != 1) {
			return MOVE_FINISHED;
		}
		
		$("#"+characterID).find(".perso").removeClass("stand");
		$("#"+characterID).find(".perso").addClass("walk");

		var map1 = copyMap(mapOrig);
		var graph = new Graph(map1);
		
		var start = graph.nodes[position.x][position.y];
		var end = graph.nodes[destination.x][destination.y];
		var map2 = graph.input;
		
		var result = astar.search(graph.nodes, start, end, true);
		
		ActionManager.move(mapID, character, map1, result);
	},
	
	move:function(mapID, character, mapArray, nodes) {
		var timeout = 0;
		var i = 1;
		var moveResult = MOVE_ON;
		var characterID = CharacterHelper.getID(character);
		ActionManager.moveByStep(mapID, character, mapArray, nodes, 0);
		var intId = setInterval(function() {
			var position = CharacterHelper.getPersoPosition2D(character);
			if(i == nodes.length || moveResult == MOVE_FINISHED) {
				if(i == nodes.length) {
					i--;
				}
				clearInterval(intId);
				setTimeout(function() {
					$("#"+characterID).find(".perso").addClass("stand");
					$("#"+characterID).find(".perso").removeClass("walk");
					CharacterHelper.stop(character);
					var position = CharacterHelper.getPersoPosition2D(character);
					console.log("Actual ("+position.x +", "+position.y+")");
					console.log("Target ("+nodes[i].x+", "+nodes[i].y+")");
					console.log(Actions.actionList);
					console.log("FINISHED");
				}, FOOT_STEP_DURATION);
				return 0;
			}
			//if(nodes[i-1].x == position.x && nodes[i-1].y == position.y) {
				//console.log("ARRIVED ("+position.x +", "+position.y+") => ("+nodes[i-1].x+", "+nodes[i-1].y+")");
				moveResult = ActionManager.moveByStep(mapID, character, mapArray, nodes, i);
				i++;
			//} else {
			//	console.log("NOT YET ARRIVED ("+position.x +", "+position.y+") => ("+nodes[i-1].x+", "+nodes[i-1].y+")");
			//}
		}, STEP_DURATION);
	},

	moveByStep:function(mapID, character, mapArray, nodes, i) {	
		if(nodes[i] == undefined) {
			console.log("nodes["+i+"] undefined");
			return MOVE_FINISHED;
		}
		if(mapArray[nodes[i].x][nodes[i].y] != 2) {
			// Pas d'ennemi
			//mapArray[nodes[i].x][nodes[i].y]=4;
			var destination = PointHelper.newPoint(nodes[i].x*UNIT, nodes[i].y*UNIT);
			CharacterHelper.move(character);
			ActionManager.moveCss(mapID, character, destination);
			
			return MOVE_ON;
		} else {
			// Ennemi en vue
			console.log("Ennemi at ("+nodes[i].x+", "+nodes[i].y+")");
			
			mapArray=copyMap(mapOrig);
			mapArray[nodes[i].x][nodes[i].y]=0;
			
			var graph = new Graph(mapArray);		
			var start = graph.nodes[nodes[i-1].x][nodes[i-1].y];
			var end = graph.nodes[nodes[nodes.length-1].x][nodes[nodes.length-1].y];
			var result = astar.search(graph.nodes, start, end, true);
			
			ActionManager.move(mapID, character, mapArray, nodes);
			return MOVE_FINISHED;
		}
	},

	moveCss:function(mapID, character, destination) {
		var unitMove=Math.round(UNIT/5);
		var characterID = CharacterHelper.getID(character);
		
		var position = CharacterHelper.getPersoPosition(character);
		var left = position.x;
		var top = position.y;
		
		//move X
		if(position.x < destination.x) {
			CharacterHelper.direction(character,DIRECTIONS.RIGHT);
			$("#"+characterID).css("left",(left*1 + unitMove) + "px");
		}else if(position.x > destination.x) {
			CharacterHelper.direction(character,DIRECTIONS.LEFT);
			$("#"+characterID).css("left",(left*1 - unitMove) + "px");
		}
		//move Y
		if(position.y > destination.y) {
			CharacterHelper.direction(character,DIRECTIONS.UP);
			$("#"+characterID).css("top",(top*1 - unitMove) + "px");
		}else if(position.y < destination.y) {
			CharacterHelper.direction(character,DIRECTIONS.DOWN);
			$("#"+characterID).css("top",(top*1 + unitMove) + "px");
		}
		
		//continue moving
		if(!PointHelper.equals(position, destination)) {
			setTimeout(function() {
				ActionManager.moveCss(mapID, character, destination);
			}, FOOT_STEP_DURATION);
		}
	},
};
