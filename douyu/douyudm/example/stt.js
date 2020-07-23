//引入类库
const stt = require('../src/index').stt

//序列化测试数据
const obj = {
    type: 'chatmsg',
    nn: '河马（￣。。￣）',
    ic: 'avatar_v3/201912/b99d77251eb643b5a88bb81863afea4e',
    cst: '1592152272402',
    brid: '0',
    lk: '',
    list: [{
        lev: '1',
        num: '2'
    }, {
        lev: '7',
        num: '3'
    }]
}

//反序列化测试数据
const str = 'type@=chatmsg/nn@=河马（￣。。￣）/ic@=avatar_v3@S201912@Sb99d77251eb643b5a88bb81863afea4e/cst@=1592152272402/brid@=0/lk@=/list@=lev@AA=1@ASnum@AA=2@AS@Slev@AA=7@ASnum@AA=3@AS@S/'

console.log('1.序列化')
console.log('原始: ')
console.log(obj)
console.log('输出: ')
console.log(stt.serialize(obj))

console.log('\n-------------------------------------------')

console.log('2.反序列化')
console.log('原始: ')
console.log(str)
console.log('输出: ')
console.log(stt.deserialize(str))

//一个例外
// const a = `type@=frank/fc@=4395/bnn@=拒绝R/list@=uid@AA=197290249@ASnn@AA=宋宋宋555@ASic@AA=avatar_v3@AAS201809@AASde94cadbaa975630940499fdbafbf258@ASfim@AA=74078400@ASbl@AA=28@ASlev@AA=52@ASpg@AA=1@ASrg@AA=4@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=216851315@ASnn@AA=滴滴么么儿@ASic@AA=avatar_v3@AAS202006@AASf4f65dbd49cf44da944f657fd934c094@ASfim@AA=22429300@ASbl@AA=24@ASlev@AA=41@ASpg@AA=1@ASrg@AA=4@ASnl@AA=7@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=177076498@ASnn@AA=橘井仁心@ASic@AA=avanew@AASface@AAS201711@AAS13@AAS19@AAS0b33a9f10246b83ca9527fb8efdc132f@ASfim@AA=16192900@ASbl@AA=22@ASlev@AA=38@ASpg@AA=1@ASrg@AA=4@ASnl@AA=7@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=163415865@ASnn@AA=HArianaC@ASic@AA=avatar_v3@AAS202005@AASd21cfac310a04a2fb76ed17a8d80040d@ASfim@AA=14609100@ASbl@AA=22@ASlev@AA=39@ASpg@AA=1@ASrg@AA=4@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=172172693@ASnn@AA=不要昵称12@ASic@AA=avanew@AASface@AAS201710@AAS13@AAS15@AASd1f39c4b83e2eb4cc55c09a174cb1744@ASfim@AA=12552160@ASbl@AA=21@ASlev@AA=39@ASpg@AA=1@ASrg@AA=4@ASnl@AA=7@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=193517041@ASnn@AA=风暴中的汉堡@ASic@AA=avatar_v3@AAS201807@AASb047ee52079c53aedf0760177ade0c16@ASfim@AA=10228360@ASbl@AA=20@ASlev@AA=40@ASpg@AA=1@ASrg@AA=4@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=25190947@ASnn@AA=无畏孤独狼@ASic@AA=avatar_v3@AAS201809@AAS992cd2a66f66952c8b8afa4267d2f160@ASfim@AA=9686340@ASbl@AA=20@ASlev@AA=38@ASpg@AA=1@ASrg@AA=4@ASnl@AA=7@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=39270085@ASnn@AA=看见你是我的荣耀@ASic@AA=avatar@AAS039@AAS27@AAS00@AAS85_avatar@ASfim@AA=9559080@ASbl@AA=20@ASlev@AA=37@ASpg@AA=1@ASrg@AA=4@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=37862064@ASnn@AA=JC小猫@ASic@AA=avatar_v3@AAS201906@AASd94deeed8c8d43c7b09afc673e733daa@ASfim@AA=9284120@ASbl@AA=20@ASlev@AA=40@ASpg@AA=1@ASrg@AA=4@ASnl@AA=1@ASsahf@AA=0@ASnewrg@AA=0@AS@Suid@AA=227676692@ASnn@AA=董旺成@ASic@AA=avatar_v3@AAS202003@AAS5548b1db5ee1481fa8d8828d5fc2ee80@ASfim@AA=8120680@ASbl@AA=19@ASlev@AA=39@ASpg@AA=1@ASrg@AA=4@ASnl@AA=7@ASsahf@AA=0@ASnewrg@AA=0@AS@S/ver@=156739/ci@=r6ddzwf2uy/rid@=102965/`
// console.log(stt.deserialize(a))