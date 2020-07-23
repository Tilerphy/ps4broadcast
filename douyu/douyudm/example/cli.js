//引入类库
const danmaku = require('../src/index')

//设置房间号，初始化
const roomId = 102965
const room = new danmaku(roomId)

//系统事件
room.on('connect', function () {
    console.log('[connect] roomId=%s', this.roomId)
})
room.on('disconnect', function () {
    console.log('[disconnect] roomId=%s', this.roomId)
})
room.on('error', function (err) {
    console.log('[error] roomId=%s', this.roomId)
})

//消息事件
room.on('chatmsg', function (res) {
    console.log('[chatmsg]', `<lv ${res.level}> [${res.nn}] ${res.txt}`)
})
room.on('loginres', function (res) {
    console.log('[loginres]', '登录成功')
})
room.on('uenter', function (res) {
    console.log('[uenter]', `${res.nn}进入房间`)
})

//开始监听
room.run()