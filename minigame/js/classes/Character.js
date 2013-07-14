/**
 *	This class describe a Character. It can run, sing, eat, and whatever you want if you have created the method to do so!
 */
var Character = function(idCharacter) {
	
	// TODO THROW EXCEPTION HERE
	if(!idCharacter) {
		return null;
	}

	this.ID = idCharacter;
	
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
	this.overrideAction = false;
	
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

	isMoving: function() {
		return this.moving;
	},
	
	setOverrideAction: function() {
		this.overrideAction = true;
	},
	
	hasAnOverrideAction: function(){
		return this.overrideAction;
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

	getPersoPosition2D: function() {
		var left = $("#"+this.ID).css("left").substring(0,$("#"+this.ID).css("left").length - 2);
		var top = $("#"+this.ID).css("top").substring(0, $("#"+this.ID).css("top").length - 2);
		
		var result = new Point(Math.floor(left/UNIT), Math.floor(top/UNIT));
		
		return result;
	},

	getPersoPosition: function() {
		var x = $("#"+this.ID).css("left").substring(0,$("#"+this.ID).css("left").length - 2);
		var y = $("#"+this.ID).css("top").substring(0, $("#"+this.ID).css("top").length - 2);
		
		var result = new Point(x, y);
		
		return result;
	},

	direction: function(dir) {
		var perso = $("#"+this.ID).find(".perso");
		if(dir == DIRECTION_ENUM.LEFT) {
			perso.removeClass("right");
			perso.removeClass("down");
			perso.addClass("left");
			perso.addClass("up");
			console.log("LEFT")
		}
		if(dir == DIRECTION_ENUM.RIGHT) {
			perso.removeClass("left");
			perso.removeClass("up");
			perso.addClass("right");
			perso.addClass("down");
			console.log("RIGHT")
		}
		if(dir == DIRECTION_ENUM.DOWN) {
			perso.removeClass("up");
			perso.removeClass("right");
			perso.addClass("down");
			perso.addClass("left");
			console.log("DOWN")
		}
		if(dir == DIRECTION_ENUM.UP) {
			perso.removeClass("down");
			perso.removeClass("left");
			perso.addClass("up");
			perso.addClass("right");
			console.log("UP")
		}
	},

	drawPerso: function(mapID) {
		$("#"+mapID).append('<div class="occupation" style="top:20px;left:0px;" id="'+this.ID+'"></div>');
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
			setTimeout(function() {
				$("#"+this.ID+" .perso .buble").fadeOut('slow');
				this.speaking=false;
			}, 2000);
		}
	},
};
