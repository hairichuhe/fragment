var net=require("net");
var fs = require("fs")
var client= new net.Socket();

getFile("C:/Users/jerry/Desktop/敏感词库/test.txt");

function getFile(path){
	var result='{"path":"'+path+'","sinSize":1024,"size":'
	fs.stat(path, function(err,stats){
		result+=stats.size+',"sinNum":'+Math.ceil(stats.size/1024)+'}';
		startClient(result)
	})
}

function startClient(result){
	// client.setEncoding("utf8");
	var obj=JSON.parse(result)
	// client.connect(50000,"localhost",function(){
	// 	client.write('{"Code":200,"Obj":'+result+'}');
		fs.open(obj.path,"r+",function(err,fd){
			if(err){
				console.log(err)
			};
			for(let i=0;i<obj.sinNum;i++){
				var buf = new Buffer(obj.sinSize);
				fs.read(fd, buf, 0, buf.length, buf.length*i, function(err, bytes){
			      	if (err){
			         	console.log(err);
			      	};
			    	// 仅输出读取的字节
			      	if(bytes > 0){
			         	console.log(buf.slice(0, bytes).toString());
			      	}
			   });
			}
		})
	// });

	// client.on("data",function(data){
	// 	console.log("已接收到的服务器发送的数据："+data)
	// });
}