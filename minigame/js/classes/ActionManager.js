var ActionManager = {
	heap: function() {
        return new BinaryHeap();
    },
	
	moveTo:function(mapID, character, x, y) {
		var characterID = CharacterHelper.getID(character);
		var position = CharacterHelper.getPersoPosition2D(character);

		if(position.x == x && position.y == y || mapOrig[x][y] != 1) {
			return MOVE_FINISHED;
		}
		
		$("#"+characterID).find(".perso").removeClass("stand");
		$("#"+characterID).find(".perso").addClass("walk");

		var map1 = copyMap(mapOrig);
		var graph = new Graph(map1);
		
		var start = graph.nodes[position.x][position.y];
		var end = graph.nodes[x][y];
		var map2 = graph.input;
		
		var result = astar.search(graph.nodes, start, end, true);
		
		ActionManager.move(mapID, character, map1, result);
	},
	
	move:function(mapID, character, mapArray, nodes) {
		var timeout = 0;
		var i = 1;
		var moveResult = MOVE_ON;
		var characterID = CharacterHelper.getID(character);
		ActionManager.moveByStep(mapID, character, mapArray, nodes, 0);
		var intId = setInterval(function() {
			var position = CharacterHelper.getPersoPosition2D(character);
			if(i == nodes.length || moveResult == MOVE_FINISHED) {
				if(i == nodes.length) {
					i--;
				}
				clearInterval(intId);
				setTimeout(function() {
					$("#"+characterID).find(".perso").addClass("stand");
					$("#"+characterID).find(".perso").removeClass("walk");
					CharacterHelper.stop(character);
					var position = CharacterHelper.getPersoPosition2D(character);
					console.log("Actual ("+position.x +", "+position.y+")");
					console.log("Target ("+nodes[i].x+", "+nodes[i].y+")");
					console.log("FINISHED");
				}, FOOT_STEP_DURATION);
				return 0;
			}
			//if(nodes[i-1].x == position.x && nodes[i-1].y == position.y) {
				//console.log("ARRIVED ("+position.x +", "+position.y+") => ("+nodes[i-1].x+", "+nodes[i-1].y+")");
				moveResult = ActionManager.moveByStep(mapID, character, mapArray, nodes, i);
				i++;
			//} else {
			//	console.log("NOT YET ARRIVED ("+position.x +", "+position.y+") => ("+nodes[i-1].x+", "+nodes[i-1].y+")");
			//}
		}, STEP_DURATION);
	},

	moveByStep:function(mapID, character, mapArray, nodes, i) {	
		if(nodes[i] == undefined) {
			console.log("nodes["+i+"] undefined");
			return MOVE_FINISHED;
		}
		if(mapArray[nodes[i].x][nodes[i].y] != 2) {
			// Pas d'ennemi
			//mapArray[nodes[i].x][nodes[i].y]=4;
			var posX=nodes[i].x*UNIT;
			var posY=nodes[i].y*UNIT;
			CharacterHelper.stop(character);
			ActionManager.moveCss(mapID, character, posX, posY);
			
			return MOVE_ON;
		} else {
			// Ennemi en vue
			console.log("Ennemi at ("+nodes[i].x+", "+nodes[i].y+")");
			
			mapArray=copyMap(mapOrig);
			mapArray[nodes[i].x][nodes[i].y]=0;
			
			var graph = new Graph(mapArray);		
			var start = graph.nodes[nodes[i-1].x][nodes[i-1].y];
			var end = graph.nodes[nodes[nodes.length-1].x][nodes[nodes.length-1].y];
			var result = astar.search(graph.nodes, start, end, true);
			
			ActionManager.move(mapID, character, mapArray, nodes);
			return MOVE_FINISHED;
		}
	},

	moveCss:function(mapID, character, x, y) {
		var unitMove=Math.round(UNIT/5);
		var characterID = CharacterHelper.getID(character);
		
		var position = CharacterHelper.getPersoPosition2D(character);
		var persoX = position.x;
		var persoY = position.y;
		
		var position2 = CharacterHelper.getPersoPosition(character);
		var left = position2.x;
		var top = position2.y;
		
		//move X
		if(left<x) {
			CharacterHelper.direction(character,DIRECTIONS.RIGHT);
			$("#"+characterID).css("left",(left*1 + unitMove) + "px");
		}else if(left>x) {
			CharacterHelper.direction(character,DIRECTIONS.LEFT);
			$("#"+characterID).css("left",(left*1 - unitMove) + "px");
		}
		//move Y
		if(top>y) {
			CharacterHelper.direction(character,DIRECTIONS.UP);
			$("#"+characterID).css("top",(top*1 - unitMove) + "px");
		}else if(top<y) {
			CharacterHelper.direction(character,DIRECTIONS.DOWN);
			$("#"+characterID).css("top",(top*1 + unitMove) + "px");
		}
		
		//continue moving
		if(left!=x || top!=y) {
			setTimeout(function() {
				ActionManager.moveCss(mapID, character, x, y);
			}, FOOT_STEP_DURATION);
		}
	},
};