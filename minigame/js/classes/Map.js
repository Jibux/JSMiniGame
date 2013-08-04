/**
*	This class describes a map
*/

/*
hash = {
		"UID":"map_0_0_0",
		"size":{"width":20,"height":20},
		"position":{"x":0,"y":0,"z":0},
		"tile":{"19_19":"grass","19_18":"grass","19_17":"grass","19_16":"grass","19_15":"grass","19_14":"grass","19_13":"grass","19_12":"grass","19_11":"grass","19_10":"grass","19_9":"grass","19_8":"grass","19_7":"grass","19_6":"grass","19_5":"grass","19_4":"grass","19_3":"grass","19_2":"grass","19_1":"grass","19_0":"water","18_19":"grass","18_18":"grass","18_17":"grass","18_16":"grass","18_15":"grass","18_14":"grass","18_13":"grass","18_12":"grass","18_11":"grass","18_10":"grass","18_9":"grass","18_8":"grass","18_7":"grass","18_6":"grass","18_5":"grass","18_4":"grass","18_3":"grass","18_2":"grass","18_1":"grass","18_0":"grass","17_19":"grass","17_18":"grass","17_17":"grass","17_16":"grass","17_15":"grass","17_14":"grass","17_13":"grass","17_12":"grass","17_11":"grass","17_10":"grass","17_9":"grass","17_8":"water","17_7":"water","17_6":"grass","17_5":"grass","17_4":"grass","17_3":"grass","17_2":"grass","17_1":"grass","17_0":"grass","16_19":"grass","16_18":"grass","16_17":"grass","16_16":"grass","16_15":"grass","16_14":"grass","16_13":"grass","16_12":"water","16_11":"water","16_10":"water","16_9":"water","16_8":"grass","16_7":"water","16_6":"grass","16_5":"grass","16_4":"grass","16_3":"grass","16_2":"grass","16_1":"grass","16_0":"grass","15_19":"grass","15_18":"grass","15_17":"grass","15_16":"grass","15_15":"water","15_14":"water","15_13":"water","15_12":"grass","15_11":"grass","15_10":"grass","15_9":"grass","15_8":"water","15_7":"grass","15_6":"grass","15_5":"grass","15_4":"grass","15_3":"grass","15_2":"grass","15_1":"grass","15_0":"grass","14_19":"grass","14_18":"grass","14_17":"grass","14_16":"water","14_15":"water","14_14":"grass","14_13":"grass","14_12":"grass","14_11":"grass","14_10":"grass","14_9":"water","14_8":"grass","14_7":"grass","14_6":"grass","14_5":"water","14_4":"water","14_3":"water","14_2":"water","14_1":"water","14_0":"grass","13_19":"grass","13_18":"grass","13_17":"grass","13_16":"grass","13_15":"grass","13_14":"grass","13_13":"grass","13_12":"water","13_11":"water","13_10":"grass","13_9":"grass","13_8":"grass","13_7":"water","13_6":"water","13_5":"grass","13_4":"grass","13_3":"grass","13_2":"grass","13_1":"water","13_0":"water","12_19":"grass","12_18":"grass","12_17":"grass","12_16":"water","12_15":"grass","12_14":"water","12_13":"water","12_12":"grass","12_11":"grass","12_10":"grass","12_9":"grass","12_8":"grass","12_7":"grass","12_6":"grass","12_5":"water","12_4":"water","12_3":"grass","12_2":"grass","12_1":"grass","12_0":"water","11_19":"grass","11_18":"grass","11_17":"water","11_16":"grass","11_15":"water","11_14":"grass","11_13":"grass","11_12":"grass","11_11":"grass","11_10":"grass","11_9":"water","11_8":"grass","11_7":"grass","11_6":"grass","11_5":"grass","11_4":"grass","11_3":"grass","11_2":"water","11_1":"water","11_0":"water","10_19":"grass","10_18":"grass","10_17":"grass","10_16":"grass","10_15":"grass","10_14":"grass","10_13":"grass","10_12":"grass","10_11":"grass","10_10":"grass","10_9":"grass","10_8":"grass","10_7":"water","10_6":"grass","10_5":"grass","10_4":"grass","10_3":"grass","10_2":"water","10_1":"water","10_0":"grass","9_19":"grass","9_18":"grass","9_17":"water","9_16":"water","9_15":"grass","9_14":"grass","9_13":"water","9_12":"grass","9_11":"grass","9_10":"water","9_9":"grass","9_8":"grass","9_7":"grass","9_6":"grass","9_5":"water","9_4":"grass","9_3":"grass","9_2":"grass","9_1":"water","9_0":"grass","8_19":"grass","8_18":"grass","8_17":"water","8_16":"water","8_15":"grass","8_14":"grass","8_13":"water","8_12":"grass","8_11":"grass","8_10":"grass","8_9":"grass","8_8":"grass","8_7":"grass","8_6":"grass","8_5":"water","8_4":"grass","8_3":"grass","8_2":"water","8_1":"grass","8_0":"grass","7_19":"grass","7_18":"grass","7_17":"water","7_16":"water","7_15":"grass","7_14":"grass","7_13":"grass","7_12":"grass","7_11":"grass","7_10":"grass","7_9":"grass","7_8":"grass","7_7":"grass","7_6":"grass","7_5":"grass","7_4":"grass","7_3":"grass","7_2":"grass","7_1":"grass","7_0":"grass","6_19":"grass","6_18":"grass","6_17":"grass","6_16":"grass","6_15":"grass","6_14":"water","6_13":"water","6_12":"grass","6_11":"water","6_10":"water","6_9":"water","6_8":"water","6_7":"water","6_6":"water","6_5":"water","6_4":"water","6_3":"water","6_2":"grass","6_1":"grass","6_0":"grass","5_19":"grass","5_18":"grass","5_17":"grass","5_16":"water","5_15":"grass","5_14":"grass","5_13":"grass","5_12":"grass","5_11":"grass","5_10":"grass","5_9":"grass","5_8":"grass","5_7":"grass","5_6":"grass","5_5":"grass","5_4":"grass","5_3":"grass","5_2":"water","5_1":"grass","5_0":"grass","4_19":"grass","4_18":"grass","4_17":"grass","4_16":"grass","4_15":"grass","4_14":"grass","4_13":"grass","4_12":"grass","4_11":"grass","4_10":"grass","4_9":"grass","4_8":"grass","4_7":"grass","4_6":"grass","4_5":"grass","4_4":"grass","4_3":"grass","4_2":"water","4_1":"grass","4_0":"grass","3_19":"grass","3_18":"grass","3_17":"grass","3_16":"water","3_15":"grass","3_14":"grass","3_13":"water","3_12":"grass","3_11":"water","3_10":"grass","3_9":"water","3_8":"water","3_7":"water","3_6":"grass","3_5":"water","3_4":"tile water","3_3":"water","3_2":"water","3_1":"water","3_0":"grass","2_19":"grass","2_18":"grass","2_17":"grass","2_16":"water","2_15":"grass","2_14":"grass","2_13":"grass","2_12":"grass","2_11":"grass","2_10":"grass","2_9":"grass","2_8":"grass","2_7":"grass","2_6":"grass","2_5":"grass","2_4":"grass","2_3":"grass","2_2":"grass","2_1":"grass","2_0":"grass","1_19":"grass","1_18":"grass","1_17":"grass","1_16":"water","1_15":"grass","1_14":"grass","1_13":"grass","1_12":"grass","1_11":"grass","1_10":"grass","1_9":"grass","1_8":"grass","1_7":"grass","1_6":"grass","1_5":"grass","1_4":"grass","1_3":"grass","1_2":"grass","1_1":"grass","1_0":"grass","0_19":"grass","0_18":"grass","0_17":"grass","0_16":"water","0_15":"grass","0_14":"grass","0_13":"grass","0_12":"grass","0_11":"grass","0_10":"grass","0_9":"grass","0_8":"grass","0_7":"grass","0_6":"grass","0_5":"grass","0_4":"grass","0_3":"grass","0_2":"grass","0_1":"grass","0_0":"water"},
		"occupation":[[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1,0,1,1,1],[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1],[1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,0,1,1],[1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,0,0,1,1],[1,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1],[0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,0,1,1,1],[0,0,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,1,1,0,1,1,1,1,1,0,0,1,1,1],[1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1],[1,1,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
	};
*/

var Map = function(hash) {
	this.ID = hash.UID;
	this.size = { "width": hash.size.width*1, "height": hash.size.height*1 };
	this.position = new Point(hash.position.x, hash.position.y, hash.position.z);
	this.cssPosition = new Point();
	this.tile = hash.tile;
	this.occupation = hash.occupation;
	this.neighbours = new Array();
	this.offset = new Point(0, 0);
	this.edgeType = [];
	this.edgeType[EDGE_TYPE_ENUM.RIGHT] = false;
	this.edgeType[EDGE_TYPE_ENUM.BOTTOM] = false;
	this.minEdgeNeighbour = new Point(hash.position.x, hash.position.y, hash.position.z);
	this.maxEdgeNeighbour = new Point(hash.position.x, hash.position.y, hash.position.z);
};

// Static variable shared between all Map objects
Map.drawOffset = new Point(-225, 45);

Map.prototype = {
	getID: function() {
		return this.ID;
	},
	
	setID: function(ID) {
		this.ID = ID;
	},
	
	getSize: function() {
		return this.size;
	},
	
	setSize: function(size) {
		this.size.width = size.width;
		this.size.height = size.height;
	},
	
	getPosition: function() {
		return this.position;
	},
	
	setPosition: function(position) {
		this.position.x = position.x;
		this.position.y = position.y;
		this.position.z = position.z;
	},
	
	getTile: function() {
		return this.tile;
	},
	
	setTile: function(tile) {
		this.tile = tile;
	},
	
	getOccupation: function() {
		return this.occupation;
	},
	
	setOccupation: function(occupation) {
		this.occupation = occupation;
	},
	
	getXOffset: function() {
		return this.offset.x*1;
	},
	
	getYOffset: function() {
		return this.offset.y*1;
	},
	
	setXOffset: function(x) {
		this.offset.x = x*1;
	},
	
	setYOffset: function(y) {
		this.offset.y = y*1;
	},
	
	getEdgeType: function(type) {
		return this.edgeType[type];
	},
	
	setEdgeType: function(type, value) {
		this.edgeType[type] = value;
	},
	
	updateCssPosition: function() {
		if(!$("#"+this.ID).length) {
			console.log("Cannot find map "+this.ID);
			return null;
		}
		this.cssPosition.x = $("#"+this.ID).css("left").substring(0,$("#"+this.ID).css("left").length - 2)*1;
		this.cssPosition.y = $("#"+this.ID).css("top").substring(0, $("#"+this.ID).css("top").length - 2)*1;
	},
	
	getNeighbours: function() {
		return this.neighbours;
	},
	
	getNeighbour: function(mapID) {
		if(typeof(this.neighbours[mapID]) === 'undefined') {
			return null;
		}
		return this.neighbours[mapID];
	},
	
	setNeighbours: function(neighbours) {
		this.neighbours = neighbours;
	},
	
	addNeighbour: function(map) {
		this.neighbours[map.getID()] = map;
	},
	
	deleteNeighbour: function(map) {
		delete this.neighbours[map.getID()];
	},
	
	updateNeighbours: function(oldNeigbours) {
		var xMin = 2;
		var xMax = -1;
		var yMin = 2;
		var yMax = -1;
		for(var y = -1; y <= 1; y++) {
			for(var x = -1; x <= 1; x++) {
				var mapID = "map_"+(this.position.x+x)*1+"_"+(this.position.y+y)*1+"_0";
				var map;
				if(this.ID != mapID) {
					if(typeof(oldNeigbours) != 'undefined' && typeof(oldNeigbours[mapID]) != 'undefined') {
						map = oldNeigbours[mapID];
					} else {
						map = ActionManager.loadMap(mapID);
					}
				} else {
					map = this;
				}
				if(map === null) {
					//console.log(mapID+" undefined");
				} else {
					if(typeof(oldNeigbours) != 'undefined' && typeof(oldNeigbours[mapID]) != 'undefined') {
						oldNeigbours[mapID] = null;
					}
					//console.log(mapID+" defined");
					this.neighbours[mapID] = map;
					xMin = min(x, xMin);
					xMax = max(x, xMax);
					yMin = min(y, yMin);
					yMax = max(y, yMax);
				}
			}
		}
		
		this.minEdgeNeighbour.x = xMin;
		this.minEdgeNeighbour.y = yMin;
		this.maxEdgeNeighbour.x = xMax;
		this.maxEdgeNeighbour.y = yMax;
		
		this.updateNeighboursOffset();
	},
	
	updateNeighboursOffset: function() {
		var offsetY = 0;
		for(var y = this.minEdgeNeighbour.y; y <= this.maxEdgeNeighbour.y; y++) {
			var offsetX = 0;
			for(var x = this.minEdgeNeighbour.x; x <= this.maxEdgeNeighbour.x; x++) {
				var mapID = "map_"+(this.position.x+x)*1+"_"+(this.position.y+y)*1+"_0";
				var map = this.neighbours[mapID];
				if(map != null) {
					map.setXOffset(map.getSize().width*offsetX);
					map.setYOffset(map.getSize().height*offsetY);
					//console.log(mapID+" OFFSET X "+this.neighbours[mapID].getXOffset());
					//console.log(mapID+" OFFSET Y "+this.neighbours[mapID].getYOffset());
				}
				offsetX++;
			}
			offsetY++;
		}
	},
	
	getMapDirection: function(position) {
		var directionX = DIRECTION_ENUM.NOCHANGE;
		var directionY = DIRECTION_ENUM.NOCHANGE;

		if(position.x >= this.size.width*UNIT) {
			directionX = DIRECTION_ENUM.RIGHT;
		} else if(position.x < 0) {
			directionX = DIRECTION_ENUM.LEFT;
		}
		
		if(position.y >= this.size.height*UNIT) {
			directionY = DIRECTION_ENUM.DOWN;
		} else if(position.y < 0) {
			directionY = DIRECTION_ENUM.UP;
		}
		
		if(directionX == DIRECTION_ENUM.NOCHANGE) {
			return directionY;
		}
		
		if(directionY == DIRECTION_ENUM.NOCHANGE) {
			return directionX;
		}
		
		if(directionX == DIRECTION_ENUM.RIGHT && directionY == DIRECTION_ENUM.DOWN) {
			return DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT;
		}
		
		if(directionX == DIRECTION_ENUM.LEFT && directionY == DIRECTION_ENUM.DOWN) {
			return DIRECTION_ENUM.DIAGONAL_DOWN_LEFT;
		}
		
		if(directionX == DIRECTION_ENUM.RIGHT && directionY == DIRECTION_ENUM.UP) {
			return DIRECTION_ENUM.DIAGONAL_UP_RIGHT;
		}
		
		if(directionX == DIRECTION_ENUM.LEFT && directionY == DIRECTION_ENUM.UP) {
			return DIRECTION_ENUM.DIAGONAL_UP_LEFT;
		}
		
		return DIRECTION_ENUM.NOCHANGE;
	},
	
	getMapIDFromDirection: function(direction) {
		var x = this.position.x;
		var y = this.position.y;
		var z = this.position.z;
		
		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				x++;
				break;
			case DIRECTION_ENUM.LEFT:
				x--;
				break;
			case DIRECTION_ENUM.UP:
				y--;
				break;
			case DIRECTION_ENUM.DOWN:
				y++;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				x++;
				y--;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				x--;
				y--;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				x++;
				y++;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				x--;
				y++;
				break;
			default: break;
		}

		var mapID = "map_"+x+"_"+y+"_"+z;
		
		return mapID;
	},
	
	setDirection: function(direction, mainMapID) {
		if(!$("#"+this.ID).length) {
			console.log(this.ID+" NOT AVAILABLE ON SCREEN");
			return null;
		}
		
		var unitMoveX = null;
		var unitMoveY = null;
		
		var mapLeft = this.cssPosition.x*1;
		var mapTop = this.cssPosition.y*1;
		
		switch(direction) {
			case DIRECTION_ENUM.RIGHT:
				unitMoveY = -UNIT_ENUM.UNIT_MOVE_MAP2;
				unitMoveX = -UNIT_ENUM.UNIT_MOVE_MAP;
				break;
			case DIRECTION_ENUM.LEFT:
				unitMoveY = UNIT_ENUM.UNIT_MOVE_MAP2;
				unitMoveX = UNIT_ENUM.UNIT_MOVE_MAP;
				break;
			case DIRECTION_ENUM.UP:
				unitMoveY = UNIT_ENUM.UNIT_MOVE_MAP2;
				unitMoveX = -UNIT_ENUM.UNIT_MOVE_MAP;
				break;
			case DIRECTION_ENUM.DOWN:
				unitMoveY = -UNIT_ENUM.UNIT_MOVE_MAP2;
				unitMoveX = UNIT_ENUM.UNIT_MOVE_MAP;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_RIGHT:
				unitMoveX = -UNIT_ENUM.UNIT_MOVE_DIAGONAL2;
				break;
			case DIRECTION_ENUM.DIAGONAL_UP_LEFT:
				unitMoveY = UNIT_ENUM.UNIT_MOVE_DIAGONAL2;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_RIGHT:
				unitMoveY = -UNIT_ENUM.UNIT_MOVE_DIAGONAL2;
				break;
			case DIRECTION_ENUM.DIAGONAL_DOWN_LEFT:
				unitMoveX = UNIT_ENUM.UNIT_MOVE_DIAGONAL2;
				break;
			default: break;
		}
		
		if(unitMoveY != null) {
			$("#"+this.ID).css("top",(mapTop*1 + unitMoveY*1) + "px");
			this.cssPosition.y+= unitMoveY*1;
			if(mainMapID == this.ID) {
				Map.drawOffset.y+= unitMoveY*1;
			}
		}
		if(unitMoveX != null) {
			$("#"+this.ID).css("left",(mapLeft*1 + unitMoveX*1) + "px");
			this.cssPosition.x+= unitMoveX*1;
			if(mainMapID == this.ID) {
				Map.drawOffset.x+= unitMoveX*1;
			}
		}
		
		// This function makes A LOT OF LAGS that is why we are updating the cssPosition like above
		//this.updateCssPosition();
	},
	
	setDirectionNeighbours: function(direction) {
		for(var index in this.neighbours) {
			if(typeof this.neighbours[index].setDirection === 'function') {
				this.neighbours[index].setDirection(direction, this.ID);
			}
		}
	},
	
	draw: function() {
		if($("#"+this.ID).length) {
			//console.log(this.ID+" ALREADY DRAWN");
			return null;
		}
		var newPosition = this.position.scaleToCss().changeFrame(true).scaleToCss();
		newPosition.x = newPosition.x + Map.drawOffset.x;
		newPosition.y = newPosition.y + Map.drawOffset.y;
		
		$("#screen").append('<div id="'+this.ID+'" class="map" style="left:'+newPosition.x+'px;top:'+newPosition.y+'px;"></div>');

		for(var x = 0; x < this.size.width; x++) {
			for(var y = 0; y < this.size.height; y++) {
				var type = this.tile[x+"_"+y];
				$("#"+this.ID).prepend("<div class='tile "+type+"' id='tile_"+x+"_"+y+"' style='left:"+x*UNIT+"px;top:"+y*UNIT+"px;"+"'></div>");
			}
		}
		
		if(this.edgeType[EDGE_TYPE_ENUM.RIGHT]) {
			$("#"+this.ID).addClass("border_right");
		}
		if(this.edgeType[EDGE_TYPE_ENUM.BOTTOM]) {
			$("#"+this.ID).addClass("border_bottom");
		}
		
		this.updateCssPosition();
	},
	
	drawNeighbours: function() {
		for(var index in this.neighbours) {
			if(typeof this.neighbours[index].draw === 'function') {
				this.neighbours[index].draw();
			}
		}
	},
	
	erase: function() {
		if(!$("#"+this.ID).length) {
			//console.log(this.ID+" ALREADY ERASED");
			return null;
		}
		
		//console.log(this.ID+" ERASED");
		$("#"+this.ID).remove();
	},
	
	eraseNeighbours: function() {
		for(var index in this.neighbours) {
			if(this.neighbours[index] != null && typeof this.neighbours[index].erase === 'function') {
				this.neighbours[index].erase();
			}
		}
	},
	
	getNeighboursOccupation: function() {
		var map = [];
		for(var y = this.minEdgeNeighbour.y; y <= this.maxEdgeNeighbour.y; y++) {
			var tmpMap = [];
			for(var x = this.minEdgeNeighbour.x; x <= this.maxEdgeNeighbour.x; x++) {
				var mapID = "map_"+(this.position.x+x)*1+"_"+(this.position.y+y)*1+"_0";
				var mapToAdd;
				if(typeof this.neighbours[mapID] === 'undefined') {
					console.log(mapID+" undefined, fill with unaccessible map");
					mapToAdd = generate2DArray(this.size.width, this.size.height, STATIC_OCCUPATION_ENUM.UNAVAILABLE);
				} else {
					mapToAdd = this.neighbours[mapID].getOccupation();
				}
				concat2DArray(tmpMap, mapToAdd, "X");
			}
			if(tmpMap.length > 0) {
				map = concat2DArray(map, tmpMap, "Y");
			}
		}
		
		return map;
	},
};
