var net = require("net");
var init = function (rid, io, lp){
	this.uid = 123456789012345 + parseInt(1000000000000000*Math.random());
	this.rid = rid;
	this.lp = lp;
	this.interval = null; 
	var sock = net.connect(788, "livecmt-2.bilibili.com");
        sock.on("connect", ()=>{
        	console.log("connected");
        });
        sock.on("data", (d)=>{
                popBilibiliMsg(d, (msg)=>{
			msg.info[2][1] = "[B]"+msg.info[2][1];
                	switch(msg.cmd){
				case "DANMU_MSG":
					if(this.lp.currentTwitchClient){
						this.lp.currentTwitchClient.toPS4(msg.info[2][1], msg.info[1]);
					}
					io.emit("message", msg.info[2][1]+": "+msg.info[1]);
					break;
				case "SEND_GIFT":
					if(this.lp.currentTwitchClient){
						this.lp.currentTwitchClient.toPS4(msg.data.uname+"送出礼物√", msg.data.giftName);
					}
					io.emit("message", msg.data.uname+"送出礼物√："+msg.data.giftName);
					break;
				case "WELCOME":
					if(this.lp.currentTwitchClient){
						this.lp.currentTwitchClient.toPS4(msg.data.uanme, "进入直播间");
					}
					io.emit("message", msg.data.uname+"进入直播间");
					break;
				default:
					break;
			}
                });
        });

        var dataBuffer  = Buffer.from("{\"roomid\":"+this.rid+",\"uid\":"+this.uid+"}");
        var headerBuffer= new Buffer([0,0,0,dataBuffer.length+16,0,16,0,1,0,0,0,7,0,0,0,1]);
      	var heartBeat = new Buffer([0,0,0,16,0,16,0,1,0,0,0,2,0,0,0,1]);
      	var packageBuffer = Buffer.alloc(dataBuffer.length+headerBuffer.length);
        packageBuffer = Buffer.concat([headerBuffer,dataBuffer]);
       	var p = new Promise((resolve, reject)=>{
		sock.write(packageBuffer,()=>{
			this.interval = setInterval(()=>{sock.write(heartBeat); console.log("heartbeat");}, 30000);
                	resolve();
        	});
	});
	this.close = ()=>{
		clearInterval(this.interval);
		sock.destroy();
	};

	Promise.all([p]);
}


function popBilibiliMsg(d, callback){
       	if(callback && d[11]!= 3 && d[11]!= 8){
       		var length = d[0]*256*256*256+d[1]*256*256+d[2]*256+d[3];
                //resolve bilibili TCP-nagle bug
                if(d.length == length){
                	callback(JSON.parse(d.slice(16).toString()));
                }else{
                        callback(JSON.parse(d.slice(16,length).toString()));
                        popBilibiliMsg(d.slice(length), callback);
                }
        }
}
module.exports.type= "bilibili";
module.exports.init = init;
