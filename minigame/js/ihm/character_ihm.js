
/**
<div class="occupation" style="top:$top$px;left:$left$px;" id="$ID$"></div>
<div class="perso stand up left">
	<div class="name">$name$</div>
	<div class="lifebar">
		<div class="life" style="width:$life$%;background-position:0 $life$%;"></div>
	</div>
</div>

@param	ID
@param	top
@param	left
@param	name
@param	life
*/
var character_ihm=[
	{
		name : "div",
		attr:[
			{name:"id",	value:"$ID$"},
			{name:"class",	value:"occupation"},
			{name:"style",	value:"top: $top$px;left: $left$px;"},
		],
		child:[{
			name : "div",
			attr:[
				{name:"class",	value:"perso stand up left"},
			],
			child:[
				{
					name : "div",
					attr:[
						{name:"class",	value:"name"},
					],
					child:[
						{ content : "$name$" }
					]
				},
				{
					name : "div",
					attr:[
						{name:"class",	value:"lifebar"},
					],
					child:[
						{
							name : "div",
							attr:[
								{name:"class",	value:"life"},
								{name:"style",	value:"width: $life$%;background-position:0 $life$%;"},
							]
						},
					]
				},
			],
		}],
	},
];