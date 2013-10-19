var maxBrushSize={x:10,y:10};

var brushSet=[
	//Basics circles
	{"size":{"width":"1","height":"1"},"tiles":{"1_1":"1_3"}},
	{"size":{"width":"2","height":"2"},"tiles":{"1_1":"5_2","2_1":"6_2","1_2":"5_3","2_2":"6_3"}},
	{"size":{"width":"4","height":"4"},"tiles":{"1_1":"4_1","2_1":"5_1","3_1":"6_1","4_1":"7_1","1_2":"4_2","2_2":0,"3_2":0,"4_2":"7_2","1_3":"4_3","2_3":0,"3_3":0,"4_3":"7_3","1_4":"4_4","2_4":"5_4","3_4":"6_4","4_4":"7_4"}},
	//Basics squares
	{"size":{"width":"2","height":"2"},"tiles":{"1_1":"22_4","2_1":"22_2","1_2":"22_3","2_2":"22_1"}},
	{"size":{"width":"3","height":"3"},"tiles":{"1_1":"22_4","2_1":"24_3","3_1":"22_2","1_2":"24_4","2_2":0,"3_2":"24_2","1_3":"22_3","2_3":"24_1","3_3":"22_1"}},
	{"size":{"width":"4","height":"4"},"tiles":{"1_1":"22_4","2_1":"24_3","3_1":"24_3","4_1":"22_2","1_2":"24_4","2_2":0,"3_2":0,"4_2":"24_2","1_3":"24_4","2_3":0,"3_3":0,"4_3":"24_2","1_4":"22_3","2_4":"24_1","3_4":"24_1","4_4":"22_1"}},
	{"size":{"width":"6","height":"6"},"tiles":{"1_1":"22_4","2_1":"24_3","3_1":"24_3","4_1":"24_3","5_1":"24_3","6_1":"22_2","1_2":"24_4","2_2":0,"3_2":0,"4_2":0,"5_2":0,"6_2":"24_2","1_3":"24_4","2_3":0,"3_3":0,"4_3":0,"5_3":0,"6_3":"24_2","1_4":"24_4","2_4":0,"3_4":0,"4_4":0,"5_4":0,"6_4":"24_2","1_5":"24_4","2_5":0,"3_5":0,"4_5":0,"5_5":0,"6_5":"24_2","1_6":"22_3","2_6":"24_1","3_6":"24_1","4_6":"24_1","5_6":"24_1","6_6":"22_1"}},
	//Others
	{"size":{"width":"2","height":"4"},"tiles":{"1_1":"12_1","2_1":"13_1","1_2":"12_2","2_2":"13_2","1_3":"12_3","2_3":"13_3","1_4":"12_4","2_4":"13_4"}},
	{"size":{"width":"6","height":"4"},"tiles":{"1_1":"5_2","2_1":"17_4","3_1":"17_1","4_1":"18_1","5_1":"18_4","6_1":"6_2","1_2":"5_3","2_2":"21_2","3_2":0,"4_2":0,"5_2":"21_3","6_2":"6_3","1_3":1,"2_3":"4_3","3_3":0,"4_3":0,"5_3":"7_3","6_3":1,"1_4":1,"2_4":"4_4","3_4":"5_4","4_4":"6_4","5_4":"7_4","6_4":1}},
	{"size":{"width":"4","height":"4"},"tiles":{"1_1":1,"2_1":"16_1","3_1":"19_1","4_1":1,"1_2":"12_1","2_2":"23_1","3_2":"23_3","4_2":"13_1","1_3":"12_4","2_3":"23_2","3_3":"23_4","4_3":"13_4","1_4":1,"2_4":"16_2","3_4":"19_2","4_4":1}},
	{"size":{"width":"7","height":"7"},"tiles":{"1_1":"20_3","2_1":"24_3","3_1":"24_3","4_1":"24_3","5_1":"24_3","6_1":"24_3","7_1":"20_2","1_2":"24_4","2_2":0,"3_2":0,"4_2":0,"5_2":0,"6_2":0,"7_2":"24_2","1_3":"24_4","2_3":0,"3_3":"9_2","4_3":"24_1","5_3":"10_2","6_3":0,"7_3":"24_2","1_4":"24_4","2_4":0,"3_4":"24_2","4_4":1,"5_4":"24_4","6_4":0,"7_4":"24_2","1_5":"24_4","2_5":0,"3_5":"9_3","4_5":"24_3","5_5":"10_3","6_5":0,"7_5":"24_2","1_6":"24_4","2_6":0,"3_6":0,"4_6":0,"5_6":0,"6_6":0,"7_6":"24_2","1_7":"20_4","2_7":"24_1","3_7":"24_1","4_7":"24_1","5_7":"24_1","6_7":"24_1","7_7":"20_1"}},
];