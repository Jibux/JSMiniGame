var MapHelper={
	/**
	* dessine les tiles d'une carte
	* @param mapID
	* @param ctx (canvas context)
	*/
	drawMapTiles: function(mapID,ctx){
		var tileSize = TemplateDefinition.tileSize;
		
		for(var x = 0; x < mapContent[mapID].size.width; x++) {
			for(var y = 0; y < mapContent[mapID].size.height; y++) {
				var type = mapContent[mapID].tile[x+"_"+y];
				
				var regexBasics  = /^([a-zA-Z]+)$/; 
				var regexDerived = /^([a-zA-Z]+)([0-9]+)$/; 
				var regexTemplate = /^([a-zA-Z]+)([0-9]*)_([a-zA-Z]+)([0-9]*)_([0-9_]+)$/; 
				
				if(regexBasics.test(type)) {
					var imgName = type;
				
					//pour le debug la case est par défaut en bleu
					ctx.fillStyle = "rgb(0, 0, 255)";
					ctx.fillRect( x*tileSize, y*tileSize, tileSize, tileSize);
					
					if(typeof(ResourcesLoader.resources[imgName]) !== "undefined"){
						var img = ResourcesLoader.resources[imgName];
						ctx.drawImage(img, 0, 0, tileSize, tileSize, x*tileSize, y*tileSize,tileSize,tileSize);
					}
				}else if(regexDerived.test(type)){
					var matches = type.match(regexDerived);
					var imgName = RegExp.$1;
					var imgPosition = MapHelper.getTileImagePosition(imgName, RegExp.$2);
					
					//pour le denug la case est par défaut en vert
					ctx.fillStyle = "rgb(0, 255, 0)";
					ctx.fillRect( x*tileSize, y*tileSize, tileSize, tileSize);
						
					if(typeof(ResourcesLoader.resources[imgName]) !== "undefined" && typeof(imgPosition) !== "undefined"){
						var img = ResourcesLoader.resources[imgName];
						ctx.drawImage(img, imgPosition.x, imgPosition.y, tileSize, tileSize, x*tileSize, y*tileSize,tileSize,tileSize);
					}
				}else if(regexTemplate.test(type)){
					var imgName1 = RegExp.$1;
					//var imgPosition1 = MapHelper.getTileImagePosition(imgName1, RegExp.$2 );
					var imgName2 = RegExp.$3;
					//var imgPosition2 = MapHelper.getTileImagePosition(imgName2, RegExp.$4 );
					var templateCoordinates =  RegExp.$5 ;
					
					//pour le debug la case est par défaut en rouge
					ctx.fillStyle = "rgb(255, 0, 0)";
					ctx.fillRect( x*tileSize, y*tileSize, tileSize, tileSize);
					
					if(typeof(templateCoordinates) === "undefined"){
						templateCoordinates =0;
					}
					
					var templatePosition = TemplateDefinition.tileset[ templateCoordinates ];
					var templateOppositePosition = TemplateDefinition.tileset[ TemplateOpposites[templateCoordinates] ];
					
					MapHelper.drawCustomMapTile(ctx,x,y,imgName1,imgName2,templatePosition);
						
				}else{
					ctx.fillStyle = "rgb(255, 255, 0)";
					ctx.fillRect( x*tileSize, y*tileSize, tileSize, tileSize);
				}
				if(typeof(showGrid) !== "undefined" && showGrid === true){
					ctx.strokeRect( x*tileSize, y*tileSize, tileSize, tileSize);
				}
			}
		}
	},
	
	/**
	* dessine les tiles particuliers d'un carte
	*/
	drawCustomMapTile: function(ctx,x,y,imgName1,imgName2,templatePosition){
		var img = "";
		
		if(typeof(ResourcesLoader.resources[imgName1+"_"+imgName2]) !== "undefined"){
			img = ResourcesLoader.resources[imgName1+"_"+imgName2];
		}else if(typeof(ResourcesLoader.resources[imgName2+"_"+imgName1]) !== "undefined"){
			img = ResourcesLoader.resources[imgName2+"_"+imgName1];
		}
		
		if(img !== ""){
			ctx.drawImage(img, templatePosition.x, templatePosition.y, TemplateDefinition.tileSize, TemplateDefinition.tileSize, x*TemplateDefinition.tileSize, y*TemplateDefinition.tileSize,TemplateDefinition.tileSize,TemplateDefinition.tileSize);
		}
		
		/*
		var templateImg = ResourcesLoader.resources["template"];
		if($("#template_canvas").length === 0){
			$("body").append("<canvas id='template_canvas' width='"+templateImg.width+"' height='"+templateImg.height+"'></canvas>");
		}
		var ctxTemplate = document.getElementById("template_canvas").getContext('2d');
		ctxTemplate.drawImage(templateImg,0,0);
		var imgData=ctx.getImageData(x,y,x+TemplateDefinition.tileSize,y+TemplateDefinition.tileSize);
		var mapPixel = imageData.data; // Récupération du tableau de pixels

		for(var counter=0 ; counter < mapPixel.length ;counter+=4){
			var red = mapPixel[counter];
			var green = mapPixel[counter+1];
			var blue = mapPixel[counter+2];
			var alpha = mapPixel[counter+3];
			if(alpha==255){
				ctx.drawImage(ResourcesLoader.resources[imgName2], (imgPosition2.x + xTmp), (imgPosition2.y + yTmp), 1, 1, x*tileSize, y*tileSize,1,1);
			}else{
				ctx.drawImage(ResourcesLoader.resources[imgName1], (imgPosition1.x + xTmp), (imgPosition1.y + yTmp), 1, 1, x*tileSize, y*tileSize,1,1);
			}
		}
		*/
	},
	/**
	* permet de retrouver la position d'une image d'un tile par rapport à son index
	* @param imgName
	* @paral index
	*/
	getTileImagePosition:function(imgName,index){
		var img = ResourcesLoader.resources[imgName];
		var position = new Object();
		position.x = Math.round(index * TemplateDefinition.tileSize /  img.width)  * TemplateDefinition.tileSize;
		position.y = Math.round(index * TemplateDefinition.tileSize %  img.width) ;
		
		//TO BE CORRECTED
		if(position.x >= img.width){
			position.x =0;
		}
		
		return position;
	}
};