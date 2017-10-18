echo "install the required software......"
apt-get update
apt-get install libpcre3-dev nodejs openssl
echo "download nginx......"
wget http://nginx.org/download/nginx-1.12.1.tar.gz
tar -xvf nginx-1.12.1.tar.gz
cd nginx-1.12.1
echo "clone nginx-rtmp-module from Github.........."
git clone https://github.com/Tilerphy/nginx-rtmp-module.git
echo "Complile nginx with rtmp-module....................."
./configure --add-module=./nginx-rtmp-module
make
echo "Install nginx to /usr/local/nginx..................."
make install
echo "Prepare the rtmp config folder."
rm -rf /usr/local/nginx/conf/rtmp.conf.d
mkdir /usr/local/nginx/conf/rtmp.conf.d
sed -i "s/rtmp { include \/usr\/local\/nginx\/conf\/rtmp.conf.d\/\*;}//g" /usr/local/nginx/conf/nginx.conf
sed -i "s/#user  nobody;/rtmp { include \/usr\/local\/nginx\/conf\/rtmp.conf.d\/*;}\n#user  nobody;/g"  /usr/local/nginx/conf/nginx.conf
echo "Configure iptables................."
#remove old
#sed -i "s/iptables -N ps4broadcast -t nat//g" /etc/rc.local
sed -i "s/ifconfig eth0:2 192.168.200.1 netmask 255.255.255.0//g" /etc/rc.local
sed -i "s/sysctl -w net.ipv4.ip_forward=1//g" /etc/rc.local
sed -i "s/sysctl -p//g" /etc/rc.local
sed -i "s/iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN//g" /etc/rc.local
sed -i "s/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935//g" /etc/rc.local
#sed -i "s/iptables -t nat -A PREROUTING -s 192.168.200.0\/24 -j ps4broadcast//g" /etc/rc.local
sed -i "s/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667//g" /etc/rc.local
sed -i "s/iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE//g" /etc/rc.local
#add back
#sed -i "s/exit 0/iptables -N ps4broadcast -t nat\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/ifconfig eth0:2 192.168.200.1 netmask 255.255.255.0\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/sysctl -w net.ipv4.ip_forward=1\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/sysctl -p\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935\nexit 0/g" /etc/rc.local
#sed -i "s/exit 0/iptables -t nat -A PREROUTING -s 192.168.200.0\/24 -j ps4broadcast\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0\/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667\nexit 0/g" /etc/rc.local
sed -i "s/exit 0/iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE\nexit 0/g" /etc/rc.local
#real do
#iptables -N ps4broadcast -t nat
ifconfig eth0:2 192.168.200.1 netmask 255.255.255.0
sysctl -w net.ipv4.ip_forward=1
sysctl -p
iptables -t nat -A PREROUTING --ipv4 -s 192.168.200.1 -j RETURN
iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0/24 --dport 1935 -j DNAT --to-destination 192.168.200.1:1935
#iptables -t nat -A PREROUTING -s 192.168.200.0/24 -j ps4broadcast
iptables -t nat -A PREROUTING -p tcp -s 192.168.200.0/24 --dport 6667 -j DNAT --to-destination  192.168.200.1:6667
iptables -t nat -A POSTROUTING --ipv4 -j MASQUERADE
clear
echo "Complete."
echo "Set on PS4/XBOX ONE/OBS"
echo "IP: 192.168.200.any"
echo "Gateway: 192.168.200.1"
echo "Netmask: 255.255.255.0"
echo "DNS: YOUR BEST DNS, mayebe 114.114.114.114"
echo "Please run './start.sh <rtmp address> <rtmp key>' by yourself."
