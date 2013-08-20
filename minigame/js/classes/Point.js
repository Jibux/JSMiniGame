/**
 *	This class describes a Point in a 3D space. We are running a 2D game but, well why not?
 */
var Point = function(x, y, z) {
	this.x = x*1;
	this.y = y*1;
	this.z = z*1 || 0;
};

Point.prototype = {
	getCoordinates: function() {
		return { "x":this.x, "y":this.y, "z":this.z };
	},

	equals: function(pointB) {
		if(this.x == pointB.x && this.y == pointB.y) {
			return true;
		} else {
			return false;
		}
	},
	
	copy: function() {
		return new Point(this.x, this.y, this.z);
	},
	
	scaleToArray: function() {
		return new Point(Math.floor(this.x/UNIT), Math.floor(this.y/UNIT));
	},
	
	scaleToCss: function() {
		return new Point(this.x*UNIT, this.y*UNIT);
	},
	
	/*
	*	Convert coordinates that are exceeding map size to good ones in the neighbour one
	*	If x||y < 0 or x||y >=size, set it to || size - ||x|| or ||y|| ||
	*/
	convertFromSize: function(size) {
		if(this.x < 0 || this.x >= size.width) {
			this.x = Math.abs(size.width - Math.abs(this.x));
		}
		if(this.y < 0 || this.y >= size.height) {
			this.y = Math.abs(size.height - Math.abs(this.y));
		}
	},
	
	/*
	*	Change coordinates to iso or to 2D landmark.
	*	toISO: boolean (0=>ISO to 2D, 1=>2D to ISO)
	*	TODO Let the choice of floor, round or ceil
	*/
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