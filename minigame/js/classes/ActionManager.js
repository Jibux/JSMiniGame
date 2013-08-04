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
	if(this.state == ACTION_STATE_ENUM.TOSTART) {
		this.state = ACTION_STATE_ENUM.STARTED;
		this.moveState = MOVE_STATE_ENUM.MOVING;
		return true;
	} else {
		console.log("CACAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		return false;
	}
}

Move.prototype.stopAction = function() {
	this.state = ACTION_STATE_ENUM.FINISHED;
	this.moveState = MOVE_STATE_ENUM.STOPPED;
}

Move.prototype.getMoveState = function() {
	return this.moveState;
}

Move.prototype.moveTo = function() {
	var subjectID = this.subject.getID();
	var position = this.subject.getPersoPosition2D();

	if(position.equals(this.target) || this.currentMap.getOccupation()[this.target.x][this.target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
		this.getSubject().stopSubject();
		return MOVE_FINISHED;
	}
	
	/*if(!this.start()) {
		this.stopAction();
		return MOVE_FINISHED;
	}*/
	
	this.start();
	
	var offsetX = 0;
	var offsetY = 0;
		
	var map = this.subject.getCurrentMap().getNeighboursOccupation();
	
	offsetX = this.subject.getCurrentMap().getXOffset();
	offsetY = this.subject.getCurrentMap().getYOffset();
	
	offsetMapX = this.currentMap.getXOffset();
	offsetMapY = this.currentMap.getYOffset();
	
	var graph = new Graph(map);
	
	this.subject.setXOffset(offsetX);
	this.subject.setYOffset(offsetY);
	
	var start = graph.nodes[position.x+offsetX][position.y+offsetY];
	var end = graph.nodes[this.target.x+offsetMapX][this.target.y+offsetMapY];
	
	var result = astar.search(graph.nodes, start, end, true);
	
	if(typeof result == "undefined" || result.length == 0) {
		this.getSubject().stopSubject();
		this.stopAction();
		console.log("CANNOT FIND PATH");
		return MOVE_FINISHED;
	}
	
	return this.move(map, result);
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
		if(i == nodes.length || moveResult == MOVE_FINISHED || action.state == ACTION_STATE_ENUM.TOSTOP) {
			if(i == nodes.length) {
				i--;
			}
			clearInterval(intId);
			action.stopAction();
			// If the subject has no more moves in the stack (subject current action == this action)
			if(action.getSubject().getCurrentAction().getState() == ACTION_STATE_ENUM.FINISHED) {
				action.getSubject().stopSubject();
				action.getSubject().setCurrentAction(null);
			}
			var position = action.getSubject().getPersoPosition2D();
			console.log("Actual ("+position.x +", "+position.y+")");
			console.log("Target ("+nodes[i].x+", "+nodes[i].y+")");
			return MOVE_FINISHED;
		}
		moveResult = action.moveByStep(mapArray, nodes, i, destination);
		
		if(moveResult == MOVE_WAIT) {
			//console.log("ARRIVED ("+position.x / UNIT +", "+position.y / UNIT+") => ("+nodes[i].x+", "+nodes[i].y+")");
			i++;
			if(i != nodes.length) {
				destination = new Point(nodes[i].x*UNIT, nodes[i].y*UNIT);
			}
		}
		
		if(action.state == ACTION_STATE_ENUM.TOFINISH) {
			console.log("HAVE TO FINISH");
			moveResult = MOVE_FINISHED;
		}
		
	}, FOOT_STEP_DURATION);
}

Move.prototype.moveByStep = function(mapArray, nodes, i, destination) {	
	if(nodes[i] == undefined || nodes.length == 0) {
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
		
		/*mapArray = copy2DArray(this.currentMap.getOccupation());
		mapArray[nodes[i].x][nodes[i].y] = 0;
		
		var graph = new Graph(mapArray);		
		var start = graph.nodes[nodes[i-1].x][nodes[i-1].y];
		var end = graph.nodes[nodes[nodes.length-1].x][nodes[nodes.length-1].y];
		var result = astar.search(graph.nodes, start, end, true);
		
		this.move(this.subject, mapArray, nodes);
		return MOVE_FINISHED;*/
	}
}

Move.prototype.moveCss = function(destination) {
	var moveResult = MOVE_ON;
	var realPosition = this.subject.getOffsetedPosition();
	var direction = this.getDirection(realPosition, destination);

	//console.log("DIRECTION "+direction);
	
	this.subject.setDirection(direction);
	
	var mapDirection = this.subject.getCurrentMap().getMapDirection(this.subject.getPersoPosition());
	
	// We have to change map
	if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
		console.log("CHANGE MAP: "+mapDirection);
		this.subject.changeMap(mapDirection);
	}
	
	var realPosition2 = this.subject.getOffsetedPosition();

	// We have reached the end of the step because there was only one unitMove step left
	if(realPosition2.equals(destination)) {
		moveResult = MOVE_WAIT;
	}
	
	return moveResult;
}

Move.prototype.getDirection = function(from, to) {
	var directionX = DIRECTION_ENUM.NOCHANGE;
	var directionY = DIRECTION_ENUM.NOCHANGE;
	
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
	
	if(directionX == DIRECTION_ENUM.NOCHANGE) {
		return directionY;
	}
	
	if(directionY == DIRECTION_ENUM.NOCHANGE) {
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
	mainCharacter:null
};


var ActionManager = {	
	init: function() {
		Actions.actionList = new Array();
		Actions.subjectList = new Array();
	},
	
	getActionList: function() {
		return Actions.actionList;
	},
	
	getSubjectList: function() {
		return Actions.subjectList;
	},
	
	addSubject: function(subject) {
		var subjectID = subject.getID();
		Actions.subjectList[subjectID] = subject;
		if(subject.isMainCharacter()) {
			Actions.mainCharacter = subject;
		}
	},
	
	addAction: function(type, mapID, subject, target) {
		var map = subject.getCurrentMap().getNeighbour(mapID);
		if(map === null) {
			console.log("MAP "+mapID+" UNDEFINED");
			return null;
		}
		
		if(target.x <0 || target.y < 0) {
			console.log("BAD TARGET: ",target);
			return null;
		}
		
		var occupation = map.getOccupation();
		if(typeof(occupation) === 'undefined') {
			console.log("OCCUPATION UNDEFINED");
			return null;
		}
		
		if(typeof(occupation[target.x][target.y]) === 'undefined') {
			console.log("OCCUPATION["+target.x+"]["+target.y+"] UNDEFINED");
			return null;
		}
		
		console.log("NEW ACTION ",map);
		
		if(occupation[target.x][target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
			console.log("OCCUPATION["+target.x+"]["+target.y+"] UNAVAILABLE");
			return null;
		}
		
		var action;
		switch(type) {
			case ACTION_ENUM.MOVE: action = new Move(map, subject, target); break;
			default: action = new Action(type, map, subject, target); break;
		}
		
		Actions.actionList.push(action);
	},
	
	start: function() {
		ActionManager.handleClicks();
		var intId = setInterval(function() {
			var action = Actions.actionList.pop();
			
			if(action) {
				var type = action.getType();
				var subject = action.getSubject();
				var target = action.getTarget();
				var currentAction = subject.getCurrentAction();
				var nextAction = subject.getNextAction();
				
				if(nextAction) {
					console.log("NEW NEXT ACTION lenght ",Actions.actionList);
					Actions.actionList.unset(nextAction);
				}
				subject.setNextAction(action);
				
				//if(action.isBlocking() && currentAction && currentAction.getState() != ACTION_STATE_ENUM.FINISHED && currentAction.getState() != ACTION_STATE_ENUM.TOSTOP) {
				//if(action.isBlocking() && currentAction && currentAction.getState() != ACTION_STATE_ENUM.TOSTART && currentAction.getState() != ACTION_STATE_ENUM.FINISHED) {
				if(action.isBlocking() && currentAction) {
					console.log("CURRENT ACTION NOT FINISHED: subject ",currentAction.getState()," action ",action.getState());
					/*if(currentAction.getState() == ACTION_STATE_ENUM.TOSTART) {
						currentAction.setState(ACTION_STATE_ENUM.TOSTOP);
					}
					if(currentAction.getState() != ACTION_STATE_ENUM.FINISHED && currentAction.getState() != ACTION_STATE_ENUM.TOFINISH && currentAction.getState() != ACTION_STATE_ENUM.TOSTOP) {
						currentAction.setState(ACTION_STATE_ENUM.TOFINISH);
					}*/
					
					currentAction.setState(ACTION_STATE_ENUM.TOFINISH);
					//setTimeout(function(){
					//Actions.actionList.push(action);
					//}, FOOT_STEP_DURATION);
				}// else {
					if(action.isBlocking()) {
						console.log("DELETE ACTION");
						subject.setNextAction(null);
						subject.setCurrentAction(action);
					}
					
					var result;
					switch(type) {
						case ACTION_ENUM.MOVE: result = action.moveTo(); break;
						default: console.log("Unknown action!"); break;
					}
				//}
			}
		}, CHECK_DURATION);
	},
	
	handleClicks: function() {
		var character = Actions.mainCharacter;
		$(".tile").click(function(e) {
			var ID = $(this).parent().attr('id');
			var position = ActionManager.getMouseMapPosition(ID, e);
			console.log("CHARACTER POSITION: ", character.getPersoPosition());
			console.log("CHARACTER POSITION 2D: ", character.getPersoPosition2D());
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
		});
		$(".perso").click(function(e) {
			var ID = $(this).parent().parent().attr('id');
			var position = ActionManager.getMouseMapPosition(ID, e);
			var mapDirection = character.getCurrentMap().getMapDirection(position.scaleToCss());
			// TODO (IF WE CAN) BETTER CODE DIRECTION MAP ETC.
			if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
				ID = character.getCurrentMap().getMapIDFromDirection(mapDirection);
				position.convertFromSize(character.getCurrentMap().getNeighbour(ID).getSize());
				console.log("CLICKED POSITION2:", position);
			}
			
			console.log("CHARACTER POSITION: ", character.getPersoPosition());
			console.log("CHARACTER POSITION 2D: ", character.getPersoPosition2D());
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
		});
	},
	
	loadMap: function(mapID) {
		if(typeof(mapContent[mapID]) === 'undefined') {
			return null;
		}
		var map = new Map(mapContent[mapID]);
		
		var mapIDBottom = "map_"+(map.getPosition().x)*1+"_"+(map.getPosition().y+1)*1+"_"+map.getPosition().z;
		var mapIDRight = "map_"+(map.getPosition().x+1)*1+"_"+(map.getPosition().y)*1+"_"+map.getPosition().z;
				
		if(!mapContent[mapIDRight]) {
			map.setEdgeType(EDGE_TYPE_ENUM.RIGHT, true);
		}
		
		if(!mapContent[mapIDBottom]) {
			map.setEdgeType(EDGE_TYPE_ENUM.BOTTOM, true);
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
