/**
* Génère un code HTML à partir d'un tableau JSON
*	element_ihm = {
*		html:[
*			... elements ...
*		],
*		beforeLoad:function,
*		afterLoad:function
*	}
*	-------------------------------------------------------------------
*	-------------------------------------------------------------------
*	Eléments:
*	-------------------------------------------------------------------
*		1_ Noeud/ balises HTML:
*			{
*				name:"node"
*				attr:[
*					{name:"attr_name",value:"attr_value"},
*					{name:"attr_name",value:"$variable$",defaultValue:"attr_default_value"}		=>	pour mettre des variables il faut mettre le nom de la variable entre ' $ ' et éventuellement mettre une valeur par défaut en rajoutant default (peut être un objet)
*					...
*				],
*				child[
*					...
*				]
*			}
*	-------------------------------------------------------------------
*		2_ Texte simple:
*			{
*				content:"row text"
*			}
*	-------------------------------------------------------------------
*/
var HTMLGenerator = {
	append : function(parentNode, jsonTemplate,params) {
		if(typeof(jsonTemplate.beforeLoad) !== "undefined"){
			jsonTemplate.beforeLoad(params);
		}
		$(parentNode).append(HTMLGenerator.getHtmlCode(jsonTemplate.html,params));
		if(typeof(jsonTemplate.afterLoad) !== "undefined"){
			jsonTemplate.afterLoad(params);
		}
	},
	prepend : function(parentNode, jsonTemplate,params) {
		if(typeof(jsonTemplate.beforeLoad) !== "undefined"){
			jsonTemplate.beforeLoad(params);
		}
		$(parentNode).prepend(HTMLGenerator.getHtmlCode(jsonTemplate.html,params));
		if(typeof(jsonTemplate.afterLoad) !== "undefined"){
			jsonTemplate.afterLoad(params);
		}
	},
	html : function(parentNode, jsonTemplate,params) {
		if(typeof(jsonTemplate.beforeLoad) !== "undefined"){
			jsonTemplate.beforeLoad(params);
		}
		$(parentNode).html(HTMLGenerator.getHtmlCode(jsonTemplate.html,params));
		if(typeof(jsonTemplate.afterLoad) !== "undefined"){
			jsonTemplate.afterLoad(params);
		}
	},

	getHtmlCode : function(jsonTemplate,params) {
		function replaceVariables(string, params){
			var regex = /\$([^$]+)\$/g;
			if(regex.test(string)) {
				var matches = string.match(regex);
				for(counter = 0; counter<matches.length; counter++){
					//recuperation nom param
					var parameterName = matches[counter];
					parameterName = parameterName.replace(/\$/g,"");
					
					var regex2=/(.+):(.*)/g;
					var defaultValue=undefined;
					
					if(regex2.test(parameterName)){
						parameterName= RegExp.$1;
						defaultValue = RegExp.$2;
					}
					if(typeof(params[parameterName]) !== "undefined"){
						//replace si le param existe
						string = string.replace(matches[counter],params[parameterName]);
					}else if(typeof(defaultValue) !== "undefined"){
						//sinon replace avec valeur par defaut
						string = string.replace(matches[counter],defaultValue);
					}else{
						console.error("ERROR : No parameter given for "+matches[counter]);
					}
				}
			}
			return string;
		}
		
		// CAS MERDIQUE : dans le "for in", on parcours un tableau. Seulement il possède le prototype :
			// Array.prototype.unset=function(a){a=this.indexOf(a);-1<a&&this.splice(a,1)};
			// Soit : On doit checker si le node n'est pas une fonction
			// Soit : On enlève le prototype de Tool.js qui n'a pas encore servi d'ailleurs
		// J'ai déjà été confronté à ce problème dans mon code.
		// Je fais : if(typeof(machin) !== "function")... etc.
	
		var regex=/$(.+):(.*)/g;
	
		var nodeCode="";
		for(var i in jsonTemplate) {
			var node = jsonTemplate[i];
			if(typeof(node.content) !== "undefined") {	
				var ret = replaceVariables(node.content,params);
				nodeCode += ret;
			}
			if(typeof(node.name) !== "undefined" && node.name != "") { // node.name = "" parfois CAS MERDIQUE
				nodeCode+="<"+node.name;
				if(typeof(node.attr) !== "undefined") {
					for(var attr in node.attr) {
						var value = replaceVariables(node.attr[attr].value,params);
						if(typeof(node.attr[attr].name) !== "undefined" && typeof(value) !== "undefined") { // CAS MERDIQUE
							nodeCode += " "+node.attr[attr].name+"='"+value+"'";
						} else {
							//console.log("UNDEF ",node.attr[attr]);
						}
					}
				}
				nodeCode+=">";
				if(typeof(node.child) !== "undefined") {
					nodeCode += HTMLGenerator.getHtmlCode(node.child,params);
				}
				nodeCode += "</"+node.name+">";
			}
		}
		return nodeCode;
	}
};