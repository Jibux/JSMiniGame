/**
 *	This class describe a Character. It can run, sing, eat, and whatever you want if you have created the method to do so!
 */
var Character = function(idCharacter, mapID) {
	
	// TODO THROW EXCEPTION HERE
	if(!idCharacter) {
		return null;
	}

	this.ID = idCharacter;
	
	this.mapID = mapID;
	
	this.position = new Point(200, 200);
	
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
	
	getMapID: function() {
		return this.mapID;
	},
	
	setMapID: function(mapID) {
		this.mapID = mapID;
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
	
	hasNoOverrideAction: function() {
		this.overrideAction = false;
	},

	stop: function() {
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
		this.position.x = $("#"+this.ID).css("left").substring(0,$("#"+this.ID).css("left").length - 2);
		this.position.y = $("#"+this.ID).css("top").substring(0, $("#"+this.ID).css("top").length - 2);
	},

	getPersoPosition2D: function() {
		return new Point(Math.floor(this.position.x/UNIT), Math.floor(this.position.y/UNIT));
	},

	getPersoPosition: function() {
		return this.position;
	},

	direction: function(direction) {
		var perso = $("#"+this.ID).find(".perso");
		
		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				perso.removeClass("left");
				perso.removeClass("up");
				perso.addClass("right");
				perso.addClass("down");
				break;
			case DIRECTION_ENUM.LEFT:
				perso.removeClass("right");
				perso.removeClass("down");
				perso.addClass("left");
				perso.addClass("up");
				break;
			case DIRECTION_ENUM.UP:
				perso.removeClass("down");
				perso.removeClass("left");
				perso.addClass("up");
				perso.addClass("right");
				break;
			case DIRECTION_ENUM.DOWN:
				perso.removeClass("up");
				perso.removeClass("right");
				perso.addClass("down");
				perso.addClass("left");
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				break;
			default: break;
		}
	},

	drawPerso: function() {
		$("#"+this.mapID).append('<div class="occupation" style="top:'+this.position.y+'px;left:'+this.position.x+'px;" id="'+this.ID+'"></div>');
		$("#"+this.ID).append('<div class="perso stand down right"><div class="name">Name</div><div class="lifebar"><div class="life" style="width:50%;background-position:0 50%;"></div></div></div>');
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
