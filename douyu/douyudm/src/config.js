const util = require('./util')

//目前已知的弹幕服务器
const port = 8500 + util.random(1, 6)
const URL = `wss://danmuproxy.douyu.com:${port}/`

const HEARBEAT_INTERVAL = 45

const MSG_LIVE_ON = '主播正在直播'
const MSG_LIVE_OFF = '主播没有直播'
const MSG_ROOM_RSS = '房间开播提醒'
const MSG_BC_BUY_DESERVE = '赠送酬勤通知'
const MSG_SSD = '超级弹幕'
const MSG_ROOM_SPBC = '房间内礼物广播'

module.exports = {
    URL,
    HEARBEAT_INTERVAL,
    MSG_LIVE_ON,
    MSG_LIVE_OFF,
    MSG_ROOM_RSS,
    MSG_BC_BUY_DESERVE,
    MSG_SSD,
    MSG_ROOM_SPBC,
}