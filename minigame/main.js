var mapOrig = [];

function copyMap(map) {
	var map2=[];
	
	for (var i=0; i < map.length; i++) {
		map2[i]=[];
		for (var j=0; j < map[i].length; j++) {
			map2[i][j] = map[i][j];
		}
		//map2[i] = map[i].slice(0);
	}
	
	return map2;
}

function invertMap(map) {
	var map2=[];
	
	for (var i=0; i < map.length; i++) {
		map2[i]=[];
		for (var j=0; j < map[i].length; j++) {
			map2[i][j] = map[j][i];
		}
	}
	
	return map2;
}

$("document").ready(function() {
	$("#screen").addClass(configuration.mode).addClass(configuration.quality+"_quality");
	
	window.onkeypress=function(e) {
		var e=window.event || e;
		if(e.charCode==13) {
			character.userSpeak();
		}
	}

	var character = init();
	
	var map = character.getCurrentMap();
	
	$(".tile").click(function(e) {
		var ID = $(this).parent().attr('id');
		var position = ActionManager.getMouseMapPosition(ID, e);
		console.log("CHARACTER POSITION: ", character.getPersoPosition());
		console.log("CHARACTER POSITION 2D: ", character.getPersoPosition2D());
		ActionManager.addAction(ACTION_ENUM.MOVE, map, character, position);
	});
	$(".perso").click(function(e) {
		var ID = $(this).parent().parent().attr('id');
		var position = ActionManager.getMouseMapPosition(ID, e);
		console.log("CHARACTER POSITION: ", character.getPersoPosition());
		console.log("CHARACTER POSITION 2D: ", character.getPersoPosition2D());
		ActionManager.addAction(ACTION_ENUM.MOVE, map, character, position);
	});
	
	ActionManager.start();
	
	clock();
	setInterval(function() {
		clock();
	},60000);
});

function clock() {
	var date = new Date();
	var backgroundPos=Math.round((date.getHours()*date.getMinutes())/(1440)*10000+5000);
	$("#screen").css("background-position",backgroundPos+"px 1px");
}


function init() {
	var currentDate = new Date();
	currentDate.getHours();
	
	ActionManager.init();
	
	var map = initMaps();
	
	mapOrig = map.getOccupation();
	
	map.drawNeighbours();
	
	var character = new Character("user", map, true);
	
	ActionManager.addSubject(character);
	var character2 = new Character("TEST", map);
	ActionManager.addSubject(character2);
	
	character.drawPerso();
	
	return character;
}

function initMaps() {
	var initialPosition = new Point(0, 0);
	var fromPosition = new Point(0, 0);
	var toPosition = new Point(-1, 1);
	
	return ActionManager.loadMaps(initialPosition, fromPosition, toPosition);
}
