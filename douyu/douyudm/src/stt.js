const util = require('./util')

class STT {
    escape(v) {
        return util.isUndefined(v) ? '' : v.toString().replace(/@/g, '@A').replace(/\//g, '@S')
    }

    unescape(v) {
        return util.isUndefined(v) ? '' : v.toString().replace(/@A/g, '@').replace(/@S/g, '/')
    }

    serialize(raw) {
        if (util.isObject(raw)) {
            return Object.keys(raw).map(k => `${k}@=${this.escape(this.serialize(raw[k]))}/`).join('')
        } else if (Array.isArray(raw)) {
            return raw.map(v => `${this.escape(this.serialize(v))}/`).join('')
        } else if (util.isString(raw) || util.isNumber(raw)) {
            return raw.toString()
        }
    }

    deserialize(raw) {
        if (raw.includes('//')) {
            return raw.split('//').filter(e => e !== '').map(item => this.deserialize(item))
        }

        if (raw.includes('@=')) {
            return raw.split('/').filter(e => e !== '').reduce((o, s) => {
                const [k, v] = s.split('@=')
                o[k] = this.deserialize(this.unescape(v))
                return o
            }, {})
        } else if (raw.includes('@A=')) {
            return this.deserialize(this.unescape(raw))
        } else {
            return raw.toString()
        }
    }
}

module.exports = new STT()