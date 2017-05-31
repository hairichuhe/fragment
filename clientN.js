var net=require("net");
var fs = require("fs")
var client= new net.Socket();

getFile("C:/Users/jerry/Desktop/敏感词库/test.txt");

function getFile(path){
	var result='"Path":"'+path+'","SinSize":1024,"Size":'
	fs.stat(path, function(err,stats){
		result+=stats.size+',"SinNum":'+Math.ceil(stats.size/1024);
		startClient(result)
	})
}

function startClient(result){
	client.setEncoding("utf8");
	var obj=JSON.parse("{"+result+"}")
	client.connect(50000,"localhost",function(){
		client.write('{"Code":200,"Obj":"'+result.replace(/:/g,"@").replace(/"/g,"&")+'"}');
	});

	client.on("data",function(data){
		if(data.length>19){
			data=data.replace(/}/g,"},");
			data=data.substr(0,data.length-1)
			var arr=data.split(",");
			console.log(arr)
			for(var i=0;i<arr.length;i++){
				handleData(JSON.parse(arr[i]),obj)
			}
		}else{
			handleData(JSON.parse(data),obj)
		}
		
		
	});
};

function handleData(req,obj){
	req.next=req.next-0;
	var buf = new Buffer(obj.SinSize);
	fs.open(obj.Path,"r+",function(err,fd){
		if(err){
			console.log(err)
		};
		console.log(req)
		if(req.next<obj.SinNum){
			fs.read(fd, buf, 0, buf.length, buf.length*req.next, function(err, bytes){
		      	if (err){
		         	console.log(err);
		      	};
		    	// 仅输出读取的字节
		      	if(bytes > 0){
		         	client.write(buf.slice(0, bytes).toString());
		      	}
			});
		}else{
			console.log("更新完成!")
		}
	})
}		