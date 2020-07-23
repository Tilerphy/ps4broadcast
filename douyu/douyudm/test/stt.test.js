const assert = require('assert')
const danmaku = require('../src/index')
const stt = danmaku.stt

describe('stt.js 斗鱼序列化反序列化', function () {
    const test = {
        configscreenObj: {
            gbtemp: '192',
            nrt: '0',
            now: '1593273574796',
            btype: 'qzs202006',
            vsrc: 'https://rpic.douyucdn.cn/asrpic/200627/3374504_2350.png/dy1',
            otherContent: '狂欢火箭x2、狂欢卡x1、狂欢趴x3',
            avatar: 'https://apic.douyucdn.cn/upload/avatar_v3/202005/a5df465fd49b4826b853ad212556dafb_big.jpg',
            type: 'configscreen',
            rid: '3374504',
            userName: '',
            anchorName: '三岁伊丶'
        },
        configscreenStr: 'gbtemp@=192/nrt@=0/now@=1593273574796/btype@=qzs202006/vsrc@=https:@S@Srpic.douyucdn.cn@Sasrpic@S200627@S3374504_2350.png@Sdy1/otherContent@=狂欢火箭x2、狂欢卡x1、狂欢趴x3/avatar@=https:@S@Sapic.douyucdn.cn@Supload@Savatar_v3@S202005@Sa5df465fd49b4826b853ad212556dafb_big.jpg/type@=configscreen/rid@=3374504/userName@=/anchorName@=三岁伊丶/',
        nlkstatusObj: {},
        nlkstatusStr: 'idb@=nn@A=解说拒绝R@Sresult@A=3@Ssc@A=100@Snrt@A=0@Stopnn@A=烨烨夜月@Swinnum@A=0@Stopuid@A=29969620@Stopavt@A=https:@AS@ASapic.douyucdn.cn@ASupload@ASavatar_v3@AS202006@ASe39c178fe523404e8d903308195996c7_big.jpg@Svsrc@A=https:@AS@ASrpic.douyucdn.cn@ASasrpic@AS200628@AS102965_0045.png@ASdy1@Srid@A=102965@Savt@A=https:@AS@ASapic.douyucdn.cn@ASupload@ASavatar_v3@AS202001@ASc9755268a9fe4283b552513a37f376c4_big.jpg@Stop1sc@A=100@S/rida@=nn@A=糖小九吖@Sresult@A=1@Ssc@A=200@Snrt@A=0@Stopnn@A=恭喜我中奖发财@Swinnum@A=2@Stopuid@A=275508679@Stopavt@A=https:@AS@ASapic.douyucdn.cn@ASupload@ASavatar@ASdefault@AS12_big.jpg@Svsrc@A=https:@AS@ASrpic.douyucdn.cn@ASasrpic@AS200628@AS6585782_0045.png@ASdy1@Srid@A=6585782@Savt@A=https:@AS@ASapic.douyucdn.cn@ASupload@ASavatar_v3@AS201909@AS295e0d5b1f0d4adcaf59a5ce89bed5bb_big.jpg@Stop1sc@A=200@S/pkId@=696079/is_exc@=0/show_mvp@=1/time@=1593276404/type@=nlkstatus/ts@=1593276405792/status@=3/',
        chatMsgObj: {
            type: 'chatmsg',
            rid: '605964',
            ct: '1',
            uid: '355384536',
            nn: '用户16301824',
            txt: '加油',
            cid: 'fcb83b44585a4ee00adc320100000000',
            ic: 'avatar/default/01',
            level: '2',
            sahf: '0',
            cst: '1593273451933',
            bnn: '',
            bl: '0',
            brid: '0',
            hc: '',
            mgt: '6',
            mid: '50010',
            mtn: '白 鲨',
            ml: '3',
            gl: '11',
            ms: '0',
            el: '',
            lk: '',
            hb: '140/',
            urlev: '1',
            dms: '6',
            pdg: '68',
            pdk: '8'
        },
        chatmsgStr: 'type@=chatmsg/rid@=605964/ct@=1/uid@=355384536/nn@=用户16301824/txt@=加油/cid@=fcb83b44585a4ee00adc320100000000/ic@=avatar@Sdefault@S01/level@=2/sahf@=0/cst@=1593273451933/bnn@=/bl@=0/brid@=0/hc@=/mgt@=6/mid@=50010/mtn@=白 鲨/ml@=3/gl@=11/ms@=0/el@=/lk@=/hb@=140@S/urlev@=1/dms@=6/pdg@=68/pdk@=8/',
        nobleNumInfoObj: {
            type: 'noble_num_info',
            sum: '26',
            vn: '557',
            rid: '102965',
            list: [{
                lev: '4',
                num: '1'
            }, {
                lev: '1',
                num: '2'
            }, {
                lev: '7',
                num: '23'
            }]
        },
        nobleNumInfoStr: 'type@=noble_num_info/sum@=26/vn@=557/rid@=102965/list@=lev@AA=4@ASnum@AA=1@AS@Slev@AA=1@ASnum@AA=2@AS@Slev@AA=7@ASnum@AA=23@AS@S/',
        dgbObj: {
            type: 'dgb',
            rid: '102965',
            gfid: '824',
            gs: '0',
            uid: '63912680',
            nn: '昂一文',
            ic: 'avatar_v3/202001/01dd1da4833f4a398f96231dda2deb5a',
            eid: '0',
            eic: '20052',
            level: '16',
            dw: '0',
            gfcnt: '1',
            hits: '2',
            bcnt: '2',
            bst: '2',
            nl: '7',
            ct: '2',
            el: '',
            cm: '0',
            bnn: '拒绝R',
            bl: '9',
            brid: '102965',
            hc: 'd48b0bb9c375e34fb20074a424b9f0ef',
            sahf: '0',
            fc: '0',
            gpf: '1',
            pid: '268',
            bnid: '1',
            bnl: '1',
            receive_uid: '3195592',
            receive_nn: '解说拒绝R',
            from: '2'
        },
        dgbStr: 'type@=dgb/rid@=102965/gfid@=824/gs@=0/uid@=63912680/nn@=昂一文/ic@=avatar_v3@S202001@S01dd1da4833f4a398f96231dda2deb5a/eid@=0/eic@=20052/level@=16/dw@=0/gfcnt@=1/hits@=2/bcnt@=2/bst@=2/nl@=7/ct@=2/el@=/cm@=0/bnn@=拒绝R/bl@=9/brid@=102965/hc@=d48b0bb9c375e34fb20074a424b9f0ef/sahf@=0/fc@=0/gpf@=1/pid@=268/bnid@=1/bnl@=1/receive_uid@=3195592/receive_nn@=解说拒绝R/from@=2/',
        uenterObj: {
            type: 'uenter',
            rid: '102965',
            uid: '208936492',
            nn: '水边一鸣',
            level: '33',
            rg: '4',
            ic: 'avatar_v3/201812/8e95f0bfa54e4feda0716c3593816131',
            nl: '7',
            rni: '0',
            el: '',
            sahf: '0',
            wgei: '0',
            fl: '19'
        },
        uenterStr: 'type@=uenter/rid@=102965/uid@=208936492/nn@=水边一鸣/level@=33/rg@=4/ic@=avatar_v3@S201812@S8e95f0bfa54e4feda0716c3593816131/nl@=7/rni@=0/el@=/sahf@=0/wgei@=0/fl@=19/',
    }

    it('序列化', function () {
        console.log('[stt.serialize]', stt.serialize(test.uenterObj))
        assert.equal(stt.serialize(test.uenterObj), test.uenterStr)
    })

    it('反序列化', function () {
        console.log('[stt.deserialize]', stt.deserialize(test.uenterStr))
        assert.deepEqual(stt.deserialize(test.uenterStr), test.uenterObj)
    })
})