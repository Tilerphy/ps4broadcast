const util = require('./util')

class websocket {
    constructor(address) {
        this.listener = {}
        this.socket = new WebSocket(address)
    }

    send(data) {
        this.socket.send(data)
    }

    close(code, reason) {
        this.socket.close(code, reason)
    }

    on(method, callback) {
        let eventName = ['open', 'error', 'close', 'message'].find(event => event === method.toLocaleLowerCase())

        if (eventName) {
            if (Object.keys(this.listener).includes(eventName)) {
                this.socket.removeEventListener(eventName, this.listener[eventName])
            }

            this.listener[eventName] = callback
            this.socket.addEventListener(eventName, callback)
        }
    }
}

module.exports = util.isBrowser() ? websocket : require('ws')