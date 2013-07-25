var DEFAULT_LANGUAGE = "fr_FR";
var Lang = {
	selectedLanguage : DEFAULT_LANGUAGE,
	
	getString : function (key) {
		if(Lang[this.selectedLanguage] !== undefined && Lang[this.selectedLanguage][key] !== undefined){
			return Lang[this.selectedLanguage][key];
		}else if(Lang[DEFAULT_LANGUAGE] !== undefined && Lang[DEFAULT_LANGUAGE][key] !== undefined){
			console.warn("WARNING : Enable to retrieve traduction for key '"+key+"' in "+this.selectedLanguage);
			return Lang[DEFAULT_LANGUAGE][key];
		}else{
			console.error("ERROR : Enable to retrieve traduction for key '"+key+"' in "+DEFAULT_LANGUAGE);
			return key;
		}
	},
	
	getTraduction : function (key,langCode) {
		if(Lang[langCode][key] !== undefined){
			return Lang[langCode][key];
		}else{
			console.error("ERROR : Enable to retrieve traduction for key '"+key+"' in "+ langCode);
			return key;
		}
	},
	
	init : function () {
		document.write("<script name='lang_default' src='lang/"+DEFAULT_LANGUAGE+".js'></script>" );
		this.setLanguage(configuration.language);
	},
	
	setLanguage : function (value) {
		if(value !== undefined && value !== null){
			this.selectedLanguage = value;
			
			var langBalise = $("script[name='lang']");
			if(langBalise.size() !== 0){
				langBalise.attr('src',"lang/" + this.selectedLanguage + ".js");
			}else if(value !== DEFAULT_LANGUAGE){
				document.write("<script name='lang' src='lang/" + this.selectedLanguage + ".js'></script>" );
			}
		}
	},
	getLanguage : function () {
		return this.selectedLanguage;
	}
};
Lang.init();