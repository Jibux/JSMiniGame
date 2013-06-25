var mapsUpdates=new Object();
var mapsUpdateIDs=new Object();

var tiles={
	template:{width:19,height:4},
	types:["grass","water","road"],
	grass:{grass:"grass",water:"grass_water",road:"grass_road"},
	water:{grass:"grass_water",water:"water",road:"water_road"},
	road:{grass:"grass_road",water:"water_road",road:"road"},
	order:{
		"grass_water":{grass:"primary",water:"secondary"},
		"grass_road":{grass:"secondary",road:"primary"},
		"water_road":{road:"primary",water:"secondary"}
	}
};

var mapConfiguration={width:20,height:20,unit:20};
var position;

/*
* tiles types which are obstructive
*/
var obstructiveTiles=new Array();
var selectedClass;
var mouseDown=false;
var fullBorders="0000";

$("document").ready(function(){
	$("input[name='X']").spinner();
	$("input[name='Y']").spinner();
	$("input[name='Z']").spinner();
	
	//accordion
	$("#accordion").accordion();
	
	$("#dialog").draggable({ cursor: "move"});
	
	$( "button" ).button({ icons: { primary: "", secondary: "ui-icon-refresh" } }).click(function(){getJson();});
	
	//initialisation de la position de départ
	$("input[name='X']").val(0);
	$("input[name='Y']").val(0);
	$("input[name='Z']").val(0);
	
	init();

	$("#positionButton").click(function(){init();});
});

/**
* populate the tile Set with all the tiles 
*/
function populateTileSet(){
	var alreadySet=new Array();
	$("#tileset_1").append('<h4>Tiles</h4>');
	for(var type1 in tiles.types){
		$("#tileset_1").append('<p class="tile '+tiles[ tiles.types[type1]][ tiles.types[type1]]+'"></p>');
		alreadySet.push(tiles[ tiles.types[type1]][ tiles.types[type1]]);
		if(tiles.types[type1]=="water"){
			obstructiveTiles.push(tiles[ tiles.types[type1]][ tiles.types[type1]]);
		}
	}
	$("#tileset_1").append("<br/><h4>Brushes</h4><p class='brush brush_square_1'></p><p class='brush brush_square_2'></p><p class='brush brush_square_3'></p><br/>");
	
	$("#tileset_1").append("<p class='brush brush_round_1'></p><p class='brush brush_round_2'></p><p class='brush brush_round_3'></p>");
	
	for(var type1 in tiles.types){
		for(var type2 in tiles.types){
			var tileType1=tiles.types[type1];
			var tileType2=tiles.types[type2];
			if(type1!=type2 && $.inArray(tiles[tileType1][tileType2],alreadySet)<0){
				for(var y=1;y<=tiles.template.height;y++){
					for(var x=1;x<=tiles.template.width;x++){
						$("#tileset_2").append('<p class="tile '+tiles[ tileType1][tileType2]+'_'+x+'_'+y+'"></p>');
						alreadySet.push(tiles[tileType1][tileType2]);
						if(tileType1=="water" || tileType2 =="water"){
							obstructiveTiles.push(tiles[tileType1][tileType2]+'_'+x+'_'+y);
						}
					}
					$("#tileset_2").append('<br/>');
				}
			}
		}
	}
}

function init(){
	//ajout des tiles dans le tile set
	populateTileSet();
	
	position={x:$("input[name='X']").val(),y:$("input[name='Y']").val(),z:$("input[name='Z']").val()};
	$("#mapContainer").html('');
	$("#mapContainer").append("<div class='goDown'></div>").append("<div class='goUp'></div>").append("<div class='goLeft'></div>").append("<div class='goRight'></div>");
	
	mapID='map_'+position.x+'_'+position.y+'_'+position.z;

	map=mapContent[mapID];
	if(mapContent[mapID]===undefined){
		createMapObject(mapID);
	}
	//INITIALISATION
	var offset={x:100,y:100};

	for(var y=-1;y<=1;y++){
		for(var x=-1;x<=1;x++){
			var id="map_"+(position.x*1+x)+"_"+(position.y*1+y)+"_"+position.z;
			if(mapContent[id]!=undefined || id==mapID){
				var top=offset.y+((mapConfiguration.height)*y*mapConfiguration.unit);
				var left=offset.x+((mapConfiguration.width)*x*mapConfiguration.unit);
				drawMap(id,top,left);
			}
			if(id==mapID){
				$("#"+id).removeClass("notEditableMap").addClass("editableMap");
			}
		}
	}
	$("#tileset_1 .brush.brush_square_1").addClass("selected");
	
	//LISTENERS
	$(".goLeft").click(function(){$("input[name='X']").val(position.x*1-1);init();});
	$(".goRight").click(function(){$("input[name='X']").val(position.x*1+1);init();});
	$(".goUp").click(function(){$("input[name='Y']").val(position.y*1-1);init();});
	$(".goDown").click(function(){$("input[name='Y']").val(position.y*1+1);init();});
	
	$(".tileset .tile").click(function(){
		$(".tile.selected").removeClass("selected");
		selectedClass=$(this).attr("class");
		$(this).addClass("selected");
	});
	
	$("#tileset_2 .tile").click(function(){
		$("#tileset_1 .brush.selected").removeClass("selected");
		$("#tileset_1 .brush.brush_square_1").addClass("selected");
		var cursor=$("#cursor");
		cursor.removeClass();
		cursor.addClass("brush_square_1");
	});
	
	$(".tileset .brush").click(function(){
		if(!$(this).hasClass("selected")){
			$(".brush.selected").removeClass("selected");
			$(this).addClass("selected");
			
			var cursor=$("#cursor");
			cursor.removeClass();
			cursor.addClass("brush");
			if($(".tileset .brush.selected").hasClass("brush_square_1")){
				cursor.addClass("brush_square_1");
			}else if($(".tileset .brush.selected").hasClass("brush_square_2")){
				cursor.addClass("brush_square_2");
			}else if($(".tileset .brush.selected").hasClass("brush_square_3")){
				cursor.addClass("brush_square_3");
			}else if($(".tileset .brush.selected").hasClass("brush_round_1")){
				cursor.addClass("brush_round_1");
			}else if($(".tileset .brush.selected").hasClass("brush_round_2")){
				cursor.addClass("brush_round_2");
			}else if($(".tileset .brush.selected").hasClass("brush_round_3")){
				cursor.addClass("brush_round_3");
			}
			
		}
	});

	$("#mapContainer").mousedown(function(){
		mouseDown=true;
	});
	$("#mapContainer").mouseup(function(){
		mouseDown=false;
	});
	
	
	//Clic sur la carte
	$("#mapContainer").click(function(e){
		if(selectedClass!=undefined && selectedClass!=null){
			changeMapTile(e,$(this).find("#cursor"));
		}
	});
	$("#mapContainer").mousemove(function(e){
		moveCursor(e);
		if(selectedClass!=undefined && selectedClass!=null && mouseDown){
			changeMapTile(e,$(this).find("#cursor"));
		}
	});
	$("#mapContainer").hover(function(){
		$(this).find("#cursor").css("visibility","visible");
	},function(){
		$(this).find("#cursor").css("visibility","hidden");
	});

	$(".tile").css("height",mapConfiguration.unit);
	$(".tile").css("width",mapConfiguration.unit);
}

function drawMap(mapID,top,left){
	$("#mapContainer").append('<div id="'+mapID+'" class="map notEditableMap" style="left:'+left+'px;top:'+top+'px;"></div');
	$("#"+mapID).css("width",(mapConfiguration.width*mapConfiguration.unit)+"px");
	$("#"+mapID).css("height",(mapConfiguration.height*mapConfiguration.unit)+"px");
	
	if(mapContent[mapID]===undefined){
		createMapObject(mapID);
	}
	
	for(var x=0;x<mapConfiguration.width;x++){
		for(var y=0;y<mapConfiguration.height;y++){
			var type="grass";
			if(mapContent[mapID]!=undefined && mapContent[mapID].tile[x+"_"+y]!=undefined){
				type=mapContent[mapID].tile[x+"_"+y];
				if(mapContent[mapID].occupation[x+"_"+y]!=undefined){
					type+=" noPass";
				}
			}else{
				mapContent[mapID].tile[x+"_"+y]=type;
				mapContent[mapID].occupation[x+"_"+y]=StaticOccupationTypes.grass;
			}
			$("#"+mapID).prepend("<div class='tile "+type+"' id='tile_"+x+"_"+y+"' style='left:"+x*mapConfiguration.unit+"px;top:"+y*mapConfiguration.unit+"px;"+"'></div>");
		}
	}
}

/**
*	Crée un  nouvel objet map à partir de la position courante
*/
function createMapObject(mapID){
	mapContent[mapID]=new Object();
	mapContent[mapID].UID=mapID;
	mapContent[mapID].tile=new Object();
	mapContent[mapID].occupation=new Object();
	mapContent[mapID].size={width:mapConfiguration.width,height:mapConfiguration.height};
	mapContent[mapID].position={x:(position.x*1),y:(position.y*1),z:(position.z*1)};
}

function moveCursor(e){
	var point=getMousePosition({x:e.pageX,y:e.pageY});
	var cursor=$("#cursor");
	if(cursor.length == 0){
		if($(".tileset .brush.selected").hasClass("brush_square_1")){
			$("#mapContainer").append("<div id='cursor' class='brush_square_1'></div>");
		}else if($(".tileset .brush.selected").hasClass("brush_square_2")){
			$("#mapContainer").append("<div id='cursor' class='brush_square_2'></div>");
		}else if($(".tileset .brush.selected").hasClass("brush_square_3")){
			$("#mapContainer").append("<div id='cursor' class='brush_square_3'></div>");
		}else if($(".tileset .brush.selected").hasClass("brush_round_1")){
			$("#mapContainer").append("<div id='cursor' class='brush_round_1'></div>");
		}else if($(".tileset .brush.selected").hasClass("brush_round_2")){
			$("#mapContainer").append("<div id='cursor' class='brush_round_2'></div>");
		}else if($(".tileset .brush.selected").hasClass("brush_round_3")){
			$("#mapContainer").append("<div id='cursor' class='brush_round_3'></div>");
		}
	}
	cursor.css("top",point.y+"px");
	cursor.css("left",point.x+"px");
}


function getMousePosition(point){
	var result={x:point.x,y:point.y};
	result.x -=$("#mapContainer").offset().left;
	result.y -=$("#mapContainer").offset().top;
	
	result.x=Math.floor(result.x/mapConfiguration.unit)*mapConfiguration.unit;
	result.y=Math.floor(result.y/mapConfiguration.unit)*mapConfiguration.unit;
	return result;
}

function changeMapTile(event,element){
	var point=getMousePosition({x:event.pageX-100,y:event.pageY-100});
	
	point.x=point.x/mapConfiguration.unit;
	point.y=point.y/mapConfiguration.unit;
	
	var radius=0;
	var isSquare=true;
	if($(".tileset .brush.selected").hasClass("brush_square_1")){
		radius = 1;
	}else if($(".tileset .brush.selected").hasClass("brush_square_2")){
		radius = 2;
	}else if($(".tileset .brush.selected").hasClass("brush_square_3")){
		radius = 4;
	}else if($(".tileset .brush.selected").hasClass("brush_round_1")){
		isSquare=false;
		radius = 1;
	}else if($(".tileset .brush.selected").hasClass("brush_round_2")){
		isSquare=false;
		radius = 2;
	}else if($(".tileset .brush.selected").hasClass("brush_round_3")){
		isSquare=false;
		radius = 4;
	}
	var editableMap=$(".editableMap");
	var editableMapID  = editableMap.attr("id");
	
	if(mapsUpdateIDs[editableMapID]===undefined){
		mapsUpdateIDs[editableMapID]={x:position.x,y:position.y,z:position.z};
	}
	
	for(var y=0;y<radius;y++){
		for(var x=0;x<radius;x++){
			var element=editableMap.find("#tile_"+(point.x*1+x)+"_"+(point.y*1+y));
			//par défaut on met la classe sélectionnée
			var classe=selectedClass;
			//on essaye de récuprérer le tile le plus adapté
			try{
				classe = getTileType(x,y,radius,isSquare,point);
			}catch(error){
				console.log(error);
			}
			element.removeClass().addClass(classe);
			
			//save new tile
			mapContent[editableMapID].tile[(point.x*1+x)+"_"+(point.y*1+y)]=classe;
		}
	}
}

function getTileType(x,y,radius,isSquare,position){
	if(radius===1 && isSquare){
		return selectedClass;
	}

	selectedClass = selectedClass.replace("tile","").replace(" ","").replace("selected","");

	var mapID=$(".editableMap").attr('id');
	if(mapContent[mapID].tile==undefined){
		return "tile "+selectedClass;
	}
	// récupération des types des tiles entourant si nécéssaire
	var bordersTypes=new Object();
	//left
	var tile;
	tile = (position.x*1-1+x*1)+"_"+(position.y*1+y*1);
	if(x===0 && mapContent[mapID].tile[ tile ]!==undefined){
		var left=mapContent[mapID].tile[ tile ].replace("tile","").replace(" ","");
		if(left !== selectedClass){
			bordersTypes.left = getTileBorders(DirectionEnum.RIGHT,tile);
		}
	}
	
	//right
	tile = (position.x*1+x*1+1)+"_"+(position.y*1+y*1);
	if(x===radius*1-1 && mapContent[mapID].tile[ tile ]!==undefined){
		var right=mapContent[mapID].tile[ tile ].replace("tile","").replace(" ","");
		if(right !== selectedClass){
			bordersTypes.right = getTileBorders(DirectionEnum.LEFT,tile);
		}
	}
	
	//top
	tile = (position.x*1+x*1)+"_"+(position.y*1-1+y*1);
	if(y===0 && mapContent[mapID].tile[ tile ]!==undefined){
		var top =mapContent[mapID].tile[ tile ].replace("tile","").replace(" ","");
		if(top != selectedClass){
			bordersTypes.top=getTileBorders(DirectionEnum.BOTTOM,tile);
		}
	}
	
	//bottom
	tile =(position.x*1+x*1)+"_"+(position.y*1+1+y*1);
	if(y===radius*1-1 && mapContent[mapID].tile[ tile ]!=undefined){
		var bottom=mapContent[mapID].tile[ tile ].replace("tile","").replace(" ","");
		if(bottom != selectedClass){
			bordersTypes.bottom=getTileBorders(DirectionEnum.TOP,tile);
		}
	}
	

	//si pas de bords on met le tile par défaut
	if((bordersTypes.top === undefined && bordersTypes.right === undefined && bordersTypes.left === undefined && bordersTypes.bottom === undefined) ||
		(bordersTypes.top === fullBorders && bordersTypes.right === fullBorders && bordersTypes.left === fullBorders && bordersTypes.bottom === fullBorders)){
		return "tile "+selectedClass;
	}else{
		//sélection de l'ordre de la classe sélectionnée
		var order = getOrder(selectedClass,top,left,right,bottom);
		if(order.primary === selectedClass){
			bordersTypes = invertTypesOrder(bordersTypes);
		}
		if(order.primary === order.secondary){
			return "tile "+selectedClass;
		}
		
		//if no match we put the selected type
		var resultClass=selectedClass;
		//récupération du tile par défaut
		var defaultType;
		if(isSquare){
			defaultType=brushTiles[radius][order.selectedClass] ["square"] [x+"_"+y];
		}else{
			defaultType=brushTiles[radius][order.selectedClass] ["round"] [x+"_"+y];
		}
			
		//on vérifie que le tile par défaut est possible sinon on en cherche un autre
		if(defaultType === undefined){
			return "tile "+selectedClass;
		}else	if(isTypeAvailable(bordersTypes,defaultType)){
			resultClass = order.type+"_"+defaultType;
		}else{
			var foundType =findAvailableType(bordersTypes);
			if(foundType!==undefined){
				resultClass =  order.type+"_"+foundType;
			}
		}
		return "tile "+resultClass;
	}
}

/**
* Récupère l'ordre des types de tiles 
*
* TODO pas de gestion de 3 types ou plus
*/
function getOrder(selectedClass, top,left,right,bottom){
	var tab=new Array();
	var classe="";
	if(top!==undefined && tab[top]===undefined && top!=selectedClass){
		tab.push(top);
	}
	if(left!==undefined && tab[left]===undefined && left!=selectedClass){
		tab.push(left);
	}
	if(right!==undefined && tab[right]===undefined && right!=selectedClass){
		tab.push(right);
	}
	if(bottom!==undefined && tab[bottom]===undefined && bottom!=selectedClass){
		tab.push(bottom);
	}
	
	if(tab[0]===undefined ){
		classe=selectedClass;
	}else{
		classe=tab[0];
	}
	
	//si la classe est un composé de 2 types on n'en récupère qu'un seul
	var regex = /([a-z]+)_([a-z]+).*/; 
	if(regex.test(classe)) {
		var matches = classe.match(regex);
		if(RegExp.$1===selectedClass){
			classe=RegExp.$1;
		}else if (tiles.order[ tiles[selectedClass][RegExp.$1] ] [RegExp.$1] ==="primary"){
			classe=RegExp.$1;
		}else{
			classe=RegExp.$2;
		}
	}
	
	//on crée un objet : {type1:primary,type2:secondary}
	var order = tiles.order[tiles[selectedClass][classe]];
	
	if(order!==undefined && order[selectedClass]!==undefined && order[selectedClass]==="primary"){
		//on rajoute à order {primary:type1,secondary:type2,selectedClass:primary/secondary}
		order.primary=selectedClass;
		order.secondary=classe;
		order.selectedClass="primary";
		order.type=tiles[selectedClass][classe];
	}else{
		if(order===undefined){
			order=new Object();
		}
		//on recrée l'objet identiquement que précédement
		order.primary=classe;
		order.secondary=selectedClass;
		
		order[classe]="primary";
		order[selectedClass]="secondary";
		
		if(selectedClass===classe){
			order.selectedClass="primary";
			order.type=selectedClass;
		}else{
			order.selectedClass="secondary";
			order.type=tiles[classe][selectedClass];
		}
	}
	return order;
}

function invertTypesOrder(bordersTypes){
	var reg1 = new RegExp('0', 'g');
	var reg2 = new RegExp('1', 'g');
	var reg3 = new RegExp('2', 'g');

	if(bordersTypes.top!==undefined){
		bordersTypes.top=bordersTypes.top.replace(reg1,"2").replace(reg2,"0").replace(reg3,"1");
	}
	if(bordersTypes.left!==undefined){
		bordersTypes.left=bordersTypes.left.replace(reg1,"2").replace(reg2,"0").replace(reg3,"1");
	}
	if(bordersTypes.right!==undefined){
		bordersTypes.right=bordersTypes.right.replace(reg1,"2").replace(reg2,"0").replace(reg3,"1");
	}
	if(bordersTypes.bottom!==undefined){
		bordersTypes.bottom=bordersTypes.bottom.replace(reg1,"2").replace(reg2,"0").replace(reg3,"1");
	}
	return bordersTypes;
}


function getTileBorders(direction,tile){
	var borders = new Object();

	var classes=$("#tile_"+tile).attr("class");
	if(classes === undefined){
		//uni
		borders.TOP=fullBorders;
		borders.LEFT=fullBorders;
		borders.RIGHT=fullBorders;
		borders.BOTTOM=fullBorders;
	}else{
		classes=classes.replace("tile","");

		var regex = /([a-z]+_[a-z]+)_([0-9]){1,2}_([0-9]){1,2}/g; 

		if(regex.test(classes)) {
			var matches = classes.match(regex);

			var x= (RegExp.$2*1+1);
			var y= (RegExp.$3*1+1);
			
			borders.TOP=TemplateOccupationHelper.getTop(x+"_"+y);
			borders.BOTTOM=TemplateOccupationHelper.getBottom(x+"_"+y);
			borders.LEFT=TemplateOccupationHelper.getLeft(x+"_"+y);
			borders.RIGHT=TemplateOccupationHelper.getRight(x+"_"+y);
				
		}else{
			//uni
			borders.TOP=fullBorders;
			borders.LEFT=fullBorders;
			borders.RIGHT=fullBorders;
			borders.BOTTOM=fullBorders;
		}
	}
	return borders[direction];
}

/**
* recherche un type possible par rapport à un point de la carte et une liste de directions à prendre en compte
*
*/
function findAvailableType(bordersTypes){
	for(var i in TemplateOccupation){
		var isAvailable=true;
		if(bordersTypes.top!==undefined){
			if(TemplateOccupationHelper.getBottom(TemplateOccupation[i]) ==="" || TemplateOccupationHelper.getBottom(TemplateOccupation[i]) !== bordersTypes.top){
				isAvailable = false;
			}
		}
		if(TemplateOccupationHelper.getRight(TemplateOccupation[i]) ==="" || bordersTypes.left!==undefined){
			if(TemplateOccupationHelper.getRight(TemplateOccupation[i]) !== bordersTypes.left){
				isAvailable = false;
			}
		}
		if(TemplateOccupationHelper.getLeft(TemplateOccupation[i]) ==="" || bordersTypes.right!==undefined){
			if(TemplateOccupationHelper.getLeft(TemplateOccupation[i]) !== bordersTypes.right){
				isAvailable = false;
			}
		}
		if(TemplateOccupationHelper.getTop(TemplateOccupation[i]) ==="" || bordersTypes.bottom!==undefined){
			if(TemplateOccupationHelper.getTop(TemplateOccupation[i]) !== bordersTypes.bottom){
				isAvailable = false;
			}
		}
		if(isAvailable){
			return TemplateOccupation[i].UID;
		}
	}
}

/**
* Check if a tile can be set by comparing with its borders
*/
function isTypeAvailable(bordersTypes,typeToEvaluate){
	var result=true;
	var templateBorders=TemplateOccupationHelper.getBorders(typeToEvaluate);
	
	if(bordersTypes.top!==undefined){
		if(templateBorders.top != bordersTypes.top){
			result= false;
		}
	}
	if(bordersTypes.left!==undefined){
		if(templateBorders.left != bordersTypes.left){
			result= false;
		}
	}
	if(bordersTypes.right!==undefined){
		if(templateBorders.right != bordersTypes.right){
			result= false;
		}
	}
	if(bordersTypes.bottom!==undefined){
		if(templateBorders.bottom  !== bordersTypes.bottom){
			result= false;
		}
	}
	return result;
}

function getJson(){
	var  occupation=new Array();
	//on boucle sur les maps qui ont été lmise à jour
	for(var position in mapsUpdateIDs){
		var name='map_'+mapsUpdateIDs[position].x+'_'+mapsUpdateIDs[position].y+'_'+mapsUpdateIDs[position].z;
		if(mapsUpdates[name]===undefined){
			mapsUpdates[name]=new Object();
			mapsUpdates[name].UID=name;
			mapsUpdates[name].size={width:mapConfiguration.width,height:mapConfiguration.height};
			mapsUpdates[name].position={x:(mapsUpdateIDs[position].x*1),y:(mapsUpdateIDs[position].y*1),z:(mapsUpdateIDs[position].z*1)};
		}

		mapsUpdates[name].tile=new Object();
		$(".editableMap .tile").each(function(){
			var tilePosition={x:Math.floor($(this).position().left/mapConfiguration.unit),y:Math.floor($(this).position().top/mapConfiguration.unit)};
			var tileClass = $(this).attr("class").replace('tile','').replace(' ','');
			if(tileClass!=""){
				mapsUpdates[name].tile[tilePosition.x+"_"+tilePosition.y]=tileClass;
			}

			if($.inArray(tileClass, obstructiveTiles)>=0){
				occupation.push(tilePosition.x+"_"+tilePosition.y);
			}
		});
		
		//On réinitialise le tableau des occupations
		mapContent[name].occupation=new Array();
		mapsUpdates[name].occupation=new Array();
		for(var x=0;x<mapConfiguration.width;x++){
			mapContent[name].occupation[x]=new Array();
			mapsUpdates[name].occupation[x]=new Array();
			for(var y=0;y<mapConfiguration.height;y++){
				var tileNumber=x+"_"+y;
				if($.inArray(tileNumber, occupation)>=0){
					mapContent[name].occupation[x].push(StaticOccupationTypes.water);
					mapsUpdates[name].occupation[x].push(StaticOccupationTypes.water);
				}else{
					mapContent[name].occupation[x].push(StaticOccupationTypes.grass);
					mapsUpdates[name].occupation[x].push(StaticOccupationTypes.grass);
				}
			}
		}
	
	}
	//on passe par une chaine de caractère pour pouvoir avoir les cartes séparées les unes des autres
	var result = "";
	for(var i in mapsUpdates){
		result +='mapContent["'+mapsUpdates[i].UID+'"]=';
		result += JSON.stringify(mapsUpdates[i], null);
		result +=";"+"\n";
	}
	//on affiche le résultat
	$("#scriptMaps").val(result);
}