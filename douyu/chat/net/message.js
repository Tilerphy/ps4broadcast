
var utils = require('../utils/utils');

function Message(messageBody) {
	this.body = messageBody;
	this.bodySize = 0;
}

Message.prototype.toString = function(){
	return utils.serialize(this.body) + '\0';
};

Message.prototype.attr = function(fieldName){
	if(!this.body) {
		return null;
	}
	return this.body[fieldName];
};

/*
* Find message from string buffer
*/
Message.sniff = function(buffer){

	// console.log('[MessageSniff] Sniffing message');
	
	if(!buffer || buffer.length <= 0) {
		return null;
	}

	var bodies = buffer.split('\0');
	if(bodies.length <= 1) {
		return;
	}

	return Message.fromRaw(bodies[0]);
}

Message.fromRaw = function(raw){
	
	if(!raw || raw.length <= 0) {
		return null;
	}

	var result = new Message(utils.deserialize(raw));
	result.bodySize = raw.length;
	return result;

};

module.exports = Message;

