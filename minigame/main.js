$("document").ready(function() {
	$("#screen").addClass(configuration.mode).addClass(configuration.quality+"_quality");
	
	window.onkeypress=function(e) {
		var e=window.event || e;
		if(e.charCode==13) {
			character.userSpeak();
		}
	}
	
	// Load maps and characters
	init();
	// Start the action manager
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
	
	// Initialize ActionManager
	ActionManager.init();
	
	// Load map map_0_0_0 and set it's neighbours
	var mapID = "map_0_0_0";
	var map = ActionManager.loadMap(mapID);
	map.updateNeighbours();
	// Draw all of these
	map.drawNeighbours();
	
	// Main character (3rd parameter set to 'true')
	var character = new Character("user", map, true);
	// Make him managed by ActionManager
	ActionManager.addSubject(character);
	// Draw it
	character.draw();
	
	// TEST
	//var character2 = new Character("TEST", map);
	//ActionManager.addSubject(character2);
}
