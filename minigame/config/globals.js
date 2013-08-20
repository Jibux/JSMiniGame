/**
*	GLOBAL VARIABLES
*/

var UNIT = 20;
var UNIT_ENUM = generateUnitMoveEnum();

var MAPS_HEIGHT = 20;
var MAPS_WIDTH = 20;

var DIRECTION_ENUM = {
	"LEFT":"LEFT",
	"RIGHT":"RIGHT",
	"UP":"UP",
	"DOWN":"DOWN",
	"DIAGONAL_UP_LEFT":"DIAGONAL_UP_LEFT",
	"DIAGONAL_UP_RIGHT":"DIAGONAL_UP_RIGHT",
	"DIAGONAL_DOWN_LEFT":"DIAGONAL_DOWN_LEFT",
	"DIAGONAL_DOWN_RIGHT":"DIAGONAL_DOWN_RIGHT",
	"NOCHANGE":"NOCHANGE",
	"TOP":"TOP",
	"BOTTOM":"BOTTOM",
	"DIAGONAL_TOP_LEFT":"DIAGONAL_TOP_LEFT",
	"DIAGONAL_TOP_RIGHT":"DIAGONAL_TOP_RIGHT",
	"DIAGONAL_BOTTOM_LEFT":"DIAGONAL_BOTTOM_LEFT",
	"DIAGONAL_BOTTOM_RIGHT":"DIAGONAL_BOTTOM_RIGHT",
};
var DirectionEnum = DIRECTION_ENUM;
var ACTION_ENUM = {
	MOVE:"move",
	JUMP:"jump",
	COOK:"cook",
	SLEEP:"sleep",
};
var ACTION_STATE_ENUM = {
	TOSTART:"TOSTART",
	STARTED:"STARTED",
	TOSTOP:"TOSTOP",
	STOPPED:"STOPPED",
	TOSPAUSE:"TOPAUSE",
	PAUSE:"PAUSE",
	TOFINISH:"TOFINISH",
	FINISHED:"FINISHED",
};
var MOVE_STATE_ENUM = {
	STOPPED:"STOPPED",
	MOVING:"MOVING",
};

var EDGE_TYPE_ENUM = {
	RIGHT:"right",
	LEFT:"left",
	BOTTOM:"bottom",
	TOP:"top",
};

var STATIC_OCCUPATION_ENUM = {
	WATER:0,
	UNAVAILABLE:0,
	AVAILABLE:1,
	CHARACTER:2,
	ROCK:4,
	OBJECT:3,
	GRASS:1
};

var MOVE_FINISHED = -1;
var MOVE_ON = 0;
var MOVE_WAIT = 1;

var FOOT_STEP_DURATION = 100;
var CHECK_DURATION = 200;

function generateUnitMoveEnum() {
	var unit = UNIT;
	var unitMove = UNIT/5;
	var unitMove2 = unitMove/2;
	var unitMoveMap = unitMove/Math.sqrt(2);
	var unitMoveMap2 = unitMoveMap/2;
	var unitMoveDiagonal = unitMove*Math.sqrt(2);
	var unitMoveDiagonal2 = unitMoveDiagonal/2;
	
	return {
		UNIT:UNIT,
		UNIT_MOVE:unitMove,
		UNIT_MOVE2:unitMove2,
		UNIT_MOVE_MAP:unitMoveMap,
		UNIT_MOVE_MAP2:unitMoveMap2,
		UNIT_MOVE_DIAGONAL:unitMoveDiagonal,
		UNIT_MOVE_DIAGONAL2:unitMoveDiagonal2,
	};
}
