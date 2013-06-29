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
	}
};
