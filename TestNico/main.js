var unit=20;
var map;
var DIRECTIONS={"UP":"UP","DOWN":"DOWN","RIGHT":"RIGHT","LEFT":"LEFT"};

var moves=new Object();

var speaking =false;



$("document").ready(function(){
	window.onkeypress=function(e){
		var e=window.event || e;
		if(e.charCode==13){
			userSpeak();
		}
	}

	init();
	$(".tile").click(function(e){
		var ID=$(this).parent().attr('id');
		moveTo(ID,"user",getMouseMapPosition(ID,e).x,getMouseMapPosition(ID,e).y);
	});
	$(".perso").click(function(e){
		var ID=$(this).parent().parent().attr('id');
		moveTo(ID,"user",getMouseMapPosition(ID,e).x,getMouseMapPosition(ID,e).y);
	});
	clock();
	setInterval(function(){
		clock();
	},60000);
});

function clock(){
	var date = new Date();
	var backgroundPos=Math.round((date.getHours()*date.getMinutes())/(1440)*10000+5000);
	$("#screen").css("background-position",backgroundPos+"px 1px");
}

function userSpeak(){
	if(!speaking){
		$("#user .perso").append("<div class='buble'><input type='text' id='userSpeak'/></div>");
		$("#userSpeak").focus();
		speaking=true;
	}else{
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

function init(){
	var currentDate = new Date();
	currentDate.getHours();
	var mapID="map_0_0_0";
	map=mapContent[mapID];
	
	var diagonale=Math.sqrt(map.size.height*map.size.height+map.size.width*map.size.width);
	
	var offset={x:25,y:50};
	var top=map.size.height;
	var left=map.size.height;

	for(var y=-1;y<=1;y++){
		for(var x=-1;x<=1;x++){
			var id="map_"+(map.position.x+x)+"_"+(map.position.y+y)+"_"+map.position.z;
			if(mapContent[id]!=undefined){
				
				var repere = changeRepere({x:left*x*unit,y:top*y*unit},true);
				drawMap(id,repere.y+offset.y,repere.x+offset.x);
				
				if(mapContent["map_"+(map.position.x+x+1)+"_"+(map.position.y+y)+"_"+map.position.z]==undefined){
					$("#"+id).addClass("border_right");
				}
				if(mapContent["map_"+(map.position.x+x)+"_"+(map.position.y+y+1)+"_"+map.position.z]==undefined){
					$("#"+id).addClass("border_bottom");
				}
			}
		}
	}
	
	drawPerso(mapID);
}
		
function drawPerso(mapID){
	$("#"+mapID).append('<div class="occupation" style="top:200px;left:200px;" id="user"></div>');
	$("#user").append('<div class="perso stand up left"><div class="name">Name</div><div class="lifebar"><div class="life" style="width:50%;background-position:0 50%;"></div></div></div>');
}
///////////////////////////////////////////////////////////////////////////////////Move 2.0
function addMove(mapID,persoID,x,y){
	if(moves[persoID] ==undefined){
		moves[persoID]=new Object();
	}
	moves[persoID].x=x;
	moves[persoID].y=y;
	moves[persoID].map=mapID;
	moves[persoID].isMoving=true;
}
		
function moveAction(){
	for( var persoID in moves){
		if(!moves[persoID].isMoving){
			$("#"+persoID).find(".perso").removeClass("stand");
			$("#"+persoID).find(".perso").addClass("walk");
	
			var result = getNextPosition(persoID);
			moveTo(moves[persoID].map,persoID,result.x,result.y);
		}
	}
}
		
function getNextPosition(persoID){
	var unitMove=unit/10;
	var result=Object();
	
	//Temporaire à modifier avec un pathfinder
	var currentMap = $("#"+moves[persoID].map);
	var perso=getPersoPosition(persoID);
	if(perso.x<moves[persoID].x){
		result.x=perso.x+unitMove;
		result.y=perso.y;
		return result;
	}else if(perso.x>moves[persoID].x){
		result.x=perso.x-unitMove;
		result.y=perso.y;
		return result;
	}else if(perso.x<moves[persoID].x){
		result.x=perso.x;
		result.y=perso.y+unitMove;
		return result;
	}else if(perso.x>moves[persoID].x){
		result.x=perso.x;
		result.y=perso.y-unitMove;
		return result;
	}
	
	moves[persoID].isMoving=false;
	return result;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
		
function moveTo(mapID,persoID,x,y){
	var posX=x*unit;
	var posY=(map.size.height-y)*unit;
	$("#"+persoID).find(".perso").removeClass("stand");
	$("#"+persoID).find(".perso").addClass("walk");
				
	move(mapID,persoID,posX,posY);
}

function direction(persoID,dir){
	var perso =$("#"+persoID).find(".perso");
	if(dir==DIRECTIONS.RIGHT){
		perso.removeClass("left");
		perso.addClass("right");
	}
	if(dir==DIRECTIONS.LEFT){
		perso.removeClass("right");
		perso.addClass("left");
	}
	if(dir==DIRECTIONS.DOWN){
		perso.removeClass("up");
		perso.addClass("down");
	}
	if(dir==DIRECTIONS.UP){
		perso.removeClass("down");
		perso.addClass("up");
	}
}
		
function move(mapID,persoID,x,y){
	var unitMove=Math.round(unit/4);
	
	var left =$("#"+persoID).css("left").substring(0,$("#"+persoID).css("left").length -2);
	var top =$("#"+persoID).css("top").substring(0, $("#"+persoID).css("top").length - 2);
	
	var positionPerso= changeRepere({"x":left/unit,"y":top/unit},false);
	var positionDestination= changeRepere({"x":x/unit,"y":y/unit},false);
	
	
	//direction x
	if(positionPerso.x<positionDestination.x){
		direction(persoID,DIRECTIONS.RIGHT);
	}else if(positionPerso.x>positionDestination.x){
		direction(persoID,DIRECTIONS.LEFT);
	}
	//direction y
	if(positionPerso.y<positionDestination.y){
		direction(persoID,DIRECTIONS.UP);
	}else if(positionPerso.y>positionDestination.y){
		direction(persoID,DIRECTIONS.DOWN);
	}
	//move X
	if(left<x){
		$("#"+persoID).css("left",(left*1 +unitMove)+"px");
	}else if(left>x){
		$("#"+persoID).css("left",(left*1 -unitMove)+"px");
	}
	//move Y
	if(top>y){
		$("#"+persoID).css("top",(top*1 -unitMove)+"px");
	}else if(top<y){
		$("#"+persoID).css("top",(top*1 +unitMove)+"px");
	}
	
	//continue moving
	if(left!=x || top!=y){
		setTimeout(function() {
		    move(mapID,persoID,x,y);
		}, 150);
	}else{
		$("#"+persoID).find(".perso").addClass("stand");
		$("#"+persoID).find(".perso").removeClass("walk");
	}
}
		
function drawMap(mapID,top,left){
	$("#screen").append('<div id="'+mapID+'" class="map" style="left:'+left+'px;top:'+top+'px;"></div');

	for(var x=0;x<mapContent[mapID].size.width;x++){
		for(var y=0;y<mapContent[mapID].size.height;y++){
			var type="grass";
			if(mapContent[mapID]!=undefined && mapContent[mapID].tile[x+"_"+y]!=undefined){
				type=mapContent[mapID].tile[x+"_"+y];
				if(mapContent[mapID].occupation[x+"_"+y]!=undefined){
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
		
function getPersoPosition(persoID){
	var left =$("#"+persoID).css("left").substring(0,$("#"+persoID).css("left").length -2);
	var top =$("#"+persoID).css("top").substring(0, $("#"+persoID).css("top").length - 2);
	
	var result = Object();
	result.x=Math.floor(left/unit);
	result.y=Math.floor(top/unit);
	
	return result;
}
		
function getMouseMapPosition(mapID,event){
	var result=new Object();
	
	var offsetLeft=$("#screen").offset().left+$("#"+mapID).position().left;
	var offsetTop=$("#screen").offset().top+$("#"+mapID).position().top;
	
	var x=event.pageX;
	var y=event.pageY;
	
	//position de la souris par rapport à la carte 2D
	var position={"x":(x - offsetLeft),"y":(y - offsetTop)};
	return changeRepere(position,false);
}	

/**
* change les coordonées passées en paramétre dans le repère ISOmétrique ou 2D
*
* position : position={x:"coordonnée en x", y:"coordonnée en y"};
* toISO : boolean {0=>ISO to 2D, 1=2D to ISO}
**/
function changeRepere(position,toISO){
	var posX=position.x;
	var posY=position.y;
	
	if(!toISO){
		var posX2 = Math.floor(((Math.sqrt(2)/2)*(posX+posY*2)/unit))-10;
		var posY2 = map.size.height-Math.floor((Math.sqrt(2)/2)*(posY*2-posX)/unit)-10;		
		
		return {"x":posX2,"y":posY2};
	}else{
		var posX2 =Math.floor((1/Math.sqrt(2)) * (posX+10 - (posY+10))) ;
		var posY2 =Math.floor((1/(2*Math.sqrt(2))) * (posX+10 +posY+10));

		return {"x":posX2,"y":posY2};
	}
}