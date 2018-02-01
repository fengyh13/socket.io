const amqp = require("amqplib");

const queueName = "person";

module.exports.attach = async (io)=>{
  let conn = await amqp.connect('amqp://localhost');
  process.once('SIGINT', function(){ conn.close(); });
  
  let ch = await conn.createChannel();
  let ok = await ch.assertQueue(queueName, {
    durable: true
  });    
  ch.prefetch(1);
  await ch.consume(queueName, doWork, {noAck: false});

  function doWork(msg) {
    let body = new Buffer(msg.content).toString(); //msg.content.toString();
    console.log(`receive from client, content: ${body}`);

    io.of('/').adapter.customRequest(body, function(error, replies){ //给每个节点发送消息
      console.log("replies===>", replies); // ['hello msg', ...] 收到的每个节点回复的消息组成的数组
    });

    ch.ack(msg);
  }
}