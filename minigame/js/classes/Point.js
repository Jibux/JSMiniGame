/**
 * This class describe a Point in a 3D space. We are running a 2D game but, well why not?
 */

 
var Point = {
	x:null,
	y:null,
	z:null
};
 
var PointHelper = {
	newPoint:function(x, y, z) {
		var point = newObject(Point);
		PointHelper.setPoint(point, x, y, z);
		return point;
	},
	
	setPoint:function(point, x, y, z) {
		point.x = x;
		point.y = y;
		point.z = z;
	},
	
	/**
	* Change les coordonées passées en paramétre dans le repère ISOmétrique ou 2D
	*
	* position : position={x:"coordonnée en x", y:"coordonnée en y"};
	* toISO : boolean {0=>ISO to 2D, 1=>2D to ISO}
	* TODO Laisser le choix d'utiliser floor, round ou ceil
	**/
	changeFrame:function(point,toISO) {
		var posX = point.x;
		var posY = point.y;
		
		if(!toISO) {
			var posX2 = Math.floor((Math.sqrt(2)/2)*(posX + posY*2) - map.size.width/2);
			var posY2 = Math.floor((Math.sqrt(2)/2)*(posY*2 - posX) + map.size.height/2);
			
			return {"x":posX2,"y":posY2};
		} else {
			var posX2 = Math.round((posX - posY + map.size.width/2 + map.size.height/2) / Math.sqrt(2));
			var posY2 = Math.round((posX + posY + map.size.width/2 - map.size.height/2) / (2*Math.sqrt(2)));
			
			return {"x":posX2,"y":posY2};
		}
	},
};
