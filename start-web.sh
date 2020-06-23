#!/bin/sh
basepath=$(cd `dirname $0`; pwd)
cd $basepath
iptables -t nat -F
#ip route add local default dev lo table 100
#ip rule add fwmark 1 lookup 100
ifconfig $1:2 192.168.200.1 netmask 255.255.255.0
sysctl -w net.ipv4.ip_forward=1
sysctl -p
iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN
iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935
#iptables -t nat -A PREROUTING -s 192.168.200.0/24 -j ps4broadcast
iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667
#iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.0/24 -p tcp -j DNAT --to-destination 192.168.200.1:20000
#iptables -t mangle -A PREROUTING -p udp -j TPROXY --on-port 20000 --tproxy-mark 0x01/0x01
iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE
node $basepath/start.js
