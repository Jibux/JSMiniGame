/**
*	GLOBAL VARIABLES
*/

var UNIT = 20;
var DIRECTIONS = {"UP":"UP","DOWN":"DOWN","RIGHT":"RIGHT","LEFT":"LEFT"};
var ACTION_ENUM = {
	MOVE:"move",
	JUMP:"jump",
	COOK:"cook",
	SLEEP:"sleep",
};

var MOVE_FINISHED = -1;
var MOVE_ON = 0;
var STEP_DURATION = 800;
var FOOT_STEP_DURATION = 150;
