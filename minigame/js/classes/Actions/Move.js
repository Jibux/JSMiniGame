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
	this.hasReloadedDestination = false;
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
*	Search path from a given position. "withSubjects" parameter stands for taking account of subjects or not.
*/
Move.prototype.searchPath = function(position, withSubjects) {
	var offsetX = 0;
	var offsetY = 0;
		
	var map = (withSubjects == true ? ActionManager.getMainMap().getNeighboursSubjectOccupation() : ActionManager.getMainMap().getNeighboursOccupation());
	
	offsetX = this.subject.getXOffset();
	offsetY = this.subject.getYOffset();
	
	offsetMapX = this.currentMap.getXOffset();
	offsetMapY = this.currentMap.getYOffset();
	
	var graph = new Graph(map);
	
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
		return null;
	}
	
	return result;
}

/*
*	Initiate move.
*/
Move.prototype.moveTo = function() {
	var subjectID = this.subject.getID();
	//this.subject.updatePosition();
	this.subject.updateOffset();
	this.subject.updateOffsetedArrayPosition();
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
	
	var path = this.searchPath(position);
	if(path === null) {
		return MOVE_FINISHED;
	} else {
		this.path = path;
	}
	
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

	this.hasReloadedDestination = true;
	this.subject.move();
	moveResult = action.moveByStep(destination);
	var intId = setInterval(function() {

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
				if(!outOf && ActionManager.getMainMap().isPositionAvailable(position) && !ActionManager.getMainMap().isPositionOccupied(position)) {
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
			action.hasReloadedDestination = true;
			/*console.log(subjectID+" DEST Y:", action.path[action.indexInPath].y);
			console.log(subjectID+" Move.pathOffset.y:", action.pathOffset.y);
			console.log(subjectID+" NEW DESTINATION:", destination);*/
		}

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
			
			console.debug("SUBJECT OCCUPATION", Map.neighboursSubjectOccupation);
			return MOVE_FINISHED;
		}
		
		moveResult = action.moveByStep(destination);
		
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

	var moveSubject = true;

	if(this.hasReloadedDestination) {
		this.hasReloadedDestination = false;
		var destinationToArray = destination.scaleToArray();
		if(!this.currentMap.isPositionOccupied(destinationToArray)) {
			// Reserve next position.
			ActionManager.getMainMap().setSubjectOccupation(destinationToArray);
		} else {
			// Enemy !
			console.log("Enemy at ",destinationToArray);
			
			var position = this.subject.getArrayPosition();
			
			var path = this.searchPath(position, true);
			if(path === null) {
				return MOVE_FINISHED;
			} else {
				this.path = path;
			}
			
			this.indexInPath = 0;
			this.reloadDestination = true;
			moveSubject = false;
			//console.debug(this.path);
		}
	}

	if(moveSubject) {
		// No enemy
		var moveResult = this.moveCss(destination);
		
		return moveResult;
	}
}

/*
*	Really move subject.
*/
Move.prototype.moveCss = function(destination) {
	var moveResult = MOVE_ON;
	var realPosition = this.subject.getOffsetedPosition();
	var realArrayPosition = this.subject.getOffsetedArrayPosition();
	
	// Where do we have to go?
	var direction = this.getDirection(realPosition, destination);
	
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
		if(mapDirection == DIRECTION_ENUM.NOCHANGE) {
			this.subject.updateOffsetedArrayPosition();
		}
		var position1 = this.subject.getPreviousOffsetedArrayPosition();
		var position2 = this.subject.getOffsetedArrayPosition();
		//console.debug("OLD ",position1, "NEW ",position2);
		
		ActionManager.getMainMap().setSubjectOccupation(position2, position1);
		moveResult = MOVE_WAIT;
	}
	
	$(realPosition).remove();
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
