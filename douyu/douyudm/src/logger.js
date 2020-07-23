const util = require('./util')

class Logger {
    constructor() {
        this.name = 'unknown'
        this.inited = false
        this.db = null
        this.version = 2
    }

    init(name) {
        if (!this.inited) {
            this.name = name

            const IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
            this.DB = IndexedDB.open('danmaku', this.version)
            this.DB.addEventListener('success', e => {
                console.log('连接数据库')
                this.db = e.target.result
            })

            this.DB.addEventListener('upgradeneeded', e => {
                console.log('升级数据库')
                this.db = e.target.result
                const store = this.db.createObjectStore('douyu', {
                    keyPath: 'id',
                    autoIncrement: true,
                })
                store.createIndex('idx_room_id', 'room_id', {
                    unique: false
                })
            })

            this.DB.addEventListener('error', e => {
                console.log('连接数据库出错 Error:', e)
            })

            this.inited = true
        }
    }

    echo(data) {
        if (this.db !== null) {
            const tx = this.db.transaction('douyu', 'readwrite')
            const store = tx.objectStore('douyu')
            store.add({
                room_id: this.name,
                timestamp: new Date().getTime(),
                frame: data
            })
        }
    }

    all(roomId) {
        if (this.db !== null) {
            const tx = this.db.transaction('douyu', 'readonly')
            const store = tx.objectStore('douyu')
            const req = (roomId ? store.index('idx_room_id').getAll(roomId) : store.getAll())
            return new Promise(function (resolve, reject) {
                req.addEventListener('success', function (e) {
                    resolve(e.target.result)
                })
                req.addEventListener('error', function (e) {
                    reject(false)
                })
            })
        }
    }

    count(roomId) {
        if (this.db !== null) {
            const tx = this.db.transaction('douyu', 'readonly')
            const store = tx.objectStore('douyu')
            const req = (roomId ? store.index('idx_room_id').count(roomId) : store.count())
            return new Promise(function (resolve, reject) {
                req.addEventListener('success', function (e) {
                    resolve(req.result)
                })
                req.addEventListener('error', function (e) {
                    reject(false)
                })
            })
        }
    }

    async export (roomId) {
        if (this.db !== null) {
            const r = await this.all(roomId)
            const text = r.reduce((arr, row) => {
                const v = {
                    timestamp: row.timestamp,
                    frame: row.frame,
                }
                if (!roomId) v.roomId = this.name
                arr.push(JSON.stringify(v))
                return arr
            }, [])
            util.download(this.name, text.join('\n'))
            return text
        }
    }

    clear(roomId) {
        if (this.db !== null) {
            const tx = this.db.transaction('douyu', 'readwrite')
            const store = tx.objectStore('douyu')
            if (roomId) {
                const index = store.index('idx_room_id')
                const req = index.openCursor(IDBKeyRange.only(roomId))
                req.addEventListener('success', function () {
                    const cursor = req.result
                    if (cursor) {
                        cursor.delete()
                        cursor.continue()
                    }
                })
            } else {
                store.clear()
            }
        }
    }
}

module.exports = util.isBrowser() ? Logger : require('./loggerNode')