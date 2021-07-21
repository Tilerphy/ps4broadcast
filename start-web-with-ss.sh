#!/bin/sh
basepath=$(cd `dirname $0`; pwd)
cd $basepath
mkdir node_modules
cp -R ./douyu/* node_modules
iptables -t nat -F
#set max file s
ulimit -n 10240
# 设置策略路由
ip rule add fwmark 1 table 100
ip route add local 0.0.0.0/0 dev lo table 100

ifconfig $1:2 192.168.200.1 netmask 255.255.255.0
sysctl -w net.ipv4.ip_forward=1
sysctl -p
iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN
iptables -t nat -A PREROUTING -p tcp --dport 1935 -j DNAT --to-destination 192.168.200.1:1935
iptables -t nat -A PREROUTING -p tcp --dport 6667 -j DNAT --to-destination  192.168.200.1:6667
iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE

# 代理局域网设备
iptables -t mangle -N V2RAY
iptables -t mangle -A V2RAY -d 127.0.0.1/32 -j RETURN
iptables -t mangle -A V2RAY -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A V2RAY -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A V2RAY -d 192.168.0.0/16 -p tcp -j RETURN
iptables -t mangle -A V2RAY -d 0/0 -p tcp --dport 1935 -j RETURN
iptables -t mangle -A V2RAY -d 0/0 -p tcp --dport 6667 -j RETURN
iptables -t mangle -A V2RAY -d 192.168.0.0/16 -p udp ! --dport 53 -j RETURN
#two proxy
#192.168.200.150 to game
#other for other thing
iptables -t mangle -A V2RAY -p udp -s 192.168.200.150 -j TPROXY --on-port 12346 --tproxy-mark 1 # 给 UDP 打标记 1，转发至 12346 端口
iptables -t mangle -A V2RAY -p tcp -s 192.168.200.150 -j TPROXY --on-port 12346 --tproxy-mark 1 # 给 TCP 打标记 1，转发至 12346 端口
iptables -t mangle -A V2RAY -p udp -s 192.168.200.0/24 -j TPROXY --on-port 12345 --tproxy-mark 1 # 给 UDP 打标记 1，转发至 12345 端口
iptables -t mangle -A V2RAY -p tcp -s 192.168.200.0/24 -j TPROXY --on-port 12345 --tproxy-mark 1 # 给 TCP 打标记 1，转发至 12345 端口
iptables -t mangle -A PREROUTING -j V2RAY 

#set mark
iptables -t mangle -N V2RAY_MASK
iptables -t mangle -A V2RAY_MASK -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A V2RAY_MASK -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A V2RAY_MASK -d 192.168.0.0/16 -p tcp -j RETURN # 
iptables -t mangle -A V2RAY_MASK -d 192.168.0.0/16 -p udp ! --dport 53 -j RETURN 
iptables -t mangle -A V2RAY_MASK -j RETURN -m mark --mark 0xff    # 直连 SO_MARK 为 0xff 的流量(0xff 是 16 进制数，数值上等同与上面V2Ray 配置的 255)
#iptables -t mangle -A V2RAY_MASK -p udp -j MARK --set-mark 1  
#iptables -t mangle -A V2RAY_MASK -p tcp -j MARK --set-mark 1  
iptables -t mangle -A OUTPUT -j V2RAY_MASK 

node $basepath/start.js
