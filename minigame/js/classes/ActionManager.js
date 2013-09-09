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
			console.debug("CHARACTER POSITION 2D: ", character.getOffsetedArrayPosition());
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
			console.debug("CHARACTER POSITION 2D: ", character.getOffsetedArrayPosition());
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
	
	initSubjectsInCurrentMap: function(previousOffsetUpdate) {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.initInCurrentMap) === 'function') {
				subject.initInCurrentMap(previousOffsetUpdate);
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
	
	reloadNeighboursSubjectOccupation: function() {
		for(var subjectID in Actions.subjectList) {
			var subject = Actions.subjectList[subjectID];
			if(typeof(subject.getOffsetedArrayPosition) === 'function') {
				var position = subject.getOffsetedArrayPosition();
				Actions.mainMap.setSubjectOccupation(position);
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
