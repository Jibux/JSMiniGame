/**
*	VISUAL CONFIGURATION
*/
var MODE_ENUM={"NORMAL":"NORMAL","DEBUG":"DEBUG"};
var QUATLITY_ENUM={"LOW":"LOW","MEDIUM":"MEDIUM","HIGH":"HIGH"};

var configuration=new Object();
configuration.mode=MODE_ENUM.NORMAL;
configuration.quality=QUATLITY_ENUM.LOW;

configuration.language="en_GB";

configuration.load={
	js:{
		config:[
			"globals",
			"userDefinedKeys"
		],
		libraries:[
			"jquery-1.9.1.min",
			"jquery-ui/jquery-ui-1.10.3.min"
		],
		data:[
			"maps",
			"TemplateOccupation",
		],
		classes:[
			"Races",
			"Tools",
			"astar",
			"graph",
			"Point",
			"Map",
			"Character",
			"KeyManager",
			"ActionManager",
			"Actions/Move",
			"HTMLGenerator",
			"ResourcesLoader",
			"MapHelper",
		],
		ihm:[
			"character_ihm",
		],
		main:[
			"main"
		],
		debug:[
		
		]
	},
	css:{
		libraries:[
			"jquery-ui/jquery-ui-1.10.3.min"
		],
		main:[
			"base",
			"skeleton",
			"style",
			"character",
			"tile"
		],
		debug:[
		
		]
	}
};

configuration.autoload=function(){
	//CSS
	for(var i in configuration.load.css.libraries){
		document.write('<link rel="stylesheet" type="text/css" href="libraries/'+configuration.load.css.libraries[i]+'.css" />' );
	}
	for(var i in configuration.load.css.main){
		document.write('<link rel="stylesheet" type="text/css" href="css/'+configuration.load.css.main[i]+'.css" />' );
	}
	//JS
	for(var i in configuration.load.js.config){
		document.write("<script src='config/"+configuration.load.js.config[i]+".js'></script>" );
	}
	for(var i in configuration.load.js.libraries){
		document.write("<script src='libraries/"+configuration.load.js.libraries[i]+".js'></script>" );
	}
	//Ajout des langues
	document.write("<script src='lang/lang.js'></script>" );
	
	for(var i in configuration.load.js.data){
		document.write("<script src='js/data/"+configuration.load.js.data[i]+".js'></script>" );
	}
	for(var i in configuration.load.js.classes){
		document.write("<script src='js/classes/"+configuration.load.js.classes[i]+".js'></script>" );
	}
	for(var i in configuration.load.js.ihm){
		document.write("<script src='js/ihm/"+configuration.load.js.ihm[i]+".js'></script>" );
	}
	for(var i in configuration.load.js.main){
		document.write("<script src='"+configuration.load.js.main[i]+".js'></script>" );
	}
	//Gestion des exceptions du mode DEBUG
	if(configuration.mode===MODE_ENUM.DEBUG){
		for(var i in configuration.load.css.debug){
			document.body.insertAdjacentHTML( 'head', '<link rel="stylesheet" type="text/css" href="css/'+configuration.load.css.debug[i]+'.css" />' );
		}
		for(var i in configuration.load.js.debug){
			document.write("<script src='js/"+configuration.load.js.debug[i]+".js'></script>" );
		}

	}
};
configuration.autoload();
