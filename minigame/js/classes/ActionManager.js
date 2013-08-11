/**
 *	Action: Defines an action.
 *		type: Type of action (move, jump, cook, reboot, eat, sleep...)
 *		currentMap: Map where is located the target
 *		subject: Subject can be human, monster etc.
 *		target: Target point of the action.
 *		state: State of the action. It can be "to start", "starting", "to finish", "finished", etc.
 *		blocking: If the action is blocking. All of these kind of actions have to be done one after another, but never simultaneously.
 *			Ex :
 *				Action.type = MOVE
 *				Action.sujet = "user"
 *				Action.target = Point(x, y, z): destination point
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

/**
 *	Action: Defines the "move" action.
 */
var Move = function(map, subject, target) {
	this.type = ACTION_ENUM.MOVE;
	this.currentMap = map;
	this.subject = subject;
	this.target = target;
	this.state = ACTION_STATE_ENUM.TOSTART;
	this.moveState = MOVE_STATE_ENUM.STOPPED;
	this.blocking = true;
	this.path = null;
	this.indexInPath = 0;
};

/*
*	Inherit Action's methods.
*/
Move.prototype = Object.create(Action.prototype);

/*
*	We have started, we are moving.
*/
Move.prototype.initStart = function() {
	this.state = ACTION_STATE_ENUM.STARTED;
	this.moveState = MOVE_STATE_ENUM.MOVING;
}

/*
*	We have finished, we have stopped.
*/
Move.prototype.stopAction = function() {
	this.state = ACTION_STATE_ENUM.FINISHED;
	this.moveState = MOVE_STATE_ENUM.STOPPED;
}

Move.prototype.getMoveState = function() {
	return this.moveState;
}

/*
*	Just launch moveTo().
*/
Move.prototype.start = function() {
	this.moveTo();
}

/*
*	Initiate move.
*/
Move.prototype.moveTo = function() {
	var subjectID = this.subject.getID();
	var position = this.subject.getArrayPosition();

	// Bad target.
	if(position.equals(this.target) || this.currentMap.getOccupation()[this.target.x][this.target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
		this.getSubject().stopSubject();
		this.getSubject().setCurrentAction(null);
		return MOVE_FINISHED;
	}
	
	this.initStart();
	
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
	
	// Start at the offset position of the subject.
	var start = graph.nodes[position.x+offsetX][position.y+offsetY];
	// End at the offset position of the click.
	var end = graph.nodes[this.target.x+offsetMapX][this.target.y+offsetMapY];
	
	// Find path.
	var result = astar.search(graph.nodes, start, end, true);
	
	if(typeof(result) === "undefined" || result.length == 0) {
		this.getSubject().stopSubject();
		this.stopAction();
		this.getSubject().setCurrentAction(null);
		console.log("CANNOT FIND PATH");
		return MOVE_FINISHED;
	}
	
	this.path = result;
	
	return this.move(map);
}

/*
*	Move.
*/
Move.prototype.move = function(mapArray) {
	var timeout = 0;
	var moveResult = MOVE_ON;
	var subjectID = this.subject.getID();
	var destination = new Point(this.path[this.indexInPath].x*UNIT, this.path[this.indexInPath].y*UNIT);
	
	var action = this;
	
	this.subject.move();
	moveResult = action.moveByStep(mapArray, destination);
	var intId = setInterval(function() {
		var position = action.getSubject().getPosition();
		if(action.indexInPath == action.path.length || moveResult == MOVE_FINISHED || action.state == ACTION_STATE_ENUM.TOSTOP) {
			if(action.indexInPath == action.path.length) {
				action.indexInPath--;
			}
			clearInterval(intId);
			action.stopAction();
			action.getSubject().stopSubject();
			action.getSubject().setCurrentAction(null);
			var position = action.getSubject().getArrayPosition();
			console.log("Actual ("+position.x +", "+position.y+")");
			console.log("Target ("+action.path[action.indexInPath].x+", "+action.path[action.indexInPath].y+")");
			return MOVE_FINISHED;
		}
		moveResult = action.moveByStep(mapArray, destination);
		
		if(moveResult == MOVE_WAIT) {
			//console.log("ARRIVED ("+position.x / UNIT +", "+position.y / UNIT+") => ("+nodes[action.indexInPath].x+", "+nodes[action.indexInPath].y+")");
			// We have reached a step in the node list. Increment "action.indexInPath".
			action.indexInPath++;
			if(action.indexInPath != action.path.length) {
				destination = new Point(action.path[action.indexInPath].x*UNIT, action.path[action.indexInPath].y*UNIT);
			}
			
			// We have been told to stop moves.
			if(action.state == ACTION_STATE_ENUM.TOFINISH) {
				console.log("HAVE TO FINISH");
				moveResult = MOVE_FINISHED;
			}
		}
		
	}, FOOT_STEP_DURATION);
}

/*
*	Move by step: see if the next step is not occupied. And do some stuff with it.
*/
Move.prototype.moveByStep = function(mapArray, destination) {	
	if(typeof(this.path[this.indexInPath]) === 'undefined' || this.path.length == 0) {
		if(typeof(this.path[this.indexInPath]) === 'undefined') {
			console.log("path["+this.indexInPath+"] undefined");
		}
		return MOVE_FINISHED;
	}
	if(mapArray[this.path[this.indexInPath].x][this.path[this.indexInPath].y] != STATIC_OCCUPATION_ENUM.CHARACTER) {
		// Pas d'ennemi
		//mapArray[this.path[this.indexInPath].x][this.path[this.indexInPath].y]=4;
		var moveResult = this.moveCss(destination);
		
		return moveResult;
	} else {
		// Ennemi en vue
		console.log("Ennemi at ("+this.path[this.indexInPath].x+", "+this.path[this.indexInPath].y+")");
		
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

/*
*	Really move subject.
*/
Move.prototype.moveCss = function(destination) {
	var moveResult = MOVE_ON;
	var realPosition = this.subject.getOffsetedPosition();
	// Where do we have to go?
	var direction = this.getDirection(realPosition, destination);
	
	$(realPosition).remove();
	
	//console.log("DIRECTION "+direction);
	
	// Move subject.
	this.subject.setDirection(direction);
	
	// Check if we have to change map.
	var mapDirection = this.subject.getCurrentMap().getMapDirection(this.subject.getPosition());
	
	// We have to change map
	if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
		console.log("CHANGE MAP: "+mapDirection);
		this.subject.changeMap(mapDirection);
	}
	
	var realPosition2 = this.subject.getOffsetedPosition();

	// We have reached the end of the step.
	if(realPosition2.equals(destination)) {
		moveResult = MOVE_WAIT;
	}
	
	$(realPosition2).remove();
	
	return moveResult;
}


/*
*	Compare the 2 positions given in parameters and return the direction to take.
*/
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
 *	Actions: Contains a list of characters, a list of actions and a main character.
 */
var Actions = {
	actionList:null,	// List of non blocking actions.
	subjectList:null,	// List of the subjects in the field.
	mainCharacter:null	// Main character of the game.
};

/**
 *	ActionsManager: Main class. It manages all the actions and subject in the field.
 */
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
	
	/*
	*	Add an action for the given subject.
	*/
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
		
		if(occupation[target.x][target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
			console.log("OCCUPATION["+target.x+"]["+target.y+"] UNAVAILABLE");
			return null;
		}
		
		var action;
		// Switch in order to create the good action.
		switch(type) {
			case ACTION_ENUM.MOVE: action = new Move(map, subject, target); break;
			default: action = new Action(type, map, subject, target); break;
		}
		
		// The action is blocking, so we set it directly to the subject's next action to do.
		if(action.isBlocking()) {
			var oldNextAction = subject.getNextAction();
			if(oldNextAction != null) {
				$(oldNextAction).remove();
			}
			subject.setNextAction(action);
		} else {
			Actions.actionList.push(action);
		}
		
		console.log("NEW ACTION ",action);
	},
	
	/*
	*	Start the game!
	*/
	start: function() {
		ActionManager.handleClicks();
		ActionManager.handleKeyPress();
		ActionManager.handleBlockingActions();
		ActionManager.handleNonBlockingActions();
	},
	
	/*
	*	Check blocking actions.
	*	Every CHECK_DURATION, it check if there are actions to do for the subjects in the subject list.
	*/
	handleBlockingActions: function() {
		var intId = setInterval(function() {
			for(var subjectID in Actions.subjectList) {
				var subject = Actions.subjectList[subjectID];
				if(typeof(subject.getCurrentAction) === 'function') {
					var currentAction = subject.getCurrentAction();
					var nextAction = subject.getNextAction();
					var startAction = false;
					
					if(currentAction === null) { // The subject is doing nothing.
						startAction = true;
					} else if(currentAction.getState() == ACTION_STATE_ENUM.FINISHED) { // The subject current action has finished.
						$(currentAction).remove();
						startAction = true;
					} else if(nextAction != null) { // Tells the currentAction to finish ASAP.
						if(currentAction.getState() != ACTION_STATE_ENUM.TOFINISH) {
							currentAction.setState(ACTION_STATE_ENUM.TOFINISH);
						}
						console.log("NOT FINISHED: ",currentAction);
					} else {
						//console.log("NOT FINISHED: ",currentAction);
					}
					
					// Start action (set it to subject's current action).
					if(startAction) {
						if(nextAction != null && nextAction.getState() == ACTION_STATE_ENUM.TOSTART) {
							subject.setNextAction(null);
							subject.setCurrentAction(nextAction);
							// Call the start method, common to all actions.
							nextAction.start();
						}
					}
				} else {
					//console.log('NOT A SUBJECT: ',subject);
				}
			}
		}, CHECK_DURATION);
	},
	
	/*
	*	Check non blocking actions.
	*/
	handleNonBlockingActions: function() {
		var intId = setInterval(function() {
			var action = Actions.actionList.pop();
			if(action) {
				if(typeof(action.start) === "function") {
					action.start();
				}
			}
		}, CHECK_DURATION);
	},
	
	/*
	*	NOT USED ANYMORE
	*/
	startOld: function() {
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
	
	/*
	*	Handle interactions with user (CLICKS).
	*/
	handleClicks: function() {
		var character = Actions.mainCharacter;
		if(character === null) {
			console.error("Main character not defined!");
			return null;
		}
		$(".tile").click(function(e) {
			var ID = $(this).parent().attr('id');
			var position = ActionManager.getMouseMapPosition(ID, e);
			console.log("CHARACTER POSITION: ", character.getPosition());
			console.log("CHARACTER POSITION 2D: ", character.getArrayPosition());
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
		});
		$(".perso").click(function(e) {
			var ID = $(this).parent().parent().attr('id');
			var position = ActionManager.getMouseMapPosition(ID, e);
			var mapDirection = character.getCurrentMap().getMapDirection(position.scaleToCss());
			// TODO (IF WE CAN) BETTER CODE DIRECTION MAP ETC.
			// We have clicked under an other map than the character's current one.
			if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
				ID = character.getCurrentMap().getMapIDFromDirection(mapDirection);
				position.convertFromSize(character.getCurrentMap().getNeighbour(ID).getSize());
				console.log("CLICKED POSITION2:", position);
			}
			
			console.log("CHARACTER POSITION: ", character.getPosition());
			console.log("CHARACTER POSITION 2D: ", character.getArrayPosition());
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
		});
	},
	
	/*
	*	Handle interactions with user (KEYS).
	*/
	handleKeyPress: function() {
		/*var character = Actions.mainCharacter;
		window.onkeypress=function(e) {
			var e = window.event || e;
			if(e.charCode == 13) {
				character.userSpeak();
			}
		}*/
		KeyManager();
	},
	
	moveMainCharacter: function() {
		var params = JSON.stringify(arguments[0],"");
		var direction = arguments[0].direction;
		var character = Actions.mainCharacter;
		var currentAction = character.getCurrentAction();
		
		if(character.getNextAction() != null) {
			console.log("CHARACTER IS MOVING!");
			//console.log("CURRENT ",character.getCurrentAction());
			//console.log("NEXT ",character.getNextAction());
			return null;
		}
		
		var ID = character.getCurrentMap().getID();
		console.log("MOVE TO "+direction);
		var position = character.getPositionFromDirection(direction);
		var mapDirection = character.getCurrentMap().getMapDirection(position.scaleToCss());
		// We have to move to an other map than the character's current one.
		if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
			ID = character.getCurrentMap().getMapIDFromDirection(mapDirection);
			position.convertFromSize(character.getCurrentMap().getNeighbour(ID).getSize());
		}
		
		console.log("GO POSITION:", position);
		
		// TODO: do not calculate here JUST MODIFY PATH !!!
		// TODO: modify path for move
		if(currentAction != null && currentAction.getType() == ACTION_ENUM.MOVE && currentAction.getState() == ACTION_STATE_ENUM.STARTED) {
			console.log("MODIFY PATH");
		} else {
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
		}
	},
	
	/*
	*	Load a map from data "mapContent[mapID]"
	*/
	loadMap: function(mapID) {
		if(typeof(mapContent[mapID]) === 'undefined') {
			return null;
		}
		var map = new Map(mapContent[mapID]);
		
		var mapIDBottom = "map_"+(map.getPosition().x)*1+"_"+(map.getPosition().y+1)*1+"_"+map.getPosition().z;
		var mapIDRight = "map_"+(map.getPosition().x+1)*1+"_"+(map.getPosition().y)*1+"_"+map.getPosition().z;
		
		// Nothing more at extreme right.
		if(!mapContent[mapIDRight]) {
			map.setEdgeType(EDGE_TYPE_ENUM.RIGHT, true);
		}
		
		// Nothing more at extreme bottom.
		if(!mapContent[mapIDBottom]) {
			map.setEdgeType(EDGE_TYPE_ENUM.BOTTOM, true);
		}
		
		return map;
	},
	
	/*
	*	Retrieve the real mouse position in the given map.
	*/
	getMouseMapPosition: function(mapID, event) {
		var offsetLeft = $("#screen").offset().left+$("#"+mapID).position().left;
		var offsetTop = $("#screen").offset().top+$("#"+mapID).position().top;
		
		var x = event.pageX;
		var y = event.pageY;
		
		var posX = x - offsetLeft;
		var posY = y - offsetTop;
		
		var position = new Point(posX/UNIT, posY/UNIT);
		// Mouse position in the real 2D map.
		var returnedPosition = position.changeFrame(false);
		console.log("CLICKED POSITION:", returnedPosition);
		return returnedPosition;
	},
};
