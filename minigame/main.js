$("document").ready(function() {
	$("#screen").addClass(configuration.mode).addClass(configuration.quality+"_quality");
	
	window.onkeypress=function(e) {
		var e=window.event || e;
		if(e.charCode==13) {
			character.userSpeak();
		}
	}

	var character = init();
	
	ActionManager.start();
	
	/*clock();
	setInterval(function() {
		clock();
	},60000);*/
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
	
	var mapID = "map_0_0_0";
	var map = ActionManager.loadMap(mapID);
	
	map.updateNeighbours();
	
	map.drawNeighbours();
	
	var character = new Character("user", map, true);
	
	ActionManager.addSubject(character);
	var character2 = new Character("TEST", map);
	ActionManager.addSubject(character2);
	
	character.draw();
	
	return character;
}
