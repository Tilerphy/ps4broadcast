killall nginx
echo "server {" > ./prepared.conf
echo "listen 1935;" >> ./prepared.conf
echo "chunk_size 131072;" >> ./prepared.conf
echo "max_message 256M;" >> ./prepared.conf
echo "application app {" >> ./prepared.conf
echo "live on;" >> ./prepared.conf
echo "record off;" >> ./prepared.conf
echo "meta copy;" >> ./prepared.conf
echo "push "$1"/"$2";" >> ./prepared.conf
echo "}}" >> ./prepared.conf
mv ./prepared.conf /usr/local/nginx/conf/rtmp.conf.d/douyu
/usr/local/nginx/sbin/nginx
node ./danmu.js
