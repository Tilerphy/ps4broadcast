const fs = require('fs')

module.exports = class Logger {
    constructor() {
        this.name = 'unknown'
        this.inited = false
    }

    init(name) {
        if (!this.inited) {
            this.name = name
            this.inited = true
        }
    }

    echo(data) {
        const content = `${JSON.stringify({timestamp: new Date().getTime(),frame: data})}\n`
        fs.appendFile(
            this.name,
            content,
            function (err) {
                if (err) {
                    console.error('日志保存出错, Error:', err)
                }
            })
    }

    all() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.name, 'utf8', function (err, str) {
                if (err) {
                    reject(err)
                } else {
                    resolve(str)
                }
            })
        })
    }

    count() {
        return new Promise(async (resolve, reject) => {
            const content = await this.all()
            resolve(content.split('\n').filter(v => v !== '').length)
        })
    }

    export () {
        return fs.readFileSync(this.name, 'utf8')
    }

    clear() {
        try {
            return fs.writeFileSync(this.name, '', 'utf8')
        } catch (err) {
            return false
        }
    }
}
