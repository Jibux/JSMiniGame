/**
*	Action : classe définissant une action
*		type : type d'action (move, jump, cook, reboot, eat, sleep...)
*		subject : sujet. Les sujets peuvent être des this.subjects, des shadoks, des pommes, des poires et même des tartes à la banane
*		target : la plus part du temps le point sur lequel s'applique l'action que le sujet soit effectuer
*			Ex :
*				Action.type = MOVE
*				Action.sujet = "user"
*				Action.target = Point(x, y, z) de destination
*/
var Action = function(typeOfAction, mapID, subject, target) {
	this.type = typeOfAction || ACTION_ENUM.MOVE;
	this.mapID = mapID;
	this.subject = subject;
	this.target = target;
	this.state = ACTION_STATE_ENUM.TOSTART;
};

Action.prototype = { 
	getType: function() {
		return this.type;
	},
	
	getMapID: function() {
		return this.mapID;
	},

	getSubject: function() {
		return this.subject;
	},

	getTarget: function() {
		return this.target;
	},
	
	getState: function() {
		return this.state;
	},

	setType: function(type) {
		this.type = type;
	},
	
	setMapID: function(mapID) {
		this.mapID = mapID;
	},

	setSubject: function(subject) {
		this.subject = subject;
	},

	setTarget: function(target) {
		this.target = target;
	},
	
	setState: function(state) {
		this.state = state;
	},
};

function Move(mapID, subject, target) {
	this.type = ACTION_ENUM.MOVE;
	this.mapID = mapID;
	this.subject = subject;
	this.target = target;
	this.state = ACTION_STATE_ENUM.TOSTART;
	this.moveState = MOVE_STATE_ENUM.STOPPED;
};

Move.prototype = Object.create(Action.prototype);

Move.prototype.start = function() {
	this.state = ACTION_STATE_ENUM.STARTED;
	this.moveState = MOVE_STATE_ENUM.MOVING;
}

Move.prototype.stop = function() {
	this.state = ACTION_STATE_ENUM.FINISHED;
	this.moveState = MOVE_STATE_ENUM.STOPPED;
}

Move.prototype.getMoveState = function() {
	return this.moveState;
}

Move.prototype.moveTo = function() {
	var subjectID = this.subject.getID();
	var position = this.subject.getPersoPosition2D();
	this.state = ACTION_STATE_ENUM.STARTED;

	if(position.equals(this.target) || mapOrig[this.target.x][this.target.y] != 1) {
		return MOVE_FINISHED;
	}

	var map1 = copyMap(mapOrig);
	var graph = new Graph(map1);
	
	var start = graph.nodes[position.x][position.y];
	var end = graph.nodes[this.target.x][this.target.y];
	var map2 = graph.input;
	
	var result = astar.search(graph.nodes, start, end, true);
	
	if(result.length == 0) {
		return MOVE_FINISHED;
	}
	
	this.move(map1, result);
}

Move.prototype.move = function(mapArray, nodes) {
	var timeout = 0;
	var i = 0;
	var moveResult = MOVE_ON;
	var subjectID = this.subject.getID();
	var destination = new Point(nodes[i].x*UNIT, nodes[i].y*UNIT);
	
	var action = this;
	
	this.subject.move();
	moveResult = action.moveByStep(mapArray, nodes, i, destination);
	var intId = setInterval(function() {
		var position = action.getSubject().getPersoPosition();
		if(i == nodes.length || moveResult == MOVE_FINISHED) {
			if(i == nodes.length) {
				i--;
			}
			clearInterval(intId);
			action.stop();
			// If the subject has no more moves in the stack (subject current action == this action)
			if(action.getSubject().getCurrentAction().getState() == ACTION_STATE_ENUM.FINISHED) {
				action.getSubject().stop();
			}
			var position = action.getSubject().getPersoPosition2D();
			console.log("Actual ("+position.x +", "+position.y+")");
			console.log("Target ("+nodes[i].x+", "+nodes[i].y+")");
			return MOVE_FINISHED;
		}
		moveResult = action.moveByStep(mapArray, nodes, i, destination);
		
		if(moveResult == MOVE_WAIT) {
			console.log("ARRIVED ("+position.x / UNIT +", "+position.y / UNIT+") => ("+nodes[i].x+", "+nodes[i].y+")");
			i++;
			if(i != nodes.length) {
				destination = new Point(nodes[i].x*UNIT, nodes[i].y*UNIT);
			}
		}
	}, FOOT_STEP_DURATION);
}

Move.prototype.moveByStep = function(mapArray, nodes, i, destination) {	
	if(nodes[i] == undefined || nodes.length == 0 || this.state == ACTION_STATE_ENUM.TOFINISH) {
		if(nodes[i] == undefined) {
			console.log("nodes["+i+"] undefined");
		}
		return MOVE_FINISHED;
	}
	if(mapArray[nodes[i].x][nodes[i].y] != STATIC_OCCUPATION_ENUM.CHARACTER) {
		// Pas d'ennemi
		//mapArray[nodes[i].x][nodes[i].y]=4;
		var moveResult = this.moveCss(destination);
		
		return moveResult;
	} else {
		// Ennemi en vue
		console.log("Ennemi at ("+nodes[i].x+", "+nodes[i].y+")");
		
		mapArray=copyMap(mapOrig);
		mapArray[nodes[i].x][nodes[i].y] = 0;
		
		var graph = new Graph(mapArray);		
		var start = graph.nodes[nodes[i-1].x][nodes[i-1].y];
		var end = graph.nodes[nodes[nodes.length-1].x][nodes[nodes.length-1].y];
		var result = astar.search(graph.nodes, start, end, true);
		
		this.move(this.subject, mapArray, nodes);
		return MOVE_FINISHED;
	}
}

Move.prototype.moveCss = function(destination) {
	var subjectID = this.subject.getID();
	var mapID = this.getMapID();
	var moveResult = MOVE_ON;
	var position = this.subject.getPersoPosition();
	var left = position.x;
	var top = position.y;
	
	var mapLeft = $("#"+mapID).css("left").substring(0,$("#"+mapID).css("left").length - 2);
	var mapTop = $("#"+mapID).css("top").substring(0, $("#"+mapID).css("top").length - 2);
	
	var direction = this.getDirection(position, destination);
	console.log(direction);
	this.subject.direction(direction);
	
	switch(direction) {
		case DIRECTION_ENUM.RIGHT:
			$("#"+subjectID).css("left",(left*1 + UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+mapID).css("top",(mapTop*1 - UNIT_ENUM.UNIT_MOVE_MAP2) + "px");
			$("#"+mapID).css("left",(mapLeft*1 - UNIT_ENUM.UNIT_MOVE_MAP) + "px");
			break;
		case DIRECTION_ENUM.LEFT:
			$("#"+subjectID).css("left",(left*1 - UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+mapID).css("top",(mapTop*1 + UNIT_ENUM.UNIT_MOVE_MAP2) + "px");
			$("#"+mapID).css("left",(mapLeft*1 + UNIT_ENUM.UNIT_MOVE_MAP) + "px");
			break;
		case DIRECTION_ENUM.UP:
			$("#"+subjectID).css("top",(top*1 - UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+mapID).css("top",(mapTop*1 + UNIT_ENUM.UNIT_MOVE_MAP2) + "px");
			$("#"+mapID).css("left",(mapLeft*1 - UNIT_ENUM.UNIT_MOVE_MAP) + "px");
			break;
		case DIRECTION_ENUM.DOWN:
			$("#"+subjectID).css("top",(top*1 + UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+mapID).css("top",(mapTop*1 - UNIT_ENUM.UNIT_MOVE_MAP2) + "px");
			$("#"+mapID).css("left",(mapLeft*1 + UNIT_ENUM.UNIT_MOVE_MAP) + "px");
			break;
		case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
			$("#"+subjectID).css("left",(left*1 + UNIT_ENUM.UNIT_MOVE2) + "px");
			$("#"+subjectID).css("top",(top*1 - UNIT_ENUM.UNIT_MOVE2) + "px");
			$("#"+mapID).css("left",(mapLeft*1 - UNIT_ENUM.UNIT_MOVE_DIAGONAL2) + "px");
			break;
		case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
			$("#"+subjectID).css("left",(left*1 - UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+subjectID).css("top",(top*1 - UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+mapID).css("top",(mapTop*1 + UNIT_ENUM.UNIT_MOVE_DIAGONAL2) + "px");
			break;
		case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
			$("#"+subjectID).css("left",(left*1 + UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+subjectID).css("top",(top*1 + UNIT_ENUM.UNIT_MOVE) + "px");
			$("#"+mapID).css("top",(mapTop*1 - UNIT_ENUM.UNIT_MOVE_DIAGONAL2) + "px");
			break;
		case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
			$("#"+subjectID).css("left",(left*1 - UNIT_ENUM.UNIT_MOVE2) + "px");
			$("#"+subjectID).css("top",(top*1 + UNIT_ENUM.UNIT_MOVE2) + "px");
			$("#"+mapID).css("left",(mapLeft*1 + UNIT_ENUM.UNIT_MOVE_DIAGONAL2) + "px");
			break;
		default: break;
	}
	
	this.subject.updatePosition();
	
	// We have reached the end of the step because there was only one unitMove step left
	//if(Math.abs(destination.x - position.x) == UNIT_ENUM.UNIT_MOVE || Math.abs(destination.y - position.y) == UNIT_ENUM.UNIT_MOVE) {
	if(this.subject.getPersoPosition().equals(destination)) {
		moveResult = MOVE_WAIT;
	}
	
	return moveResult;
}

Move.prototype.getDirection = function(from, to) {
	var directionX = "";
	var directionY = "";
	
	if(from.x < to.x) {
		directionX = DIRECTION_ENUM.RIGHT;
	} else if(from.x > to.x) {
		directionX = DIRECTION_ENUM.LEFT;
	}
	
	if(from.y < to.y) {
		directionY = DIRECTION_ENUM.DOWN;
	} else if(from.y > to.y) {
		directionY = DIRECTION_ENUM.UP;
	}
	
	if(directionX == "") {
		return directionY;
	}
	
	if(directionY == "") {
		return directionX;
	}
	
	if(directionX == DIRECTION_ENUM.RIGHT && directionY == DIRECTION_ENUM.DOWN) {
		return DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT;
	}
	
	if(directionX == DIRECTION_ENUM.LEFT && directionY == DIRECTION_ENUM.DOWN) {
		return DIRECTION_ENUM.DIAGONAL_DOWN_LEFT;
	}
	
	if(directionX == DIRECTION_ENUM.RIGHT && directionY == DIRECTION_ENUM.UP) {
		return DIRECTION_ENUM.DIAGONAL_UP_RIGHT;
	}
	
	if(directionX == DIRECTION_ENUM.LEFT && directionY == DIRECTION_ENUM.UP) {
		return DIRECTION_ENUM.DIAGONAL_UP_LEFT;
	}
	
	return DIRECTION_ENUM.NOCHANGE;
}


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
	
	addAction: function(type, mapID, subject, target) {
		if(mapOrig[target.x][target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
			return null;
		}
		
		var action;
		switch(type) {
			case ACTION_ENUM.MOVE: action = new Move(mapID, subject, target); break;
			default: action = new Action(type, mapID, subject, target); break;
		}
		console.log(action);
		Actions.actionList.push(action);
	},
	
	start: function() {
		var intId = setInterval(function() {
			var action = Actions.actionList.pop();
			if(action) {
				var type = action.getType();
				var subject = action.getSubject();
				var target = action.getTarget();
				var currentAction = subject.getCurrentAction();
				
				if(currentAction && currentAction.getState() != ACTION_STATE_ENUM.FINISHED) {
					console.log("CURRENT ACTION NOT FINISHED");
					currentAction.setState(ACTION_STATE_ENUM.TOFINISH);
					//Actions.actionList.push(action);
				} //else {
					subject.setCurrentAction(action);
					switch(type) {
						case ACTION_ENUM.MOVE: action.moveTo(); break;
						default: console.log("Unknown action!"); break;
					}
				//}
			}
		}, CHECK_DURATION);
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
