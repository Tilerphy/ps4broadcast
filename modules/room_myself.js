var http = require("http");
var room_myself_instance ;
function init(rid, io, lp){
	room_myself_instance = this;
	this.rid = rid;
	this.lp = lp;
	this.close = ()=>{};
	var mysetting ;
	for(var item of this.lp.items)
	{
		if(item.type == "private"){
			mysetting =item;
		}
	}
	var req =http.request("http://www.fanche.party/setStream?name="+mysetting.code+"&path="+
		mysetting.url+"&title="+encodeURIComponent(mysetting.rid)+"&scode=fancheremotelivedemo", (res)=>{

		res.on("error", (e)=>{console.log(e);});
	});
	this.send2PS4 = (name,msg)=>{
		if(this.lp.currentTwitchClient){
			this.lp.currentTwitchClient.toPS4(name, msg);
		}
	};
	req.end();
	lp.webapp.get("/private/msg", (req, res)=>{
		var name = decodeURIComponent(req.query.name);
		var msg = decodeURIComponent(req.query.msg);
		this.send2PS4(name,msg);
		io.emit("message", '[My]'+name+": "+msg);
		res.end();
	});
	lp.webapp.get("/private/inout", (req, res)=>{
                var isIn = req.query.isIn;
                var name = req.query.name;
                this.send2PS4(name, isIn?"进入直播间":"离开直播间");
                io.emit("message", '[My]'+name +( isIn?": 进入直播间":": 离开直播间"));
		res.end();
        });
}
module.exports.init = init;
module.exports.type= "private";
