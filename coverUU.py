# 在openwrt中使用/etc/rc.local 设置跟随系统启动本脚本。
# 建议不要使用22版本的openwrt，官方删除了iptables命令，因此uu也无法使用。 我们测试是在openwrt 21 中。
import os
import time
while True:
    # 程序启动后每两秒进行一次检查
    time.sleep(2)
    # 首先把iptables的nat规则导出到一个文件中
    os.system("iptables -t nat -L > latest_iptables")
    # 读取iptables内容
    with open("latest_iptables", "r") as rules:
        lines = rules.readlines()
        # 我们规定iptables的第三行是 1935 端口的重定向 （rtmp端口）
        firstRule = lines[2].strip()
        # 我们规定iptables的第四行是 6667 端口的重定向 （twitch 弹幕端口）
        secondRule = lines[3].strip()
        # 一旦有任意规则不符合，则删掉我们自己定义的规则，并重新添加到第三行第四行。
        if not firstRule.endswith("1935") or not secondRule.endswith("6667"):
            os.system("iptables -t nat -D PREROUTING -p tcp --dport 1935 -j DNAT --to-destination 192.168.8.11:1935")
            os.system("iptables -t nat -D PREROUTING -p tcp --dport 6667 -j DNAT --to-destination 192.168.8.11:6667")
            os.system("iptables -t nat -I PREROUTING 1 -p tcp --dport 1935 -j DNAT --to-destination 192.168.8.11:1935")
            os.system("iptables -t nat -I PREROUTING 2 -p tcp --dport 6667 -j DNAT --to-destination 192.168.8.11:6667")
    
