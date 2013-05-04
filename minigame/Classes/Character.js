/**
 * This class describe a Character. It can run, sing, eat, and whatever you want if you have created the method to do so !
 */


function Character(type) {
	
	var privateAttr = "test";
	this.publicAttr = "test2"
	
	var typeOfCharacter = type;
	
	this.typeOfCharacter = function(type) {
		if(typeof type != "undefined") {
			typeOfCharacter = type;
		}
		return typeOfCharacter;
	}
}