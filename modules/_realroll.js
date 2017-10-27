var exec = require("child_process").exec;
function invoke(txt){
	if(txt.toLowerCase() == "roll"){
		console.log("rolling!");
		exec(__dirname+"/../88.e", (err, o,oe)=>{
			console.log(oe);
		});
	}
}

module.exports.invoke = invoke;
