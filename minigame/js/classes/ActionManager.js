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
var Action = function(typeOfAction, map, subject, target) {
	this.type = typeOfAction || ACTION_ENUM.MOVE;
	this.currentMap = map;
	this.subject = subject;
	this.target = target;
	this.state = ACTION_STATE_ENUM.TOSTART;
	this.blocking = false;
};

Action.prototype = { 
	getType: function() {
		return this.type;
	},
	
	getCurrentMap: function() {
		return this.currentMap;
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
	
	isBlocking: function() {
		return this.blocking;
	},

	setType: function(type) {
		this.type = type;
	},
	
	setCurrentMap: function(map) {
		this.currentMap = map;
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
	
	setBlocking: function(blocking) {
		this.blocking = blocking;
	},
};

function Move(map, subject, target) {
	this.type = ACTION_ENUM.MOVE;
	this.currentMap = map;
	this.subject = subject;
	this.target = target;
	this.state = ACTION_STATE_ENUM.TOSTART;
	this.moveState = MOVE_STATE_ENUM.STOPPED;
	this.blocking = true;
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
	var moveResult = MOVE_ON;
	var position = this.subject.getPersoPosition();
	
	var direction = this.getDirection(position, destination);
	console.log(direction);
	this.subject.direction(direction);
	
	// We have reached the end of the step because there was only one unitMove step left
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
	
	addAction: function(type, map, subject, target) {
		if(mapOrig[target.x][target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
			return null;
		}
		
		var action;
		switch(type) {
			case ACTION_ENUM.MOVE: action = new Move(map, subject, target); break;
			default: action = new Action(type, map, subject, target); break;
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
				
				if(action.isBlocking() && currentAction && currentAction.getState() != ACTION_STATE_ENUM.FINISHED) {
					console.log("CURRENT ACTION NOT FINISHED");
					currentAction.setState(ACTION_STATE_ENUM.TOFINISH);
					//Actions.actionList.push(action);
				} //else {
					if(action.isBlocking()) {
						subject.setCurrentAction(action);
					}
					switch(type) {
						case ACTION_ENUM.MOVE: action.moveTo(); break;
						default: console.log("Unknown action!"); break;
					}
				//}
			}
		}, CHECK_DURATION);
	},
	
	loadMap: function(mapID) {
		var map = new Map(mapContent[mapID]);
		
		if(map.getPosition().x == mapContentBorders.right) {
			map.setEdgeType(EDGE_TYPE_ENUM.RIGHT, true);
		}
		
		if(map.getPosition().y == mapContentBorders.bottom) {
			map.setEdgeType(EDGE_TYPE_ENUM.BOTTOM, true);
		}
		
		return map;
	},
	
	loadMaps: function(initialPosition, fromPosition, toPosition) {
		var initialMapID = "map_"+initialPosition.x+"_"+initialPosition.y+"_"+initialPosition.z;
		var map = ActionManager.loadMap(initialMapID);
		
		var fromZ = min(fromPosition.z, toPosition.z);
		var toZ = max(fromPosition.z, toPosition.z);
		var fromY = min(fromPosition.y, toPosition.y);
		var toY = max(fromPosition.y, toPosition.y);
		var fromX = min(fromPosition.x, toPosition.x);
		var toX = max(fromPosition.x, toPosition.x);
		
		map.addNeighbour(map);
		
		for(var z = fromZ; z <= toZ; z++) {
			for(var y = fromY; y <= toY; y++) {
				for(var x = fromX; x <= toX; x++) {
					mapID = "map_"+x+"_"+y+"_"+z;
					if(mapID != initialMapID) {
						if(mapContent[mapID]) {
							var tmpMap = ActionManager.loadMap(mapID);
							map.addNeighbour(tmpMap);
						} else {
							console.log("mapContent["+mapID+"] undefined");
						}
					}
				}
			}
		}
		
		return map;
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
		console.log("CLICKED POSITION:", returnedPosition);
		return returnedPosition;
	},
};
