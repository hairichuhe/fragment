var net=require("net");
var client= new net.Socket();

client.setEncoding("utf8");
client.connect(50000,"localhost",function(){
	console.log("111");
	client.write('{"Code":200,"Obj":"www.imooc.com"}')
});
client.on("data",function(data){
	console.log("已接收到的服务器发送的数据："+data)
})