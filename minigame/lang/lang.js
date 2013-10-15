var DEFAULT_LANGUAGE = "fr_FR";
var Lang = {
	/**
	* langage selectionne
	*/
	selectedLanguage : DEFAULT_LANGUAGE,
	/**
	* permet d'empecher les initialisations multiples
	*/
	initialized:false,
	
	/**
	* @param la clé de traduction
	* @return renvoi une balise html avec la traduction (est retraduit à la volée lors du changement de langue)
	*/
	getString : function (key) {
		var data = {"lang" : key};
		return "<span class='lang_text' data='"+JSON.stringify(data)+"'>"+ this.getReducedString(key) +"</span>";
	},
	/**
	* @param la clé de traduction
	* @return la traduction (ne peux pas etre retraduit à la volée)
	*/
	getReducedString : function (key) {
		if(typeof(Lang[this.selectedLanguage]) !== 'undefined' && typeof(Lang[this.selectedLanguage][key]) !== 'undefined'){
			return Lang[this.selectedLanguage][key];
		}else if(typeof(Lang[DEFAULT_LANGUAGE]) !== 'undefined' && typeof(Lang[DEFAULT_LANGUAGE][key]) !== 'undefined'){
			console.warn("WARNING : Enable to retrieve translation for key '"+key+"' in "+this.selectedLanguage );
			return Lang[DEFAULT_LANGUAGE][key];
		}else{
			console.error("ERROR : Enable to retrieve translation for key '"+key+"' in "+DEFAULT_LANGUAGE );
			return key;
		}
	},
	/**
	* @param la clé de traduction
	* @param le code langue
	* @return la traduction
	*/
	getTranslation : function (key,langCode) {
		if(typeof(Lang[langCode][key]) !== 'undefined'){
			return Lang[langCode][key];
		}else{
			console.error("ERROR : Enable to retrieve translation for key '"+key+"' in "+ langCode);
			return key;
		}
	},
	/**
	* initialisation des langues
	*/
	init : function () {
		if( ! Lang.initialized ){//On empeche l'appel multiple
			document.write("<script name='lang_default' src='lang/"+DEFAULT_LANGUAGE+".js'></script>" );
			this.setLanguage(configuration.language);
			Lang.initialized=true;
		}
	},
	/**
	* modifie la langue de la page
	* @param le code langue de destination
	*/
	setLanguage : function (value) {
		if(typeof(value) !== 'undefined' && value != null){
			this.selectedLanguage = value;
			
			var langTag = $("script[name='lang']");
			 if(value !== DEFAULT_LANGUAGE){
				if(langTag.length !== 0){
					langTag.remove();
				}
				var script = document.createElement('script');
				script.setAttribute('name','lang');
				script.setAttribute('async','true');
				script.setAttribute('src',"lang/" + this.selectedLanguage + ".js");
				document.head.appendChild(script);
			}
			Lang.refreshTraductions();
		}
	},
	/**
	* remet à jour les traductions de la page
	*/
	refreshTraductions:function(){
		if( typeof(Lang[ this.selectedLanguage ] ) === "undefined"){
			//le js n'est pas encore loaded on attend
			setTimeout("Lang.refreshTraductions()",100);
			return;
		}
		$(".lang_text").each(function(){
			if($(this).attr("data").length >0){
				var data = JSON.parse( $(this).attr("data") );
				if(typeof(data.lang) !== "undefined"){
					$(this).html( Lang.getReducedString( data.lang ) );
				}
			}
		});
	},
	/**
	* @return la langue sélectionnée
	*/
	getLanguage : function () {
		return this.selectedLanguage;
	}
};
/**
* auto initialisation des langues
*/
Lang.init();