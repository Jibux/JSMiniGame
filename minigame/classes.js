var StrengthEnum={none : "none",low : "low",normal : "normal",medium : "medium",high : "high"};
var DivinitiesEnum={wind:"wind",fire:"fire",water:"water",earth:"earth"};
var OccupationTypeEnum={none:0,water:1,cliff:2,object:3};

var Point=function(){
	this.x = 0;
	this.y = 0;
	this.z = 0;
};

var PointMap=function(){
	this = new Point();
	this.mapID = 0;
};

var ObjectGame=function(){
	this.ID = 0;
	this.name = 0;
	this.image = null;
	this.weight = 0;
	this.damage = 0;
	this.cost = 0;
};

var ObjectDropped=function(){
	this.base = new ObjectGame();
	this.position = new Point();
};

var CharacterBase=function(){
	this.ID = 0;
	this.position = new Point();
	this.currentLife = 100;
	this.maxLife = 100;
};

var CharacterNotPlayed=function(){
	this.base = new CharacterBase();
	this.agresivity = StrengthEnum.normal;
	this.sociability = StrengthEnum.normal;
	this.nomade = StrengthEnum.normal;
};

var CharacterPlayer=function(){
	this.base = new CharacterBase();
	this.experience = 0;
	this.strenght = 10;
	this.constitution = 10;
	this.dexterity = 10;
	this.intelligence = 10;
	this.hunger = 0;
	this.thirst = 0;
	this.currentMagic = 100;
	this.maxMagic = 100;
	this.coins = 0;
	this.objects = new Array();
};