//  Math.uid
Math.uid=function(){for(var e=CHARS,c=Array(36),b=0,d,a=0;36>a;a++)8==a||13==a||18==a||23==a?c[a]="-":14==a?c[a]="4":(2>=b&&(b=33554432+16777216*Math.random()|0),d=b&15,b>>=4,c[a]=e[19==a?d&3|8:d]);return c.join("")};
// Array.unset
Array.prototype.unset = function(val){var index = this.indexOf(val);if(index > -1){this.splice(index,1);}};