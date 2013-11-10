var MapEditorHelper={
	drawBrush:function(container,name,brush,scale){
		if(typeof(scale) === "undefined"){
			scale = 1;
		}
	
		var img=new Image();
		img.src="resources/tileTemplate.png";
		
		img.onload = function(){
			if( typeof(brush) === "object"){
		
				var width = brush.size.width;
				var height = brush.size.height;

				$(container).append('<canvas id="'+name+'_canvas" width="'+ (width*TemplateDefinition.tileSize )+'" height="'+ ( height *TemplateDefinition.tileSize ) +'"></canvas>');
				var ctx = document.getElementById(name+"_canvas").getContext('2d');
				
				for(var y=1; y<= brush.size.height; y++){
					for(var x=1; x<= brush.size.width; x++){
						var imgPosition;
						if(brush.tiles[ x+"_"+y ] === 0){
							imgPosition=new Object();
							imgPosition.x = 0;
							imgPosition.y = 0;
						}else if(brush.tiles[ x+"_"+y ] ===1){
							imgPosition=new Object();
							imgPosition.x = 0;
							imgPosition.y = TemplateDefinition.tileSize;
						}else{
							imgPosition = TemplateDefinition.tileset [ brush.tiles[ x+"_"+y ] ];
							if(typeof(imgPosition) === "undefined"){
								console.log(x+"_"+y+": "+brush.tiles[ x+"_"+y ]+"\n"+JSON.stringify(brush.tiles, null));
							}
						}
						ctx.drawImage(img,  (imgPosition.x), (imgPosition.y), TemplateDefinition.tileSize, TemplateDefinition.tileSize,(x-1)*TemplateDefinition.tileSize*scale, (y-1)*TemplateDefinition.tileSize*scale,TemplateDefinition.tileSize*scale,TemplateDefinition.tileSize*scale);
						if(typeof(configuration) !== "undefined" && typeof(configuration.mode) !== "undefined" && configuration.mode === MODE_ENUM.DEBUG){
							ctx.strokeRect( (x-1)*TemplateDefinition.tileSize, (y-1)*TemplateDefinition.tileSize, TemplateDefinition.tileSize, TemplateDefinition.tileSize);//ajout de bordures pour le debug
						}
					}
				}
			}
		};
	},

	invertBrush:function(brush){
		var result = new Object();
		result.size = brush.size;
		
		result.tiles =new Object();
		for(var y=1; y<= brush.size.height; y++){
			for(var x=1; x<= brush.size.width; x++){
				result.tiles[ x+"_"+y ] = TemplateOpposites[ brush.tiles[ x+"_"+y ] ];
			}
		}
		return result;
	}
};