/**
 *	Action: Defines an action.
 *		type: Type of action (move, jump, cook, reboot, eat, sleep...)
 *		currentMap: Map where is located the target
 *		subject: Subject can be human, monster etc.
 *		target: Target point of the action.
 *		state: State of the action. It can be "to start", "started", "to finish", "finished", etc.
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
	this.overridePath = null;
	this.indexInPath = 0;
	this.overrideDirection = DIRECTION_ENUM.NOCHANGE;
	this.reloadDestination = false;
	/*
	*	If we change map, the neighboursOccupation' will be updated, and so all the characters' offset.
	*	So, to keep using the path calculated for the initial map, we have to set this offset to access to the correct points in the path.
	*/
	this.pathOffset = new Point(0, 0);
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

Move.prototype.setOverrideDirection = function(direction) {
	this.overrideDirection = direction;
}

Move.prototype.setReloadDestination = function(reload) {
	this.reloadDestination = reload;
}

Move.prototype.updatePathOffset = function(offset) {
	this.pathOffset.x+= offset.x;
	this.pathOffset.y+= offset.y;
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
	//this.subject.updatePosition();
	this.subject.updateOffset();
	var position = this.subject.getArrayPosition();

	// Bad target.
	if(position.equals(this.target) || this.currentMap.getOccupation()[this.target.x][this.target.y] == STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
		this.getSubject().stop();
		this.getSubject().setCurrentAction(null);
		return MOVE_FINISHED;
	}
	
	this.initStart();
	
	/*if(this.subject.isMainCharacter()) {
		this.pathOffset.x = 0;
		this.pathOffset.y = 0;
	}*/
	
	var offsetX = 0;
	var offsetY = 0;
		
	var map = ActionManager.getMainMap().getNeighboursOccupation();
	
	offsetX = this.subject.getXOffset();
	offsetY = this.subject.getYOffset();
	
	offsetMapX = this.currentMap.getXOffset();
	offsetMapY = this.currentMap.getYOffset();
	
	var graph = new Graph(map);
	
	//this.subject.updateOffset();
	
	// Start at the offset position of the subject.
	var start = graph.nodes[position.x+offsetX][position.y+offsetY];
	// End at the offset position of the click.
	var end = graph.nodes[this.target.x+offsetMapX][this.target.y+offsetMapY];
	
	// Find path.
	var result = astar.search(graph.nodes, start, end, true);
	
	if(typeof(result) === "undefined" || result.length == 0) {
		this.getSubject().stop();
		this.stopAction();
		this.subject.setCurrentAction(null);
		console.log("CANNOT FIND PATH");
		return MOVE_FINISHED;
	}
	
	this.path = result;
	
	/*console.log(subjectID+" start:", start);
	console.log(subjectID+" end:", end);
	console.log(subjectID+" path:", this.path);*/
	
	return this.move();
}

/*
*	Move.
*/
Move.prototype.move = function() {
	var timeout = 0;
	var moveResult = MOVE_ON;
	var subjectID = this.subject.getID();
	//var destination = new Point(this.path[this.indexInPath].x*UNIT, this.path[this.indexInPath].y*UNIT);
	var destination = new Point((this.path[this.indexInPath].x + this.pathOffset.x)*UNIT, (this.path[this.indexInPath].y + this.pathOffset.y)*UNIT);
	var action = this;
	
	this.subject.move();
	moveResult = action.moveByStep(destination);
	var intId = setInterval(function() {
		var position = action.getSubject().getPosition();
		if(action.indexInPath == action.path.length || moveResult == MOVE_FINISHED || action.state == ACTION_STATE_ENUM.TOSTOP) {
			if(action.indexInPath == action.path.length) {
				action.indexInPath--;
			}
			
			clearInterval(intId);
			action.stopAction();
			action.getSubject().stop();
			action.getSubject().setCurrentAction(null);
			//var position = action.getSubject().getArrayPosition();
			//console.log("Actual ("+position.x +", "+position.y+")");
			
			//console.log("Target ("+action.path[action.indexInPath].x+", "+action.path[action.indexInPath].y+")");
			return MOVE_FINISHED;
		}
		moveResult = action.moveByStep(destination);
		
		if(moveResult == MOVE_WAIT) {
			//console.log("ARRIVED ("+position.x / UNIT +", "+position.y / UNIT+") => ("+nodes[action.indexInPath].x+", "+nodes[action.indexInPath].y+")");
			// We have reached a step in the node list. Increment "action.indexInPath".
			action.indexInPath++;
			
			if(action.overrideDirection != DIRECTION_ENUM.NOCHANGE) {
				/*action.path = action.overridePath;
				action.indexInPath = 0;
				action.overridePath = null;*/
				
				action.pathOffset.x = 0;
				action.pathOffset.y = 0;
				
				var position = action.subject.getPositionFromDirection(action.overrideDirection, true);
				//console.log("CURRENT POS:", action.subject.getOffsetedArrayPosition());
				//console.log("GO POSITION:", position);
				// Here update offset
				var outOf = action.subject.getCurrentMap().isPointOutOfRange(position, true);
				
				// Get next position.
				if(!outOf && ActionManager.getMainMap().getNeighboursOccupationFromPoint(position) != STATIC_OCCUPATION_ENUM.UNAVAILABLE) {
					action.modifyPath(position);
					action.overrideDirection = DIRECTION_ENUM.NOCHANGE;
					console.log(action.path);
				} else {
					moveResult = MOVE_FINISHED;
					console.log("POSITION OUT OF RANGE: "+outOf, action.subject.getCurrentMap());
				}
			}
			
			action.reloadDestination = true;
			
			// We have been told to stop moves.
			if(action.state == ACTION_STATE_ENUM.TOFINISH) {
				console.log("HAVE TO FINISH");
				moveResult = MOVE_FINISHED;
			}
		}
		
		if(action.reloadDestination && action.indexInPath != action.path.length) {
			
			destination = new Point((action.path[action.indexInPath].x + action.pathOffset.x)*UNIT, (action.path[action.indexInPath].y + action.pathOffset.y)*UNIT);
			
			action.reloadDestination = false;
			
			/*console.log(subjectID+" DEST Y:", action.path[action.indexInPath].y);
			console.log(subjectID+" Move.pathOffset.y:", action.pathOffset.y);
			console.log(subjectID+" NEW DESTINATION:", destination);*/
		}
		
	}, FOOT_STEP_DURATION);
}

/*
*	Move by step: see if the next step is not occupied. And do some stuff with it.
*/
Move.prototype.moveByStep = function(destination) {	
	if(typeof(this.path[this.indexInPath]) === 'undefined' || this.path.length == 0) {
		if(typeof(this.path[this.indexInPath]) === 'undefined') {
			console.log("path["+this.indexInPath+"] undefined");
		}
		return MOVE_FINISHED;
	}
	//if(mapArray[this.path[this.indexInPath].x][this.path[this.indexInPath].y] != STATIC_OCCUPATION_ENUM.CHARACTER) {
	if(true) {
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
	
	//console.debug("DIRECTION "+direction);
	
	// Move subject.
	this.subject.setDirection(direction);
	
	// Check if we have to change map.
	var mapDirection = this.subject.getCurrentMap().getMapDirection(this.subject.getPosition());
	
	// We have to change map.
	if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
		console.debug(this.subject.getID()+": CHANGE MAP: "+mapDirection);
		var offset = this.subject.changeMap(mapDirection);
		if(this.subject.isMainCharacter()) {
			this.pathOffset.x+= offset.x;
			this.pathOffset.y+= offset.y;
			destination.x+= offset.x*UNIT;
			destination.y+= offset.y*UNIT;
			ActionManager.updatedMovingSubjectsPathOffset(offset);
			ActionManager.reloadMovingSubjectsDestination();
		}
		$(offset).remove();
	}
	
	var realPosition2 = this.subject.getOffsetedPosition();

	// We have reached the end of the step.
	if(realPosition2.equals(destination)) {
		moveResult = MOVE_WAIT;
	}
	
	$(realPosition2).remove();
	
	return moveResult;
}

Move.prototype.modifyPath = function(position) {
	var path = new Array();
	path[0] = position;
	this.path = path;
	this.indexInPath = 0;
}

/*
*	Compare the 2 positions given in parameter and return the direction to take.
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
	mainCharacter:null,	// Main character of the game.
	mainMap:null,	// Main map of the game.
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
	
	/*
	*	Set the main map of the game.
	*/
	setMainMap: function(map) {
		Actions.mainMap = map;
	},
	
	getMainMap: function() {
		return Actions.mainMap;
	},
	
	addSubject: function(subject) {
		var subjectID = subject.getID();
		Actions.subjectList[subjectID] = subject;
		if(subject.isMainCharacter()) {
			console.debug('MAIN CHARACTER '+subjectID);
			Actions.mainCharacter = subject;
			Actions.mainMap = subject.getCurrentMap();
		}
	},
	
	/*
	*	Add an action for the given subject.
	*/
	addAction: function(type, mapID, subject, target) {
		var map = ActionManager.getMainMap().getNeighbour(mapID);
		if(map === null) {
			console.log("MAP "+mapID+" UNDEFINED");
			return null;
		}
		
		if(!subject.isActive()) {
			console.warn("SUBJECT "+subject.getID()+" IS NOT ACTIVE FOR THE MAP "+mapID);
			return null;
		}
		
		if(target.x < 0 || target.y < 0) {
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
		
		console.debug("NEW ACTION ",action);
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
	/**
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
					console.log("NEW NEXT ACTION length ",Actions.actionList);
					Actions.actionList.unset(nextAction);
				}
				subject.setNextAction(action);
				
				//if(action.isBlocking() && currentAction && currentAction.getState() != ACTION_STATE_ENUM.FINISHED && currentAction.getState() != ACTION_STATE_ENUM.TOSTOP) {
				//if(action.isBlocking() && currentAction && currentAction.getState() != ACTION_STATE_ENUM.TOSTART && currentAction.getState() != ACTION_STATE_ENUM.FINISHED) {
				if(action.isBlocking() && currentAction) {
					console.log("CURRENT ACTION NOT FINISHED: subject ",currentAction.getState()," action ",action.getState());
					if(currentAction.getState() == ACTION_STATE_ENUM.TOSTART) {
						currentAction.setState(ACTION_STATE_ENUM.TOSTOP);
					}
					if(currentAction.getState() != ACTION_STATE_ENUM.FINISHED && currentAction.getState() != ACTION_STATE_ENUM.TOFINISH && currentAction.getState() != ACTION_STATE_ENUM.TOSTOP) {
						currentAction.setState(ACTION_STATE_ENUM.TOFINISH);
					}
					
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
	},**/
	
	/*
	*	Handle interactions with user (CLICKS).
	*/
	handleClicks: function() {
		var characterTest = Actions.subjectList["TEST"];
		var character = Actions.mainCharacter;
		
		if(character === null) {
			console.error("Main character not defined!");
			return null;
		}
		$(".tile").click(function(e) {
			var ID = $(this).parent().attr('id');
			var position = ActionManager.getMouseMapPosition(ID, e);
			console.debug("CHARACTER POSITION: ", character.getPosition());
			console.debug("CHARACTER POSITION 2D: ", character.getArrayPosition());
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, characterTest, position);
		});
		$(".perso").click(function(e) {
			var ID = $(this).parent().parent().attr('id');
			var subjectID = $(this).parent().attr('id');
			var subject = Actions.subjectList[subjectID];
			var position = ActionManager.getMouseMapPosition(ID, e);
			var mapDirection = subject.getCurrentMap().getMapDirection(position.scaleToCss());
			// TODO (IF WE CAN) BETTER CODE DIRECTION MAP ETC.
			// We have clicked under an other map than the character's current one.
			if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
				ID = subject.getCurrentMap().getMapIDFromDirection(mapDirection);
				position.convertFromSize(ActionManager.getMainMap().getNeighbour(ID).getSize());
				console.debug("CLICKED POSITION2:", position);
			}
			
			console.debug("CHARACTER POSITION: ", character.getPosition());
			console.debug("CHARACTER POSITION 2D: ", character.getArrayPosition());
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, character, position);
			ActionManager.addAction(ACTION_ENUM.MOVE, ID, characterTest, position);
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
		
		//console.log("MOVE TO "+direction);
		
		if(currentAction != null && currentAction.getType() == ACTION_ENUM.MOVE && currentAction.getState() == ACTION_STATE_ENUM.STARTED) {
			//console.log("MODIFY PATH");
			currentAction.setOverrideDirection(direction);
		} else {
			//console.log("FIRST PUSH");
			var position = character.getPositionFromDirection(direction, false);
			// Check if the position is out of the map
			if(character.getCurrentMap().isPointOutOfRange(position)) {
				console.log("OUT OF RANGE");
				return null;
			}
			var ID = character.getCurrentMap().getID();
			var mapDirection = character.getCurrentMap().getMapDirection(position.scaleToCss());
			// We have to move to an other map than the character's current one.
			if(mapDirection != DIRECTION_ENUM.NOCHANGE) {
				ID = character.getCurrentMap().getMapIDFromDirection(mapDirection);
				position.convertFromSize(ActionManager.getMainMap().getNeighbour(ID).getSize());
			}
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
		var mapIDTop = "map_"+(map.getPosition().x)*1+"_"+(map.getPosition().y-1)*1+"_"+map.getPosition().z;
		var mapIDRight = "map_"+(map.getPosition().x+1)*1+"_"+(map.getPosition().y)*1+"_"+map.getPosition().z;
		var mapIDLeft = "map_"+(map.getPosition().x-1)*1+"_"+(map.getPosition().y)*1+"_"+map.getPosition().z;
		
		// Nothing more at extreme right.
		if(!mapContent[mapIDRight]) {
			map.setEdgeType(EDGE_TYPE_ENUM.RIGHT, true);
		}
		
		// Nothing more at extreme left.
		if(!mapContent[mapIDLeft]) {
			map.setEdgeType(EDGE_TYPE_ENUM.LEFT, true);
		}
		
		// Nothing more at extreme bottom.
		if(!mapContent[mapIDBottom]) {
			map.setEdgeType(EDGE_TYPE_ENUM.BOTTOM, true);
		}
		
		// Nothing more at extreme Top.
		if(!mapContent[mapIDTop]) {
			map.setEdgeType(EDGE_TYPE_ENUM.TOP, true);
		}
		
		return map;
	},
	
	/*
	*	Draw all subjects in active maps.
	*/
	drawSubjects: function() {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.draw) === 'function') {
				subject.draw();
			}
		}
	},
	
	/*
	*	Draw all subjects in the map (mapID).
	*/
	drawSubjectsOfMap: function(mapID) {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.draw) === 'function') {
				if(subject.getCurrentMap().getID() == mapID) {
					subject.draw();
					subject.setActive(true);
				}
			}
		}
	},
	
	/*
	*	Erase the subject in the map (mapID).
	*/
	eraseSubjectsOfMap: function(mapID) {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.erase) === 'function') {
				if(subject.getCurrentMap().getID() == mapID) {
					console.debug("ERASE SUBJECT "+subjectID+" FOR "+mapID);
					subject.erase();
				}
			}
		}
	},
	
	/*
	*	Update offset for all subjects in active maps.
	*/
	updateSubjectsOffset: function() {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.updateOffset) === 'function') {
				subject.updateOffset();
			}
		}
	},
	
	printSubjectsOffset: function() {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.getOffset) === 'function') {
				console.debug("OFFSET FOR "+subjectID, subject.getOffset());
			}
		}
	},
	
	
	/*
	*	Reload the destination of the moving subjects.
	*/
	reloadMovingSubjectsDestination: function() {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.getCurrentAction) === 'function' && !subject.isMainCharacter()) {
				var action = subject.getCurrentAction();
				if(action != null && action.getType() == ACTION_ENUM.MOVE && action.getState() == ACTION_STATE_ENUM.STARTED) {
					action.setReloadDestination(true);
				}
			}
		}
	},
	
	/*
	*	Update the path offset for all the moving subjects.
	*/
	updatedMovingSubjectsPathOffset: function(offset) {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.getCurrentAction) === 'function' && !subject.isMainCharacter()) {
				var action = subject.getCurrentAction();
				if(action != null && action.getType() == ACTION_ENUM.MOVE && action.getState() == ACTION_STATE_ENUM.STARTED) {
					action.updatePathOffset(offset);
				}
			}
		}
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
		console.debug("CLICKED POSITION:", returnedPosition);
		return returnedPosition;
	},
};
