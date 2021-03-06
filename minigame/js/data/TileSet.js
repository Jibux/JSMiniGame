var TileSet={
	basics:{
		grass:{img:'grass.png',x:0,y:0,primary:'grass',secondary:'grass'},
		road:{img:'road.png',x:0,y:0,primary:'road',secondary:'road'},
		water:{img:'water.gif',x:0,y:0,primary:'water',secondary:'water'},
		dirt:{img:'dirt.png',x:0,y:0,primary:'dirt',secondary:'dirt'},
	},
	derived:{
		1:{x:20,y:0},
		2:{x:0,y:20},
		3:{x:20,y:20},
	}
};
/*
var TileSet={
	grass:{img:'grass.png',x:0,y:0,primary:'grass',secondary:'grass'},
	grass1:{img:'grass.png',x:20,y:0,primary:'grass',secondary:'grass'},
	grass2:{img:'grass.png',x:0,y:20,primary:'grass',secondary:'grass'},
	grass3:{img:'grass.png',x:20,y:20,primary:'grass',secondary:'grass'},
	
	road:{img:'road.png',x:0,y:0,primary:'road',secondary:'road'},
	road1:{img:'road.png',x:20,y:0,primary:'road',secondary:'road'},
	road2:{img:'road.png',x:0,y:20,primary:'road',secondary:'road'},
	road3:{img:'road.png',x:20,y:20,primary:'road',secondary:'road'},
	
	water:{img:'water.gif',x:0,y:0,primary:'water',secondary:'water'},
	water1:{img:'water.gif',x:20,y:0,primary:'water',secondary:'water'},
	water2:{img:'water.gif',x:0,y:20,primary:'water',secondary:'water'},
	water3:{img:'water.gif',x:20,y:20,primary:'water',secondary:'water'},
	
	dirt:{img:'dirt.png',x:0,y:0,primary:'dirt',secondary:'dirt'},
	dirt1:{img:'dirt.png',x:20,y:0,primary:'dirt',secondary:'dirt'},
	dirt2:{img:'dirt.png',x:0,y:20,primary:'dirt',secondary:'dirt'},
	dirt3:{img:'dirt.png',x:20,y:20,primary:'dirt',secondary:'dirt'},

	grass_water_1_1:{img:'tile1.gif',x:0,y:0,primary:'grass',secondary:'water'},
	grass_water_2_1:{img:'tile1.gif',x:20,y:0,primary:'grass',secondary:'water'},
	grass_water_3_1:{img:'tile1.gif',x:40,y:0,primary:'grass',secondary:'water'},
	grass_water_4_1:{img:'tile1.gif',x:60,y:0,primary:'grass',secondary:'water'},
	grass_water_5_1:{img:'tile1.gif',x:80,y:0,primary:'grass',secondary:'water'},
	grass_water_6_1:{img:'tile1.gif',x:100,y:0,primary:'grass',secondary:'water'},
	grass_water_7_1:{img:'tile1.gif',x:120,y:0,primary:'grass',secondary:'water'},
	grass_water_8_1:{img:'tile1.gif',x:140,y:0,primary:'grass',secondary:'water'},
	grass_water_9_1:{img:'tile1.gif',x:160,y:0,primary:'grass',secondary:'water'},
	grass_water_10_1:{img:'tile1.gif',x:180,y:0,primary:'grass',secondary:'water'},
	grass_water_11_1:{img:'tile1.gif',x:200,y:0,primary:'grass',secondary:'water'},
	grass_water_12_1:{img:'tile1.gif',x:220,y:0,primary:'grass',secondary:'water'},
	grass_water_13_1:{img:'tile1.gif',x:240,y:0,primary:'grass',secondary:'water'},
	grass_water_14_1:{img:'tile1.gif',x:260,y:0,primary:'grass',secondary:'water'},
	grass_water_15_1:{img:'tile1.gif',x:280,y:0,primary:'grass',secondary:'water'},
	grass_water_16_1:{img:'tile1.gif',x:300,y:0,primary:'grass',secondary:'water'},
	grass_water_17_1:{img:'tile1.gif',x:320,y:0,primary:'grass',secondary:'water'},
	grass_water_18_1:{img:'tile1.gif',x:340,y:0,primary:'grass',secondary:'water'},
	grass_water_19_1:{img:'tile1.gif',x:360,y:0,primary:'grass',secondary:'water'},
	grass_water_20_1:{img:'tile1.gif',x:380,y:0,primary:'grass',secondary:'water'},
	grass_water_1_2:{img:'tile1.gif',x:0,y:20,primary:'grass',secondary:'water'},
	grass_water_2_2:{img:'tile1.gif',x:20,y:20,primary:'grass',secondary:'water'},
	grass_water_3_2:{img:'tile1.gif',x:40,y:20,primary:'grass',secondary:'water'},
	grass_water_4_2:{img:'tile1.gif',x:60,y:20,primary:'grass',secondary:'water'},
	grass_water_5_2:{img:'tile1.gif',x:80,y:20,primary:'grass',secondary:'water'},
	grass_water_6_2:{img:'tile1.gif',x:100,y:20,primary:'grass',secondary:'water'},
	grass_water_7_2:{img:'tile1.gif',x:120,y:20,primary:'grass',secondary:'water'},
	grass_water_8_2:{img:'tile1.gif',x:140,y:20,primary:'grass',secondary:'water'},
	grass_water_9_2:{img:'tile1.gif',x:160,y:20,primary:'grass',secondary:'water'},
	grass_water_10_2:{img:'tile1.gif',x:180,y:20,primary:'grass',secondary:'water'},
	grass_water_11_2:{img:'tile1.gif',x:200,y:20,primary:'grass',secondary:'water'},
	grass_water_12_2:{img:'tile1.gif',x:220,y:20,primary:'grass',secondary:'water'},
	grass_water_13_2:{img:'tile1.gif',x:240,y:20,primary:'grass',secondary:'water'},
	grass_water_14_2:{img:'tile1.gif',x:260,y:20,primary:'grass',secondary:'water'},
	grass_water_15_2:{img:'tile1.gif',x:280,y:20,primary:'grass',secondary:'water'},
	grass_water_16_2:{img:'tile1.gif',x:300,y:20,primary:'grass',secondary:'water'},
	grass_water_17_2:{img:'tile1.gif',x:320,y:20,primary:'grass',secondary:'water'},
	grass_water_18_2:{img:'tile1.gif',x:340,y:20,primary:'grass',secondary:'water'},
	grass_water_19_2:{img:'tile1.gif',x:360,y:20,primary:'grass',secondary:'water'},
	grass_water_20_2:{img:'tile1.gif',x:380,y:20,primary:'grass',secondary:'water'},
	grass_water_1_3:{img:'tile1.gif',x:0,y:40,primary:'grass',secondary:'water'},
	grass_water_2_3:{img:'tile1.gif',x:20,y:40,primary:'grass',secondary:'water'},
	grass_water_3_3:{img:'tile1.gif',x:40,y:40,primary:'grass',secondary:'water'},
	grass_water_4_3:{img:'tile1.gif',x:60,y:40,primary:'grass',secondary:'water'},
	grass_water_5_3:{img:'tile1.gif',x:80,y:40,primary:'grass',secondary:'water'},
	grass_water_6_3:{img:'tile1.gif',x:100,y:40,primary:'grass',secondary:'water'},
	grass_water_7_3:{img:'tile1.gif',x:120,y:40,primary:'grass',secondary:'water'},
	grass_water_8_3:{img:'tile1.gif',x:140,y:40,primary:'grass',secondary:'water'},
	grass_water_9_3:{img:'tile1.gif',x:160,y:40,primary:'grass',secondary:'water'},
	grass_water_10_3:{img:'tile1.gif',x:180,y:40,primary:'grass',secondary:'water'},
	grass_water_11_3:{img:'tile1.gif',x:200,y:40,primary:'grass',secondary:'water'},
	grass_water_12_3:{img:'tile1.gif',x:220,y:40,primary:'grass',secondary:'water'},
	grass_water_13_3:{img:'tile1.gif',x:240,y:40,primary:'grass',secondary:'water'},
	grass_water_14_3:{img:'tile1.gif',x:260,y:40,primary:'grass',secondary:'water'},
	grass_water_15_3:{img:'tile1.gif',x:280,y:40,primary:'grass',secondary:'water'},
	grass_water_16_3:{img:'tile1.gif',x:300,y:40,primary:'grass',secondary:'water'},
	grass_water_17_3:{img:'tile1.gif',x:320,y:40,primary:'grass',secondary:'water'},
	grass_water_18_3:{img:'tile1.gif',x:340,y:40,primary:'grass',secondary:'water'},
	grass_water_19_3:{img:'tile1.gif',x:360,y:40,primary:'grass',secondary:'water'},
	grass_water_20_3:{img:'tile1.gif',x:380,y:40,primary:'grass',secondary:'water'},
	grass_water_1_4:{img:'tile1.gif',x:0,y:60,primary:'grass',secondary:'water'},
	grass_water_2_4:{img:'tile1.gif',x:20,y:60,primary:'grass',secondary:'water'},
	grass_water_3_4:{img:'tile1.gif',x:40,y:60,primary:'grass',secondary:'water'},
	grass_water_4_4:{img:'tile1.gif',x:60,y:60,primary:'grass',secondary:'water'},
	grass_water_5_4:{img:'tile1.gif',x:80,y:60,primary:'grass',secondary:'water'},
	grass_water_6_4:{img:'tile1.gif',x:100,y:60,primary:'grass',secondary:'water'},
	grass_water_7_4:{img:'tile1.gif',x:120,y:60,primary:'grass',secondary:'water'},
	grass_water_8_4:{img:'tile1.gif',x:140,y:60,primary:'grass',secondary:'water'},
	grass_water_9_4:{img:'tile1.gif',x:160,y:60,primary:'grass',secondary:'water'},
	grass_water_10_4:{img:'tile1.gif',x:180,y:60,primary:'grass',secondary:'water'},
	grass_water_11_4:{img:'tile1.gif',x:200,y:60,primary:'grass',secondary:'water'},
	grass_water_12_4:{img:'tile1.gif',x:220,y:60,primary:'grass',secondary:'water'},
	grass_water_13_4:{img:'tile1.gif',x:240,y:60,primary:'grass',secondary:'water'},
	grass_water_14_4:{img:'tile1.gif',x:260,y:60,primary:'grass',secondary:'water'},
	grass_water_15_4:{img:'tile1.gif',x:280,y:60,primary:'grass',secondary:'water'},
	grass_water_16_4:{img:'tile1.gif',x:300,y:60,primary:'grass',secondary:'water'},
	grass_water_17_4:{img:'tile1.gif',x:320,y:60,primary:'grass',secondary:'water'},
	grass_water_18_4:{img:'tile1.gif',x:340,y:60,primary:'grass',secondary:'water'},
	grass_water_19_4:{img:'tile1.gif',x:360,y:60,primary:'grass',secondary:'water'},
	grass_water_20_4:{img:'tile1.gif',x:380,y:60,primary:'grass',secondary:'water'},
	
	road_grass_1_1:{img:'tile2.gif',x:0,y:0,primary:'road',secondary:'grass'},
	road_grass_2_1:{img:'tile2.gif',x:20,y:0,primary:'road',secondary:'grass'},
	road_grass_3_1:{img:'tile2.gif',x:40,y:0,primary:'road',secondary:'grass'},
	road_grass_4_1:{img:'tile2.gif',x:60,y:0,primary:'road',secondary:'grass'},
	road_grass_5_1:{img:'tile2.gif',x:80,y:0,primary:'road',secondary:'grass'},
	road_grass_6_1:{img:'tile2.gif',x:100,y:0,primary:'road',secondary:'grass'},
	road_grass_7_1:{img:'tile2.gif',x:120,y:0,primary:'road',secondary:'grass'},
	road_grass_8_1:{img:'tile2.gif',x:140,y:0,primary:'road',secondary:'grass'},
	road_grass_9_1:{img:'tile2.gif',x:160,y:0,primary:'road',secondary:'grass'},
	road_grass_10_1:{img:'tile2.gif',x:180,y:0,primary:'road',secondary:'grass'},
	road_grass_11_1:{img:'tile2.gif',x:200,y:0,primary:'road',secondary:'grass'},
	road_grass_12_1:{img:'tile2.gif',x:220,y:0,primary:'road',secondary:'grass'},
	road_grass_13_1:{img:'tile2.gif',x:240,y:0,primary:'road',secondary:'grass'},
	road_grass_14_1:{img:'tile2.gif',x:260,y:0,primary:'road',secondary:'grass'},
	road_grass_15_1:{img:'tile2.gif',x:280,y:0,primary:'road',secondary:'grass'},
	road_grass_16_1:{img:'tile2.gif',x:300,y:0,primary:'road',secondary:'grass'},
	road_grass_17_1:{img:'tile2.gif',x:320,y:0,primary:'road',secondary:'grass'},
	road_grass_18_1:{img:'tile2.gif',x:340,y:0,primary:'road',secondary:'grass'},
	road_grass_19_1:{img:'tile2.gif',x:360,y:0,primary:'road',secondary:'grass'},
	road_grass_20_1:{img:'tile2.gif',x:380,y:0,primary:'road',secondary:'grass'},
	road_grass_1_2:{img:'tile2.gif',x:0,y:20,primary:'road',secondary:'grass'},
	road_grass_2_2:{img:'tile2.gif',x:20,y:20,primary:'road',secondary:'grass'},
	road_grass_3_2:{img:'tile2.gif',x:40,y:20,primary:'road',secondary:'grass'},
	road_grass_4_2:{img:'tile2.gif',x:60,y:20,primary:'road',secondary:'grass'},
	road_grass_5_2:{img:'tile2.gif',x:80,y:20,primary:'road',secondary:'grass'},
	road_grass_6_2:{img:'tile2.gif',x:100,y:20,primary:'road',secondary:'grass'},
	road_grass_7_2:{img:'tile2.gif',x:120,y:20,primary:'road',secondary:'grass'},
	road_grass_8_2:{img:'tile2.gif',x:140,y:20,primary:'road',secondary:'grass'},
	road_grass_9_2:{img:'tile2.gif',x:160,y:20,primary:'road',secondary:'grass'},
	road_grass_10_2:{img:'tile2.gif',x:180,y:20,primary:'road',secondary:'grass'},
	road_grass_11_2:{img:'tile2.gif',x:200,y:20,primary:'road',secondary:'grass'},
	road_grass_12_2:{img:'tile2.gif',x:220,y:20,primary:'road',secondary:'grass'},
	road_grass_13_2:{img:'tile2.gif',x:240,y:20,primary:'road',secondary:'grass'},
	road_grass_14_2:{img:'tile2.gif',x:260,y:20,primary:'road',secondary:'grass'},
	road_grass_15_2:{img:'tile2.gif',x:280,y:20,primary:'road',secondary:'grass'},
	road_grass_16_2:{img:'tile2.gif',x:300,y:20,primary:'road',secondary:'grass'},
	road_grass_17_2:{img:'tile2.gif',x:320,y:20,primary:'road',secondary:'grass'},
	road_grass_18_2:{img:'tile2.gif',x:340,y:20,primary:'road',secondary:'grass'},
	road_grass_19_2:{img:'tile2.gif',x:360,y:20,primary:'road',secondary:'grass'},
	road_grass_20_2:{img:'tile2.gif',x:380,y:20,primary:'road',secondary:'grass'},
	road_grass_1_3:{img:'tile2.gif',x:0,y:40,primary:'road',secondary:'grass'},
	road_grass_2_3:{img:'tile2.gif',x:20,y:40,primary:'road',secondary:'grass'},
	road_grass_3_3:{img:'tile2.gif',x:40,y:40,primary:'road',secondary:'grass'},
	road_grass_4_3:{img:'tile2.gif',x:60,y:40,primary:'road',secondary:'grass'},
	road_grass_5_3:{img:'tile2.gif',x:80,y:40,primary:'road',secondary:'grass'},
	road_grass_6_3:{img:'tile2.gif',x:100,y:40,primary:'road',secondary:'grass'},
	road_grass_7_3:{img:'tile2.gif',x:120,y:40,primary:'road',secondary:'grass'},
	road_grass_8_3:{img:'tile2.gif',x:140,y:40,primary:'road',secondary:'grass'},
	road_grass_9_3:{img:'tile2.gif',x:160,y:40,primary:'road',secondary:'grass'},
	road_grass_10_3:{img:'tile2.gif',x:180,y:40,primary:'road',secondary:'grass'},
	road_grass_11_3:{img:'tile2.gif',x:200,y:40,primary:'road',secondary:'grass'},
	road_grass_12_3:{img:'tile2.gif',x:220,y:40,primary:'road',secondary:'grass'},
	road_grass_13_3:{img:'tile2.gif',x:240,y:40,primary:'road',secondary:'grass'},
	road_grass_14_3:{img:'tile2.gif',x:260,y:40,primary:'road',secondary:'grass'},
	road_grass_15_3:{img:'tile2.gif',x:280,y:40,primary:'road',secondary:'grass'},
	road_grass_16_3:{img:'tile2.gif',x:300,y:40,primary:'road',secondary:'grass'},
	road_grass_17_3:{img:'tile2.gif',x:320,y:40,primary:'road',secondary:'grass'},
	road_grass_18_3:{img:'tile2.gif',x:340,y:40,primary:'road',secondary:'grass'},
	road_grass_19_3:{img:'tile2.gif',x:360,y:40,primary:'road',secondary:'grass'},
	road_grass_20_3:{img:'tile2.gif',x:380,y:40,primary:'road',secondary:'grass'},
	road_grass_1_4:{img:'tile2.gif',x:0,y:60,primary:'road',secondary:'grass'},
	road_grass_2_4:{img:'tile2.gif',x:20,y:60,primary:'road',secondary:'grass'},
	road_grass_3_4:{img:'tile2.gif',x:40,y:60,primary:'road',secondary:'grass'},
	road_grass_4_4:{img:'tile2.gif',x:60,y:60,primary:'road',secondary:'grass'},
	road_grass_5_4:{img:'tile2.gif',x:80,y:60,primary:'road',secondary:'grass'},
	road_grass_6_4:{img:'tile2.gif',x:100,y:60,primary:'road',secondary:'grass'},
	road_grass_7_4:{img:'tile2.gif',x:120,y:60,primary:'road',secondary:'grass'},
	road_grass_8_4:{img:'tile2.gif',x:140,y:60,primary:'road',secondary:'grass'},
	road_grass_9_4:{img:'tile2.gif',x:160,y:60,primary:'road',secondary:'grass'},
	road_grass_10_4:{img:'tile2.gif',x:180,y:60,primary:'road',secondary:'grass'},
	road_grass_11_4:{img:'tile2.gif',x:200,y:60,primary:'road',secondary:'grass'},
	road_grass_12_4:{img:'tile2.gif',x:220,y:60,primary:'road',secondary:'grass'},
	road_grass_13_4:{img:'tile2.gif',x:240,y:60,primary:'road',secondary:'grass'},
	road_grass_14_4:{img:'tile2.gif',x:260,y:60,primary:'road',secondary:'grass'},
	road_grass_15_4:{img:'tile2.gif',x:280,y:60,primary:'road',secondary:'grass'},
	road_grass_16_4:{img:'tile2.gif',x:300,y:60,primary:'road',secondary:'grass'},
	road_grass_17_4:{img:'tile2.gif',x:320,y:60,primary:'road',secondary:'grass'},
	road_grass_18_4:{img:'tile2.gif',x:340,y:60,primary:'road',secondary:'grass'},
	road_grass_19_4:{img:'tile2.gif',x:360,y:60,primary:'road',secondary:'grass'},
	road_grass_20_4:{img:'tile2.gif',x:380,y:60,primary:'road',secondary:'grass'},
	
	road_water_1_1:{img:'tile3.gif',x:0,y:0,primary:'road',secondary:'water'},
	road_water_2_1:{img:'tile3.gif',x:20,y:0,primary:'road',secondary:'water'},
	road_water_3_1:{img:'tile3.gif',x:40,y:0,primary:'road',secondary:'water'},
	road_water_4_1:{img:'tile3.gif',x:60,y:0,primary:'road',secondary:'water'},
	road_water_5_1:{img:'tile3.gif',x:80,y:0,primary:'road',secondary:'water'},
	road_water_6_1:{img:'tile3.gif',x:100,y:0,primary:'road',secondary:'water'},
	road_water_7_1:{img:'tile3.gif',x:120,y:0,primary:'road',secondary:'water'},
	road_water_8_1:{img:'tile3.gif',x:140,y:0,primary:'road',secondary:'water'},
	road_water_9_1:{img:'tile3.gif',x:160,y:0,primary:'road',secondary:'water'},
	road_water_10_1:{img:'tile3.gif',x:180,y:0,primary:'road',secondary:'water'},
	road_water_11_1:{img:'tile3.gif',x:200,y:0,primary:'road',secondary:'water'},
	road_water_12_1:{img:'tile3.gif',x:220,y:0,primary:'road',secondary:'water'},
	road_water_13_1:{img:'tile3.gif',x:240,y:0,primary:'road',secondary:'water'},
	road_water_14_1:{img:'tile3.gif',x:260,y:0,primary:'road',secondary:'water'},
	road_water_15_1:{img:'tile3.gif',x:280,y:0,primary:'road',secondary:'water'},
	road_water_16_1:{img:'tile3.gif',x:300,y:0,primary:'road',secondary:'water'},
	road_water_17_1:{img:'tile3.gif',x:320,y:0,primary:'road',secondary:'water'},
	road_water_18_1:{img:'tile3.gif',x:340,y:0,primary:'road',secondary:'water'},
	road_water_19_1:{img:'tile3.gif',x:360,y:0,primary:'road',secondary:'water'},
	road_water_20_1:{img:'tile3.gif',x:380,y:0,primary:'road',secondary:'water'},
	road_water_1_2:{img:'tile3.gif',x:0,y:20,primary:'road',secondary:'water'},
	road_water_2_2:{img:'tile3.gif',x:20,y:20,primary:'road',secondary:'water'},
	road_water_3_2:{img:'tile3.gif',x:40,y:20,primary:'road',secondary:'water'},
	road_water_4_2:{img:'tile3.gif',x:60,y:20,primary:'road',secondary:'water'},
	road_water_5_2:{img:'tile3.gif',x:80,y:20,primary:'road',secondary:'water'},
	road_water_6_2:{img:'tile3.gif',x:100,y:20,primary:'road',secondary:'water'},
	road_water_7_2:{img:'tile3.gif',x:120,y:20,primary:'road',secondary:'water'},
	road_water_8_2:{img:'tile3.gif',x:140,y:20,primary:'road',secondary:'water'},
	road_water_9_2:{img:'tile3.gif',x:160,y:20,primary:'road',secondary:'water'},
	road_water_10_2:{img:'tile3.gif',x:180,y:20,primary:'road',secondary:'water'},
	road_water_11_2:{img:'tile3.gif',x:200,y:20,primary:'road',secondary:'water'},
	road_water_12_2:{img:'tile3.gif',x:220,y:20,primary:'road',secondary:'water'},
	road_water_13_2:{img:'tile3.gif',x:240,y:20,primary:'road',secondary:'water'},
	road_water_14_2:{img:'tile3.gif',x:260,y:20,primary:'road',secondary:'water'},
	road_water_15_2:{img:'tile3.gif',x:280,y:20,primary:'road',secondary:'water'},
	road_water_16_2:{img:'tile3.gif',x:300,y:20,primary:'road',secondary:'water'},
	road_water_17_2:{img:'tile3.gif',x:320,y:20,primary:'road',secondary:'water'},
	road_water_18_2:{img:'tile3.gif',x:340,y:20,primary:'road',secondary:'water'},
	road_water_19_2:{img:'tile3.gif',x:360,y:20,primary:'road',secondary:'water'},
	road_water_20_2:{img:'tile3.gif',x:380,y:20,primary:'road',secondary:'water'},
	road_water_1_3:{img:'tile3.gif',x:0,y:40,primary:'road',secondary:'water'},
	road_water_2_3:{img:'tile3.gif',x:20,y:40,primary:'road',secondary:'water'},
	road_water_3_3:{img:'tile3.gif',x:40,y:40,primary:'road',secondary:'water'},
	road_water_4_3:{img:'tile3.gif',x:60,y:40,primary:'road',secondary:'water'},
	road_water_5_3:{img:'tile3.gif',x:80,y:40,primary:'road',secondary:'water'},
	road_water_6_3:{img:'tile3.gif',x:100,y:40,primary:'road',secondary:'water'},
	road_water_7_3:{img:'tile3.gif',x:120,y:40,primary:'road',secondary:'water'},
	road_water_8_3:{img:'tile3.gif',x:140,y:40,primary:'road',secondary:'water'},
	road_water_9_3:{img:'tile3.gif',x:160,y:40,primary:'road',secondary:'water'},
	road_water_10_3:{img:'tile3.gif',x:180,y:40,primary:'road',secondary:'water'},
	road_water_11_3:{img:'tile3.gif',x:200,y:40,primary:'road',secondary:'water'},
	road_water_12_3:{img:'tile3.gif',x:220,y:40,primary:'road',secondary:'water'},
	road_water_13_3:{img:'tile3.gif',x:240,y:40,primary:'road',secondary:'water'},
	road_water_14_3:{img:'tile3.gif',x:260,y:40,primary:'road',secondary:'water'},
	road_water_15_3:{img:'tile3.gif',x:280,y:40,primary:'road',secondary:'water'},
	road_water_16_3:{img:'tile3.gif',x:300,y:40,primary:'road',secondary:'water'},
	road_water_17_3:{img:'tile3.gif',x:320,y:40,primary:'road',secondary:'water'},
	road_water_18_3:{img:'tile3.gif',x:340,y:40,primary:'road',secondary:'water'},
	road_water_19_3:{img:'tile3.gif',x:360,y:40,primary:'road',secondary:'water'},
	road_water_20_3:{img:'tile3.gif',x:380,y:40,primary:'road',secondary:'water'},
	road_water_1_4:{img:'tile3.gif',x:0,y:60,primary:'road',secondary:'water'},
	road_water_2_4:{img:'tile3.gif',x:20,y:60,primary:'road',secondary:'water'},
	road_water_3_4:{img:'tile3.gif',x:40,y:60,primary:'road',secondary:'water'},
	road_water_4_4:{img:'tile3.gif',x:60,y:60,primary:'road',secondary:'water'},
	road_water_5_4:{img:'tile3.gif',x:80,y:60,primary:'road',secondary:'water'},
	road_water_6_4:{img:'tile3.gif',x:100,y:60,primary:'road',secondary:'water'},
	road_water_7_4:{img:'tile3.gif',x:120,y:60,primary:'road',secondary:'water'},
	road_water_8_4:{img:'tile3.gif',x:140,y:60,primary:'road',secondary:'water'},
	road_water_9_4:{img:'tile3.gif',x:160,y:60,primary:'road',secondary:'water'},
	road_water_10_4:{img:'tile3.gif',x:180,y:60,primary:'road',secondary:'water'},
	road_water_11_4:{img:'tile3.gif',x:200,y:60,primary:'road',secondary:'water'},
	road_water_12_4:{img:'tile3.gif',x:220,y:60,primary:'road',secondary:'water'},
	road_water_13_4:{img:'tile3.gif',x:240,y:60,primary:'road',secondary:'water'},
	road_water_14_4:{img:'tile3.gif',x:260,y:60,primary:'road',secondary:'water'},
	road_water_15_4:{img:'tile3.gif',x:280,y:60,primary:'road',secondary:'water'},
	road_water_16_4:{img:'tile3.gif',x:300,y:60,primary:'road',secondary:'water'},
	road_water_17_4:{img:'tile3.gif',x:320,y:60,primary:'road',secondary:'water'},
	road_water_18_4:{img:'tile3.gif',x:340,y:60,primary:'road',secondary:'water'},
	road_water_19_4:{img:'tile3.gif',x:360,y:60,primary:'road',secondary:'water'},
	road_water_20_4:{img:'tile3.gif',x:380,y:60,primary:'road',secondary:'water'},
	
	grass_dirt_1_1:{img:'tile4.gif',x:0,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_2_1:{img:'tile4.gif',x:20,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_3_1:{img:'tile4.gif',x:40,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_4_1:{img:'tile4.gif',x:60,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_5_1:{img:'tile4.gif',x:80,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_6_1:{img:'tile4.gif',x:100,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_7_1:{img:'tile4.gif',x:120,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_8_1:{img:'tile4.gif',x:140,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_9_1:{img:'tile4.gif',x:160,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_10_1:{img:'tile4.gif',x:180,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_11_1:{img:'tile4.gif',x:200,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_12_1:{img:'tile4.gif',x:220,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_13_1:{img:'tile4.gif',x:240,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_14_1:{img:'tile4.gif',x:260,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_15_1:{img:'tile4.gif',x:280,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_16_1:{img:'tile4.gif',x:300,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_17_1:{img:'tile4.gif',x:320,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_18_1:{img:'tile4.gif',x:340,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_19_1:{img:'tile4.gif',x:360,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_20_1:{img:'tile4.gif',x:380,y:0,primary:'grass',secondary:'dirt'},
	grass_dirt_1_2:{img:'tile4.gif',x:0,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_2_2:{img:'tile4.gif',x:20,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_3_2:{img:'tile4.gif',x:40,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_4_2:{img:'tile4.gif',x:60,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_5_2:{img:'tile4.gif',x:80,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_6_2:{img:'tile4.gif',x:100,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_7_2:{img:'tile4.gif',x:120,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_8_2:{img:'tile4.gif',x:140,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_9_2:{img:'tile4.gif',x:160,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_10_2:{img:'tile4.gif',x:180,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_11_2:{img:'tile4.gif',x:200,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_12_2:{img:'tile4.gif',x:220,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_13_2:{img:'tile4.gif',x:240,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_14_2:{img:'tile4.gif',x:260,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_15_2:{img:'tile4.gif',x:280,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_16_2:{img:'tile4.gif',x:300,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_17_2:{img:'tile4.gif',x:320,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_18_2:{img:'tile4.gif',x:340,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_19_2:{img:'tile4.gif',x:360,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_20_2:{img:'tile4.gif',x:380,y:20,primary:'grass',secondary:'dirt'},
	grass_dirt_1_3:{img:'tile4.gif',x:0,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_2_3:{img:'tile4.gif',x:20,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_3_3:{img:'tile4.gif',x:40,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_4_3:{img:'tile4.gif',x:60,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_5_3:{img:'tile4.gif',x:80,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_6_3:{img:'tile4.gif',x:100,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_7_3:{img:'tile4.gif',x:120,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_8_3:{img:'tile4.gif',x:140,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_9_3:{img:'tile4.gif',x:160,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_10_3:{img:'tile4.gif',x:180,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_11_3:{img:'tile4.gif',x:200,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_12_3:{img:'tile4.gif',x:220,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_13_3:{img:'tile4.gif',x:240,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_14_3:{img:'tile4.gif',x:260,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_15_3:{img:'tile4.gif',x:280,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_16_3:{img:'tile4.gif',x:300,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_17_3:{img:'tile4.gif',x:320,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_18_3:{img:'tile4.gif',x:340,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_19_3:{img:'tile4.gif',x:360,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_20_3:{img:'tile4.gif',x:380,y:40,primary:'grass',secondary:'dirt'},
	grass_dirt_1_4:{img:'tile4.gif',x:0,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_2_4:{img:'tile4.gif',x:20,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_3_4:{img:'tile4.gif',x:40,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_4_4:{img:'tile4.gif',x:60,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_5_4:{img:'tile4.gif',x:80,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_6_4:{img:'tile4.gif',x:100,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_7_4:{img:'tile4.gif',x:120,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_8_4:{img:'tile4.gif',x:140,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_9_4:{img:'tile4.gif',x:160,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_10_4:{img:'tile4.gif',x:180,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_11_4:{img:'tile4.gif',x:200,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_12_4:{img:'tile4.gif',x:220,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_13_4:{img:'tile4.gif',x:240,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_14_4:{img:'tile4.gif',x:260,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_15_4:{img:'tile4.gif',x:280,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_16_4:{img:'tile4.gif',x:300,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_17_4:{img:'tile4.gif',x:320,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_18_4:{img:'tile4.gif',x:340,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_19_4:{img:'tile4.gif',x:360,y:60,primary:'grass',secondary:'dirt'},
	grass_dirt_20_4:{img:'tile4.gif',x:380,y:60,primary:'grass',secondary:'dirt'},
	
	dirt_water_1_1:{img:'tile5.gif',x:0,y:0,primary:'dirt',secondary:'water'},
	dirt_water_2_1:{img:'tile5.gif',x:20,y:0,primary:'dirt',secondary:'water'},
	dirt_water_3_1:{img:'tile5.gif',x:40,y:0,primary:'dirt',secondary:'water'},
	dirt_water_4_1:{img:'tile5.gif',x:60,y:0,primary:'dirt',secondary:'water'},
	dirt_water_5_1:{img:'tile5.gif',x:80,y:0,primary:'dirt',secondary:'water'},
	dirt_water_6_1:{img:'tile5.gif',x:100,y:0,primary:'dirt',secondary:'water'},
	dirt_water_7_1:{img:'tile5.gif',x:120,y:0,primary:'dirt',secondary:'water'},
	dirt_water_8_1:{img:'tile5.gif',x:140,y:0,primary:'dirt',secondary:'water'},
	dirt_water_9_1:{img:'tile5.gif',x:160,y:0,primary:'dirt',secondary:'water'},
	dirt_water_10_1:{img:'tile5.gif',x:180,y:0,primary:'dirt',secondary:'water'},
	dirt_water_11_1:{img:'tile5.gif',x:200,y:0,primary:'dirt',secondary:'water'},
	dirt_water_12_1:{img:'tile5.gif',x:220,y:0,primary:'dirt',secondary:'water'},
	dirt_water_13_1:{img:'tile5.gif',x:240,y:0,primary:'dirt',secondary:'water'},
	dirt_water_14_1:{img:'tile5.gif',x:260,y:0,primary:'dirt',secondary:'water'},
	dirt_water_15_1:{img:'tile5.gif',x:280,y:0,primary:'dirt',secondary:'water'},
	dirt_water_16_1:{img:'tile5.gif',x:300,y:0,primary:'dirt',secondary:'water'},
	dirt_water_17_1:{img:'tile5.gif',x:320,y:0,primary:'dirt',secondary:'water'},
	dirt_water_18_1:{img:'tile5.gif',x:340,y:0,primary:'dirt',secondary:'water'},
	dirt_water_19_1:{img:'tile5.gif',x:360,y:0,primary:'dirt',secondary:'water'},
	dirt_water_20_1:{img:'tile5.gif',x:380,y:0,primary:'dirt',secondary:'water'},
	dirt_water_1_2:{img:'tile5.gif',x:0,y:20,primary:'dirt',secondary:'water'},
	dirt_water_2_2:{img:'tile5.gif',x:20,y:20,primary:'dirt',secondary:'water'},
	dirt_water_3_2:{img:'tile5.gif',x:40,y:20,primary:'dirt',secondary:'water'},
	dirt_water_4_2:{img:'tile5.gif',x:60,y:20,primary:'dirt',secondary:'water'},
	dirt_water_5_2:{img:'tile5.gif',x:80,y:20,primary:'dirt',secondary:'water'},
	dirt_water_6_2:{img:'tile5.gif',x:100,y:20,primary:'dirt',secondary:'water'},
	dirt_water_7_2:{img:'tile5.gif',x:120,y:20,primary:'dirt',secondary:'water'},
	dirt_water_8_2:{img:'tile5.gif',x:140,y:20,primary:'dirt',secondary:'water'},
	dirt_water_9_2:{img:'tile5.gif',x:160,y:20,primary:'dirt',secondary:'water'},
	dirt_water_10_2:{img:'tile5.gif',x:180,y:20,primary:'dirt',secondary:'water'},
	dirt_water_11_2:{img:'tile5.gif',x:200,y:20,primary:'dirt',secondary:'water'},
	dirt_water_12_2:{img:'tile5.gif',x:220,y:20,primary:'dirt',secondary:'water'},
	dirt_water_13_2:{img:'tile5.gif',x:240,y:20,primary:'dirt',secondary:'water'},
	dirt_water_14_2:{img:'tile5.gif',x:260,y:20,primary:'dirt',secondary:'water'},
	dirt_water_15_2:{img:'tile5.gif',x:280,y:20,primary:'dirt',secondary:'water'},
	dirt_water_16_2:{img:'tile5.gif',x:300,y:20,primary:'dirt',secondary:'water'},
	dirt_water_17_2:{img:'tile5.gif',x:320,y:20,primary:'dirt',secondary:'water'},
	dirt_water_18_2:{img:'tile5.gif',x:340,y:20,primary:'dirt',secondary:'water'},
	dirt_water_19_2:{img:'tile5.gif',x:360,y:20,primary:'dirt',secondary:'water'},
	dirt_water_20_2:{img:'tile5.gif',x:380,y:20,primary:'dirt',secondary:'water'},
	dirt_water_1_3:{img:'tile5.gif',x:0,y:40,primary:'dirt',secondary:'water'},
	dirt_water_2_3:{img:'tile5.gif',x:20,y:40,primary:'dirt',secondary:'water'},
	dirt_water_3_3:{img:'tile5.gif',x:40,y:40,primary:'dirt',secondary:'water'},
	dirt_water_4_3:{img:'tile5.gif',x:60,y:40,primary:'dirt',secondary:'water'},
	dirt_water_5_3:{img:'tile5.gif',x:80,y:40,primary:'dirt',secondary:'water'},
	dirt_water_6_3:{img:'tile5.gif',x:100,y:40,primary:'dirt',secondary:'water'},
	dirt_water_7_3:{img:'tile5.gif',x:120,y:40,primary:'dirt',secondary:'water'},
	dirt_water_8_3:{img:'tile5.gif',x:140,y:40,primary:'dirt',secondary:'water'},
	dirt_water_9_3:{img:'tile5.gif',x:160,y:40,primary:'dirt',secondary:'water'},
	dirt_water_10_3:{img:'tile5.gif',x:180,y:40,primary:'dirt',secondary:'water'},
	dirt_water_11_3:{img:'tile5.gif',x:200,y:40,primary:'dirt',secondary:'water'},
	dirt_water_12_3:{img:'tile5.gif',x:220,y:40,primary:'dirt',secondary:'water'},
	dirt_water_13_3:{img:'tile5.gif',x:240,y:40,primary:'dirt',secondary:'water'},
	dirt_water_14_3:{img:'tile5.gif',x:260,y:40,primary:'dirt',secondary:'water'},
	dirt_water_15_3:{img:'tile5.gif',x:280,y:40,primary:'dirt',secondary:'water'},
	dirt_water_16_3:{img:'tile5.gif',x:300,y:40,primary:'dirt',secondary:'water'},
	dirt_water_17_3:{img:'tile5.gif',x:320,y:40,primary:'dirt',secondary:'water'},
	dirt_water_18_3:{img:'tile5.gif',x:340,y:40,primary:'dirt',secondary:'water'},
	dirt_water_19_3:{img:'tile5.gif',x:360,y:40,primary:'dirt',secondary:'water'},
	dirt_water_20_3:{img:'tile5.gif',x:380,y:40,primary:'dirt',secondary:'water'},
	dirt_water_1_4:{img:'tile5.gif',x:0,y:60,primary:'dirt',secondary:'water'},
	dirt_water_2_4:{img:'tile5.gif',x:20,y:60,primary:'dirt',secondary:'water'},
	dirt_water_3_4:{img:'tile5.gif',x:40,y:60,primary:'dirt',secondary:'water'},
	dirt_water_4_4:{img:'tile5.gif',x:60,y:60,primary:'dirt',secondary:'water'},
	dirt_water_5_4:{img:'tile5.gif',x:80,y:60,primary:'dirt',secondary:'water'},
	dirt_water_6_4:{img:'tile5.gif',x:100,y:60,primary:'dirt',secondary:'water'},
	dirt_water_7_4:{img:'tile5.gif',x:120,y:60,primary:'dirt',secondary:'water'},
	dirt_water_8_4:{img:'tile5.gif',x:140,y:60,primary:'dirt',secondary:'water'},
	dirt_water_9_4:{img:'tile5.gif',x:160,y:60,primary:'dirt',secondary:'water'},
	dirt_water_10_4:{img:'tile5.gif',x:180,y:60,primary:'dirt',secondary:'water'},
	dirt_water_11_4:{img:'tile5.gif',x:200,y:60,primary:'dirt',secondary:'water'},
	dirt_water_12_4:{img:'tile5.gif',x:220,y:60,primary:'dirt',secondary:'water'},
	dirt_water_13_4:{img:'tile5.gif',x:240,y:60,primary:'dirt',secondary:'water'},
	dirt_water_14_4:{img:'tile5.gif',x:260,y:60,primary:'dirt',secondary:'water'},
	dirt_water_15_4:{img:'tile5.gif',x:280,y:60,primary:'dirt',secondary:'water'},
	dirt_water_16_4:{img:'tile5.gif',x:300,y:60,primary:'dirt',secondary:'water'},
	dirt_water_17_4:{img:'tile5.gif',x:320,y:60,primary:'dirt',secondary:'water'},
	dirt_water_18_4:{img:'tile5.gif',x:340,y:60,primary:'dirt',secondary:'water'},
	dirt_water_19_4:{img:'tile5.gif',x:360,y:60,primary:'dirt',secondary:'water'},
	dirt_water_20_4:{img:'tile5.gif',x:380,y:60,primary:'dirt',secondary:'water'},
	
	road_dirt_1_1:{img:'tile6.gif',x:0,y:0,primary:'road',secondary:'dirt'},
	road_dirt_2_1:{img:'tile6.gif',x:20,y:0,primary:'road',secondary:'dirt'},
	road_dirt_3_1:{img:'tile6.gif',x:40,y:0,primary:'road',secondary:'dirt'},
	road_dirt_4_1:{img:'tile6.gif',x:60,y:0,primary:'road',secondary:'dirt'},
	road_dirt_5_1:{img:'tile6.gif',x:80,y:0,primary:'road',secondary:'dirt'},
	road_dirt_6_1:{img:'tile6.gif',x:100,y:0,primary:'road',secondary:'dirt'},
	road_dirt_7_1:{img:'tile6.gif',x:120,y:0,primary:'road',secondary:'dirt'},
	road_dirt_8_1:{img:'tile6.gif',x:140,y:0,primary:'road',secondary:'dirt'},
	road_dirt_9_1:{img:'tile6.gif',x:160,y:0,primary:'road',secondary:'dirt'},
	road_dirt_10_1:{img:'tile6.gif',x:180,y:0,primary:'road',secondary:'dirt'},
	road_dirt_11_1:{img:'tile6.gif',x:200,y:0,primary:'road',secondary:'dirt'},
	road_dirt_12_1:{img:'tile6.gif',x:220,y:0,primary:'road',secondary:'dirt'},
	road_dirt_13_1:{img:'tile6.gif',x:240,y:0,primary:'road',secondary:'dirt'},
	road_dirt_14_1:{img:'tile6.gif',x:260,y:0,primary:'road',secondary:'dirt'},
	road_dirt_15_1:{img:'tile6.gif',x:280,y:0,primary:'road',secondary:'dirt'},
	road_dirt_16_1:{img:'tile6.gif',x:300,y:0,primary:'road',secondary:'dirt'},
	road_dirt_17_1:{img:'tile6.gif',x:320,y:0,primary:'road',secondary:'dirt'},
	road_dirt_18_1:{img:'tile6.gif',x:340,y:0,primary:'road',secondary:'dirt'},
	road_dirt_19_1:{img:'tile6.gif',x:360,y:0,primary:'road',secondary:'dirt'},
	road_dirt_20_1:{img:'tile6.gif',x:380,y:0,primary:'road',secondary:'dirt'},
	road_dirt_1_2:{img:'tile6.gif',x:0,y:20,primary:'road',secondary:'dirt'},
	road_dirt_2_2:{img:'tile6.gif',x:20,y:20,primary:'road',secondary:'dirt'},
	road_dirt_3_2:{img:'tile6.gif',x:40,y:20,primary:'road',secondary:'dirt'},
	road_dirt_4_2:{img:'tile6.gif',x:60,y:20,primary:'road',secondary:'dirt'},
	road_dirt_5_2:{img:'tile6.gif',x:80,y:20,primary:'road',secondary:'dirt'},
	road_dirt_6_2:{img:'tile6.gif',x:100,y:20,primary:'road',secondary:'dirt'},
	road_dirt_7_2:{img:'tile6.gif',x:120,y:20,primary:'road',secondary:'dirt'},
	road_dirt_8_2:{img:'tile6.gif',x:140,y:20,primary:'road',secondary:'dirt'},
	road_dirt_9_2:{img:'tile6.gif',x:160,y:20,primary:'road',secondary:'dirt'},
	road_dirt_10_2:{img:'tile6.gif',x:180,y:20,primary:'road',secondary:'dirt'},
	road_dirt_11_2:{img:'tile6.gif',x:200,y:20,primary:'road',secondary:'dirt'},
	road_dirt_12_2:{img:'tile6.gif',x:220,y:20,primary:'road',secondary:'dirt'},
	road_dirt_13_2:{img:'tile6.gif',x:240,y:20,primary:'road',secondary:'dirt'},
	road_dirt_14_2:{img:'tile6.gif',x:260,y:20,primary:'road',secondary:'dirt'},
	road_dirt_15_2:{img:'tile6.gif',x:280,y:20,primary:'road',secondary:'dirt'},
	road_dirt_16_2:{img:'tile6.gif',x:300,y:20,primary:'road',secondary:'dirt'},
	road_dirt_17_2:{img:'tile6.gif',x:320,y:20,primary:'road',secondary:'dirt'},
	road_dirt_18_2:{img:'tile6.gif',x:340,y:20,primary:'road',secondary:'dirt'},
	road_dirt_19_2:{img:'tile6.gif',x:360,y:20,primary:'road',secondary:'dirt'},
	road_dirt_20_2:{img:'tile6.gif',x:380,y:20,primary:'road',secondary:'dirt'},
	road_dirt_1_3:{img:'tile6.gif',x:0,y:40,primary:'road',secondary:'dirt'},
	road_dirt_2_3:{img:'tile6.gif',x:20,y:40,primary:'road',secondary:'dirt'},
	road_dirt_3_3:{img:'tile6.gif',x:40,y:40,primary:'road',secondary:'dirt'},
	road_dirt_4_3:{img:'tile6.gif',x:60,y:40,primary:'road',secondary:'dirt'},
	road_dirt_5_3:{img:'tile6.gif',x:80,y:40,primary:'road',secondary:'dirt'},
	road_dirt_6_3:{img:'tile6.gif',x:100,y:40,primary:'road',secondary:'dirt'},
	road_dirt_7_3:{img:'tile6.gif',x:120,y:40,primary:'road',secondary:'dirt'},
	road_dirt_8_3:{img:'tile6.gif',x:140,y:40,primary:'road',secondary:'dirt'},
	road_dirt_9_3:{img:'tile6.gif',x:160,y:40,primary:'road',secondary:'dirt'},
	road_dirt_10_3:{img:'tile6.gif',x:180,y:40,primary:'road',secondary:'dirt'},
	road_dirt_11_3:{img:'tile6.gif',x:200,y:40,primary:'road',secondary:'dirt'},
	road_dirt_12_3:{img:'tile6.gif',x:220,y:40,primary:'road',secondary:'dirt'},
	road_dirt_13_3:{img:'tile6.gif',x:240,y:40,primary:'road',secondary:'dirt'},
	road_dirt_14_3:{img:'tile6.gif',x:260,y:40,primary:'road',secondary:'dirt'},
	road_dirt_15_3:{img:'tile6.gif',x:280,y:40,primary:'road',secondary:'dirt'},
	road_dirt_16_3:{img:'tile6.gif',x:300,y:40,primary:'road',secondary:'dirt'},
	road_dirt_17_3:{img:'tile6.gif',x:320,y:40,primary:'road',secondary:'dirt'},
	road_dirt_18_3:{img:'tile6.gif',x:340,y:40,primary:'road',secondary:'dirt'},
	road_dirt_19_3:{img:'tile6.gif',x:360,y:40,primary:'road',secondary:'dirt'},
	road_dirt_20_3:{img:'tile6.gif',x:380,y:40,primary:'road',secondary:'dirt'},
	road_dirt_1_4:{img:'tile6.gif',x:0,y:60,primary:'road',secondary:'dirt'},
	road_dirt_2_4:{img:'tile6.gif',x:20,y:60,primary:'road',secondary:'dirt'},
	road_dirt_3_4:{img:'tile6.gif',x:40,y:60,primary:'road',secondary:'dirt'},
	road_dirt_4_4:{img:'tile6.gif',x:60,y:60,primary:'road',secondary:'dirt'},
	road_dirt_5_4:{img:'tile6.gif',x:80,y:60,primary:'road',secondary:'dirt'},
	road_dirt_6_4:{img:'tile6.gif',x:100,y:60,primary:'road',secondary:'dirt'},
	road_dirt_7_4:{img:'tile6.gif',x:120,y:60,primary:'road',secondary:'dirt'},
	road_dirt_8_4:{img:'tile6.gif',x:140,y:60,primary:'road',secondary:'dirt'},
	road_dirt_9_4:{img:'tile6.gif',x:160,y:60,primary:'road',secondary:'dirt'},
	road_dirt_10_4:{img:'tile6.gif',x:180,y:60,primary:'road',secondary:'dirt'},
	road_dirt_11_4:{img:'tile6.gif',x:200,y:60,primary:'road',secondary:'dirt'},
	road_dirt_12_4:{img:'tile6.gif',x:220,y:60,primary:'road',secondary:'dirt'},
	road_dirt_13_4:{img:'tile6.gif',x:240,y:60,primary:'road',secondary:'dirt'},
	road_dirt_14_4:{img:'tile6.gif',x:260,y:60,primary:'road',secondary:'dirt'},
	road_dirt_15_4:{img:'tile6.gif',x:280,y:60,primary:'road',secondary:'dirt'},
	road_dirt_16_4:{img:'tile6.gif',x:300,y:60,primary:'road',secondary:'dirt'},
	road_dirt_17_4:{img:'tile6.gif',x:320,y:60,primary:'road',secondary:'dirt'},
	road_dirt_18_4:{img:'tile6.gif',x:340,y:60,primary:'road',secondary:'dirt'},
	road_dirt_19_4:{img:'tile6.gif',x:360,y:60,primary:'road',secondary:'dirt'},
	road_dirt_20_4:{img:'tile6.gif',x:380,y:60,primary:'road',secondary:'dirt'},
};
*/