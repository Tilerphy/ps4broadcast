

function Packet(packetBody, frameLength) {
	this.body = packetBody;
	this.frameLength = frameLength;
}

Packet.frameHeaderLength = 4;
Packet.headerLength = 8;

/*
* Returns the size of hex string consumed by this packet
*/
Packet.prototype.getPacketFrameSize = function(){
	return 2 * (this.frameLength + 4);
};

Packet.prototype.toRaw = function(){
	
	if(!this.body || this.body.length <= 0) {
		return null;
	}

	var bufferHeader = new Buffer(Packet.frameHeaderLength + Packet.headerLength);
	var bufferBody = new Buffer(this.body, 'utf8');
	var totalLength = bufferBody.length + Packet.frameHeaderLength + Packet.headerLength;
	bufferHeader.writeInt32LE(totalLength - Packet.frameHeaderLength, 0);
	bufferHeader.writeInt32LE(totalLength - Packet.frameHeaderLength, 4);
	bufferHeader.writeInt16LE(689, 8);
	bufferHeader.writeInt16LE(0, 10);
	return Buffer.concat([bufferHeader, bufferBody], totalLength);

};

/*
* Find packet from hex string
*/
Packet.sniff = function(bufferHex){

	// console.log('[PacketSniff] Sniffing packet');

	var bytesAvailable = bufferHex.length / 2;
	
	if(bytesAvailable <= Packet.frameHeaderLength + Packet.headerLength) {
		return null;
	}

	var buffer = new Buffer(bufferHex, 'hex');
	// console.log('Converted to buffer of size: ' + buffer.length);
	var packetLength = buffer.readInt32LE(0);
	var packetLength2 = buffer.readInt32LE(Packet.frameHeaderLength);
	var packetType = buffer.readInt16LE(Packet.frameHeaderLength + 4);
	var encrypt = buffer.readInt8(Packet.frameHeaderLength + 6);
	var reserved = buffer.readInt8(Packet.frameHeaderLength + 7);
	var body = buffer.toString('utf8', Packet.frameHeaderLength + Packet.headerLength)

	// console.log('[PacketSniff] packetLength: ' + packetLength);
	// console.log('[PacketSniff] packetLength2: ' + packetLength2);
	// console.log('[PacketSniff] packetType: ' + packetType);
	// console.log('[PacketSniff] encrypt: ' + encrypt);
	// console.log('[PacketSniff] reserved: ' + reserved);
	// console.log('[PacketSniff] body: ' + body);

	if(packetLength <= 0 || packetLength2 <= 0) {
		console.warn('[PacketSniff] Invalid packet lengths');
		throw new Error('packet_len_invalid');
		return null;
	}

	if(packetLength != packetLength2) {
		console.warn('[PacketSniff] Mismatched packet lengths');
		throw new Error('packet_len_mismatch');
		return null;
	}

	if(bytesAvailable >= packetLength + 4) {

		if(bytesAvailable > packetLength + 4) {
			body = buffer.toString('utf8', Packet.frameHeaderLength + Packet.headerLength, packetLength + 4);
			// console.log('[PacketSniff] body trimmed: ' + body);
		}

		return new Packet(body, packetLength);
	}
	
	return null;
};

Packet.fromMessage = function(message){
	return new Packet(message.toString());
};

module.exports = Packet;

