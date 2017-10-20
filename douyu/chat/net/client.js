var net = require('net');
var events = require('events');
var util = require('util');
var Packet = require('./packet');
var Message = require('./message');

var host = 'openbarrage.douyutv.com';
var port = 8601;

function Client() {
	events.EventEmitter.call(this);
	this.init();
}
util.inherits(Client, events.EventEmitter);

Client.prototype.init = function(){
	this.s = null;
	this.rawBuffer = '';
	this.messageBuffer = '';
};

Client.prototype.connect = function(){
	this.s = new net.Socket();
	this.s.setEncoding('hex');
	this.s.connect(port, host, this.onConnected.bind(this));
};

Client.prototype.onConnected = function(){
	// console.log('[Client] Socket connected');
	this.s.on('data', this.onData.bind(this));
	this.s.on('error', this.onError.bind(this));
	this.s.on('close', this.onClosed.bind(this));
	this.emit('connect');
};

Client.prototype.onError = function(err){
	this.emit('error', err);
}

Client.prototype.onClosed = function(had_error){
	this.emit('close', had_error);
}

Client.prototype.onData = function(data){

	// console.log('[Client] Received socket data. Length: ' + data.length);
	// console.log('[Client] ' + data);

	if(!data) {
		return;
	}

	this.rawBuffer += data;

	while(true) {

		// Sniff for network packets
		var packet = null;
		try {
			packet = Packet.sniff(this.rawBuffer);
		} catch(e) {
			this.emit('error', e);
			this.s.destroy();
			return;
		}
		
		if(!packet) {
			break;
		}

		// Move packet data out of rawBuffer
		var bytesConsumed = packet.getPacketFrameSize();
		// console.log('[Client] Packet got. Frame size: ' + bytesConsumed);
		this.rawBuffer = this.rawBuffer.substr(bytesConsumed);

		this.messageBuffer += packet.body;
		while(true) {

			// Sniff for messages
			var message = Message.sniff(this.messageBuffer);
			if(!message) {
				break;
			}

			// Move message data out of messageBuffer
			this.messageBuffer = this.messageBuffer.substr(message.bodySize + 1);

			this.emit('message', message);
		}
	}

};

Client.prototype.send = function(message){
	return this.s.write(Packet.fromMessage(new Message(message)).toRaw());
};

module.exports = Client;

