$("document").ready(function() {
	waitForCompleteLoad();
});

function clock() {
	var date = new Date();
	var backgroundPos=Math.round(((date.getHours()+1)*(date.getMinutes()+1))/(1440)*10000+5000);
	$("#screen").css("background-position-y",backgroundPos+"px");
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
	character2.race = RACE.IMP;
	character2.setPosition(new Point(0, 80));
	ActionManager.addSubject(character2);
	
	var character3 = new Character("TEST2", map2, false);
	character3.race = RACE.DEVIL;
	character3.setPosition(new Point(20, 100));
	ActionManager.addSubject(character3);
	
	var character4 = new Character("TEST3", map2, false);
	character4.race = RACE.GOLEM;
	character4.setPosition(new Point(100, 20));
	ActionManager.addSubject(character4);
	
	ActionManager.initSubjectsInCurrentMap();
	ActionManager.printSubjectsOffset();
	
	// Draw all of these
	map.drawNeighbours();
	
	// Start the action manager
	ActionManager.start();
	clock();
	setInterval(clock,6000);
}

function waitForCompleteLoad(){
	if( typeof(ResourcesLoader) !== "undefined" && ResourcesLoader.isLoaded()){
		init();
	}else{
		var timeout = setTimeout("waitForCompleteLoad()", 200 ); 
	}
}

