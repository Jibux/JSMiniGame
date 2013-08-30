/*
*	Juste pour le test
*/
/*var ActionManager={
	//test  action simple
	moveUp : function(){
		console.log("moveUp");
	},
	//test key down key up
	startMoveRight : function(){
		console.log("startMoveRight");
	},
	stopMoveRight : function(){
		console.log("stopMoveRight");
	},
	//test blockBrowserAction
	moveDown : function(){
		console.log("moveDown");
	},
	//test parameters (les paramètres sont récupérés à partir de la variable arguments mais on peux aussi définir directement  les arguments  : function(params) )
	moveLeft : function(){
		console.log("moveLeft, params:"+JSON.stringify(arguments[0],""));
	},
	//test changement de map
	startSpeak : function(){
		console.log("startSpeak, params:"+JSON.stringify(arguments[0],""));
	},
	stopSpeak : function(){
		console.log("stopSpeak, params:"+JSON.stringify(arguments[0],""));
	},

};*/

///////////////////////////////////////
///////////////////////////////////////

/**
* Gestion des événements des touches du clavier
* @author HermineF
* @require ActionManager
* @require UserDefinedKeys
* @require Tools
*/


/**
* Définition des actions à réaliser lors de l'appui de touches
* Architecture :  ( les variables entre crochet sont optionnelles)
* 	MAP:{
*		[callFunction					// laissé optionel pour permettre les combos (ex: CTRL + A )
*			[keyDown:{
*				function,
*				[parameters:{
*					name	:	value
*				}] 
*			}],
*			[keyUp : {
*				function,
*				[parameters:{
*					name	:	value
*				}]
*			}]
*		]
*		[keyUpCallFunction]			// pour ajouter un évenement lorsque la touche est relachée
*		[ nextKeyMap ]				// pas de changement de keymap si non présent
*		[ blockBrowserAction ]		// suppression des evenement du navigateur (ex. scroll vers le bas ou le haut à l'appui des touches)
*	}
*/
var KeyMaps={
	"MAIN"	: {
		"GO_UP_ACTION"		:{"callFunction" : {"keyDown":{"function":"moveMainCharacter", "parameters":{"direction":DIRECTION_ENUM.UP}}}},
		"GO_RIGHT_ACTION"	:{"callFunction" : {"keyDown":{"function":"moveMainCharacter", "parameters":{"direction":DIRECTION_ENUM.RIGHT}}}},
		"GO_DOWN_ACTION"	:{"callFunction" : {"keyDown":{"function":"moveMainCharacter", "parameters":{"direction":DIRECTION_ENUM.DOWN}}}},
		"GO_LEFT_ACTION"	:{"callFunction" : {"keyDown":{"function":"moveMainCharacter", "parameters":{"direction":DIRECTION_ENUM.LEFT}}}},
		"SPEAK_ACTION"		:{"callFunction" : {"keyDown":{"function":"startSpeak", "parameters":{"currentKeyMAP":"MAIN","going to Map":"SPEAK"}}},"nextKeyMap" : "SPEAK"},
	},
	"SPEAK" : {
		"SPEAK_ACTION"		:{"callFunction" :  {"keyDown":{"function":"stopSpeak", "parameters":{"currentKeyMAP":"SPEAK","going to Map":"MAIN"}}},"nextKeyMap" : "MAIN"},
	},
};

/**
*	Gestion des évènements du clavier de l'utilisateur
*/
var KeyManager = function(){

	/*	/!\	Ne pas modifier	/!\
	*	association des codes des touches à leur nom
	*/
	var KeyCodes={
		8	:'BACKSPACE',
		9	:'TAB',
		13	:'ENTER',
		16	:'SHIFT',
		17	:'CTRL',
		18	:'ALT',
		19	:'PAUSE_BREAK',
		20	:'CAPS_LOCK',
		27	:'ESCAPE',
		32	:"SPACE",
		33	:'PAGE_UP',
		34	:'PAGE_DOWN',
		35	:'END',
		36	:'HOME',
		37	:'LEFT_ARROW',
		38	:'UP_ARROW',
		39	:'RIGHT_ARROW',
		40	:'DOWN_ARROW',
		45	:'INSERT',
		46	:'DELETE',
		48	:'0',
		49	:'1',
		50	:'2',
		51	:'3',
		52	:'4',
		53	:'5',
		54	:'6',
		55	:'7',
		56	:'8',
		57	:'9',
		65	:'A',
		66	:'B',
		67	:'C',
		68	:'D',
		69	:'E',
		70	:'F',
		71	:'G',
		72	:'H',
		73	:'I',
		74	:'J',
		75	:'K',
		76	:'L',
		77	:'M',
		78	:'N',
		79	:'O',
		80	:'P',
		81	:'Q',
		82	:'R',
		83	:'S',
		84	:'T',
		85	:'U',
		86	:'V',
		87	:'W',
		88	:'X',
		89	:'Y',
		90	:'Z',
		91	:'LEFT_WINDOW_KEY',
		92	:'RIGHT_WINDOW_KEY',
		93	:'SELECT_KEY',
		96	:'NUMPAD_0',
		97	:'NUMPAD_1',
		98	:'NUMPAD_2',
		99	:'NUMPAD_3',
		100	:'NUMPAD_4',
		101	:'NUMPAD_5',
		102	:'NUMPAD_6',
		103	:'NUMPAD_7',
		104	:'NUMPAD_8',
		105	:'NUMPAD_9',
		106	:'MULTIPLY',
		107	:'ADD',
		109	:'SUBTRACT',
		110	:'DECIMAL_POINT',
		111	:'DIVIDE',
		112	:'F1',
		113	:'F2',
		114	:'F3',
		115	:'F4',
		116	:'F5',
		117	:'F6',
		118	:'F7',
		119	:'F8',
		120	:'F9',
		121	:'F10',
		122	:'F11',
		123	:'F12',
		144	:'NUM_LOCK',
		145	:'SCROLL_LOCK',
		186	:'DOLLAR_SIGN',
		187	:'EQUAL_SIGN',
		188	:'COMMA',
		189	:'DASH',
		190	:'SEMI_COLON',
		191	:'COLON',
		192	:'U_GRAVE_ACCENT',
		219	:'OPEN_PARENTHESIS',
		220	:'ASTERISK',
		221	:'CIRCUMFLEX_ACCENT',
		222	:'SQUARE',
		223	:'EXCLAMATION_MARK',
		226	:'LESS_THAN_SIGN'
	};
	// par défaut on selectionne la map MAIN 
	var currentKeyMAP="MAIN";
	//dernière action appelée
	var lastAction="";
	//flag permettant de savoir si une touche est appuyée
	var keyPressed=0;
	//tableau des touches appuyées (pour la gestion des combos)
	var keys=[] ;
	
	/**
	* Handle Key Down strokes
	*/
	$(document).keydown(function(event) {
		//on rajoute la touche dans le tableau si elle n'y est pas déjà
		if($.inArray(KeyCodes[ event.which ],keys)===-1){
			keys.push(KeyCodes[ event.which ]);
		}
		//On vérifie que la touche a été associée à une action
		var keyCode = getKeyCode(event) ;
		var nbKeys=keyCode.split("+").length;
		if( userDefinedKeys [ currentKeyMAP ] [ keyCode]  !== undefined){
			//On récupère le code de la touche
			var code = userDefinedKeys [ currentKeyMAP ] [ keyCode ] .code;
			//si une action est associée à la touche on l'execute à partir de l'ActionManager
			if(KeyMaps[currentKeyMAP]!==undefined  && KeyMaps[currentKeyMAP][code]!==undefined ){
				var map = KeyMaps [currentKeyMAP] [code];
				//Lancement de l'action
				if(map["callFunction"] ["keyDown"]!==undefined){
					var action = map ["callFunction"] ["keyDown"];
					//on ne répète pas l'action si la touche n'a pas été relachée entre temps
					if( ! (keyPressed===nbKeys && action["function"] === lastAction) ){
						if( action["function"] !== undefined && ActionManager[ action["function"] ] !== undefined ){
							ActionManager[ action["function"] ](action["parameters"]);
							lastAction=action["function"];
						}else{
							lastAction="";
						}
					}
				}
				
				//On change de KeyMap si l'action keyUp n'est pas définie
				if(map["callFunction"] ["keyUp"] === undefined && map.nextKeyMap!==undefined){
					currentKeyMAP=map.nextKeyMap;
				}
				
				// pour bloquer les actions des touches pour le navigateur on renvoi false
				if(map.blockBrowserAction!==undefined  && map.blockBrowserAction===true){
					keys.push(keyCode);
					keyPressed=true;
					return false;
				}
			}
		}
		keyPressed++;
	});

	/**
	* Handle Key Up strokes
	*/
	$(document).keyup(function() {
		//On vérifie en premier lieu que la touche a été associée à une action
		var keyCode = getKeyCode(event) ;
		if( userDefinedKeys [ currentKeyMAP ] [ keyCode ]  !== undefined){
			//On récupère le code de la touche
			var code = userDefinedKeys [ currentKeyMAP ] [ keyCode ] .code;
			//si une action est associée à la touche on l'execute à partir de l'ActionManager
			if(KeyMaps[currentKeyMAP]!==undefined  && KeyMaps[currentKeyMAP][code]!==undefined ){
				var map = KeyMaps [currentKeyMAP] [code];
				//Lancement de l'action
				if(map["callFunction"] ["keyUp"]!==undefined){
					//Si keyDown existe on oblige l'action de keyDown avant de faire l'action de keyUp
					if(map["callFunction"] ["keyDown"] === undefined || lastAction === map["callFunction"] ["keyDown"] ["function"]){
						var action = map ["callFunction"] ["keyUp"];
						if( action["function"] !== undefined && ActionManager[ action["function"] ] !== undefined ){
							ActionManager[ action["function"] ](action["parameters"]);
							lastAction=action["function"];
						}else{
							lastAction="";
						}
					
						//On change de KeyMap si l'action keyUp est définie
						if(map.nextKeyMap!==undefined){
							currentKeyMAP=map.nextKeyMap;
						}
					}
				}
			}
		}
		keys.unset(KeyCodes[ event.which ]);
		keyPressed--;
	});

	var getKeyCode=function(event){
		var sign="+";
		//dans le cas où la touche est définie dans la map
		if(userDefinedKeys [ currentKeyMAP ] [KeyCodes[ event.which ]]!==undefined){
			return KeyCodes[ event.which ];
		}else{
			//sinon on regarde si c'est un combo de touches
			var combo="";
			for(var i=0;i<keys.length;i++){
				if(i>0){
					combo+=sign;
				}
				combo+=keys[i];
			}
			return combo;
		}
	}
};
