/**
 * This class describe a Character. It can run, sing, eat, and whatever you want if you have created the method to do so !
 */


var Character = {
	ID:"user",
	
	currentLife:100,// %
	maxLife:100,

	currentStrenght:100,// %
	maxStrength:100,

	currentSpeed:100,//%
	maxSpeed:100,

	currentInteligence:100,//%
	maxInteligence:100,

	currentMagic:100,//%
	maxMagic:100,

	level:0,
	
	speaking:false,
	isMoving:false,
	
	//race:RACE.HUMAN,
};

var CharacterHelper = {
	newCharacter:function() {
		return newObject(Character);
	},
	
	getCurrentLife:function(character) {
		return character.currentLife;
	},
	
	setCurrentLife:function(character,life) {
		character.currentLife = life;
	},
	
	getID:function(character) {
		return character.ID;
	},
	
	setID:function(character, ID) {
		character.ID = ID;
	},
	
	isMoving:function(character) {
		return character.isMoving;
	},
	
	stop:function(character) {
		character.isMoving = false;
	},
	
	move:function(character) {
		character.isMoving = true;
	},
	
	getPersoPosition2D:function(character) {
		var left = $("#"+character.ID).css("left").substring(0,$("#"+character.ID).css("left").length - 2);
		var top = $("#"+character.ID).css("top").substring(0, $("#"+character.ID).css("top").length - 2);
		
		var result = Object();
		result.x = Math.floor(left/UNIT);
		result.y = Math.floor(top/UNIT);
		
		return result;
	},

	getPersoPosition:function(character) {
		var result = Object();
		
		result.x = $("#"+character.ID).css("left").substring(0,$("#"+character.ID).css("left").length - 2);
		result.y = $("#"+character.ID).css("top").substring(0, $("#"+character.ID).css("top").length - 2);
		
		return result;
	},
	
	direction:function(character, dir) {
		var perso = $("#"+character.ID).find(".perso");
		if(dir==DIRECTIONS.LEFT) {
			perso.removeClass("right");
			perso.removeClass("down");
			perso.addClass("left");
			perso.addClass("up");
		//	console.log("LEFT")
		}
		if(dir==DIRECTIONS.RIGHT) {
			perso.removeClass("left");
			perso.removeClass("up");
			perso.addClass("right");
			perso.addClass("down");
		//	console.log("RIGHT")
		}
		if(dir==DIRECTIONS.DOWN) {
			perso.removeClass("up");
			perso.removeClass("right");
			perso.addClass("down");
			perso.addClass("left");
		//	console.log("DOWN")
		}
		if(dir==DIRECTIONS.UP) {
			perso.removeClass("down");
			perso.removeClass("left");
			perso.addClass("up");
			perso.addClass("right");
		//	console.log("UP")
		}
	},
	
	drawPersofunction:(character, mapID) {
		$("#"+mapID).append('<div class="occupation" style="top:220px;left:220px;" id="'+character.ID+'"></div>');
		$("#"+character.ID).append('<div class="perso stand up left"><div class="name">Name</div><div class="lifebar"><div class="life" style="width:50%;background-position:0 50%;"></div></div></div>');
	}
	
	userSpeak:function(character) {
		if(!character.speaking) {
			$("#"+character.ID+" .perso").append("<div class='buble'><input type='text' id='userSpeak'/></div>");
			$("#userSpeak").focus();
			character.speaking = true;
		} else {
			var speak = $("#userSpeak").val();
			speak = speak.replace(":)","<span class='smiley yellow'>:)</span>");
			speak = speak.replace(":(","<span class='smiley red'>:(</span>");
			speak = speak.replace(":-)","<span class='smiley yellow'>:-)</span>");
			speak = speak.replace(":-(","<span class='smiley red'>:-(</span>");
			speak = speak.replace(":O","<span class='smiley blue'>:O</span>");
			speak = speak.replace(":'(","<span class='smiley blue'>:'(</span>");
			speak = speak.replace(";)","<span class='smiley yellow'>;)</span>");
			$("#"+character.ID+" .perso .buble").html(speak);
			setTimeout(function() {
				$("#"+character.ID+" .perso .buble").fadeOut('slow');
				character.speaking=false;
			}, 2000);
		}
	},
};