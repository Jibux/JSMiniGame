/**
* monster_ihm

<div class="monster sixteen columns">
    <div class="header">
        <div class="icon one column"></div> 
        <div class="name ten columns">
            <h1>$name$</h1>
        </div>
        <div class="alignement five columns">
            $alignement$
        </div>
    </div> 
    <div class="description">
        <p>$description$</p>
        <div class="initiative three columns"><strong>Initiative</strong><span>$initiative$</span></div>
        <div class="move three columns"><strong>VD</strong><span>$move$</span></div>
        <div class="power_factor three columns"><strong>FP</strong><span>$powerFactor$</span></div>
        <div class="experience three columns"><strong>PX</strong><span>$experience$</span></div>
        <div class="life three columns"><strong>PV</strong><span>$life$</span></div>
    </div>
    <div class="clear"></div>
    <div class="category">
        <div class="sens"><strong>Sens</strong><span>$sens$</span></div>
        <div class="perception"><strong>Perception</strong><span>$perception$</span></div>
    </div>
    <img src="$image:$" />
    <div class="category">Defense</div>
    <p><strong>CA</strong>$ca$</p>
    <p><strong>Réf</strong><span>$ca$</span><strong><span>Vig</span></strong><span>$vig$</span><strong>Vol</strong><span>$vol$</span></p>
    <div class="category">Attaque</div>
    <p>$attaque$</p>
    <div class="category">Statistiques</div>
    <p><strong>FOR</strong><span>$for$</span><strong>DEX</strong><span>$dex$</span><strong>CON</strong><span>$con$</span><strong>INT</strong><span>$int$</span><strong>SAG</strong><span>$sag$</span><strong>CHA</strong><span>$cha$</span></p>
    <p><strong>Compétences</strong><span>$competence$</span></p>
    <div class="category">Objets</div>
    <p><strong>Equipement</strong><span>$equipement$</span></p>
    <p><strong>Trésor</strong><span>$tresor$</span></p>
    <div class="category">Pouvoirs Spéciaux</div>
    <p>$pouvoirs$</p>
</div>


* @param	name
* @param	alignement
* @param	description
* @param	initiative
* @param	move
* @param	powerFactor
* @param	experience
* @param	life
* @param	sens
* @param	perception
* @param	ca
* @param	vig
* @param	vol
* @param	attaque
* @param	for
* @param	dex
* @param	con
* @param	int
* @param	sag
* @param	cha
* @param	competence
* @param	equipement
* @param	tresor
* @param	pouvoirs
* @param	image	:	[valeur par défaut vide]
*/
var monster_ihm={"html":[{"name":"DIV","attr":[{"name":"class","value":"monster sixteen columns"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"header"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"icon one column"}]},{"name":"DIV","attr":[{"name":"class","value":"name ten columns"}],"child":[{"name":"H1","attr":[],"child":[{"content":"$name$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"alignement five columns"}],"child":[{"content":" $alignement$ "}]}]},{"name":"DIV","attr":[{"name":"class","value":"description"}],"child":[{"name":"P","attr":[],"child":[{"content":"$description$"}]},{"name":"DIV","attr":[{"name":"class","value":"initiative three columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Initiative"}]},{"name":"SPAN","attr":[],"child":[{"content":"$initiative$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"move three columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"VD"}]},{"name":"SPAN","attr":[],"child":[{"content":"$move$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"power_factor three columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"FP"}]},{"name":"SPAN","attr":[],"child":[{"content":"$powerFactor$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"experience three columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"PX"}]},{"name":"SPAN","attr":[],"child":[{"content":"$experience$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"life three columns"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"PV"}]},{"name":"SPAN","attr":[],"child":[{"content":"$life$"}]}]}]},{"name":"DIV","attr":[{"name":"class","value":"clear"}]},{"name":"DIV","attr":[{"name":"class","value":"category"}],"child":[{"name":"DIV","attr":[{"name":"class","value":"sens"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Sens"}]},{"name":"SPAN","attr":[],"child":[{"content":"$sens$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"perception"}],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Perception"}]},{"name":"SPAN","attr":[],"child":[{"content":"$perception$"}]}]}]},{"name":"IMG","attr":[{"name":"src","value":"$image:$"}]},{"name":"DIV","attr":[{"name":"class","value":"category"}],"child":[{"content":"Defense"}]},{"name":"P","attr":[],"child":[{"name":"STRONG","attr":[],"child":[{"content":"CA"}]},{"content":"$ca$"}]},{"name":"P","attr":[],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Réf"}]},{"name":"SPAN","attr":[],"child":[{"content":"$ca$"}]},{"name":"STRONG","attr":[],"child":[{"name":"SPAN","attr":[],"child":[{"content":"Vig"}]}]},{"name":"SPAN","attr":[],"child":[{"content":"$vig$"}]},{"name":"STRONG","attr":[],"child":[{"content":"Vol"}]},{"name":"SPAN","attr":[],"child":[{"content":"$vol$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"category"}],"child":[{"content":"Attaque"}]},{"name":"P","attr":[],"child":[{"content":"$attaque$"}]},{"name":"DIV","attr":[{"name":"class","value":"category"}],"child":[{"content":"Statistiques"}]},{"name":"P","attr":[],"child":[{"name":"STRONG","attr":[],"child":[{"content":"FOR"}]},{"name":"SPAN","attr":[],"child":[{"content":"$for$"}]},{"name":"STRONG","attr":[],"child":[{"content":"DEX"}]},{"name":"SPAN","attr":[],"child":[{"content":"$dex$"}]},{"name":"STRONG","attr":[],"child":[{"content":"CON"}]},{"name":"SPAN","attr":[],"child":[{"content":"$con$"}]},{"name":"STRONG","attr":[],"child":[{"content":"INT"}]},{"name":"SPAN","attr":[],"child":[{"content":"$int$"}]},{"name":"STRONG","attr":[],"child":[{"content":"SAG"}]},{"name":"SPAN","attr":[],"child":[{"content":"$sag$"}]},{"name":"STRONG","attr":[],"child":[{"content":"CHA"}]},{"name":"SPAN","attr":[],"child":[{"content":"$cha$"}]}]},{"name":"P","attr":[],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Compétences"}]},{"name":"SPAN","attr":[],"child":[{"content":"$competence$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"category"}],"child":[{"content":"Objets"}]},{"name":"P","attr":[],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Equipement"}]},{"name":"SPAN","attr":[],"child":[{"content":"$equipement$"}]}]},{"name":"P","attr":[],"child":[{"name":"STRONG","attr":[],"child":[{"content":"Trésor"}]},{"name":"SPAN","attr":[],"child":[{"content":"$tresor$"}]}]},{"name":"DIV","attr":[{"name":"class","value":"category"}],"child":[{"content":"Pouvoirs Spéciaux"}]},{"name":"P","attr":[],"child":[{"content":"$pouvoirs$"}]}]}],
beforeLoad: function(params){},
afterLoad: function(params){
	if(typeof(params.image) === "undefined"){
		$("img").remove();
	}
}
};