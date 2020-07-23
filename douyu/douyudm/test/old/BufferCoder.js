require('fast-text-encoding')

function BufferCoder() {
    this.buffer = new ArrayBuffer(0)
    this.decoder = new TextDecoder()
    this.encoder = new TextEncoder()
    this.littleEndian = !0
    this.readLength = 0
}

BufferCoder.prototype.concat = function () {
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

BufferCoder.prototype.Decode = function (buf, callback, LE) {
    LE = LE || this.littleEndian
    this.buffer = this.concat(this.buffer, buf).buffer
    for (; this.buffer && this.buffer.byteLength > 0;) {
        if (0 === this.readLength) {
            if (this.buffer.byteLength < 4) return;

            this.readLength = new DataView(this.buffer).getUint32(0, LE)
            this.buffer = this.buffer.slice(4)
        }

        if (this.buffer.byteLength < this.readLength) return;

        const str = this.decoder.decode(this.buffer.slice(8, this.readLength - 1))
        this.buffer = this.buffer.slice(this.readLength)
        this.readLength = 0
        callback(str)
    }
}

BufferCoder.prototype.Encode = function (str, LE) {
    LE = LE || this.littleEndian
    let message = this.concat(this.encoder.encode(str), Uint8Array.of(0))
    let len = 8 + message.length
    let r = new DataView(new ArrayBuffer(len + 4))
    let offset = 0

    r.setUint32(offset, len, LE)
    offset += 4
    r.setUint32(offset, len, LE)
    offset += 4
    r.setInt16(offset, 689, LE)
    offset += 2
    r.setInt8(offset, 0)
    offset += 1
    r.setInt8(offset, 0)
    offset += 1

    return new Uint8Array(r.buffer).set(message, offset), r.buffer
}

/**
 * blob转arraybuffer
 * @param {Blob} blob 待转换的Blob类型参数
 */
BufferCoder.prototype.blob2ab = function (blob) {
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
BufferCoder.prototype.ab2blob = function (ab) {
    return new Blob([ab])
}

module.exports = new BufferCoder()