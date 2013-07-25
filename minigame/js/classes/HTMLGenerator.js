/**
* Génère un code HTML à partir d'un tableau JSON
*
* jsonTemplate => tableau d'éléments
*	-------------------------------------------------------------------
*	-------------------------------------------------------------------
*	Eléments:
*	-------------------------------------------------------------------
*		1_ Noeud/ balises HTML:
*			{
*				name:"node"
*				attr:[
*					{name:"attr_name",value:"attr_value"},
*					{name:"attr_name",value:"$variable$",defaultValue:"attr_default_value"}		=>	pour mettre des variables il faut mettre le nom de la variable entre ' $ ' et éventuellement mettre une valeur par défaut en rajoutant default
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
		$(parentNode).append(HTMLGenerator.getHtmlCode(jsonTemplate,params));
	},
	prepend : function(parentNode, jsonTemplate,params) {
		$(parentNode).prepend(HTMLGenerator.getHtmlCode(jsonTemplate,params));
	},
	html : function(parentNode, jsonTemplate,params) {
		$(parentNode).html(HTMLGenerator.getHtmlCode(jsonTemplate,params));
	},

	getHtmlCode : function(jsonTemplate,params) {
		function replaceVariables(string, params,defaultValue){
			var regex = /\$[a-zA-Z0-9]+\$/g; 
			if(regex.test(string)) {
				var matches = string.match(regex);
				for(counter = 0; counter<matches.length; counter++){
					//recuperation nom param
					parameterName = matches[counter];
					parameterName = parameterName.replace("$","").replace("$","");
					if(params[parameterName] !== undefined){
						//replace si le param existe
						string = string.replace("$"+parameterName+"$",params[parameterName]);
					}else if(defaultValue !== undefined){
						//sinon replace avec valeur par defaut
						string = string.replace("$"+parameterName+"$",defaultValue);
					}else{
						console.error("ERROR : No parameter given for "+matches[counter]);
					}
				}
			}
			return string;
		}
	
		var nodeCode="";
		for(var i in jsonTemplate) {
			var node = jsonTemplate[i];
			if(node.content !== undefined ) {
				nodeCode += replaceVariables(node.content,params,node.content.defaultValue);
			}
			if(node.name !==undefined ) {
				nodeCode+="<"+node.name;
				if(node.attr !== undefined) {
					for(var attr in node.attr) {
						var value = replaceVariables(node.attr[attr].value,params,node.attr[attr].defaultValue);			
						nodeCode += " "+node.attr[attr].name+"='"+value+"'";
					}
				}
				nodeCode+=">";
				if(node.child !== undefined) {
					nodeCode += HTMLGenerator.getHtmlCode(node.child,params);
				}
				nodeCode += "</"+node.name+">";
			}
		}
		return nodeCode;
	}
};