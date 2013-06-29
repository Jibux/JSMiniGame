/**
 * This class describe a Character. It can run, sing, eat, and whatever you want if you have created the method to do so !
 */


var Character = {
	currentLife:100,// %
	maxLife:100,

	currentStrenght:100,// %
	maxStrength:10,

	currentSpeed:100,//%
	maxSpeed:10,

	currentInteligence:100,//%
	maxInteligence:10,

	currentMagic:100,//%
	maxMagic:10,

	level:0,
	
	//race:RACE.HUMAN,
};

var CharacterHelper = {
	newCharacter:function(){
		return newObject(Character);
	},
	
	getCurrentLife:function(character){
		return character.currentLife;
	},
	
	setCurrentLife:function(character,life){
		character.currentLife = life;
	}
};