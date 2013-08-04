/**
 *	This class describes a Character. It can run, sing, eat, and whatever you want if you have created the method to do so!
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
	this.offset = new Point(0, 0);
	
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
	
	//race:RACE.HUMAN,
};

Character.prototype = {
	getCurrentLife: function() {
		return this.currentLife;
	},

	setCurrentLife: function(life) {
		this.currentLife = life;
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
	
	setCurrentMap: function(map, left, top) {
		var oldMap = this.currentMap;
		this.currentMap = map;
		map.updateNeighbours(oldMap.getNeighbours());
		map.drawNeighbours();
		oldMap.eraseNeighbours();
		
		ActionManager.handleClicks();
		
		$("#"+this.ID).appendTo("#"+this.currentMap.getID());
		
		$("#"+this.ID).css("left", left);
		$("#"+this.ID).css("top", top);
		
		//console.log("Position 1 ",this.getPersoPosition());
		this.updatePosition();
		//console.log("Position 2 ",this.getPersoPosition());
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

	stopSubject: function() {
		$("#"+this.ID).find(".perso").addClass("stand");
		$("#"+this.ID).find(".perso").removeClass("walk");
		this.moving = false;
	},

	move: function() {
		$("#"+this.ID).find(".perso").removeClass("stand");
		$("#"+this.ID).find(".perso").addClass("walk");
		this.moving = true;
	},
	
	updatePosition: function() {
		if(!$("#"+this.ID).length) {
			console.log("Cannot find character "+this.ID);
			return null;
		}
		this.position.x = $("#"+this.ID).css("left").substring(0,$("#"+this.ID).css("left").length - 2)*1;
		this.position.y = $("#"+this.ID).css("top").substring(0, $("#"+this.ID).css("top").length - 2)*1;
	},

	getPersoPosition2D: function() {
		return new Point(Math.floor(this.position.x/UNIT), Math.floor(this.position.y/UNIT));
	},

	getPersoPosition: function() {
		return this.position;
	},
	
	getOffsetedPosition: function() {
		return new Point(this.position.x*1+this.offset.x*UNIT, this.position.y*1+this.offset.y*UNIT);
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

	setDirection: function(direction) {
		var left = this.position.x;
		var top = this.position.y;
		
		var perso;
		if(this.direction != direction) {
			perso = $("#"+this.ID).find(".perso");
			//console.log("CHANGE DIR");
		}
		
		var unitMoveX = null;
		var unitMoveY = null;
		
		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				unitMoveX = UNIT_ENUM.UNIT_MOVE;
				
				if(this.direction != direction) {
					console
					perso.removeClass("left");
					perso.removeClass("up");
					perso.addClass("right");
					perso.addClass("down");
				}
				break;
			case DIRECTION_ENUM.LEFT:
				unitMoveX = -UNIT_ENUM.UNIT_MOVE;
				
				if(this.direction != direction) {
					perso.removeClass("right");
					perso.removeClass("down");
					perso.addClass("left");
					perso.addClass("up");
				}
				break;
			case DIRECTION_ENUM.UP:
				unitMoveY = -UNIT_ENUM.UNIT_MOVE;
				
				if(this.direction != direction) {
					perso.removeClass("down");
					perso.removeClass("left");
					perso.addClass("up");
					perso.addClass("right");
				}
				break;
			case DIRECTION_ENUM.DOWN:
				unitMoveY = UNIT_ENUM.UNIT_MOVE;
				
				if(this.direction != direction) {
					perso.removeClass("up");
					perso.removeClass("right");
					perso.addClass("down");
					perso.addClass("left");
				}
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				unitMoveX = UNIT_ENUM.UNIT_MOVE2;
				unitMoveY = -UNIT_ENUM.UNIT_MOVE2;
				
				if(this.direction != direction) {
					// WAITING FOR NEW PERSO DRAWING
				}
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
		
		this.direction = direction;
		
		if(unitMoveY != null) {
			$("#"+this.ID).css("top",(top*1 + unitMoveY*1) + "px");
			this.position.y+= unitMoveY*1;
		}
		if(unitMoveX != null) {
			$("#"+this.ID).css("left",(left*1 + unitMoveX*1) + "px");
			this.position.x+= unitMoveX*1;
		}
		
		if(this.mainCharacter) {
			this.currentMap.setDirectionNeighbours(direction);
		}
	},

	changeMap: function(direction) {
		var left = Math.abs(this.currentMap.getSize().width*UNIT - Math.abs(this.position.x*1));
		var top = Math.abs(this.currentMap.getSize().height*UNIT - Math.abs(this.position.y*1));
		var x = this.currentMap.getPosition().x;
		var y = this.currentMap.getPosition().y;
		var z = this.currentMap.getPosition().z;
		var offsetX = this.getXOffset();
		var offsetY = this.getYOffset();

		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				top = this.position.y;
				x++;
				offsetX+= this.currentMap.getSize().width;
				break;
			case DIRECTION_ENUM.LEFT:
				top = this.position.y;
				x--;
				offsetX-= this.currentMap.getSize().width;
				break;
			case DIRECTION_ENUM.UP:
				left = this.position.x;
				y--;
				offsetY-= this.currentMap.getSize().height;
				break;
			case DIRECTION_ENUM.DOWN:
				left = this.position.x;
				y++;
				offsetY+= this.currentMap.getSize().height;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				x++;
				y--;
				offsetX+= this.currentMap.getSize().width;
				offsetY-= this.currentMap.getSize().height;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				x--;
				y--;
				offsetX-= this.currentMap.getSize().width;
				offsetY-= this.currentMap.getSize().height;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				x++;
				y++;
				offsetX+= this.currentMap.getSize().width;
				offsetY+= this.currentMap.getSize().height;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				x--;
				y++;
				offsetX-= this.currentMap().getSize().width;
				offsetY+= this.currentMap().getSize().height;
				break;
			default: break;
		}

		var mapID = "map_"+x+"_"+y+"_"+z;

		this.setCurrentMap(this.currentMap.getNeighbour(mapID), left, top);
		this.setXOffset(offsetX);
		this.setYOffset(offsetY);
	},

	draw: function() {
		$("#"+this.currentMap.getID()).append('<div class="occupation" style="top:'+this.position.y+'px;left:'+this.position.x+'px;" id="'+this.ID+'"></div>');
		$("#"+this.ID).append('<div class="perso stand down right"><div class="name">Name</div><div class="lifebar"><div class="life" style="width:50%;background-position:0 50%;"></div></div></div>');
	},
	
	erase: function() {
		$("#"+this.ID).remove();
	},

	userSpeak: function() {
		if(!this.speaking) {
			$("#"+this.ID+" .perso").append("<div class='buble'><input type='text' id='userSpeak'/></div>");
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
			$("#"+this.ID+" .perso .buble").html(speak);
			var characterID = this.ID;
			setTimeout(function() {
				$("#"+characterID+" .perso .buble").fadeOut('slow');
				this.speaking = false;
			}, 2000);
		}
	},
};
