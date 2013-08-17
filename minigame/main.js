$("document").ready(function() {
	$("#screen").addClass(configuration.mode).addClass(configuration.quality+"_quality");
	
	// Test Lang
	/*console.log("0 "+Lang.getString("deguerre"));
	Lang.setLanguage("fr_FR");
	console.log("1 "+Lang.getString("deguerre"));
	Lang.setLanguage("en_GB");
	console.log("2 "+Lang.getString("deguerre"));*/
	//console.log("3 "+Lang.getString("test"));
	
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
	
	// Main character (3rd parameter set to 'true')
	var character = new Character("user", map, true);
	// Make him managed by ActionManager
	ActionManager.addSubject(character);
	
	var mapID2 = "map_0_-1_0";
	var map2 = map.getNeighbour(mapID2);
	//map2.setNeighbours(mapID2);
	
	var character2 = new Character("TEST", map2, false);
	character2.setPosition(new Point(200,200));
	ActionManager.addSubject(character2);
	
	ActionManager.updateSubjectsOffset();
	ActionManager.printSubjectsOffset();
	
	// Draw all of these
	map.drawNeighbours();
}
