const Redis = require('redis');
const adapter = require('socket.io-redis');

const HOST = "localhost";
const PORT = 6379;

module.exports.attach = (io)=>{
  const pub = Redis.createClient(PORT, HOST);
  const sub = Redis.createClient(PORT, HOST);
  io.adapter(adapter({ pubClient: pub, subClient: sub }));

  io.of('/').adapter.customHook = (data, cb) => {     //每个实例都会收到消息
    console.log(`receive from one instance, content: ${data}`)
    body = JSON.parse(data);
    //业务处理
    if (body.toUserId && SOCKET_G[body.toUserId]){
      console.log(`user ${body.toUserId} is online`);
      SOCKET_G[body.toUserId].emit("chat", data)
    } else {
      console.log(`user ${body.toUserId} is offline`);
    }
    
    cb('hello ' + body.content); //本实例收到消息后，给发送的实例回复消息
  }
}