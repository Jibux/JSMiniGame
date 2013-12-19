var Toolbar={

	//définition des modes (calques) de la toolbar
	"mode":{
		"image_layer":{
			"locked":true,
			"visible":false,
		},
		"tiles_layer":{
			"locked":false,
			"visible":true,
			"buttons":{
				"generateCode":{img:"application_xp_terminal.png",fn:function(){Toolbar.showCodeDialog();}},
				"moveLayers":{img:"move.png",fn:function(){Toolbar.setMoveActive();}},
				"selectRectangle":{img:"select_restangular.png"},
				"selectEllipses":{img:"select_ellipse.png"},
				"selectContinuous":{img:"select_continuous_area.png"},
				"selectLasso":{img:"select_lasso.png"},
				"paint":{img:"paintbrush.png",fn:function(){Toolbar.setPaintActive();}},
				"fill":{img:"paintcan.png"},
				
				"separator_1":{separator:true},
				
				"layers":{img:"layers.png",fn:function(){Toolbar.showLayersDialog();}},
				"grid":{img:"layer_grid.png",fn:function(){Toolbar.showGrid();}},
				
				"separator_2":{separator:true},
				
				"zoomIn":{img:"magnifier_zoom_in.png",fn:function(){Toolbar.zoomIn();}},
				"zoomOut":{img:"magnifier_zoom_out.png",fn:function(){Toolbar.zoomOut();}},
			}
		},
		"objects_layer":{
			"locked":true,
			"visible":false,
		}
	},
	
	
	//functions 
	showCodeDialog:function(){
		if($("#code_dialog").length===0){
			var params = new Object();
			params.ID = "code_dialog";
			params.title=Lang.getString("toolbar.generateCode");
			params.width=300;
			params.height=100;
			params.logoLink="./resources/application_xp_terminal.png";
			HTMLGenerator.append("body", dialog_ihm,params);
			var offset = $("#toolbar_dialog .body #generateCode_button").offset();
			
			$("#code_dialog").css("top",offset.top);
			$("#code_dialog").css("left",offset.left+55);
			
			$("#code_dialog .body").append("<div id='refreshCode_button' class='ui_button' style='position:absolute;right:2px;'><img src='./resources/arrow_refresh.png' /><div class='ui_tooltip'>"+Lang.getString("refresh")+"</div></div>");
			$("#code_dialog .body").append("<textarea id='codeResult' style='resize:none;width:100%;height:100%;'></textarea>");
			
			$("#refreshCode_button").click(function(){
				$("#code_dialog .body #codeResult").val(getJson() );
			});
		}
	},
	/**
	* active/desactive la fonction de déplacement
	*/
	setMoveActive:function(){
		if($("#toolbar_dialog #moveLayers_button").hasClass("selected")){
			$("#toolbar_dialog .ui_button").removeClass("selected");
			$("#screen").removeClass("move");
			selectedButton="";
		}else{
			$("#toolbar_dialog .ui_button").removeClass("selected");
			$("#toolbar_dialog #moveLayers_button").addClass("selected");
			$("#screen").removeClass(selectedButton).addClass("move");
			$("#screen .mouse_layer").remove();
			selectedButton="MOVE";
		}
	},
	
	/**
	* active le pinceau
	*/
	setPaintActive:function(){
		if($("#toolbar_dialog #paint_button").hasClass("selected")){
			$("#toolbar_dialog .ui_button").removeClass("selected");
			$("#screen .mouse_layer").remove();
			selectedButton="";
		}else{
			$("#screen").removeClass("move");
			$("#toolbar_dialog .ui_button").removeClass("selected");
			$("#toolbar_dialog #paint_button").addClass("selected");
			selectedButton="PAINT";
			Toolbar.redrawBrushCursor();
		}
	},
	/**
	* affiche la dialog des pinceaux
	*/
	showBrushesDialog:function(){
		if($("#brush_dialog").length===0){
			var params = new Object();
			params.ID = "brush_dialog";
			params.title=Lang.getString("toolbar.brush");
			params.logoLink="./resources/brushes.png";
			HTMLGenerator.append("body", dialog_ihm,params);
			var offset = $("#toolbar_dialog .body #brush_button").offset();
			
			for(var counter in brushSet){
				if(counter !== selectedBrush){
					$("#brush_dialog .body").append("<div class='brush' id='brush_"+counter+"' data='"+counter+"'></div>");
					MapEditorHelper.drawBrush("#brush_dialog .body #brush_"+counter,"brush"+counter+"_canvas",brushSet[counter]);
				}
			}
			$("#brush_dialog .body .brush").click(function(){
				if($(this).hasClass("selected")){
					selectedBrush=$(this).attr("data");
					Toolbar.refreshBrush();
					Toolbar.redrawBrushCursor();
					$("#brush_dialog").remove();
				}else{
					$(this).parent().find(".brush").removeClass("selected");
					$(this).addClass("selected");
				}			
			});
			
			$("#brush_dialog").css("top",offset.top);
			$("#brush_dialog").css("left",offset.left+55);

		}
	},
	/**
	* active/desactive la grill
	*/
	showGrid:function(){
		showGrid = !showGrid;
		if(!showGrid){
			$("#screen").removeClass("grid");
		}else{
			$("#screen").addClass("grid");
		}
		// on rafraichie les cartes
		refreshMaps();
	},
	/**
	* affiche la dialog des calques
	*/
	showLayersDialog:function(){
		if($("#layers_dialog").length===0){
			var params = new Object();
			params.ID = "layers_dialog";
			params.title=Lang.getString("layers");
			params.height = 175;
			params.resizable=false;
			params.logoLink="./resources/layers.png";
			HTMLGenerator.append("body", dialog_ihm,params);
			var offset = $("#toolbar_dialog .body #layers_button").offset();
			$("#layers_dialog").css("top",offset.top);
			$("#layers_dialog").css("left",offset.left+55);
			$("#layers_dialog .body").append("<div class='header'><label>"+Lang.getString("layers.opacity")+"</label><input type='range' min='0' max='1' step='0.1' value='"+$("#screen ."+currentLayer).css("opacity")+"'name='layerOpacity' /></div>");
			$("input[name=layerOpacity]").change(function(){
				$("#screen ."+currentLayer).css("opacity",$(this).val());
			});
			for(var layer in Toolbar.mode){
				var params = new Object();
				params.ID=layer;
				params.name=Lang.getString("layers.name."+layer);
				params.isVisible = Toolbar.mode[layer].visible;
				params.isLocked = Toolbar.mode[layer].locked ;
				if(currentLayer === layer){
					params.selected="selected";
				}
				HTMLGenerator.append("#layers_dialog .body", layer_for_layersDialog_ihm,params);
			}
		}
	},
	/**
	* affiche la dialog des types de terrain
	* @param primary / secondary : le type à modifier
	*/
	showTypesDialog:function(tileSelected){
		if($("#types_dialog").length===0){
			var params = new Object();
			params.ID = "types_dialog";
			params.title=Lang.getString("tileType");
			params.width=200;
			params.height=200;
			params.resizable=false;
			params.logoLink="./resources/color_swatch.png";
			HTMLGenerator.append("body", dialog_ihm,params);
			var offset = $("#toolbar_dialog .body .tilesSelectionContainer .tile.primary").offset();
			$("#types_dialog").css("top",offset.top);
			$("#types_dialog").css("left",offset.left+55);
			for(var type in TileSet.basics){
				if(type !== selectedTypes.primary && type !== selectedTypes.secondary){
					$("#types_dialog .body").append("<div id='"+type+"' class='tile' style='background-image:url(../resources/images/"+TileSet.basics[type].img+")' ></div>");
					$("#types_dialog .body #"+type).click(function(){
						if($(this).hasClass("selected")){
							selectedTypes[tileSelected] = $(this).attr("id");
							Toolbar.refreshSelectedTypes();
							$("#types_dialog").remove();
						}else{
							$(this).parent().find(".selected").removeClass("selected");
							$(this).addClass("selected");
						}
					});
				}
			}
		}
	},
	/**
	* zoom avant
	*/
	zoomIn:function(){
		scale.value+=scale.step;
		if(scale.value>scale.max){
			scale.value=scale.max;
			$("#toolbar_dialog .body #zoomIn_button").addClass("ui_inactive_state");
		}else{
			$("#toolbar_dialog .body #zoomOut_button").removeClass("ui_inactive_state");
		}
		$('#container').css("transform","scale("+(scale.value/100)+")");
		Toolbar.addZoomValues();
	},
	/**
	* zoom arriere
	*/
	zoomOut:function(){
		scale.value-=scale.step;
		if(scale.value<scale.min){
			scale.value=scale.min;
			$("#toolbar_dialog .body #zoomOut_button").addClass("ui_inactive_state");
		}else{
			$("#toolbar_dialog .body #zoomIn_button").removeClass("ui_inactive_state");
		}
		$('#container').css("transform","scale("+(scale.value/100)+")");
		Toolbar.addZoomValues();
	},

	addZoomValues:function(){
		$("#zoomOut_button .ui_tooltip").each(function(){$(this).find(".value").remove();$(this).append("<span class='value'>"+(scale.value-scale.step)+"%</span>");});
		$("#zoomIn_button .ui_tooltip").each(function(){$(this).find(".value").remove();$(this).append("<span class='value'>"+(scale.value+scale.step)+"%</span>");});
	},
	/**
	* création de la toolbar
	*/
	init:function(){
		if($("#toolbar_dialog").length !== 0){
			$("#toolbar_dialog").remove();
		}
		
		var params = new Object();
		params.ID = "toolbar_dialog";
		params.title=Lang.getString("toolbar");
		params.width=58;
		params.height=340;
		params.closable=false;
		params.collapsable=false;
		params.resizable=false;
		params.logoLink="./resources/brushes.png";
		
		HTMLGenerator.append("body", dialog_ihm,params);
		$("#toolbar_dialog").css("top","25%");
		$("#toolbar_dialog").css("left",20);
		$("#toolbar_dialog").css("z-index",2);
		Toolbar.refreshToolbar();
		Toolbar.addZoomValues();
	},
	
	/**
	* remet à jour la toolbar
	*/
	refreshToolbar:function(){
		$("#toolbar_dialog .body").html("");
		if(typeof(Toolbar.mode[currentLayer]) !== "undefined"){
			for(var button in Toolbar.mode[currentLayer]["buttons"]){
				if(typeof(Toolbar.mode[currentLayer]["buttons"][button].separator) !== "undefined" && Toolbar.mode[currentLayer]["buttons"][button].separator ===true){
					$("#toolbar_dialog .body").append("<hr/>");
				}else{
					$("#toolbar_dialog .body").append("<div id='"+button+"_button' class='ui_button'><img src='./resources/"+Toolbar.mode[currentLayer]["buttons"][button].img+"' /><div class='ui_tooltip'>"+Lang.getString("toolbar."+button)+"</div></div>");
					if( typeof(Toolbar.mode[currentLayer]["buttons"][button].fn) !== "undefined"){
						$("#toolbar_dialog .body #"+button+"_button").click(function(){
							Toolbar.mode[currentLayer]["buttons"][$(this).attr("id").replace("_button","")].fn();
						});
					}else{
						$("#toolbar_dialog .body #"+button+"_button").addClass("ui_inactive_state");
					}
				}
			}
			
			$("#toolbar_dialog .body").append("<hr/>");
			$("#toolbar_dialog .body").append("<div id='brush_button'></div>");
			Toolbar.refreshBrush();
			$("#brush_button").click(function(){
				Toolbar.showBrushesDialog();
			});
			
			$("#toolbar_dialog .body").append("<hr/><img src='./resources/2D.png' /><input type='checkbox' class='ui_switch_mini' name='changeLandMark' "+(viewLandMark === "2D" ? "checked" : "")+"/><img src='./resources/3D.png' />");
			$("input[name=changeLandMark]").click(function(){
				$("body").addClass("loading");
				if($(this).is(":checked")){
					$("#screen").removeClass("view_3D").addClass("view_2D");
					viewLandMark="2D";
				}else{
					$("#screen").removeClass("view_2D").addClass("view_3D");
					viewLandMark="3D";
				}
				$("body").removeClass("loading");
			});
			$("#toolbar_dialog .body").append("<hr/>");
			$("#toolbar_dialog .body").append("<div class='tilesSelectionContainer'></div>");
			$("#toolbar_dialog .body .tilesSelectionContainer").append("<div style='background-image:url(../resources/images/"+TileSet.basics[selectedTypes.secondary].img+");'  class='tile secondary'></div>");
			$("#toolbar_dialog .body .tilesSelectionContainer").append("<div style='background-image:url(../resources/images/"+TileSet.basics[selectedTypes.primary].img+");' class='tile primary' ></div>");
			$("#toolbar_dialog .body .tilesSelectionContainer").append("<input type='checkbox' class='swapTiles' name='swapTiles' />");
			
			$("#toolbar_dialog .body .tilesSelectionContainer .tile").click(function(){
				var tmp = $(this).hasClass("primary") ? "primary" : "secondary";
				Toolbar.showTypesDialog( tmp );
			});
			$("input[name=swapTiles]").click(function(){
				var tmp = selectedTypes.secondary;
				selectedTypes.secondary = selectedTypes.primary;
				selectedTypes.primary = tmp;
				Toolbar.refreshSelectedTypes();
			});
		}
	},
	/**
	* raffraichi le pinceau selectionne
	*/
	refreshBrush:function(){
		$("#toolbar_dialog .body #brush_button").html("");
		var scale = 1;
		if(brushSet[selectedBrush].size.width > brushSet[selectedBrush].size.height){
			scale = (maxBrushSize.x - brushSet[selectedBrush].size.width) / 10;
		}else{
			scale = (maxBrushSize.y - brushSet[selectedBrush].size.height) / 10;
		}
		MapEditorHelper.drawBrush("#toolbar_dialog .body #brush_button","brush_canvas",brushSet[selectedBrush] , scale);
	},
	/**
	* raffraichi les types sélectionnés
	*/
	refreshSelectedTypes:function(){
		$("#toolbar_dialog .body .tilesSelectionContainer .primary").css("background-image","url(../resources/images/"+TileSet.basics[selectedTypes.primary].img+")");
		$("#toolbar_dialog .body .tilesSelectionContainer .secondary").css("background-image","url(../resources/images/"+TileSet.basics[selectedTypes.secondary].img+")");
	},
	/**
	* redessine le curseur de la souris
	*/
	redrawBrushCursor:function(){
		if($("#screen .mouse_layer").length === 0){
			$("#screen #container").append("<div class='layer mouse_layer'></div>");
		}else{
			$("#screen #container .mouse_layer").html("");
		}
		MapEditorHelper.drawBrush("#screen #container .mouse_layer","mouse", brushSet[ selectedBrush ] ,(scale.value/100));
	},
}