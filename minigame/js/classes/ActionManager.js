/**
*	Action : classe définissant une action
*		type : type d'action (move, jump, cook, reboot, eat, sleep...)
*		subjectID : ID du sujet. Les sujets peuvent être des characters, des shadoks, des pommes, des poires et même des tartes à la banane
*		target : la plus part du temps le point sur lequel s'applique l'action que le sujet soit effectuer
*			Ex :
*				Action.type = MOVE
*				Action.sujet = "user"
*				Action.target = Point(x, y, z) de destination
*/
var Action = function(typeOfAction, theSubject, theTarget) {
	this.type = typeOfAction || ACTION_ENUM.MOVE;
	this.subjectID = theSubject;
	this.target = theTarget;
};

Action.prototype = { 
	getType: function() {
		return this.type;
	},

	getSubjectID: function() {
		return this.subjectID;
	},

	getTarget: function() {
		return this.target;
	},

	setType: function(type) {
		this.type = type;
	},

	setSubjectID: function(subjectID) {
		this.subjectID = subjectID;
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
		Actions.actionList.push(action);
	},
	
	start: function(mapID) {
		var intId = setInterval(function() {
			var action = Actions.actionList.pop();
			if(action) {
				var type = action.getType();
				var subjectID = action.getSubjectID();
				var target = action.getTarget();
				switch(type) {
					case ACTION_ENUM.MOVE: ActionManager.moveTo(mapID, Actions.subjectList[subjectID], target); break;
					default: console.log("Unknown action!"); break;
				}
			}
		}, CHECK_DURATION);
	},
	
	moveTo: function(mapID, character, destination) {
		var characterID = character.getID();
		var position = character.getPersoPosition2D();

		if(position.equals(destination) || mapOrig[destination.x][destination.y] != 1) {
			return MOVE_FINISHED;
		}
		
		if(character.isMoving()) {
			character.setOverrideAction();
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
		
		ActionManager.move(mapID, character, map1, result);
	},
	
	move: function(mapID, character, mapArray, nodes) {
		var timeout = 0;
		var i = 0;
		var moveResult = MOVE_ON;
		var characterID = character.getID();
		var destination = new Point(nodes[i].x*UNIT, nodes[i].y*UNIT);
		
		character.move();
		moveResult = ActionManager.moveByStep(mapID, character, mapArray, nodes, i, destination);
		var intId = setInterval(function() {
			var position = character.getPersoPosition();
			if(i == nodes.length || moveResult == MOVE_FINISHED || character.hasAnOverrideAction()) {
				character.hasNoOverrideAction();
				if(i == nodes.length) {
					i--;
				}
				clearInterval(intId);
				character.stop();
				var position = character.getPersoPosition2D();
				console.log("Actual ("+position.x +", "+position.y+")");
				console.log("Target ("+nodes[i].x+", "+nodes[i].y+")");
				console.log(Actions.actionList);
				console.log("FINISHED");
				return 0;
			}
			moveResult = ActionManager.moveByStep(mapID, character, mapArray, nodes, i, destination);
			
			if(moveResult == MOVE_WAIT) {
				console.log("ARRIVED ("+position.x / UNIT +", "+position.y / UNIT+") => ("+nodes[i].x+", "+nodes[i].y+")");
				i++;
				if(i != nodes.length) {
					destination = new Point(nodes[i].x*UNIT, nodes[i].y*UNIT);
				}
			}
		}, FOOT_STEP_DURATION);
	},

	moveByStep: function(mapID, character, mapArray, nodes, i, destination) {	
		if(nodes[i] == undefined || nodes.length == 0) {
			console.log("nodes["+i+"] undefined");
			return MOVE_FINISHED;
		}
		if(mapArray[nodes[i].x][nodes[i].y] != 2) {
			// Pas d'ennemi
			//mapArray[nodes[i].x][nodes[i].y]=4;
			var moveResult = ActionManager.moveCss(mapID, character, destination);
			
			return moveResult;
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
		var unitMove = Math.round(UNIT/5);
		var characterID = character.getID();
		var moveResult = MOVE_ON;
		var position = character.getPersoPosition();
		var left = position.x;
		var top = position.y;
		
		//move X
		if(position.x < destination.x) {
			character.direction(DIRECTION_ENUM.RIGHT);
			$("#"+characterID).css("left",(left*1 + unitMove) + "px");
		}else if(position.x > destination.x) {
			character.direction(DIRECTION_ENUM.LEFT);
			$("#"+characterID).css("left",(left*1 - unitMove) + "px");
		}
		//move Y
		if(position.y > destination.y) {
			character.direction(DIRECTION_ENUM.UP);
			$("#"+characterID).css("top",(top*1 - unitMove) + "px");
		}else if(position.y < destination.y) {
			character.direction(DIRECTION_ENUM.DOWN);
			$("#"+characterID).css("top",(top*1 + unitMove) + "px");
		}
		
		// We have reached the end of the step because there was only one unitMove step left
		if(Math.abs(destination.x - position.x) == unitMove || Math.abs(destination.y - position.y) == unitMove) {
			moveResult = MOVE_WAIT;
		}
		
		return moveResult;
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
