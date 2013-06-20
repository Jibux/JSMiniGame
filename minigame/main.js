var unit=20;
var map;
var DIRECTIONS={"UP":"UP","DOWN":"DOWN","RIGHT":"RIGHT","LEFT":"LEFT"};

var MOVE_FINISHED = -1;
var MOVE_ON = 0;
var STEP_DURATION = 770;
var FOOT_STEP_DURATION = 150;

var moves=new Object();

var isMoving = false;

var speaking =false;

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
	window.onkeypress=function(e) {
		var e=window.event || e;
		if(e.charCode==13) {
			userSpeak();
		}
	}

	init();
	$(".tile").click(function(e) {
		var ID=$(this).parent().attr('id');
		var position = getMouseMapPosition(ID,e);
		var x = position.x;
		var y = position.y;
		console.log("x:"+x+" y:"+y);
		moveTo(ID,"user",x,y);
	});
	$(".perso").click(function(e) {
		var ID=$(this).parent().parent().attr('id');
		var position = getMouseMapPosition(ID,e);
		var x = position.x;
		var y = position.y;
		console.log("x:"+x+" y:"+y);
		moveTo(ID,"user",x,y);
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

function userSpeak() {
	if(!speaking) {
		$("#user .perso").append("<div class='buble'><input type='text' id='userSpeak'/></div>");
		$("#userSpeak").focus();
		speaking=true;
	}else {
		var speak = $("#userSpeak").val();
		speak = speak.replace(":)","<span class='smiley yellow'>:)</span>");
		speak = speak.replace(":(","<span class='smiley red'>:(</span>");
		speak = speak.replace(":-)","<span class='smiley yellow'>:-)</span>");
		speak = speak.replace(":-(","<span class='smiley red'>:-(</span>");
		speak = speak.replace(":O","<span class='smiley blue'>:O</span>");
		speak = speak.replace(":'(","<span class='smiley blue'>:'(</span>");
		speak = speak.replace(";)","<span class='smiley yellow'>;)</span>");
		$("#user .perso .buble").html(speak);
		setTimeout(function() {
			$("#user .perso .buble").fadeOut('slow');
			speaking=false;
		}, 2000);
	}
}

function init() {
	var currentDate = new Date();
	currentDate.getHours();
	var mapID = "map_0_0_0";
	map = mapContent[mapID];
	console.log(map);
	mapOrig = invertMap(map.occupation);
	
	
	var diagonale=Math.sqrt(map.size.height*map.size.height+map.size.width*map.size.width);
	
	var offset = {x:25,y:50};
	var top = map.size.height;
	var left = map.size.width;

	for(var y=-1;y<=1;y++) {
		for(var x=-1;x<=1;x++) {
			var id="map_"+(map.position.x+x)+"_"+(map.position.y+y)+"_"+map.position.z;
			if(mapContent[id]!=undefined) {
				
				var repere = changeRepere({x:left*x,y:top*y},true);
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
	
	drawPerso(mapID);
}
		
function drawPerso(mapID) {
	$("#"+mapID).append('<div class="occupation" style="top:220px;left:220px;" id="user"></div>');
	$("#user").append('<div class="perso stand up left"><div class="name">Name</div><div class="lifebar"><div class="life" style="width:50%;background-position:0 50%;"></div></div></div>');
}
		
function moveTo(mapID,persoID,x,y) {
	var position = getPersoPosition2D(persoID);
	//console.log(mapOrig);
	console.log(mapOrig[x][y]);
	if(position.x == x && position.y == y || mapOrig[x][y] != 1) {
		/*direction(persoID,DIRECTIONS.UP);
		alert();
		direction(persoID,DIRECTIONS.DOWN);
		alert();
		direction(persoID,DIRECTIONS.RIGHT);
		alert();
		direction(persoID,DIRECTIONS.LEFT);*/
		return MOVE_FINISHED;
	}
	
	$("#"+persoID).find(".perso").removeClass("stand");
	$("#"+persoID).find(".perso").addClass("walk");

	var map1 = copyMap(mapOrig);
	var graph = new Graph(map1);
	
	var start = graph.nodes[position.x][position.y];
    var end = graph.nodes[x][y];
	var map2 = graph.input;
	
	var result = astar.search(graph.nodes, start, end, true);
	
	//moveOld(mapID,persoID,posX,posY);
	
	move(mapID,persoID,map1,result);
}

function direction(persoID,dir) {
	var perso =$("#"+persoID).find(".perso");
	if(dir==DIRECTIONS.LEFT) {
		perso.removeClass("left");
		perso.removeClass("up");
		
		perso.addClass("right");
		perso.addClass("down");
	}
	if(dir==DIRECTIONS.RIGHT) {
		perso.removeClass("right");
		perso.removeClass("down");
		
		perso.addClass("left");
		perso.addClass("up");
	}
	if(dir==DIRECTIONS.DOWN) {
		perso.removeClass("up");
		perso.removeClass("right");
		
		perso.addClass("down");
		perso.addClass("left");
	}
	if(dir==DIRECTIONS.UP) {
		perso.removeClass("down");
		perso.removeClass("left");
		
		perso.addClass("up");
		perso.addClass("right");
	}
}

function move(mapID, persoID, mapArray, nodes) {
	var timeout = 0;
	var i = 1;
	var moveResult = MOVE_ON;
	moveByStep(mapID, persoID, mapArray, nodes, 0);
	var intId = setInterval(function() {
		if(i == nodes.length || moveResult == MOVE_FINISHED) {
			if(i == nodes.length) {
				i--;
			}
			clearInterval(intId);
			setTimeout(function() {
				$("#"+persoID).find(".perso").addClass("stand");
				$("#"+persoID).find(".perso").removeClass("walk");
				isMoving = false;
				var position = getPersoPosition2D(persoID);
				console.log("position.x:"+position.x +" position.y:"+position.y);
				console.log("Target pos ("+nodes[i].x+", "+nodes[i].y+")");
				console.log("FINISHED");
			}, FOOT_STEP_DURATION);
			return 0;
		}
		moveResult = moveByStep(mapID, persoID, mapArray, nodes, i);
		i++;
	}, STEP_DURATION);
}

function moveByStep(mapID, persoID, mapArray, nodes, i) {
	//console.log("i = " + i);
	
	if(nodes[i] == undefined) {
		console.log("nodes["+i+"] undefined");
		return MOVE_FINISHED;
	}
	if(mapArray[nodes[i].x][nodes[i].y] != 2) {
		// Pas d'ennemi
		//mapArray[nodes[i].x][nodes[i].y]=4;
		var posX=nodes[i].x*unit;
		var posY=nodes[i].y*unit;
		isMoving = true;
		moveCss(mapID,persoID,posX,posY);
		
		return MOVE_ON;
	} else {
		// Ennemi en vue
		console.log("Ennemi at ("+nodes[i].x+", "+nodes[i].y+")");
		
		mapArray=copyMap(mapOrig);
		mapArray[nodes[i].x][nodes[i].y]=0;
		
		var graph = new Graph(mapArray);		
		var start = graph.nodes[nodes[i-1].x][nodes[i-1].y];
		var end = graph.nodes[nodes[nodes.length-1].x][nodes[nodes.length-1].y];
		var result = astar.search(graph.nodes, start, end, true);
		
		move(mapID, persoID, mapArray, nodes);
		return MOVE_FINISHED;
	}
}

function moveCss(mapID,persoID,x,y) {
	var unitMove=Math.round(unit/5);
	
	//console.log("MOVE CSS");
	
	var position = getPersoPosition2D(persoID);
	var persoX = position.x;
	var persoY = position.y;
	
	var position2 = getPersoPosition(persoID);
	var left = position2.x;
	var top = position2.y;
	
	/*var positionPerso = changeRepere({"x":persoX,"y":persoY},false);
	var positionDestination = changeRepere({"x":x/unit,"y":y/unit},false);*/
		
	//direction x
	/*if(positionPerso.x<positionDestination.x) {
		direction(persoID,DIRECTIONS.RIGHT);
	}else if(positionPerso.x>positionDestination.x) {
		direction(persoID,DIRECTIONS.LEFT);
	}
	//direction y
	if(positionPerso.y<positionDestination.y) {
		direction(persoID,DIRECTIONS.UP);
	}else if(positionPerso.y>positionDestination.y) {
		direction(persoID,DIRECTIONS.DOWN);
	}*/
	//move X
	if(left<x) {
		direction(persoID,DIRECTIONS.DOWN);
		$("#"+persoID).css("left",(left*1 + unitMove) + "px");
	}else if(left>x) {
		direction(persoID,DIRECTIONS.UP);
		$("#"+persoID).css("left",(left*1 - unitMove) + "px");
	}
	//move Y
	if(top>y) {
		
		direction(persoID,DIRECTIONS.RIGHT);
		$("#"+persoID).css("top",(top*1 - unitMove) + "px");
	}else if(top<y) {
		
		direction(persoID,DIRECTIONS.LEFT);
		$("#"+persoID).css("top",(top*1 + unitMove) + "px");
	}
	
	//continue moving
	if(left!=x || top!=y) {
		setTimeout(function() {
		    moveCss(mapID,persoID,x,y);
		}, FOOT_STEP_DURATION);
	}
}
		
function drawMap(mapID,top,left) {
	$("#screen").append('<div id="'+mapID+'" class="map" style="left:'+left+'px;top:'+top+'px;"></div');

	for(var x=0;x<mapContent[mapID].size.width;x++) {
		for(var y=0;y<mapContent[mapID].size.height;y++) {
			var type="grass";
			if(mapContent[mapID]!=undefined && mapContent[mapID].tile[x+"_"+y]!=undefined) {
				type=mapContent[mapID].tile[x+"_"+y];
				if(mapContent[mapID].occupation[x+"_"+y]!=undefined) {
					type+=" noPass";
				}
			}
			$("#"+mapID).prepend("<div class='tile "+type+"' id='tile_"+x+"_"+y+"' style='left:"+x*unit+"px;top:"+y*unit+"px;"+"'></div>");
			/*
			$("#miniMap").height(map.size.height*2);
			$("#miniMap").width(map.size.width*2);
			$("#miniMap").append("<div class='miniTile "+type+"'></div>");
			*/
		}
	}
}
		
function getPersoPosition2D(persoID) {
	var left = $("#"+persoID).css("left").substring(0,$("#"+persoID).css("left").length - 2);
	var top = $("#"+persoID).css("top").substring(0, $("#"+persoID).css("top").length - 2);
	
	var result = Object();
	result.x = Math.floor(left/unit);
	result.y = Math.floor(top/unit);
	
	return result;
}

function getPersoPosition(persoID) {
	var result = Object();
	
	result.x = $("#"+persoID).css("left").substring(0,$("#"+persoID).css("left").length - 2);
	result.y = $("#"+persoID).css("top").substring(0, $("#"+persoID).css("top").length - 2);
	
	return result;
}

function getMouseMapPosition(mapID,event) {
	var result = new Object();
	
	var offsetLeft = $("#screen").offset().left+$("#"+mapID).position().left;
	var offsetTop = $("#screen").offset().top+$("#"+mapID).position().top;
	
	var x = event.pageX;
	var y = event.pageY;
	
	console.log("xm:"+x+" ym:"+y);
	//console.log("offsetLeft:"+offsetLeft+" offsetTop:"+offsetTop);
	
	//position de la souris par rapport à la carte 2D
	var position = {"x":(x - offsetLeft),"y":(y - offsetTop)};
	return changeRepere(position,false);
}	

/**
* change les coordonées passées en paramétre dans le repère ISOmétrique ou 2D
*
* position : position={x:"coordonnée en x", y:"coordonnée en y"};
* toISO : boolean {0=>ISO to 2D, 1=>2D to ISO}
**/
function changeRepere(position,toISO) {
	var posX = position.x;
	var posY = position.y;
	
	console.log("pos x:"+posX+" pos y:"+posY);
	
	if(!toISO) {
		var posX2 = Math.floor((Math.sqrt(2)/2)*(posX + posY*2)/unit) - 10;
		var posY2 = Math.floor((Math.sqrt(2)/2)*(posY*2 - posX)/unit) + 10;
		
		return {"x":posX2,"y":posY2};
	} else {
		var posX2 = Math.floor((unit/Math.sqrt(2)) * (posX+10 - (posY+10))) ;
		var posY2 = Math.floor((unit/(2*Math.sqrt(2))) * (posX+10 +posY+10));
		
		
		//var posX2 = Math.floor(unit*(posX - posY + 20) / Math.sqrt(2));
		//var posY2 = Math.floor(unit*(posX + posY) / (2*Math.sqrt(2)));
		

		return {"x":posX2,"y":posY2};
	}
}