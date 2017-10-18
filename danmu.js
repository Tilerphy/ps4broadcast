var net = require("net");
var douyu = require("douyu");
//roomid 应该是你的斗鱼直播房间号
var roomid= "1035304";
var room = new douyu.ChatRoom(roomid);
// 这个和install.sh中用的linux电脑虚拟ip一致，或者写成0.0.0.0
var host = "192.168.200.1";
var port = 6667;
var Client = function(sock){
        this.sock = sock;
        this.toPS4 = function(name, message){
                this.sock.write(":"+name+"!"+name+"@"+name+".tmi.twitch.tv PRIVMSG #"+name+" :"+message+"\r\n");
                this.sock.write("\r\n");
        };
}
var  client = null;
room.on("chatmsg", (msg)=>{
        if(client){
                client.toPS4(msg.nn, msg.txt);
        }
        console.log(msg.nn + ":"+msg.txt);
});
room.on("uenter", (msg)=>{
        if(client){
                client.toPS4(msg.nn, "进入直播间");
        }
       	console.log(msg.nn +": 进入直播间");
        
});

room.on("dgb", (msg)=>{
        if(client){
                client.toPS4(msg.sn+"送出礼物√", gift[msg.gfid]);
        }
        console.log(msg.sn+"送出礼物√ : "+gift[msg.gfid]);
});

net.createServer((sock)=>{

        console.log("connected");
        client = new Client(sock);
        sock.on("data", (d)=>{
                var message = d.toString();
                console.log(message);
                if(message.indexOf("NICK") == 0){
                        sock.write(":tmi.twitch.tv 001 tilerphy :Welcome, GLHF!\r\n");
                        sock.write(":tmi.twitch.tv 002 tilerphy :Your host is tmi.twitch.tv\r\n");
                        sock.write(":tmi.twitch.tv 003 tilerphy :This server is rather new\r\n");
                        sock.write(":tmi.twitch.tv 004 tilerphy :-\r\n");
                        sock.write(":tmi.twitch.tv 375 tilerphy :-\r\n");
                        sock.write(":tmi.twitch.tv 372 tilerphy :You are in a maze of twisty passages, all alike.\r\n");
                        sock.write(":tmi.twitch.tv 376 tilerphy :>\r\n");
                        sock.write("\r\n");
                }
        });

        sock.on("close", ()=>{
                console.log("closed");
        });

}).listen(port, host);
room.open();
console.log("ing....");
