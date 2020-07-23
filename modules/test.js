var io= require("socket.io");
var socket = io.connect("45.77.210.73:19000");
socket.on("saytoall",(msg)=>{
	console.log(msg.msg);
});


