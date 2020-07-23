function Util() {
    [
        'Object',
        'Array',
        'String',
        'Number',
        'Boolean',
        'Function',
        'RegExp',
        'Date',
        'Undefined',
        'Null',
        'Symbol',
        'Blob',
        'ArrayBuffer'
    ].forEach(type => {
        this[`is${type}`] = (p) => Object.prototype.toString.call(p).slice(8, -1) === type
    })
}

//判断浏览器环境
Util.prototype.isBrowser = () => (typeof window !== 'undefined') ? true : false

//随机数生成
Util.prototype.random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

//web端下载文件
Util.prototype.download = function(filename, text) {
    if (this.isBrowser()) {
        let element = document.createElement('a');
        element.style.display = 'none'
        let blob = new Blob([text])
        element.download = `${filename}.log`
        element.href = URL.createObjectURL(blob)
        document.body.appendChild(element)
        element.click()
        URL.revokeObjectURL(blob)
        document.body.removeChild(element)
    }
}

module.exports = new Util()