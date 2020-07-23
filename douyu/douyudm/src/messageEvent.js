const config = require('./config')

module.exports = {
    loginres: function (r) {
        // 登录响应
        // 服务端返回登录响应消息,完整的数据部分应包含的字段如下:
        // 字段说明
        //     type             表示为“登录”消息,固定为 loginres
        //     userid           用户 ID
        //     roomgroup        房间权限组
        //     pg               平台权限组
        //     sessionid        会话 ID
        //     username         用户名
        //     nickname         用户昵称
        //     is_signed        是否已在房间签到
        //     signed_count     日总签到次数
        //     live_stat        直播状态
        //     npv              是否需要手机验证
        //     best_dlev        最高酬勤等级
        //     cur_lev          酬勤等级
    },
    chatmsg: function (r) {
        // 弹幕消息
        // 用户在房间发送弹幕时,服务端发此消息给客户端,完整的数据部分应包含的字 段如下:
        // 字段说明
        //     type             表示为“弹幕”消息,固定为 chatmsg
        //     gid              弹幕组 id
        //     rid              房间 id
        //     uid              发送者 uid
        //     nn               发送者昵称
        //     txt              弹幕文本内容
        //     cid              弹幕唯一 ID
        //     level            用户等级
        //     gt               礼物头衔:默认值 0(表示没有头衔)
        //     col              颜色:默认值 0(表示默认颜色弹幕)
        //     ct               客户端类型:默认值 0(表示 web 用户)
        //     rg               房间权限组:默认值 1(表示普通权限用户)
        //     pg               平台权限组:默认值 1(表示普通权限用户)
        //     dlv              酬勤等级:默认值 0(表示没有酬勤)
        //     dc               酬勤数量:默认值 0(表示没有酬勤数量)
        //     bdlv             最高酬勤等级:默认值 0(表示全站都没有酬勤)
        console.log("<lv %s> [%s]  %s", r.level + (r.level < 10 ? ' ' : ''), r.nn, r.txt)
    },
    uenter: function (r) {
        // 进入直播间
        // 具有特殊属性的用户进入直播间时,服务端发送此消息至客户端。完整的数据部 分应包含的字段如下:
        // 字段说明
        //     type   表示为“用户进房通知”消息,固定为 uenter
        //     rid    房间 ID
        //     gid    弹幕分组 ID
        //     uid    用户 ID
        //     nn     用户昵称
        //     str    战斗力
        //     level  新用户等级
        //     gt     礼物头衔:默认值 0(表示没有头衔)
        //     rg     房间权限组:默认值 1(表示普通权限用户)
        //     pg     平台身份组:默认值 1(表示普通权限用户)
        //     dlv    酬勤等级:默认值 0(表示没有酬勤)
        //     dc     酬勤数量:默认值 0(表示没有酬勤数量)
        //     bdlv   最高酬勤等级:默认值 0(表示全站都没有酬勤)
        console.log(`欢迎<lv ${r.level}>${r.nn}进入了直播间`)
    },
    upgrade: function (r) {
        // 用户等级提升
    },
    rss: function (r) {
        // 房间开播提醒
        // 房间开播提醒主要部分应包含的字段如下:
        // 字段说明
        //     type    表示为“房间开播提醒”消息,固定为 rss
        //     rid     房间 id
        //     gid     弹幕分组 id
        //     ss      直播状态,1-正在直播, 2-没有直播
        //     code    类型
        //     rt      开关播原因:0-主播开关播,其他值-其他原因
        //     notify  通知类型
        //     endtime 关播时间(仅关播时有效)
        console.log('[开播提醒]', r.ss == 1 ? config.MSG_LIVE_ON : config.MSG_LIVE_OFF)
    },
    bc_buy_deserve: function (r) {
        // 赠送酬勤通知
        // 用户赠送酬勤时,服务端发送此消息至客户端。完整的数据部分应包含的字段如 下:
        // 字段说明
        //     type   表示为“赠送酬勤通知”消息,固定为 bc_buy_deserve
        //     rid    房间 ID
        //     gid    弹幕分组 ID
        //     level  用户等级
        //     cnt    赠送数量
        //     hits   赠送连击次数
        //     lev    酬勤等级
        //     sui    用户信息序列化字符串,详见下文。注意,此处为嵌套序列化,需注 意符号的转义变换。(转义符号参见 2.2 序列化)
    },
    ssd: function (r) {
        // 超级弹幕
        // 超级弹幕主要部分应包含的字段如下:
        // 字段说明
        //     type     表示为“超级弹幕”消息,固定为 ssd
        //     rid      房间 id
        //     gid      弹幕分组 id
        //     sdid     超级弹幕 id
        //     trid     跳转房间 id
        //     content  超级弹幕的内容
    },
    spbc: function (r) {
        // 房间内礼物广播
        // 房间内赠送礼物成功后效果主要部分应包含的字段如下:
        //  字段说明
        //     type   表示为“房间内礼物广播”,固定为 spbc
        //     rid    房间 id
        //     gid    弹幕分组 id
        //     sn     赠送者昵称
        //     dn     受赠者昵称
        //     gn     礼物名称
        //     gc     礼物数量
        //     drid   赠送房间
        //     gs     广播样式
        //     gb     是否有礼包(0-无礼包,1-有礼包)
        //     es     广播展现样式(1-火箭,2-飞机)
        //     gfid   礼物 id
        //     eid    特效 id
        console.log(`------------- 感谢[${r.sn}] 赠送的 ${r.gn}x${r.gc}`)
    },
    dgb: function (r) {
        // 赠送礼物
        // 用户在房间赠送礼物时,服务端发送此消息给客户端。完整的数据部分应包含的 字段如下:
        // 字段说明
        //     type   表示为“赠送礼物”消息,固定为 dgb
        //     rid    房间 ID
        //     gid    弹幕分组 ID
        //     gfid   礼物 id
        //     gs     礼物显示样式
        //     uid    用户 id
        //     nn     用户昵称
        //     str    用户战斗力
        //     level  用户等级
        //     dw     主播体重
        //     gfcnt  礼物个数:默认值 1(表示 1 个礼物)
        //     hits   礼物连击次数:默认值 1(表示 1 连击)
        //     dlv    酬勤头衔:默认值 0(表示没有酬勤)
        //     dc     酬勤个数:默认值 0(表示没有酬勤数量)
        //     bdl    全站最高酬勤等级:默认值 0(表示全站都没有酬勤)
        //     rg     房间身份组:默认值 1(表示普通权限用户)
        //     pg     平台身份组:默认值 1(表示普通权限用户)
        //     rpid   红包 id:默认值 0(表示没有红包)
        //     slt    红包开启剩余时间:默认值 0(表示没有红包)
        //     elt    红包销毁剩余时间:默认值 0(表示没有红包)
    },
    onlinegift: function (r) {
        // 领取在线鱼丸
        // 在线领取鱼丸时,若出现暴击(鱼丸数大于等于 60)服务则发送领取暴击消息 到客户端。完整的数据部分应包含的字段如下:
        // 字段说明
        //     type             表示为“领取在线鱼丸”消息,固定为 onlinegift
        //     rid              房间 ID
        //     uid              用户 ID
        //     gid              弹幕分组 ID
        //     sil              鱼丸数
        //     if               领取鱼丸的等级
        //     ct               客户端类型标识
        //     nn               用户昵称
        console.log(`------------- [${r.nn}] 领取鱼丸x${r.sil}`)
    },
    ggbb: function (r) {
        // 房间用户抢红包
        // 房间赠送礼物成功后效果(赠送礼物效果,连击数)主要部分应包含的字段如下:
        // 字段说明
        //     type  表示“房间用户抢红包”信息,固定为 ggbb
        //     rid   房间 id
        //     gid   弹幕分组 id
        //     sl    抢到的鱼丸数量
        //     sid   礼包产生者 id
        //     did   抢礼包者 id
        //     snk   礼包产生者昵称
        //     dnk   抢礼包者昵称
        //     rpt   礼包类型
    },
    rankup: function (r) {
        // 房间内top10变化消息
        // 房间内 top10 排行榜变化后,广播。主要部分应包含的字段如下:
        // 字段说明
        // type  表示为“房间 top10 排行榜变换”,固定为 rankup
        // rid   房间 id
        // gid   弹幕分组 id
        // uid   用户 id
        // drid  目标房间 id
        // rt    房间所属栏目类型
        // bt    广播类型:1-房间内广播,2-栏目广播,4-全站广播
        // sz    展示区域:1-聊天区展示,2-flash 展示,3-都显示
        // nk    用户昵称
        // rkt   top10 榜的类型 1-周榜 2-总榜 4-日榜
        // rn    上升后的排名
    },
    ranklist: function (r) {
        // 广播排行榜消息
    },
    mrkl: function(r) {
        // 心跳
    },
    erquizisn: function(r) {
        // 鱼丸预言，参数未知
    },
    blab: function(r) {
        // 粉丝等级升级
        // 字段说明
        // type  表示为“粉丝等级升级”,固定为 blab
        // rid   房间 id
        // uid   用户 id
        // nn  用户昵称
        // bl  升级后的等级
        // bnn 升级的粉丝牌
        // lbl 未知（猜测未升级前的等级）
        // ba  未知
    },
    rri: function(r) {
        // 未知的消息事件
    },
    synexp: function(r) {

    },
    noble_num_info: function(r) {
        // 未知的消息事件
    },
    gbroadcast: function(r) {
        // 未知的消息事件
    },
    qausrespond: function(r) {
        // 未知的消息事件
    },
    wiru: function(r) {
        // 未知的消息事件
    },
    wirt: function(r) {
        // 未知的消息事件
    },
    mcspeacsite: function(r) {
        // 未知的消息事件
    },
    rank_change: function(r) {
        // 未知的消息事件
    },
    srres: function(r) {
        // 未知的消息事件
    },
    anbc: function(r) {
        // 未知的消息事件
    },
    frank: function(r) {
        // 粉丝排行榜变化
    },
}