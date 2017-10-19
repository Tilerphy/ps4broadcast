var fs =require("fs");
var express= require("express");
var app = express();
var http = require("http").Server(app);
var xhttp = require("http");
var io= require("socket.io")(http);
var exec = require("child_process").exec;
var net = require("net");
var douyu = require("douyu");
var gift = require("./gift");
// 这个和install.sh中用的linux电脑虚拟ip一致，或者写成0.0.0.0
var host = "192.168.200.1";
var port = 6667;
var Client = function(tid, sock){
        this.sock = sock;
	this.tid = tid;
        this.toPS4 = (name, message)=>{
                this.sock.write(":"+name+"!"+name+"@"+name+".tmi.twitch.tv PRIVMSG #"+name+" :"+message+"\r\n");
                this.sock.write("\r\n");
        };
	this.sendHandshake =  ()=>{
		this.sock.write(":tmi.twitch.tv 001 "+this.tid+" :Welcome, GLHF!\r\n");
                this.sock.write(":tmi.twitch.tv 002 "+this.tid+" :Your host is tmi.twitch.tv\r\n");
                this.sock.write(":tmi.twitch.tv 003 "+this.tid+" :This server is rather new\r\n");
                this.sock.write(":tmi.twitch.tv 004 "+this.tid+" :-\r\n");
                this.sock.write(":tmi.twitch.tv 375 "+this.tid+" :-\r\n");
                this.sock.write(":tmi.twitch.tv 372 "+this.tid+" :You are in a maze of twisty passages, all alike.\r\n");
                this.sock.write(":tmi.twitch.tv 376 "+this.tid+" :>\r\n");
                this.sock.write("\r\n");
	};
}

io.on("connection", (websock)=>{
        websock.emit("message", "Connected to PS4broadcast-WebRunner");
        websock.on("resetlive", (msg)=>{
                        var lp = new LivingProcess(msg.tid, msg.rid, msg.url, msg.code);
                        lp.prepare
                          .then(lp.config)
			  .then(lp.configDanmu)
			  .then(lp.configTwitchClient)
                          .then(lp.start)
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
	this.configDanmu = new Promise((resolve,reject)=>{
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
			if(this.currentTwitchClient){
				this.currentTwitchClient.toPS4(msg.sn+"送出礼物√", gift[msg.gfid]);
			}
			io.emit("message", msg.sn+"送出礼物√ : "+gift[msg.gfid]);
		});
		try{
			this.currentRoom.open();
			resolve();
		}catch(e){
			io.emit("error", e.toString());
		}
	});

	this.configTwitchClient = new Promise((resolve, reject)=>{
		
		var server = net.createServer((sock)=>{
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
			server.listen(port, host);
			resolve();
		}catch(e){
			io.emit("error", e.toString());
		}
	});
	this.prepare = new Promise((resolve, reject)=>{
		try{
			exec("killall nginx", (error, stdout, stderr)=>{
				resolve();
			});
		}
		catch(e){
			io.emit("error", e.toString());
		}
	});
	this.config = new Promise((resolve,reject)=>{
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

	this.start = new Promise((resolve,reject)=>{
		exec("/usr/local/nginx/sbin/nginx",(error, stdout, stderr)=>{
			if(error || stderr){
				io.emit("error", error);
				io.emit("error", stderr);
                        }else{
                                resolve(stdout);
                        }
		});
	});
};

app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/index.html");	
});

http.listen(26666);
//
//
//end of Web Server Defines

