$("document").ready(function() {
	waitForCompleteLoad();
});

function clock() {
	var date = new Date();
	var backgroundPos=Math.round((date.getHours()*date.getMinutes())/(1440)*10000+5000);
	$("#screen").css("background-position",backgroundPos+"px 1px");
}


function init() {
	$("#screen").addClass(configuration.mode).addClass(configuration.quality+"_quality");
		
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
	character.setPosition(new Point(0, 0));
	
	// Make him managed by ActionManager
	ActionManager.addSubject(character);
	
	var mapID2 = "map_0_0_0";
	var map2 = map.getNeighbour(mapID2);
	//map2.setNeighbours(mapID2);
	
	var character2 = new Character("TEST", map2, false);
	character2.setPosition(new Point(0, 40));
	
	ActionManager.addSubject(character2);
	
	ActionManager.initSubjectsInCurrentMap();
	ActionManager.printSubjectsOffset();
	
	// Draw all of these
	map.drawNeighbours();
	
	// Start the action manager
	ActionManager.start();
}

function waitForCompleteLoad(){
	if( typeof(ResourcesLoader) !== "undefined" && ResourcesLoader.isLoaded()){
		init();
	}else{
		var timeout = setTimeout("waitForCompleteLoad()", 200 ); 
	}
}

