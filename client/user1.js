const client = require("./client");
async function send(){
  client.connect({uid: "1"});

  //通过socket发消息
  // client.sendText(JSON.stringify({
  //   fromUserId: "1",
  //   toUserId: "2",
  //   content: "我是1"
  // }))
  

  //给RabbitMQ发消息
  await client.connectMQ();
  let msg = JSON.stringify({
    fromUserId: "1",
    toUserId: "2",
    content: "我是1"
  })
  await client.sendMsg2PersonQueue(msg);
}

send();


