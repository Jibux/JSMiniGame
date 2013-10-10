/**
* dialog_ihm

<div id="$ID$" class="ui_dialog" style="width:$width:100$px;height:$height:100$px;">
	<div class="header">
		<div class="title">
			<img src="$logoLink:$" style="width:16px;height:16px;"/>
			$title:$
		</div>
		<div class="buttons">
			<div class="button collapse"></div>
			<div class="button close"></div>
		</div>
	</div>
	<div class="body">
		$body:$
	</div>
	<div class="footer">
		$footer:$
	</div>
</div>


* @param	ID
* @param	width	:	100
* @param	height	:	100
* @param	draggable	:	true
* @param	resizable	:	true
* @param	collapsable	:	true
* @param	closable	:	true
* @param	logoLink	:	[valeur par défaut vide]
* @param	title	:	[valeur par défaut vide]
* @param	body	:	[valeur par défaut vide]
* @param	footer	:	[valeur par défaut vide]
*/
var dialog_ihm={"html":[{"name":"DIV","attr":[{"name":"id","value":"$ID$"},{"name":"class","value":"ui_dialog"},{"name":"style","value":"width:$width:100$px;height:$height:100$px;"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"header"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"title"}],"child":[{"name":"IMG","attr":[{"name":"src","value":"$logoLink:$"},{"name":"style","value":"width:16px;height:16px;"}]},{"content":"$title:$"}]},{"name":"DIV","attr":[{"name":"class","value":"buttons"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"button collapse"}]},{"name":"DIV","attr":[{"name":"class","value":"button close"}]}]}]},{"name":"DIV","attr":[{"name":"class","value":"body"}],"child":[{"content":"$body:$"}]},{"name":"DIV","attr":[{"name":"class","value":"footer"}],"child":[{"content":"$footer:$"}]}]}],
beforeLoad: function(params){},
afterLoad: function(params){
	if(typeof(params.ID) !== "undefined"){
		//suppression des boutons si besoin
		if(typeof(params.collapsable) !== "undefined" && params.collapsable===false){
			$("#"+params.ID+" .header .buttons .collapse").remove();
		}
		if(typeof(params.closable) !== "undefined" && params.closable===false){
			$("#"+params.ID+" .header .buttons .close").remove();
		}
		if(typeof(params.collapsable) !== "undefined" && params.collapsable===false && typeof(params.closable) !== "undefined" && params.closable===false){
			$("#"+params.ID+" .header .buttons").remove();
		}
		//gestion du drag et du resize
		if(typeof(params.draggable) === "undefined" || params.draggable===true){
			$("#"+params.ID).draggable({ handle: ".header .title",containment: "body" });
		}
		if(typeof(params.resizable) === "undefined" || params.resizable===true){
			$("#"+params.ID).resizable({minHeight: 150,minWidth: 100,maxHeight: 800,maxWidth: 1000,});
		}
		
		//gestion des boutons du header
		$("#"+params.ID+" .close").click(function(){
			$("#"+params.ID).remove();
		});
		$("#"+params.ID+" .collapse, #"+params.ID+" .expand").click(function(){
			collapse();
		});
	}
	
	function collapse(){
		if( $("#"+params.ID+" .collapse").length > 0){
			var bodyHeight=$("#"+params.ID+" .body").height();
			$("#"+params.ID+" .body").hide();
			$("#"+params.ID).height($("#"+params.ID+" .header").height()+$("#"+params.ID+" .footer").height()+4);
			$("#"+params.ID+" .collapse").removeClass("collapse").addClass("expand");
			
			//on enregistre la taille du body
			$("#"+params.ID+" .expand").attr("data",'{"bodyHeight":'+bodyHeight+'}');
		}else{
			//on récupère la taille du body précédement enregistrée
			var json=$("#"+params.ID+" .expand").attr("data");
			var dataAttr = $.parseJSON(json);
			var bodyHeight = dataAttr["bodyHeight"];
			
			$("#"+params.ID+" .body").height(bodyHeight);
			$("#"+params.ID).height($("#"+params.ID+" .header").height()+bodyHeight+$("#"+params.ID+" .footer").height()+4);
			$("#"+params.ID+" .body").show();
			$("#"+params.ID+" .expand").removeClass("expand").addClass("collapse");
		}	
	}
}
};