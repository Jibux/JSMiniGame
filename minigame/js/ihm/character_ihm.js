/**
* character_ihm

<div class="occupation" style="top:$top:250$px;left:$left:250$px;" id="$ID$">
	<div class="character  $direction:BOTTOM$ $mainHand:right_handed$ $sex:male$ $height:$ $weight:$">
		    <div class="name"></div>
		    <div class="lifebar">
				<div class="life" style="width: $life:100$%;background-position-y:$life:100$%;"></div>
		    </div>
		    <div class="base  $skinColor:$"></div>
		    <div class="bearb $bearbColor:$"></div>
		    <div class="hair $hairColor:$"></div>
		    <div class="cloth $clothColor:$ $clothType:loincloth$"></div>
		    <div class="weapon $weaponType:$"></div>
	</div>
</div>

* @param	top
* @param	left
* @param	ID
* @param	direction	:	BOTTOM
* @param	mainHand	:	right_handed
* @param	sex	:	male
* @param	height	:	[valeur par défaut vide]
* @param	weight	:	[valeur par défaut vide]
* @param	life	:	100
* @param	skinColor	:	[valeur par défaut vide]
* @param	bearbColor	:	[valeur par défaut vide]
* @param	hairColor	:	[valeur par défaut vide]
* @param	clothColor	:	[valeur par défaut vide]
* @param	clothType	:	loincloth
* @param	weaponType	:	[valeur par défaut vide]
*/
var character_ihm={
	"html":[{"name":"DIV","attr":[{"name":"class","value":"occupation"},{"name":"style","value":"top:$top$px;left:$left$px;"},{"name":"id","value":"$ID$"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"character  $direction:BOTTOM$ $mainHand:right_handed$ $sex:male$ $height:$ $weight:$"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"name"}]},{"name":"DIV","attr":[{"name":"class","value":"lifebar"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"life"},{"name":"style","value":"width: $life:100$%;background-position-y:$life:100$%;"}]}],"content":"<div class=\"life\" style=\"width: $life:100$%;background-position-y:$life:100$%;\"></div>    "},{"name":"DIV","attr":[{"name":"class","value":"base  $skinColor:$"}]},{"name":"DIV","attr":[{"name":"class","value":"bearb $bearbColor:$"}]},{"name":"DIV","attr":[{"name":"class","value":"hair $hairColor:$"}]},{"name":"DIV","attr":[{"name":"class","value":"cloth $clothColor:$ $clothType:loincloth$"}]},{"name":"DIV","attr":[{"name":"class","value":"weapon $weaponType:$"}]}],"content":"    "}]}],
	beforeLoad: function(params){},
	afterLoad: function(params){
		if(typeof(params.ID) !== "undefined"){
			if(typeof(params.life) === "undefined" || params.life ===0){
				$("#"+params.ID+" .character").addClass("ghost");
			}
		}
	}
};