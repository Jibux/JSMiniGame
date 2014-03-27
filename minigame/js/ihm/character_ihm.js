/**
* character_ihm

<div class="occupation" style="top:$top:250$px;left:$left:250$px;" id="$ID$">
	<div class="character  $default:$ $direction:$ $mainHand:right_handed$ $sex:male$ $height:$ $weight:$">
		    <div class="name">$name:Name$</div>
		    <div class="lifebar">
				<div class="life" style="width: $life:100$%;background-position-y:$life:100$%;"></div>
		    </div>
		    <div class="base  $skinColor:$"></div>
		    <div class="bearb $bearbColor:$ $bearbType:$"></div>
		    <div class="hair $hairColor:$ $hairType:$"></div>
		    <div class="cloth $clothColor:$ $clothType:loincloth$"></div>
		    <div class="weapon $weaponType:$"></div>
	</div>
</div>

* @param	ID
* @param	top	:	250
* @param	left	:	250
* @param	default	:	[valeur par défaut vide]
* @param	direction	:	[valeur par défaut vide]
* @param	mainHand	:	right_handed
* @param	sex	:	male
* @param	height	:	[valeur par défaut vide]
* @param	weight	:	[valeur par défaut vide]
* @param	name	:	Name
* @param	life	:	100
* @param	skinColor	:	[valeur par défaut vide]
* @param	bearbColor	:	[valeur par défaut vide]
* @param	bearbType	:	[valeur par défaut vide]
* @param	hairColor	:	[valeur par défaut vide]
* @param	hairType	:	[valeur par défaut vide]
* @param	clothColor	:	[valeur par défaut vide]
* @param	clothType	:	loincloth
* @param	weaponType	:	[valeur par défaut vide]
*/
var character_ihm={"html":[{"name":"DIV","attr":[{"name":"class","value":"occupation"},{"name":"style","value":"top:$top:250$px;left:$left:250$px;"},{"name":"id","value":"$ID$"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"character  $default:$ $direction:$ $mainHand:right_handed$ $sex:male$ $height:$ $weight:$"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"name"}],"child":[{"content":"$name:Name$"}]},{"name":"DIV","attr":[{"name":"class","value":"lifebar"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"life"},{"name":"style","value":"width: $life:100$%;background-position-y:$life:100$%;"}]}]},{"name":"DIV","attr":[{"name":"class","value":"base  $skinColor:$"}]},{"name":"DIV","attr":[{"name":"class","value":"bearb $bearbColor:$ $bearbType:$"}]},{"name":"DIV","attr":[{"name":"class","value":"hair $hairColor:$ $hairType:$"}]},{"name":"DIV","attr":[{"name":"class","value":"cloth $clothColor:$ $clothType:loincloth$"}]},{"name":"DIV","attr":[{"name":"class","value":"weapon $weaponType:$"}]}]}]}],
beforeLoad: function(params){},
afterLoad: function(params){}
};