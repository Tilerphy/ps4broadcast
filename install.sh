#!/bin/sh
echo "install the required software......"
apt-get update
apt-get install -y git libpcre3-dev nodejs openssl libssl-dev gcc g++ automake zlib1g-dev make psmisc
echo "download nginx......"
wget http://nginx.org/download/nginx-1.18.0.tar.gz
tar -xvf nginx-1.18.0.tar.gz
cd nginx-1.18.0
echo "clone nginx-rtmp-module from Github.........."
git clone https://github.com/Tilerphy/nginx-rtmp-module.git
echo "Complile nginx with rtmp-module....................."
./configure --prefix=/usr/local/nginx/ --add-module=./nginx-rtmp-module
echo "Install nginx to /usr/local/nginx..................."
make CFLAGS='-Wno-implicit-fallthrough'
make install
#echo "Install nodejs.."
#wget https://nodejs.org/dist/v8.7.0/node-v8.7.0.tar.gz
#tar -xvf node-v8.7.0.tar.gz
#cd node-v8.7.0
#./configure
#make
#make install
echo "Prepare the rtmp config folder."
rm -rf /usr/local/nginx/conf/rtmp.conf.d
mkdir /usr/local/nginx/conf/rtmp.conf.d
chmod 777 /usr/local/nginx/conf/rtmp.conf.d
chmod 777 /usr/local/nginx/sbin/nginx
sed -i "s/rtmp { include \/usr\/local\/nginx\/conf\/rtmp.conf.d\/\*;}//g" /usr/local/nginx/conf/nginx.conf
sed -i "s/#user  nobody;/rtmp { include \/usr\/local\/nginx\/conf\/rtmp.conf.d\/*;}\n#user  nobody;/g"  /usr/local/nginx/conf/nginx.conf
#echo "Configure iptables................."
#remove old
#sed -i "s/iptables -N ps4broadcast -t nat//g" /etc/rc.local
#sed -i "s/ifconfig $1:2 192.168.200.1 netmask 255.255.255.0//g" /etc/rc.local
#sed -i "s/sysctl -w net.ipv4.ip_forward=1//g" /etc/rc.local
#sed -i "s/sysctl -p//g" /etc/rc.local
#sed -i "s/iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN//g" /etc/rc.local
#sed -i "s/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935//g" /etc/rc.local
#sed -i "s/iptables -t nat -A PREROUTING -s 192.168.200.0\/24 -j ps4broadcast//g" /etc/rc.local
#sed -i "s/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667//g" /etc/rc.local
#sed -i "s/iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE//g" /etc/rc.local
#add back
#sed -i "s/exit 0/iptables -N ps4broadcast -t nat\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/ifconfig $1:2 192.168.200.1 netmask 255.255.255.0\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/sysctl -w net.ipv4.ip_forward=1\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/sysctl -p\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/iptables -t nat -A PREROUTING -s 192.168.200.0\/24 -j ps4broadcast\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE\nexit 0/g" /etc/rc.local
#real do
#iptables -N ps4broadcast -t nat
#ifconfig $1:2 192.168.200.1 netmask 255.255.255.0
#sysctl -w net.ipv4.ip_forward=1
#sysctl -p
#iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN
#iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935
#iptables -t nat -A PREROUTING -s 192.168.200.0/24 -j ps4broadcast
#iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667
#iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE
#clear
echo "###############################################"
echo "Completed."
echo "Set on PS4/XBOX ONE/OBS"
echo "IP: 192.168.200.any"
echo "Gateway: 192.168.200.1"
echo "Netmask: 255.255.255.0"
echo "DNS: YOUR BEST DNS, mayebe 114.114.114.114"
echo "run ./start-web.sh <network device> to start web-server."
