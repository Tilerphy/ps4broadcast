var fs =require("fs");
var express= require("express");
var app = express();
var http = require("http").Server(app);
var xhttp = require("http");
var io= require("socket.io")(http);
var exec = require("child_process").exec;
//start danmu Redirect
//
//
var net = require("net");
var douyu = require("douyu");
//roomid 应该是你的斗鱼直播房间号
var roomid= "1035304";
var room = new douyu.ChatRoom(roomid);
var gift = require("./gift");
// 这个和install.sh中用的linux电脑虚拟ip一致，或者写成0.0.0.0
var host = "192.168.200.1";
var port = 6667;
var twitchId = "tilerphy";
var Client = function(sock){
        this.sock = sock;
        this.toPS4 = function(name, message){
                this.sock.write(":"+name+"!"+name+"@"+name+".tmi.twitch.tv PRIVMSG #"+name+" :"+message+"\r\n");
                this.sock.write("\r\n");
        };

	this.flushUserNumber = function(debugCallback){
		var all="";
		var req = xhttp.request("http://open.douyucdn.cn/api/RoomApi/room/"+roomid, (res)=>{
				res.on("data", (data)=>{
					all+=data.toString();
				});
				res.on("end",()=>{
					var roomstate = JSON.parse(all);
					var online = 0;
					var fakeUsers = [];
					var fakeUsersList = "";
					if(roomstate && roomstate.data){
						online = parseInt(roomstate.data.online);
					}

					for(var i = 3 ;i < online; i ++){
						fakeUsers[fakeUsers.length]=i;
					}
					if(fakeUsers.length > 0){
						fakeUsersList = fakeUsers.join(" ");
						this.sock.write(":"+twitchId+".tmi.twitch.tv 353 "+twitchId+" = #"+twitchId+" :"+twitchId+" 1 2\r\n");
						this.sock.write(":"+twitchId+".tmi.twitch.tv 353 "+twitchId+" = #"+twitchId+" :"+fakeUsersList+"\r\n");
                				this.sock.write(":"+twitchId+".tmi.twitch.tv 366 "+twitchId+" #"+twitchId+" :End of /NAMES list\r\n");
                				this.sock.write("\r\n");
					}
					if(debugCallback){
						debugCallback(online);
					}
				});
			});
	}
}

io.on("connection", (websock)=>{
        websock.emit("message", "Connected to PS4broadcast-WebRunner");
        websock.on("resetlive", (msg)=>{
                        var lp = new LivingProcess(msg.url, msg.code);
                        lp.prepare
                          .then(lp.config)
                          .then(lp.start)
                          .then(()=>{
                                io.emit("living", true);
                        }).catch(()=>{
                                io.emit("living",false);
                        });
        });
});
var  client = null;
room.on("chatmsg", (msg)=>{
        if(client){
                client.toPS4(msg.nn, msg.txt);
        }
        io.emit("message",msg.nn + ":"+msg.txt);
});
room.on("uenter", (msg)=>{
        if(client){
                client.toPS4(msg.nn, "进入直播间");
		client.flushUserNumber();
        }
       	io.emit("message",msg.nn +": 进入直播间");
        
});



room.on("dgb", (msg)=>{
	if(client){
		client.toPS4(msg.sn+"送出礼物√", gift[msg.gfid]);
	}
	io.emit("message", msg.sn+"送出礼物√ : "+gift[msg.gfid]);
});

net.createServer((sock)=>{

        console.log("connected");
        client = new Client(sock);
        sock.on("data", (d)=>{
                var message = d.toString();
                console.log(message);
                if(message.indexOf("NICK") == 0){
                        sock.write(":tmi.twitch.tv 001 "+twitchId+" :Welcome, GLHF!\r\n");
                        sock.write(":tmi.twitch.tv 002 "+twitchId+" :Your host is tmi.twitch.tv\r\n");
                        sock.write(":tmi.twitch.tv 003 "+twitchId+" :This server is rather new\r\n");
                        sock.write(":tmi.twitch.tv 004 "+twitchId+" :-\r\n");
                        sock.write(":tmi.twitch.tv 375 "+twitchId+" :-\r\n");
                        sock.write(":tmi.twitch.tv 372 "+twitchId+" :You are in a maze of twisty passages, all alike.\r\n");
                        sock.write(":tmi.twitch.tv 376 "+twitchId+" :>\r\n");
                        sock.write("\r\n");
                }
        });

        sock.on("close", ()=>{
                console.log("closed");
        });

}).listen(port, host);
room.open();
//
//
//end of danmu Redirect

//start Web Server Defines
//
//

var LivingProcess = function(url, code){ 
	this.url = url;
	this.code = code;
	this.prepare = new Promise((resolve, reject)=>{
		try{
			exec("killall nginx", (error, stdout, stderr)=>{
				resolve();
			});
		}
		catch(e){resolve();}		
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
			console.log(1);
			reject(e);
		}
	});

	this.start = new Promise((resolve,reject)=>{
		exec("/usr/local/nginx/sbin/nginx",(error, stdout, stderr)=>{
			if(error || stderr){
				console.log(error + "#" + stderr);
                                reject({error:error, stderr:stderr});
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

