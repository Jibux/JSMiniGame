/**
 *	This class describes a Character. It can run, sing, eat, and whatever you want if you have created the method to do so!
 */

/**
 *	mainCharacter: Are we the main character?
 *	direction: Current direction of the character
 *	position: Position of the character (css view)
 *	offset: See Map's offset. In order to locate the character in the whole neighbours occupation's 2D array. 
 *	currentAction: What are we doing now?
 *	nextAction: What is the next action to do?
 */

var Character = function(idCharacter, map, mainCharacter) {
	
	// TODO THROW EXCEPTION HERE
	if(!idCharacter) {
		return null;
	}

	this.ID = idCharacter;
	
	this.mainCharacter = mainCharacter || false;
	
	this.direction = null;
	this.currentMap = map;
	
	this.position = new Point(0, 0);
	this.offsetedArrayPosition = new Point(0, 0);
	this.previousOffsetedArrayPosition = null;
	this.offset = new Point(0, 0);
	
	this.active = true;
	
	this.name = "Name";
	
	this.currentLife = 100;// %
	this.maxLife = 100;
    
	this.currentStrenght = 100;// %
	this.maxStrength = 100;
	
	this.currentSpeed = 100;//%
	this.maxSpeed = 100;
	
	this.currentInteligence = 100;//%
	this.maxInteligence = 100;
	
	this.currentMagic = 100;//%
	this.maxMagic = 100;
	
	this.level = 0;
	
	this.speaking = false;
	this.moving = false;
	this.currentAction = null;
	this.nextAction = null;
	
	//race:RACE.HUMAN
};

Character.prototype = {
	
	getCurrentLife: function() {
		return this.currentLife;
	},

	setCurrentLife: function(life) {
		this.currentLife = life;
	},
	
	isActive: function() {
		return this.active;
	},

	setActive: function(active) {
		this.active = active;
	},

	getID: function() {
		return this.ID;
	},

	setID: function(idCharacter) {
		this.ID = idCharacter;
	},
	
	getCurrentMap: function() {
		return this.currentMap;
	},
	
	/*
	*	Initialize datas for the current map.
	*/
	initInCurrentMap: function(previousOffsetUpdate) {
		this.updateOffset();
		this.updateOffsetedArrayPosition(previousOffsetUpdate);
	},
	
	/*
	*	Set the current map and update character position with given (left, top) parameters.
	*/
	setCurrentMap: function(map, left, top, offset) {
		var oldMap = this.currentMap;
		this.currentMap = map;
		
		// We are the main character, so we have to reload map.
		if(this.mainCharacter) {
			// Update neighbours for the new map.
			map.updateNeighbours(oldMap.getNeighbours());
			// Draw them.
			map.drawNeighbours();
			// Erase the remaining, no more used.
			oldMap.eraseNeighbours();
			
			ActionManager.updateSubjectsOffset();
			
			ActionManager.setMainMap(map);
			//ActionManager.printSubjectsOffset();
		} else {
			// A normal subject's current map keeps the same neighbours as the old one.
			this.updateOffset();
		}
		
		// Move the character to the new map.
		$("#"+this.ID).appendTo("#"+this.currentMap.getID());
		// Set its new position.
		$("#"+this.ID).css("left", left);
		$("#"+this.ID).css("top", top);
		
		//console.log("Position 1 ",this.getPosition());
		// Update position.
		this.updatePosition();
		//console.log("Position 2 ",this.getPosition());
	},

	isMoving: function() {
		return this.moving;
	},
	
	setCurrentAction: function(action) {
		this.currentAction = action;
	},
	
	getCurrentAction: function(){
		return this.currentAction;
	},
	
	setNextAction: function(action) {
		this.nextAction = action;
	},
	
	getNextAction: function(){
		return this.nextAction;
	},
	
	isMainCharacter: function() {
		return this.mainCharacter;
	},

	stop: function() {
		this.rectifyPosition();
		$("#"+this.ID).find(".character").addClass("stand");
		$("#"+this.ID).find(".character").removeClass("walk");
		this.moving = false;
	},

	move: function() {
		$("#"+this.ID).find(".character").removeClass("stand");
		$("#"+this.ID).find(".character").addClass("walk");
		this.moving = true;
	},
	
	rectifyPosition: function() {
		//console.debug(this.ID+": BEFORE RECTIFIED POS: "+this.position.x+" "+this.position.y);
		this.position.x = Math.floor(this.position.x/UNIT) * UNIT;
		this.position.y = Math.floor(this.position.y/UNIT) * UNIT;
		//console.debug(this.ID+": RECTIFIED POS: "+this.position.x+" "+this.position.y);
	},
	
	/*
	*	Update character css' position from its real values in the html page.
	*/
	updatePosition: function() {
		if(!$("#"+this.ID).length) {
			console.log("Cannot find character "+this.ID);
			return null;
		}
		this.position.x = $("#"+this.ID).css("left").substring(0,$("#"+this.ID).css("left").length - 2)*1;
		this.position.y = $("#"+this.ID).css("top").substring(0, $("#"+this.ID).css("top").length - 2)*1;
	},
	
	/*
	*	updateOffsetedArrayPosition set the new 2D Array position.
	*	previousOffsetUpdate stands for changing map and correct old position values with it;
	*/
	updateOffsetedArrayPosition: function(previousOffsetUpdate) {
		var newXPos = Math.floor(this.position.x/UNIT) + this.offset.x;
		var newYPos = Math.floor(this.position.y/UNIT) + this.offset.y;
		if(this.previousOffsetedArrayPosition != null) {
			this.previousOffsetedArrayPosition.x = this.offsetedArrayPosition.x*1;
			this.previousOffsetedArrayPosition.y = this.offsetedArrayPosition.y*1;
			if(typeof(previousOffsetUpdate) !== 'undefined') {
				this.previousOffsetedArrayPosition.x+= previousOffsetUpdate.x*1;
				this.previousOffsetedArrayPosition.y+= previousOffsetUpdate.y*1;
			}
		} else {
			this.previousOffsetedArrayPosition = new Point(newXPos, newYPos);
		}
		this.offsetedArrayPosition.x = newXPos;
		this.offsetedArrayPosition.y = newYPos;
		//console.debug("POSITIONS : ",this.previousOffsetedArrayPosition,this.offsetedArrayPosition);
	},

	/*
	*	Get position in the array.
	*/
	getArrayPosition: function() {
		return new Point(Math.floor(this.position.x/UNIT), Math.floor(this.position.y/UNIT));
	},
	
	getOffsetedArrayPosition: function() {
		return this.offsetedArrayPosition;
	},
	
	getPreviousOffsetedArrayPosition: function() {
		return this.previousOffsetedArrayPosition;
	},

	/*
	*	Get css' position.
	*/
	getPosition: function() {
		return this.position;
	},
	
	setPosition: function(position) {
		this.position.x = position.x;
		this.position.y = position.y;
		this.position.z = position.z;
	},
	
	getOffsetedPosition: function() {
		return new Point(this.position.x*1 + this.offset.x*UNIT, this.position.y*1 + this.offset.y*UNIT);
	},
	
	/*
	*	Get next point to a given direction.
	*/
	getPositionFromDirection: function(direction, offseted) {
		var position;
		if(offseted) {
			position = this.getOffsetedArrayPosition();
		} else {
			position = this.getArrayPosition();
		}
		var x = position.x;
		var y = position.y;
		var z = position.z;
		
		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				x++;
				break;
			case DIRECTION_ENUM.LEFT:
				x--;
				break;
			case DIRECTION_ENUM.UP:
				y--;
				break;
			case DIRECTION_ENUM.DOWN:
				y++;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				x++;
				y++;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				x--;
				y--;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				x++;
				y--;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				x--;
				y++;
				break;
			default: break;
		}
		
		var position2 = new Point(x, y, z);
		
		return position2;
	},
	
	getOffset: function() {
		return this.offset;
	},
	
	getXOffset: function() {
		return this.offset.x*1;
	},
	
	getYOffset: function() {
		return this.offset.y*1;
	},
	
	setXOffset: function(x) {
		this.offset.x = x*1;
	},
	
	setYOffset: function(y) {
		this.offset.y = y*1;
	},
	
	/*
	*	Reload offset and set it same as currentMap.
	*/
	updateOffset: function() {
		this.offset.x = this.currentMap.getXOffset();
		this.offset.y = this.currentMap.getYOffset();
	},

	/*
	*	Move character to the given direction.
	*/
	setDirection: function(direction) {
		var left = this.position.x;
		var top = this.position.y;
		
		var character;
		// The direction has changed.
		if(this.direction != direction) {
			character = $("#"+this.ID).find(".character");
			//console.log("CHANGE DIR");
		}
		
		var unitMoveX = null;
		var unitMoveY = null;
		
		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				unitMoveX = UNIT_ENUM.UNIT_MOVE;
				
				break;
			case DIRECTION_ENUM.LEFT:
				unitMoveX = -UNIT_ENUM.UNIT_MOVE;
				
				break;
			case DIRECTION_ENUM.UP:
				unitMoveY = -UNIT_ENUM.UNIT_MOVE;
				
				break;
			case DIRECTION_ENUM.DOWN:
				unitMoveY = UNIT_ENUM.UNIT_MOVE;
				
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				unitMoveX = UNIT_ENUM.UNIT_MOVE2;
				unitMoveY = -UNIT_ENUM.UNIT_MOVE2;
				
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				unitMoveX = -UNIT_ENUM.UNIT_MOVE;
				unitMoveY = -UNIT_ENUM.UNIT_MOVE;
				
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				unitMoveX = UNIT_ENUM.UNIT_MOVE;
				unitMoveY = UNIT_ENUM.UNIT_MOVE;
				
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				unitMoveX = -UNIT_ENUM.UNIT_MOVE2;
				unitMoveY = UNIT_ENUM.UNIT_MOVE2;
			
				break;
			default: break;
		}
		
		if(this.direction != direction) {
			character.removeClass(this.direction);
			character.addClass(direction);
		}
		this.direction = direction;
		
		if(unitMoveY != null) {
			$("#"+this.ID).css("top",(top*1 + unitMoveY*1) + "px");
			this.position.y+= unitMoveY*1;
		}
		if(unitMoveX != null) {
			$("#"+this.ID).css("left",(left*1 + unitMoveX*1) + "px");
			this.position.x+= unitMoveX*1;
		}
		
		// If we are the main character, move the neighbours attached to our current map.
		if(this.mainCharacter) {
			ActionManager.getMainMap().setDirectionNeighbours(direction);
		}
	},

	/*
	*	Change current map to its neighbour of a given direction.
	*/
	changeMap: function(direction) {
		var left = Math.abs(this.currentMap.getSize().width*UNIT - Math.abs(this.position.x*1));
		var top = Math.abs(this.currentMap.getSize().height*UNIT - Math.abs(this.position.y*1));
		var x = this.currentMap.getPosition().x;
		var y = this.currentMap.getPosition().y;
		var z = this.currentMap.getPosition().z;
		var oldXOffset = this.offset.x;
		var oldYOffset = this.offset.y;
		var arrayXOffsetFactor = 0;
		var arrayYOffsetFactor = 0;
		var arrayXOffset = 0;
		var arrayYOffset = 0;

		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				top = this.position.y;
				x++;
				arrayXOffsetFactor = -1;
				break;
			case DIRECTION_ENUM.LEFT:
				top = this.position.y;
				x--;
				arrayXOffsetFactor = 1;
				break;
			case DIRECTION_ENUM.UP:
				left = this.position.x;
				y--;
				arrayYOffsetFactor = 1;
				break;
			case DIRECTION_ENUM.DOWN:
				left = this.position.x;
				y++;
				arrayYOffsetFactor = -1;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				x++;
				y--;
				arrayXOffsetFactor = -1;
				arrayYOffsetFactor = 1;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				x--;
				y--;
				arrayXOffsetFactor = 1;
				arrayYOffsetFactor = 1;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				x++;
				y++;
				arrayXOffsetFactor = -1;
				arrayYOffsetFactor = -1;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				x--;
				y++;
				arrayXOffsetFactor = 1;
				arrayYOffsetFactor = -1;
				break;
			default: break;
		}

		var mapID = "map_"+x+"_"+y+"_"+z;
		
		this.setCurrentMap(ActionManager.getMainMap().getNeighbour(mapID), left, top);
		
		if(this.offset.x >= this.currentMap.getSize().width && oldXOffset >= this.currentMap.getSize().width) {
			arrayXOffset = arrayXOffsetFactor*this.currentMap.getSize().width;
		}
		
		if(this.offset.y >= this.currentMap.getSize().height && oldYOffset >= this.currentMap.getSize().height) {
			arrayYOffset = arrayYOffsetFactor*this.currentMap.getSize().height;
		}
		
		var newOffset = new Point(arrayXOffset, arrayYOffset);
		
		if(this.mainCharacter) {
			// 2 * setOffset !!!
			ActionManager.initSubjectsInCurrentMap(newOffset);
			ActionManager.getMainMap().reloadNeighboursOccupation();
		} else {
			this.initInCurrentMap();
		}
		
		return newOffset;
	},

	/*
	*	Draw character.
	*/
	draw: function() {
		//$("#"+this.currentMap.getID()).append('<div class="occupation" style="top:'+this.position.y+'px;left:'+this.position.x+'px;" id="'+this.ID+'"></div>');
		//$("#"+this.ID).append('<div class="character stand down right"><div class="name">Name</div><div class="lifebar"><div class="life" style="width:50%;background-position:0 50%;"></div></div></div>');
		var parameters = [];
		parameters["ID"] = this.ID;
		parameters["name"] = this.name;
		parameters["top"] = this.position.y;
		parameters["left"] = this.position.x;
		parameters["life"] = this.currentLife;
		HTMLGenerator.append("#"+this.currentMap.getID(), character_ihm, parameters);
		this.setActive(true);
	},
	
	/*
	*	Get rid of myself.
	*/
	erase: function() {
		if(this.currentAction != null) {
			this.currentAction.setState(ACTION_STATE_ENUM.TOSTOP);
		}
		this.active = false;
		$("#"+this.ID).remove();
	},
	
	/*
	*	Bla bla bla...
	*/
	userSpeak: function() {
		if(!this.speaking) {
			$("#"+this.ID+" .character").append("<div class='buble'><input type='text' id='userSpeak'/></div>");
			$("#userSpeak").focus();
			this.speaking = true;
		} else {
			var speak = $("#userSpeak").val();
			speak = speak.replace(":)","<span class='smiley yellow'>:)</span>");
			speak = speak.replace(":(","<span class='smiley red'>:(</span>");
			speak = speak.replace(":-)","<span class='smiley yellow'>:-)</span>");
			speak = speak.replace(":-(","<span class='smiley red'>:-(</span>");
			speak = speak.replace(":O","<span class='smiley blue'>:O</span>");
			speak = speak.replace(":'(","<span class='smiley blue'>:'(</span>");
			speak = speak.replace(";)","<span class='smiley yellow'>;)</span>");
			$("#"+this.ID+" .character .buble").html(speak);
			var characterID = this.ID;
			setTimeout(function() {
				$("#"+characterID+" .character .buble").fadeOut('slow');
				this.speaking = false;
			}, 2000);
		}
	},
};
