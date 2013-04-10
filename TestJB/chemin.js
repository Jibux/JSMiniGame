var mapOrig=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,0],
[1,1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],
[1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,0,1,0,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,0],
[1,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
[1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
];

var size=20;

function printMap(maptmp) {
	var html="<table align='center'>";
	for(var j=0; j<size; j++) {	
		html+="<tr>";
		for(var i=0; i<size; i++) {
			html+="<td align='center' width='20'>";
			var str="";
			
			switch (maptmp[j][i]) {
				case 0 : str='<span style="font-weight: bold;">#</span>';break;
				case 1 : str='.';break;
				case 2 : str='<span style="color:red;">E</span>';break;
				case 3 : str='<span style="color:green;">P</span>';break;
				case 4 : str='<span style="color:blue;">go</span>';break;
				case 10 : str='<span style="color:blue;">A</span>';break;
				default : break;
			}
			
			html+=str+' ';
			html+="</td>";
		}
		html+="</tr>";
	}
	
	html+="<table>";
	
	$('#map').html(html);
}

function writePath(map,nodes) {
	for(var i=0;i<nodes.length;i++) {
		map[nodes[i].x][nodes[i].y]=4;
	}
}

function move(map,nodes) {
	for(var i=0;i<nodes.length;i++) {
		if(map[nodes[i].x][nodes[i].y]!=2) {
			// Pas d'ennemi
			map[nodes[i].x][nodes[i].y]=4;
		} else {
			// Ennemi en vue
			console.log("Ennemi at ("+nodes[i].x+", "+nodes[i].y+")");
			printMap(map);
			alert("test");
			
			map=copyMap(mapOrig);
			map[nodes[i].x][nodes[i].y]=0;
			//map2[nodes[i].x][nodes[i].y]=0;
			//console.log("MAP");
			//console.log(mapOrig);
			
			var graph = new Graph(map);
			
			//nodes[i-1]=new GraphNode(nodes[i-1].x, nodes[i-1].y, 1);
			//console.log(graph2.nodes[1][1]);
			var start = graph.nodes[nodes[i-1].x][nodes[i-1].y];
			var end = graph.nodes[nodes[nodes.length-1].x][nodes[nodes.length-1].y];
			var result = astar.search(graph.nodes, start, end, true);
			console.log("RESULT");
			console.log(result);
			map = move(map,result);
		}
	}
	return map;
}

function copyMap(map) {
	var map2=[];
	
	for (var i=0; i < map.length; i++) {
		map2[i]=[];
		for (var j=0; j < map[i].length; j++) {
			map2[i][j] = map[i][j];
		}
		//map2[i] = map[i].slice(0);
	}
	
	return map2;
}

$("document").ready(function(){	
	console.log("BEGIN");
	
	var map1=copyMap(mapOrig);
	var graph = new Graph(map1);
	
	var start = graph.nodes[0][0];
    var end = graph.nodes[15][15];
	var map = graph.input;
	
	//printMap(map);
	
	var result = astar.search(graph.nodes, start, end, true);
	console.log("RESULT0");
	console.log(result);
	
	//writePath(map,result);
	
	//map[14][15]=2;
	
	var map2 = move(map1,result);
	
	//map = graph.input;
	printMap(map2);
});


