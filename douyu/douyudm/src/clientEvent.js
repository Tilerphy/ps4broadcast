function open() {
    this.login() //登入
    this.joinGroup() //加入组
    this.heartbeat() //发送心跳，强制45秒
}

function error(err) {
    console.error(err)
}

function close() {
    this.logout()
}

function message(data) {
    if (typeof MessageEvent !== 'undefined') {
        //无MessageEvent类型判断为node环境，转换数据为arraybuffer类型
        const reader = new FileReader()
        reader.onload = e => this.messageHandle(e.target.result)
        reader.readAsArrayBuffer(data.data)
    } else {
        this.messageHandle(data)
    }
}

module.exports = {
    open,
    error,
    close,
    message,
}