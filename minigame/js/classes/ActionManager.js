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
var Action = function(typeOfAction, theSubject, theTarget) {
	this.type = typeOfAction || ACTION_ENUM.MOVE;
	this.subject = theSubject;
	this.target = theTarget;
};

Action.prototype = { 
	getType: function() {
		return this.type;
	},

	getSubject: function() {
		return this.subject;
	},

	getTarget: function() {
		return this.target;
	},

	setType: function(type) {
		this.type = type;
	},

	setSubject: function(subject) {
		this.subject = subject;
	},

	setTarget: function(target) {
		this.target = target;
	},
};

/**
*	Classe Actions : contient une liste d'action (actionList) et une liste d'ID de sujets (subjectList)
*/
var Actions = {
	actionList:null,
	subjectList:null,
};


var ActionManager = {	
	init: function() {
		Actions.actionList = new Array();
		Actions.subjectList = new Array();
	},
	
	//TODO DO NOT WORK
	getActionList: function() {
		return Actions.actionList;
	},
	
	//TODO DO NOT WORK
	getSubjectList: function() {
		return Actions.subjectList;
	},
	
	addSubject: function(subject) {
		var subjectID = subject.getID();
		Actions.subjectList[subjectID] = subject;
	},
	
	addAction: function(type, subjectID, target) {
		var action = new Action(type, subjectID, target);
		Actions.actionList[subjectID] = new Array();
		Actions.actionList[subjectID].push(action);
	},
	
	moveTo: function(mapID, character, destination) {
		var characterID = character.getID();
		var position = character.getPersoPosition2D();

		if(position.equals(destination) || mapOrig[destination.x][destination.y] != 1) {
			return MOVE_FINISHED;
		}

		var map1 = copyMap(mapOrig);
		var graph = new Graph(map1);
		
		var start = graph.nodes[position.x][position.y];
		var end = graph.nodes[destination.x][destination.y];
		var map2 = graph.input;
		
		var result = astar.search(graph.nodes, start, end, true);
		
		if(result.length == 0) {
			return MOVE_FINISHED;
		}
		
		$("#"+characterID).find(".perso").removeClass("stand");
		$("#"+characterID).find(".perso").addClass("walk");
		
		ActionManager.move(mapID, character, map1, result);
	},
	
	move: function(mapID, character, mapArray, nodes) {
		var timeout = 0;
		var i = 1;
		var moveResult = MOVE_ON;
		var characterID = character.getID();
		ActionManager.moveByStep(mapID, character, mapArray, nodes, 0);
		var intId = setInterval(function() {
			var position = character.getPersoPosition2D();
			if(i == nodes.length || moveResult == MOVE_FINISHED) {
				if(i == nodes.length) {
					i--;
				}
				clearInterval(intId);
				setTimeout(function() {
					$("#"+characterID).find(".perso").addClass("stand");
					$("#"+characterID).find(".perso").removeClass("walk");
					character.stop();
					var position = character.getPersoPosition2D();
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

	moveByStep: function(mapID, character, mapArray, nodes, i) {	
		if(nodes[i] == undefined || nodes.length == 0) {
			console.log("nodes["+i+"] undefined");
			return MOVE_FINISHED;
		}
		if(mapArray[nodes[i].x][nodes[i].y] != 2) {
			// Pas d'ennemi
			//mapArray[nodes[i].x][nodes[i].y]=4;
			var destination = new Point(nodes[i].x*UNIT, nodes[i].y*UNIT);
			character.move();
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

	moveCss: function(mapID, character, destination) {
		var unitMove=Math.round(UNIT/5);
		var characterID = character.getID();
		
		var position = character.getPersoPosition();
		var left = position.x;
		var top = position.y;
		
		//move X
		if(position.x < destination.x) {
			character.direction(DIRECTIONS.RIGHT);
			$("#"+characterID).css("left",(left*1 + unitMove) + "px");
		}else if(position.x > destination.x) {
			character.direction(DIRECTIONS.LEFT);
			$("#"+characterID).css("left",(left*1 - unitMove) + "px");
		}
		//move Y
		if(position.y > destination.y) {
			character.direction(DIRECTIONS.UP);
			$("#"+characterID).css("top",(top*1 - unitMove) + "px");
		}else if(position.y < destination.y) {
			character.direction(DIRECTIONS.DOWN);
			$("#"+characterID).css("top",(top*1 + unitMove) + "px");
		}
		
		//continue moving
		if(!position.equals(destination)) {
			setTimeout(function() {
				ActionManager.moveCss(mapID, character, destination);
			}, FOOT_STEP_DURATION);
		}
	},
	
	getMouseMapPosition: function(mapID, event) {
		var offsetLeft = $("#screen").offset().left+$("#"+mapID).position().left;
		var offsetTop = $("#screen").offset().top+$("#"+mapID).position().top;
		
		var x = event.pageX;
		var y = event.pageY;
		
		var posX = x - offsetLeft;
		var posY = y - offsetTop;
		
		//position de la souris par rapport à la carte 2D
		var position = new Point(posX/UNIT, posY/UNIT);
		var returnedPosition = position.changeFrame(false);
		console.log(returnedPosition);
		return returnedPosition;
	},
};
