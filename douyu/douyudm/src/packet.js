require('fast-text-encoding')
const util = require('./util')

class Packet {
    constructor() {
        this.HEADER_LEN_SIZE = 4
        this.HEADER_LEN_TYPECODE = 2
        this.HEADER_LEN_ENCRYPT = 1
        this.HEADER_LEN_PLACEHOLDER = 1
        this.HEADER_LEN_TOTAL = this.HEADER_LEN_SIZE * 2 +
            this.HEADER_LEN_TYPECODE +
            this.HEADER_LEN_ENCRYPT +
            this.HEADER_LEN_PLACEHOLDER

        this.encoder = new TextEncoder()
        this.decoder = new TextDecoder()
        this.buffer = new ArrayBuffer(0)
        this.readLength = 0
    }

    concat() {
        const arr = []
        for (let n = 0; n < arguments.length; n++) arr[n] = arguments[n]

        return arr.reduce(function (arr, buf) {
            const message = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf
            const t = new Uint8Array(arr.length + message.length)
            t.set(arr, 0)
            t.set(message, arr.length)
            return t
        }, new Uint8Array(0))
    }

    Encode(data) {
        const msgBody = this.concat(this.encoder.encode(data), Uint8Array.of(0))
        const msgLen = msgBody.length + this.HEADER_LEN_SIZE * 2
        const msgTotalLen = msgBody.length + this.HEADER_LEN_TOTAL
        const r = new DataView(new ArrayBuffer(msgTotalLen))

        r.setUint32(0, msgLen, true)
        r.setUint32(4, msgLen, true)
        r.setInt16(8, 689, true)
        r.setInt16(10, 0, true)

        return new Uint8Array(r.buffer).set(msgBody, this.HEADER_LEN_TOTAL), r.buffer
    }

    Decode(buf, callback) {
        this.buffer = this.concat(this.buffer, buf).buffer
        while (this.buffer && this.buffer.byteLength > 0) {
            if (0 === this.readLength) {
                if (this.buffer.byteLength < 4) return;

                this.readLength = new DataView(this.buffer).getUint32(0, true)
                this.buffer = this.buffer.slice(4)
            }

            if (this.buffer.byteLength < this.readLength) return;

            const message = this.decoder.decode(this.buffer.slice(8, this.readLength - 1))
            this.buffer = this.buffer.slice(this.readLength)
            this.readLength = 0
            callback(message)
        }
    }

    /**
     * blob转arraybuffer
     * @param {Blob} blob 待转换的Blob类型参数
     */
    Blob2ab(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = function (e) {
                resolve(e.target.result)
            }
            reader.readAsArrayBuffer(blob)
        })
    }

    /**
     * arraybuffer转blob
     * @param {ArrayBuffer} ab 待转换的ArrayBuffer类型参数
     */
    Ab2blob(ab) {
        return new Blob([ab])
    }
}

module.exports = new Packet()