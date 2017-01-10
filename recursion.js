
var result = []
var list=[
	{id:1,child:[]},
	{id:11,pid:1,child:[]},
	{id:12,pid:1,child:[]},
	{id:13,pid:1,child:[]},
	{id:131,pid:13,child:[]},
	{id:1311,pid:131,child:[]},
	{id:2,child:[]},
	{id:21,pid:2,child:[]}
];
var root = [];
for(var i=0;i<list.length;i++){
	var info = list[i];
	if(!info.pid){
		root.push(info);
	}
}

for(var i=0;i<list.length;i++){
	for(var j=0;j<root.length;j++){
		if(list[i].id == root[j].id){
			list.splice(i,1);
		}
	}
};

// root: {id:13,pid:1,child:[]}]
	
	 
// list:[ {id:131,pid:13,child:[]},
	// {id:1311,pid:131,child:[]},]

for(var i=0;i<root.length;i++){
	setChild(root[i],list);
	result.push(root[i]);
}


function setChild(root,list){
	var children = [];
	for (var i = 0; i<list.length;i++) {
		if(root.id==list[i].pid){
			children.push(list[i]);
		}
	};
	//children[{id:131,pid:13,child:[]}]
	//children[{id:132,pid:13,child:[]}]
	if(children!=null&&children.length>0){
		for (var i = 0; i<children.length;i++) {
			setChild(children[i],list);
		}
		root.child.push(children);
	}
}

console.log(JSON.stringify(result));