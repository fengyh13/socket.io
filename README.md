# socket.io
socket.io

1、安装pm2服务

npm install pm2 -g

没用过pm2的,看看这里： [http://pm2.keymetrics.io/docs/usage/quick-start/]()

2、安装依赖包

npm install

3、启动服务

进入start路径，执行命令 bash start.sh启动服务；

4、测试

clinet里user1.js和user2.js是两个简单测试代码

先 node user2.js

然后 node user1.js  //user1向user2发送消息
