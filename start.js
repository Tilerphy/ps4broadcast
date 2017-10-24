var fs =require("fs");
var express= require("express");
var app = express();
var http = require("http").Server(app);
var xhttp = require("http");
var io= require("socket.io")(http);
var exec = require("child_process").exec;
var net = require("net");
var douyu = require("./douyu");
var gift = require("./gift");
// 这个和install.sh中用的linux电脑虚拟ip一致，或者写成0.0.0.0
var host = "192.168.200.1";
var port = 6667;
var Client = function(tid, sock){
        this.sock = sock;
	this.tid = tid;
        this.toPS4 = (name, message)=>{
               try{
			this.sock.write(":"+name+"!"+name+"@"+name+".tmi.twitch.tv PRIVMSG #"+name+" :"+message+"\r\n");
                	this.sock.write("\r\n");
		}catch(e){
			
		}
        };
	this.sendHandshake =  ()=>{
		try{
			this.sock.write(":tmi.twitch.tv 001 "+this.tid+" :Welcome, GLHF!\r\n");
                	this.sock.write(":tmi.twitch.tv 002 "+this.tid+" :Your host is tmi.twitch.tv\r\n");
                	this.sock.write(":tmi.twitch.tv 003 "+this.tid+" :This server is rather new\r\n");
               		this.sock.write(":tmi.twitch.tv 004 "+this.tid+" :-\r\n");
                	this.sock.write(":tmi.twitch.tv 375 "+this.tid+" :-\r\n");
                	this.sock.write(":tmi.twitch.tv 372 "+this.tid+" :You are in a maze of twisty passages, all alike.\r\n");
                	this.sock.write(":tmi.twitch.tv 376 "+this.tid+" :>\r\n");
                	this.sock.write("\r\n");
		}catch(e){

		}
	};
}

var lp = null;
io.on("connection", (websock)=>{
        websock.emit("message", "Connected to PS4broadcast-WebRunner");
	websock.on("resetlive", (msg)=>{
			if(lp && lp.server.listening){
                        	lp.server.close();
			}

			if(lp && lp.currentRoom){
				lp.currentRoom.close();
			}
			lp = new LivingProcess();
                        lp.setup(msg.tid, msg.rid, msg.url, msg.code)
			  .then(lp.prepare())
                          .then(lp.config())
			  .then(lp.configDanmu())
			  .then(lp.resetTwitchClient())
			  .then(lp.configTwitchClient())
                          .then(lp.start())
                          .then(()=>{
                                io.emit("living", true);
                        }).catch(()=>{
                                io.emit("living",false);
                        });
        });
});
//start Web Server Defines
//
//

var LivingProcess = function(tid, rid, url, code){ 
	this.url = url;
	this.code = code;
	this.rid = rid;
	this.tid = tid;
	this.currentRoom = null;
	this.currentTwitchClient = null;
	this.server = null;
	this.setup= (tid, rid, url, code)=>{
		return new Promise((resolve,reject)=>{
			this.tid=tid;
			this.code = code;
			this.rid = rid;
			this.url = url;
			resolve();
		});
	};
	this.configDanmu = ()=>{
		return new Promise((resolve,reject)=>{
			this.currentRoom = new douyu.ChatRoom(this.rid);
			this.currentRoom.on("chatmsg", (msg)=>{
       				if(this.currentTwitchClient){
               				this.currentTwitchClient.toPS4(msg.nn, msg.txt);
       				}
        			io.emit("message",msg.nn + ":"+msg.txt);
			});
			this.currentRoom.on("uenter", (msg)=>{
        			if(this.currentTwitchClient){
                			this.currentTwitchClient.toPS4(msg.nn, "进入直播间");
        			}
       				io.emit("message",msg.nn +": 进入直播间");
			});
			this.currentRoom.on("dgb", (msg)=>{
				var douyuReq= xhttp.request("http://open.douyucdn.cn/api/RoomApi/room/"+this.rid, (res)=>{
					var all = "";
					res.on("data",(d)=>{
						all+=d.toString();
					});

					res.on("end", ()=>{
						var gifts = JSON.parse(all).data.gift;
						var gift = null;
						for(var g of gifts){
							if(g.id == msg.gfid){
								gift = g;
								break;
							}
						}
						if(this.currentTwitchClient){
                                        		this.currentTwitchClient.toPS4(msg.nn+"送出礼物√", gift ==null?"":gift.name);
                                		}
                                		io.emit("message", msg.nn+"送出礼物√ : "+ (gift==null?"":gift.name));
					});
				});
				douyuReq.end();
			});
			try{
				this.currentRoom.open();
				resolve();
			}catch(e){
				io.emit("error", e.toString());
			}
		});
	}

	this.resetTwitchClient =()=>{
		return new Promise((resolve,reject)=>{
			if(this.server && this.server.listening){
				this.server.close(()=>{
					resolve();
				});
			}else{
				resolve();
			}
		});
	}
	this.configTwitchClient = ()=>{
		return new Promise((resolve, reject)=>{
			this.server = net.createServer((sock)=>{
				console.log("connected");
        			this.currentTwitchClient = new Client(this.tid, sock);
        			sock.on("data", (d)=>{
                			var message = d.toString();
                			console.log(message);
                			if(message.indexOf("NICK") == 0){
						this.currentTwitchClient.sendHandshake();
                			}
        			});
        			sock.on("close", ()=>{
        	        		console.log("closed");
	        		});
			});
			try{
				this.server.listen(port, host);
				resolve();
			}catch(e){
				io.emit("error", e.toString());
			}
		});
	}
	this.prepare =()=>{
		return  new Promise((resolve, reject)=>{
			try{
				exec("killall nginx", (error, stdout, stderr)=>{
					resolve();
				});
			}
			catch(e){
				io.emit("error", e.toString());
			}
		});
	}
	this.config =()=>{
		return  new Promise((resolve,reject)=>{
			try{
				fs.writeFileSync("/usr/local/nginx/conf/rtmp.conf.d/douyu",
                                	"server { listen 1935; chunk_size 131072; max_message 256M; application app { live on; record off; meta copy; push "+
                                        	this.url
                                	+"/"+
                                        	this.code
                                	+"; }}");
				resolve();
			}catch(e){
				io.emit("error", e.toString());
			}
		});
	}

	this.start =()=>{
		return  new Promise((resolve,reject)=>{
			exec("/usr/local/nginx/sbin/nginx",(error, stdout, stderr)=>{
				if(error || stderr){
					io.emit("error", error);
					io.emit("error", stderr);
                        	}else{
                                	resolve(stdout);
                        	}
			});
		});
	}
	this.startBilibili=()=>{
		return  new Promise((resolve,reject)=>{
			var sock = net.connect(788, "livecmt-2.bilibili.com");
				sock.on("connect", ()=>{
        			console.log("connected");
			});
			sock.on("data", (d)=>{
        			var length = d[3];
        			console.log(d);
        			io.emit("message",d.slice(16).toString());
        			io.emit("message","\n");
			});

			var dataBuffer  = Buffer.from("{\"roomid\":33671,\"uid\":123456789012345}");
			var headerBuffer= new Buffer([0,0,0,dataBuffer.length+16,0,16,0,1,0,0,0,7,0,0,0,1]);
			var heartBeat = new Buffer([0,0,0,16,0,16,0,1,0,0,0,2,0,0,0,1]);
			var packageBuffer = Buffer.alloc(dataBuffer.length+headerBuffer.length);
			packageBuffer = Buffer.concat([headerBuffer,dataBuffer]);
			sock.write(packageBuffer,()=>{
        			setInterval(()=>{sock.write(heartBeat); console.log("heartbeat");}, 30000);
				resolve();
			});
		});
	}
};

app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");	
});

function test(){

        var lp = new LivingProcess();
        lp.setup("", "", "rtmp://send1a.douyu.com/live", "none")
                          .then(lp.prepare())
                          .then(lp.config())
                          .then(lp.configDanmu())
                          .then(lp.resetTwitchClient())
                          .then(lp.configTwitchClient())
                          .then(lp.start())
                          .then(()=>{
                                console.log("living");
                        }).catch(()=>{
                                console.log("down");
                        });

}
//test();
http.listen(26666);
//
//
//end of Web Server Defines

