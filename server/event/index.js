module.exports.attach = (io)=>{
  io.on("connection", (socket)=>{
    console.log(`user ${socket.request.headers.uid} connect with port ${process.env.PORT}`)
    SOCKET_G[socket.request.headers.uid] = socket;

    socket.on("chat", (msg, ack)=>{
      console.log("msg=====>", typeof msg, msg);
      //客户端发起的请求，业务处理
      io.of('/').adapter.customRequest(msg, function(error, replies){ //给每个节点发送消息
        console.log("replies===>", replies); // ['hello msg', ...] 收到的每个节点回复的消息组成的数组
      });

      ack("this is client ack message")  //给客户端回复消息
    })
    socket.on('disconnect', ()=>{
      delete SOCKET_G[socket.request.headers.uid];
      console.log(`user ${socket.request.headers.uid} disconnected`);
    });
  })
}