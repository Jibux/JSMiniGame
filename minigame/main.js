include('js/classes/Point.js');
include('js/classes/Character.js');
include('js/classes/ActionManager.js');

var map;
var moves=new Object();

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
	
	var character = CharacterHelper.newCharacter();
	
	window.onkeypress=function(e) {
		var e=window.event || e;
		if(e.charCode==13) {
			CharacterHelper.userSpeak(character);
		}
	}

	init(character);
	
	console.log(ActionManager.getSubjectList());
	
	$(".tile").click(function(e) {
		var ID = $(this).parent().attr('id');
		var position = getMouseMapPosition(ID, e);
		ActionManager.addAction(ACTION_ENUM.MOVE, CharacterHelper.getID(character), position);
		ActionManager.moveTo(ID, character, position);
	});
	$(".perso").click(function(e) {
		var ID = $(this).parent().parent().attr('id');
		var position = getMouseMapPosition(ID, e);
		ActionManager.addAction(ACTION_ENUM.MOVE, CharacterHelper.getID(character), position);
		ActionManager.moveTo(ID, character, position);
	});
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


function init(character) {
	var currentDate = new Date();
	currentDate.getHours();
	var mapID = "map_0_0_0";
	map = mapContent[mapID];
	console.log(map);
	mapOrig = invertMap(map.occupation);
	
	var offset = {x:-250,y:50};
	var top = map.size.height;
	var left = map.size.width;

	for(var y=-1;y<=1;y++) {
		for(var x=-1;x<=1;x++) {
			var id="map_"+(map.position.x+x)+"_"+(map.position.y+y)+"_"+map.position.z;
			
			if(mapContent[id]!=undefined) {
				var point = PointHelper.newPoint(left*x, top*y);
				var rep = PointHelper.changeFrame(point, true);
				var repere = {x:rep.x*UNIT,y:rep.y*UNIT};
				drawMap(id,repere.y+offset.y,repere.x+offset.x);
				
				if(mapContent["map_"+(map.position.x+x+1)+"_"+(map.position.y+y)+"_"+map.position.z]==undefined) {
					$("#"+id).addClass("border_right");
				}
				if(mapContent["map_"+(map.position.x+x)+"_"+(map.position.y+y+1)+"_"+map.position.z]==undefined) {
					$("#"+id).addClass("border_bottom");
				}
			}
		}
	}
	
	ActionManager.init();
	ActionManager.addSubject(character);
	
	CharacterHelper.drawPerso(character, mapID);
}

function drawMap(mapID,top,left) {
	$("#screen").append('<div id="'+mapID+'" class="map" style="left:'+left+'px;top:'+top+'px;"></div>');

	for(var x=0;x<mapContent[mapID].size.width;x++) {
		for(var y=0;y<mapContent[mapID].size.height;y++) {
			var type="grass";
			if(mapContent[mapID]!=undefined && mapContent[mapID].tile[x+"_"+y]!=undefined) {
				type=mapContent[mapID].tile[x+"_"+y];
				if(mapContent[mapID].occupation[x+"_"+y]!=undefined) {
					type+=" noPass";
				}
			}
			$("#"+mapID).prepend("<div class='tile "+type+"' id='tile_"+x+"_"+y+"' style='left:"+x*UNIT+"px;top:"+y*UNIT+"px;"+"'></div>");
			/*
			$("#miniMap").height(map.size.height*2);
			$("#miniMap").width(map.size.width*2);
			$("#miniMap").append("<div class='miniTile "+type+"'></div>");
			*/
		}
	}
}

function getMouseMapPosition(mapID, event) {
	var result = new Object();
	
	var offsetLeft = $("#screen").offset().left+$("#"+mapID).position().left;
	var offsetTop = $("#screen").offset().top+$("#"+mapID).position().top;
	
	var x = event.pageX;
	var y = event.pageY;
	
	var posX = x - offsetLeft;
	var posY = y - offsetTop;
	
	//position de la souris par rapport à la carte 2D
	var position = PointHelper.newPoint(posX/UNIT, posY/UNIT);
	var returnedPosition = PointHelper.changeFrame(position,false);
	console.log(returnedPosition);
	return returnedPosition;
}	

