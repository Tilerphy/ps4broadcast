var net = require("net");
var sock = net.connect(788, "livecmt-2.bilibili.com");
sock.on("connect", ()=>{
	console.log("connected");
});

sock.on("data", (d)=>{
	var length = d[3];
	console.log(d);
	console.log(d.slice(16).toString());
	console.log("\n");
});

sock.on("close", ()=>{
	console.log("closed.");
});

var dataBuffer  = Buffer.from("{\"roomid\":33671,\"uid\":123456789012345}");
var headerBuffer= new Buffer([0,0,0,dataBuffer.length+16,0,16,0,1,0,0,0,7,0,0,0,1]);
var heartBeat = new Buffer([0,0,0,16,0,16,0,1,0,0,0,2,0,0,0,1]);
var packageBuffer = Buffer.alloc(dataBuffer.length+headerBuffer.length);
packageBuffer = Buffer.concat([headerBuffer,dataBuffer]);
sock.write(packageBuffer,()=>{
	setInterval(()=>{sock.write(heartBeat); console.log("heartbeat");}, 30000);
});

