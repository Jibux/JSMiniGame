var RESOURCE_TYPE_ENUM = { "IMAGE" : "IMAGE"};

var ResourcesLoader = {
	resourcesDefinition : {
		"grass":{src : "grass.png",type : RESOURCE_TYPE_ENUM.IMAGE},
		"water":{src : "water.gif",type : RESOURCE_TYPE_ENUM.IMAGE},
		"road":{src : "road.png",type : RESOURCE_TYPE_ENUM.IMAGE},
		"dirt":{src : "dirt.png",type : RESOURCE_TYPE_ENUM.IMAGE},
		"tile1":{src : "tile1.png",type : RESOURCE_TYPE_ENUM.IMAGE},
	},
	
	isLoaded : function(){
		return ResourcesLoader.loadedResources === ResourcesLoader.getResourcesNumber();
	},
	getResourcesNumber : function(){
		var totalResources=0;
		for(var resource in ResourcesLoader.resourcesDefinition){
			totalResources++;
		}
		return totalResources;
	},
	
	resources : [],
	loadedResources : 0,
	autoLoad : function(){
		//méthode pour le load des resources
		var loadResource = function(resource){
			if( resource.type === RESOURCE_TYPE_ENUM.IMAGE ){
				var img=new Image();
				if(typeof(configuration.view) !== "undefined" && typeof(configuration.view) !== "undefined" && configuration.view === "MAP_EDITOR"){
					img.src= "../resources/images/"+resource.src;
				}else{
					img.src="resources/images/"+resource.src;
				}
				img.onload = function(){
					ResourcesLoader.loadedResources++;
					if(ResourcesLoader.loadedResources === ResourcesLoader.getResourcesNumber()){
						$("#screen").html("");
					}
				};
				return img;
			}
		};
	
		//load des resources
		$("#screen").append('<span class="message">Loading...</span>');
		for(var resource in ResourcesLoader.resourcesDefinition){
			ResourcesLoader.resources[resource] = loadResource(ResourcesLoader.resourcesDefinition[resource]);
		}
		
		
	},
};
ResourcesLoader.autoLoad();