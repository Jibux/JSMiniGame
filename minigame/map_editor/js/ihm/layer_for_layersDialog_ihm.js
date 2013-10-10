/**
* layer_for_layersDialog_ihm

<div id="$ID$" class="layer $selected:$">
    <input type="checkbox" class="checkbox_eye" name="$ID$_Visible" checked="$isVisible$" />
    <span class="name">$name$</span>
    <input type="checkbox" class="checkbox_locker" name="$ID$_Locked" checked="$isLocked$" />
</div>

* @param	ID
* @param	isVisible
* @param	name
* @param	isLocked
* @param	selected	:	[valeur par défaut vide]
*/
var layer_for_layersDialog_ihm={"html":[{"name":"DIV","attr":[{"name":"id","value":"$ID$"},{"name":"class","value":"layer $selected:$"}],"child":[{"name":"INPUT","attr":[{"name":"type","value":"checkbox"},{"name":"class","value":"checkbox_eye"},{"name":"name","value":"$ID$_Visible"},{"name":"checked","value":"$isVisible$"}]},{"name":"SPAN","attr":[{"name":"class","value":"name"}],"child":[{"content":"$name$"}]},{"name":"INPUT","attr":[{"name":"type","value":"checkbox"},{"name":"class","value":"checkbox_locker"},{"name":"name","value":"$ID$_Locked"},{"name":"checked","value":"$isLocked$"}]}]}],
beforeLoad: function(params){},
afterLoad: function(params){
		if(typeof(params.ID) !== "undefined"){
	
		$("#"+params.ID).click(function(){
			currentLayer=params.ID;
			$(this).parent().find(".layer").removeClass("selected");
			$(this).addClass("selected");
			$("input[name=layerOpacity]").val($("#screen ."+currentLayer).css("opacity"));
		});
	
		if(typeof(params.isLocked) !== "undefined" && params.isLocked===false){
			$("#"+params.ID+" .checkbox_locker[name="+params.ID+"_Locked]").attr('checked', false);
		}
		if(typeof(params.isVisible) !== "undefined" && params.isVisible===false){
			$("#"+params.ID+" .checkbox_eye[name="+params.ID+"_Visible]").attr('checked', false);
		}
		$("#"+params.ID+" .checkbox_locker[name="+params.ID+"_Locked]").click(function(){
			Toolbar[params.ID].locked=$("#"+params.ID+" .checkbox_locker[name="+params.ID+"_Locked]").is(":checked");
		});
		$("#"+params.ID+" .checkbox_eye[name="+params.ID+"_Visible]").click(function(){
			Toolbar[params.ID].visible=$("#"+params.ID+" .checkbox_eye[name="+params.ID+"_Visible]").is(":checked");
			$("#screen ."+currentLayer).css("visibility",$("#"+params.ID+" .checkbox_eye[name="+params.ID+"_Visible]").is(":checked") ? "visible" : "hidden");
		});
	}
}
};