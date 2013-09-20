//separateur de touches pour les combos
var KEY_COMBO_SEPARATOR="+";
/**
*	variables pour permettre à l'utilisateur de modifier les touches associées au clavier 
*	(une touche n'a qu'une action par Map mais une action peut être appellée par plusieurs touches)
*	pour créer des combos de touches (ex. CTRL+ALT+DELETE ) il faut rajouter un "+" entre chaque code (ne pas mettre d'espace)
* Architecture :  
*	MAP:{
*		KEY: {
*			code: value
*		}
*	}
*
* valide Key codes : 
*	BACKSPACE, TAB, ENTER, SHIFT, CTRL, ALT, PAUSE_BREAK, CAPS_LOCK, ESCAPE, SPACE, PAGE_UP, PAGE_DOWN, END, HOME, INSERT, DELETE, 
*	LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, 
*	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
*	A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, 
*	LEFT_WINDOW_KEY, RIGHT_WINDOW_KEY, SELECT_KEY, 
*	NUMPAD_0, NUMPAD_1, NUMPAD_2, NUMPAD_3, NUMPAD_4, NUMPAD_5, NUMPAD_6, NUMPAD_7, NUMPAD_8, NUMPAD_9, 
*	MULTIPLY, ADD, SUBTRACT, DECIMAL_POINT, DIVIDE, 
*	F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12, 
*	NUM_LOCK, SCROLL_LOCK, DOLLAR_SIGN, EQUAL_SIGN, COMMA, DASH, SEMI_COLON, COLON, U_GRAVE_ACCENT, OPEN_PARENTHESIS, ASTERISK, 
*	CIRCUMFLEX_ACCENT, SQUARE, EXCLAMATION_MARK, LESS_THAN_SIGN
*/
var userDefinedKeys={
	"MAIN":{
		"ENTER":{code:"SPEAK_ACTION"},
		
		"UP_ARROW+LEFT_ARROW":{code:"GO_UP_LEFT_ACTION"},
		"LEFT_ARROW+UP_ARROW":{code:"GO_UP_LEFT_ACTION"},
		"UP_ARROW+RIGHT_ARROW":{code:"GO_UP_RIGHT_ACTION"},
		"RIGHT_ARROW+UP_ARROW":{code:"GO_UP_RIGHT_ACTION"},
		"DOWN_ARROW+LEFT_ARROW":{code:"GO_DOWN_LEFT_ACTION"},
		"LEFT_ARROW+DOWN_ARROW":{code:"GO_DOWN_LEFT_ACTION"},
		"DOWN_ARROW+RIGHT_ARROW":{code:"GO_DOWN_RIGHT_ACTION"},
		"RIGHT_ARROW+DOWN_ARROW":{code:"GO_DOWN_RIGHT_ACTION"},
	
		"UP_ARROW":{code:"GO_UP_ACTION"},
		"LEFT_ARROW":{code:"GO_LEFT_ACTION"},
		"DOWN_ARROW":{code:"GO_DOWN_ACTION"},
		"RIGHT_ARROW":{code:"GO_RIGHT_ACTION"},

		"Z+Q":{code:"GO_UP_LEFT_ACTION"},
		"Q+Z":{code:"GO_UP_LEFT_ACTION"},
		"Z+D":{code:"GO_UP_RIGHT_ACTION"},
		"D+Z":{code:"GO_UP_RIGHT_ACTION"},
		"S+Q":{code:"GO_DOWN_LEFT_ACTION"},
		"Q+S":{code:"GO_DOWN_LEFT_ACTION"},
		"S+D":{code:"GO_DOWN_RIGHT_ACTION"},
		"D+S":{code:"GO_DOWN_RIGHT_ACTION"},

		"Z":{code:"GO_UP_ACTION"},
		"Q":{code:"GO_LEFT_ACTION"},
		"S":{code:"GO_DOWN_ACTION"},
		"D":{code:"GO_RIGHT_ACTION"},
		
	},"SPEAK" : {
		"ENTER":{code:"SPEAK_ACTION"},
	},
};
