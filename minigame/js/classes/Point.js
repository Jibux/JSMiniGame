/**
 * This class describe a Point in a 3D space. We are running a 2D game but, well why not?
 */
var Point = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

Point.prototype = {
	getCoordonate: function() {
		return { "x":this.x, "y":this.y, "z":this.z };
	},

	equals: function(pointB) {
		if(this.x == pointB.x && this.y == pointB.y) {
			return true;
		} else {
			return false;
		}
	},

	/**
	* Change les coordonées passées en paramétre dans le repère ISOmétrique ou 2D
	*
	* toISO : boolean {0=>ISO to 2D, 1=>2D to ISO}
	* TODO Laisser le choix d'utiliser floor, round ou ceil
	**/
	changeFrame: function(toISO) {
		var posX = this.x;
		var posY = this.y;
		
		if(!toISO) {
			var posX2 = Math.floor((Math.sqrt(2)/2)*(posX + posY*2) - map.size.width/2);
			var posY2 = Math.floor((Math.sqrt(2)/2)*(posY*2 - posX) + map.size.height/2);
			
			return new Point(posX2, posY2);
		} else {
			var posX2 = Math.round((posX - posY + map.size.width/2 + map.size.height/2) / Math.sqrt(2));
			var posY2 = Math.round((posX + posY + map.size.width/2 - map.size.height/2) / (2*Math.sqrt(2)));
			
			return new Point(posX2, posY2);
		}
	},
};