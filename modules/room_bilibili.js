var net = require("net");
const xhttps = require('https');
const { deflate, unzip,inflate } = require('zlib');

var buvidString  = "";
var buvid ="";
xhttps.get('https://api.bilibili.com/x/frontend/finger/spi', (response) => {
        response.on("data", (d)=>{
                buvidString += d;
        });

        response.on('end', () => {
                var buvidObj = JSON.parse(buvidString);
                buvid = buvidObj["data"]["b_3"];
                console.log("buvid is "+ buvid);
        });

});


var init = function (rid, io, lp){
        this.uid = 123456789012345 + parseInt(1000000000000000*Math.random());
        this.rid = rid;
        this.lp = lp;
        this.interval = null;
        var sock = net.connect(80, "broadcastlv.chat.bilibili.com");
        sock.on("connect", ()=>{
                console.log("connected");
        });
        sock.on("data", (d)=>{
                console.log(d);
                popBilibiliMsg(d, (msg)=>{
                        switch(msg.cmd){
                                case "DANMU_MSG":
                                        if(this.lp.currentTwitchClient){
                                                this.lp.currentTwitchClient.toPS4(msg.info[2][1], msg.info[1]);
                                        }
                                        io.emit("message", '[B]'+msg.info[2][1]+": "+msg.info[1]);
                                        break;
                                case "SEND_GIFT":
                                        if(this.lp.currentTwitchClient){
                                                this.lp.currentTwitchClient.toPS4(msg.data.uname+"送出礼物√", msg.data.giftName);
                                        }
                                        io.emit("message",'[B]'+msg.data.uname+"送出礼物√："+msg.data.giftName);
                                        break;
                                case "WELCOME":
                                        if(this.lp.currentTwitchClient){
                                                this.lp.currentTwitchClient.toPS4(msg.data.uanme, "进入直播间");
                                        }
                                        io.emit("message", '[B]'+msg.data.uname+"进入直播间");
                                        break;
                                default:
                                        break;
                        }
                });
        });

        var dataBuffer  = Buffer.from("{\"roomid\":"+this.rid+",\"uid\":"+this.uid+",\"protover\":2, \"buvid\":\""+buvid+"\"}");
        var headerBuffer= Buffer.from([0,0,0,dataBuffer.length+16,0,16,0,1,0,0,0,7,0,0,0,1]);
        var heartBeat = Buffer.from([0,0,0,16,0,16,0,1,0,0,0,2,0,0,0,1]);
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

        sock.on("end",()=>{
            clearInterval(this.interval);
            sock.destroy();
        });
        sock.on("error",()=>{
            clearInterval(this.interval);
                sock.destroy();
            console.log("reconnect.....");
            init(rid,io,lp);
        });

        Promise.all([p]);
}
var buf = null;
function popBilibiliMsg(d, callback){
        if(buf){
                d = Buffer.concat([buf , d]);
        }
        var version = d[6]<<8 | d[7];
        var action = d[8]|d[9]|d[10]|d[11];
        console.log(action);
        if(callback && d[11]!= 3 && d[11]!= 8){
                var length = d[0]*256*256*256+d[1]*256*256+d[2]*256+d[3];
                //resolve bilibili TCP-nagle bug
                console.log(version);
                console.log("action"+action);
                if(version != 2){
                        if(d.length == length){
                                buf = null;
                                callback(JSON.parse(d.slice(16).toString()));
                        }else if (d.length > length){
                                buf = null;
                                callback(JSON.parse(d.slice(16,length).toString()));
                                popBilibiliMsg(d.slice(length), callback);
                        }else{
                                buf = d;
                        }
                }else{
                        if(action==5){
                                inflate(d.slice(16), (er4, newD)=>{
                                        if(er4){
                                                console.log(er4);
                                        }else{
                                                _msg = newD.toString().slice(16);
                                                console.log(_msg);
                                                sta = [];
                                                tmpSentence = "";
                                                reloop = true;
                                                for(var index=0;index<_msg.length; index++){
                                                        if (_msg[index] == '{'){
                                                                reloop = false;
                                                                sta.push("{");
                                                                tmpSentence = tmpSentence+_msg[index];
                                                        }
                                                        else if(_msg[index] == '}'){
                                                                sta.pop();
                                                                tmpSentence = tmpSentence+_msg[index];
                                                        }
                                                        else{
                                                                if(sta.length == 0){
                                                                        //ignore
                                                                }else{
                                                                        tmpSentence = tmpSentence+_msg[index];
                                                                }
                                                        }
                                                        if(sta.length == 0 && !reloop ){
                                                                //console.log("#"+tmpSentence);
                                                                callback(JSON.parse(tmpSentence));
                                                                tmpSentence="";
                                                                reloop = true;
                                                        }
                                                }
                                        }
                                });
                        }
                }
        }
}
module.exports.type= "bilibili";
module.exports.init = init;
