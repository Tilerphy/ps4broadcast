#!/usr/bin/env node

const program = require('commander')
const package = require('../package.json')
const client = require('../src/client')

program
    .requiredOption('-i, --id <number>', '输入房间id')
    .option('-j, --uenter', '忽略用户进入房间', false)
    .option('-u, --upgrade', '忽略用户等级提升', false)
    .option('-r, --rss', '忽略房间开播提醒', false)
    .option('-b, --bc_buy_deserve', '忽略赠送酬勤通知', false)
    .option('-s, --ssd', '忽略超级弹幕', false)
    .option('-p, --spbc', '忽略房间内礼物广播', false)
    .option('-d, --dgb', '忽略赠送礼物', false)
    .option('-o, --onlinegift', '忽略领取在线鱼丸', false)
    .option('-g, --ggbb', '忽略房间用户抢红包', false)
    .option('-r, --rankup', '忽略房间内top10变化消息', false)
    .option('-l, --ranklist', '忽略广播排行榜消息', false)
    .option('--debug', '开启debug模式，输出消息内容保存到文件', false)
    .version(package.version)
    .parse(process.argv)

const c = new client(program.id, {
    debug: program.debug,
})
c.setIgnore({
    uenter: program.uenter,
    upgrade: program.upgrade,
    rss: program.rss,
    bc_buy_deserve: program.bc_buy_deserve,
    ssd: program.ssd,
    spbc: program.spbc,
    dgb: program.dgb,
    onlinegift: program.onlinegift,
    ggbb: program.ggbb,
    rankup: program.rankup,
    ranklist: program.ranklist,
}).run()