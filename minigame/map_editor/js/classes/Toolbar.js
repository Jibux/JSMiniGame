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
				"paint":{img:"paintbrush.png"},
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
			params.width=200;
			params.height=200;
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
	setMoveActive:function(){
		if($("#toolbar_dialog #moveLayers_button").hasClass("selected")){
			$("#toolbar_dialog .ui_button").removeClass("selected");
			$("#screen").removeClass("move");
			selectedButton="";
		}else{
			$("#toolbar_dialog .ui_button").removeClass("selected");
			$("#toolbar_dialog #moveLayers_button").addClass("selected");
			$("#screen").removeClass(selectedButton).addClass("move");
			selectedButton="MOVE";
		}
	},
	
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
	showLayersDialog:function(){
		if($("#layers_dialog").length===0){
			var params = new Object();
			params.ID = "layers_dialog";
			params.title=Lang.getString("layers");
			params.width=200;
			params.height=200;
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
	zoomIn:function(){
		scale.value+=scale.step;
		if(scale.value>scale.max){
			scale.value=scale.max;
		}
		$('#container').css("transform","scale("+scale.value+")");
	},
	zoomOut:function(){
		scale.value-=scale.step;
		if(scale.value<scale.min){
			scale.value=scale.min;
		};
		$('#container').css("transform","scale("+scale.value+")");
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
		params.width=55;
		params.height=290;
		params.closable=false;
		params.collapsable=false;
		params.resizable=false;
		params.logoLink="./resources/brushes.png";
		
		HTMLGenerator.append("body", dialog_ihm,params);
		$("#toolbar_dialog").css("top","25%");
		$("#toolbar_dialog").css("left",20);
		Toolbar.refreshToolbar();
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
			
			$("#toolbar_dialog .body").append("<hr/><img src='./resources/2D.png' /><input type='checkbox' class='ui_switch_mini' name='changeLandMark' "+(viewLandMark === "2D" ? "checked" : "")+"/><img src='./resources/3D.png' />");
			$("input[name=changeLandMark]").click(function(){
				if($(this).is(":checked")){
					$("#screen").removeClass("view_3D").addClass("view_2D");
					viewLandMark="2D";
				}else{
					$("#screen").removeClass("view_2D").addClass("view_3D");
					viewLandMark="3D";
				}
			});
			$("#toolbar_dialog .body").append("<hr/>");
			$("#toolbar_dialog .body").append("<div class='tilesSelectionContainer'></div>");
			$("#toolbar_dialog .body .tilesSelectionContainer").append("<div style='background-image:url(../resources/images/"+TileSet[selectedTypes.secondary].img+");'  class='tile secondary'></div>");
			$("#toolbar_dialog .body .tilesSelectionContainer").append("<div style='background-image:url(../resources/images/"+TileSet[selectedTypes.primary].img+");' class='tile primary' ></div>");
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
			for(var type in TileSet){
				if(type !== selectedTypes.primary && type !== selectedTypes.secondary){
					$("#types_dialog .body").append("<div id='"+type+"' class='tile' style='background-image:url(../resources/images/"+TileSet[type].img+")' ></div>");
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
	* raffraichi les types sélectionnés
	*/
	refreshSelectedTypes:function(){
		$("#toolbar_dialog .body .tilesSelectionContainer .primary").css("background-image","url(../resources/images/"+TileSet[selectedTypes.primary].img+")");
		$("#toolbar_dialog .body .tilesSelectionContainer .secondary").css("background-image","url(../resources/images/"+TileSet[selectedTypes.secondary].img+")");
	},
	
}