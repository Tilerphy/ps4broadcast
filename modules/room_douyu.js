var xhttp = require("http");
var douyu = require("../douyu");
function init(rid, io, lp){
	this.rid = rid;
	this.lp= lp;
	this.currentRoom = new douyu.ChatRoom(this.rid);
	this.close = this.currentRoom.close;
	this.currentRoom.on("chatmsg", (msg)=>{
       		if(this.lp.currentTwitchClient){
               		this.lp.currentTwitchClient.toPS4(msg.nn, msg.txt);
       		}
        	io.emit("message",msg.nn + ":"+msg.txt);
	});
	this.currentRoom.on("uenter", (msg)=>{
        	if(this.lp.currentTwitchClient){
                	this.lp.currentTwitchClient.toPS4(msg.nn, "进入直播间");
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
				if(gifts){
					for(var g of gifts){
						if(g.id == msg.gfid){
							gift = g;
							break;
						}
					}
				}
				if(this.lp.currentTwitchClient){
                                        this.lp.currentTwitchClient.toPS4(msg.nn+"送出礼物√", gift ==null?"":gift.name);
                                }
                                io.emit("message", msg.nn+"送出礼物√ "+ (gift==null?"":gift.name));
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

}

module.exports.type = "douyu";
module.exports.init = init;
