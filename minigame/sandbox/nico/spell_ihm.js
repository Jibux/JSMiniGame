/**
* spell_ihm

<div class="container spell level_$level$">
	<div class="row">
		<div class="category $category$"></div>
		<div class="level">$level$</div>
		<div class="name sixteen columns">$name$ ($playerClass$)</div>
	</div>
	<div class="row">
		<div class="portee six columns"><strong>Portée</strong><span>$portee$</span></div>
		<div class="duree ten columns"><strong>Durée</strong><span>$duree$</span></div>
	</div>
	<div class="row">
		<div class="description sixteen columns">$description$</div>
	</div>
</div>

* @param	level
* @param	category
* @param	name
* @param	portee
* @param	duree
* @param	description
*/
var spell_ihm={"html":[{"name":"DIV","attr":[{"name":"class","value":"container spell level_$level$"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"row"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"category $category$"}]},{"name":"DIV","attr":[{"name":"class","value":"level"}],"child":[{"content":"$level$"}]},{"name":"DIV","attr":[{"name":"class","value":"name sixteen columns"}],"child":[{"content":"$name$  ($playerClass$)"}]}]},{"name":"DIV","attr":[{"name":"class","value":"row"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"portee six columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Portée"}]},{"name":"SPAN","attr":[],"child":[{"content":"$portee$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"duree ten columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Durée"}]},{"name":"SPAN","attr":[],"child":[{"content":"$duree$"}]}]}]},{"name":"DIV","attr":[{"name":"class","value":"row"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"description sixteen columns"}],"child":[{"content":"$description$"}]}]}]}],
beforeLoad: function(params){},
afterLoad: function(params){}
};