/**
 * This class describes a Point in a 3D space. We are running a 2D game but, well why not?
 */
var Point = function(x, y, z) {
	this.x = x*1;
	this.y = y*1;
	this.z = z*1 || 0;
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
	
	scaleToArray: function() {
		return new Point(this.x/UNIT, this.y/UNIT);
	},
	
	scaleToCss: function() {
		return new Point(this.x*UNIT, this.y*UNIT);
	},
	
	convertFromSize: function(size) {
		if(this.x < 0 || this.x >= size.width) {
			this.x = size.width - Math.abs(this.x);
		}
		if(this.y < 0 || this.y >= size.height) {
			this.y = size.height - Math.abs(this.y);
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
			var posX2 = Math.floor((Math.sqrt(2)/2)*(posX + posY*2) - MAPS_WIDTH/2);
			var posY2 = Math.floor((Math.sqrt(2)/2)*(posY*2 - posX) + MAPS_HEIGHT/2);
			
			return new Point(posX2, posY2);
		} else {
			var posX2 = Math.round((posX - posY + MAPS_WIDTH/2 + MAPS_HEIGHT/2) / Math.sqrt(2));
			var posY2 = Math.round((posX + posY + MAPS_WIDTH/2 - MAPS_HEIGHT/2) / (2*Math.sqrt(2)));
			
			return new Point(posX2, posY2);
		}
	},
};