//var version = require("./version");
var fs =require("fs");
var express= require("express");
var app = express();
var http = require("http").Server(app);
var xhttp = require("http");
var xhttps =require("https");
var io= require("socket.io")(http);
var exec = require("child_process").exec;
var net = require("net");
// 这个和install.sh中用的linux电脑虚拟ip一致，或者写成0.0.0.0
var host = "0.0.0.0";
var port = 6667;
// 额外模块加载与使用
var modules = [];
var roomModules ={};
var moduleFiles = fs.readdirSync(__dirname+"/modules");
var _timerHandlers = [];
for(var mf of moduleFiles){
        if(mf.indexOf("_") == 0){
                console.log(mf+" is loaded.");
                modules[modules.length] = require(__dirname+"/modules/"+mf);
        }

        if(mf.indexOf("room_") == 0){
                console.log(mf+" is loaded as room module.");
                var rmodule = require(__dirname+"/modules/"+mf);
                roomModules[rmodule.type] = rmodule;
        }
}

// 调用额外模块
function m(arg){
        return new Promise((resolve, reject)=>{
                try{
                        for(var module of modules){
                                if(module.invoke){
                                        module.invoke(arg);
                                }
                        }
                        resolve();
                }catch(e){
                        reject(e);
                }
        });
}

process.on('uncaughtException', function (err) {
    console.log(err);
}); 
//
//
//
var Client = function(tid, sock){
        this.sock = sock;
        this.tid = tid;
	this.pinger = -1;
	this.setPinger = (p)=>{
		this.pinger = p;
	};
	this.close = ()=>{
		clearInterval(this.pinger);
	};
        this.toPS4 = (name, message)=>{
               try{
                        this.sock.write(":"+name+"!"+name+"@"+name+".tmi.twitch.tv PRIVMSG #"+name+" :"+message+"\r\n");
                        //this.sock.write("\r\n");
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
			console.log("handshake sent to ps4");
                }catch(e){
			console.log("handshake sent faild.");
                }
        };
	this.sendPing = ()=>{
		try{
                        this.sock.write("PING :tmi.twitch.tv\r\n");
                        //this.sock.write("\r\n");
			console.log("sent a PING to client.");
                }catch(e){
                        console.log("failed to send ping.");
                }
	};
	this.sendCAP = ()=>{
		try{
			this.sock.write(":tmi.twitch.tv CAP * ACK :twitch.tv/tags\r\n");
                        //this.sock.write("\r\n");
		}catch(e){
			console.log("failed to send cap.");
		}
	};
}

var lp = null;
io.on("connection", (websock)=>{
        websock.emit("message", "当前版本（Current Version） v"+fs.readFileSync("./version"));
        var latestReq = xhttps.get("https://raw.githubusercontent.com/Tilerphy/ps4broadcast/master/version?r="+Math.random(), (res)=>{
		var data = "";
		res.on("data", (d)=>{
			data += d.toString();
		});
		res.on("end",()=>{
			websock.emit("message", "最新版本（Latest Version） v" + data);
		});
	});
	//ignore error
	latestReq.on("error",()=>{
		console.log("Cannot connect to github, please check the version manually.");
	});
	latestReq.end();
	if(fs.existsSync(__dirname+"/lp.data")){
                websock.emit("lastState", JSON.parse(fs.readFileSync(__dirname+"/lp.data")));
        }
        websock.on("resetlive", (msg)=>{
                        if(_timerHandlers.length > 0){
				for(var handler of _timerHandlers){
					clearInterval(handler);
				}
				_timerHandlers = [];
			}
			if(lp && lp.server.listening){
                                lp.server.close();
                        }

                        if(lp && lp.rooms){
                                for(var r of lp.rooms){
                                        if(r){
                                                r.close();
                                        }
                                }
                        }
                        lp = new LivingProcess();
			lp.webapp = app;
                        lp.setup(msg.tid,msg.recordPath, msg.items)
                          .then(lp.prepare())
                          .then(lp.config())
                          .then(lp.resetTwitchClient())
                          .then(lp.configTwitchClient())
                          .then(lp.configDanmu())
                          .then(lp.start())
                          .then(()=>{
                                io.emit("living", msg.items.length + " channels.");
                        })
			.catch(()=>{
                                io.emit("living", false);
                        });
        });

        websock.on("updateandrestart", ()=>{
                exec("git pull origin master && reboot", (error, stdout, stderr)=>{
                        if(error || stderr){
                                console.log(error);
                                console.log(stderr);
                        }
                });
        });

	websock.on("update", ()=>{
		exec("git pull origin master", (error, stdout, stderr)=>{
			if(error || stderr){
                                console.log(error);
                                console.log(stderr);
                        }
		});
	});
});
//start Web Server Defines
//
//
var openRoom = function(rid, type, webIO, ps4){
        return new roomModules[type].init(rid, webIO, ps4,app);
}
var LivingProcess = function(tid, items){
        this.tid = tid;
        this.rooms = [];
        this.currentTwitchClient = null;
        this.server = null;
	this.recordPath = "";
        this.items = items;
        this.setup= (tid,recordPath, items)=>{
                return new Promise((resolve,reject)=>{
                        this.tid=tid;
			this.recordPath = recordPath;
                        console.log(items);
                        this.items = items;
                        fs.writeFileSync(__dirname+"/lp.data", JSON.stringify({tid:tid,recordPath:recordPath, items:items}));
                        resolve();
                });
        };
        this.configDanmu = ()=>{
                return new Promise((resolve,reject)=>{
                        for(var item of this.items){
                                this.rooms[this.rooms.length] = openRoom(item.rid, item.type, io, this);
                        }
                        resolve();
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
                                        console.log("Console said: "+message);
					if(message.indexOf("CAP REQ") == 0){
						this.currentTwitchClient.sendCAP();
					}
                                        if(message.indexOf("NICK") == 0 || message.indexOf(" PASS")==0){
                                                this.currentTwitchClient.sendHandshake();
                                        }
                                });
                                sock.on("close", ()=>{
					this.currentTwitchClient.close();
                                        console.log("closed");
                                });
				_handler = setInterval(this.currentTwitchClient.sendPing, 15*1000);
				_timerHandlers.push(_handler);
				this.currentTwitchClient.setPinger(_handler);
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
                                var fileContent = "server { listen 1935; chunk_size 10240; max_message 64M; \n"+
							" application app { live on;  meta copy; \n";
				if(this.recordPath!=null && this.recordPath.trim()!=""){
					fileContent += "record all;record_path "+this.recordPath+";record_prefix ps4broadcast-; record_suffix %F(%T).flv;"+
					" record_unique off; record_interval 60m; \n";
                                }
				for(var item of this.items){
                                        fileContent += "push "+
                                                        item.url
                                                        + (item.url.endsWith("/") ? "" : "/")+
                                                        item.code
                                                        +"; \n";
                                }
                                fileContent+="}\n}";
                                fs.writeFileSync("/usr/local/nginx/conf/rtmp.conf.d/douyu", fileContent);
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
};
app.use("/js",express.static("extends"));
app.use((req,res,next)=>{
        res.setHeader("Access-Control-Allow-Origin","*");
        next();
});
app.get("/",(req,res)=>{
        res.sendFile(__dirname+"/index.html");
});

app.get("/theme/:type", (req,res)=>{
	res.sendFile(__dirname+"/index."+req.params.type+".html");
})

app.get("/t/:psnid",(req,res)=>{
        var psnid = req.params.psnid;
        var opt ={
                hostname: "io.playstation.com",
                path: "/playstation/psn/profile/public/userData?onlineId="+psnid,
                method:"get",
                headers:{
                        "Referer":"https://www.playstation.com/en-us/my/public-trophies/"
                }
        };
        var xreq = xhttps.request(opt, (xres)=>{
                var all = "";
                xres.on("data", (d)=>{
                        all+=d.toString();
                });
                xres.on("end",()=>{
                        res.json(JSON.parse(all.trim()));
                        res.end();
                });
        });
        xreq.on("error", ()=>{
                res.end("error");
        });
        xreq.end();

});
app.get("/tjs/:psnid", (req,res)=>{
        res.setHeader("Content-Type","application/javascript; charset=utf-8");
        var js = 'var lastTrophies=null; function checkT(psnid){'+
                        ' $.ajax({'+
                                ' type:"get",'+
                                ' url: "http://192.168.88.139:26666/t/"+psnid,'+
                                ' success:  function(resp){'+
                                ' var newTrophies = resp["trophies"];'+
                        ' if(lastTrophies){'+
                                ' var message = "";'+
                                ' console.log(newTrophies); console.log("lastTrophies");'+
                                ' if(newTrophies["bronze"] != lastTrophies["bronze"]){'+
                                '        sendToDouyu("主播从当前游戏获得 "+(parseInt(newTrophies["bronze"])- parseInt(lastTrophies["bronze"]))+" 个铜杯。");'+
                                ' }'+
                                ' if(newTrophies["gold"] != lastTrophies["gold"]){'+
                                '        sendToDouyu("主播从当前游戏获得 "+(parseInt(newTrophies["gold"])- parseInt(lastTrophies["gold"]))+" 个金杯。");'+
                                ' }'+
                                ' if(newTrophies["silver"] != lastTrophies["silver"]){'+
                                '        sendToDouyu("主播从当前游戏获得 "+(parseInt(newTrophies["silver"])- parseInt(lastTrophies["silver"]))+" 个银杯。");'+
                                ' }'+
                                ' if(newTrophies["platinum"] != lastTrophies["platinum"]){'+
                                '        sendToDouyu("主播从当前游戏获得 "+(parseInt(newTrophies["platinum"])- parseInt(lastTrophies["platinum"]))+" 个白金奖杯！");'+
                                ' }'+
                        ' }'+
                        ' lastTrophies = newTrophies;'+
                        ' }'+
                        ' });'+
                ' }'+
                ' function sendToDouyu(message){$(".cs-textarea").val(message);$(".b-btn").click();}'+
                ' setInterval(function(){'+
                        ' checkT("'+ req.params["psnid"] +'");'+
                ' }, 10000);';
        res.end(js);

});
function test(){

        var lp = new LivingProcess();
        lp.setup("", "1035304", "rtmp://send1a.douyu.com/live", "none", "douyu")
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
