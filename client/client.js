const io = require("socket.io-client");
const amqp = require('amqplib');

class client{
  constructor(){
  }
  connect(extraHeaders){
    this.socket = io('http://localhost:12345', {
      transports: ['websocket'],
      reconnectionAttempts: 10,
      reconnection: true,
      query: {
        msg: "1111"
      },
      transportOptions: {
        websocket: {
          extraHeaders: extraHeaders
        }
      }
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log("attemptNumber===>", attemptNumber)
    });
    this.socket.on('chat', (msg) => {
      console.log("back msg===>", msg)
    });
    return this.socket;
  }
  sendText(msg){
    this.socket.emit('chat', msg, (data)=>{
      console.log("data===>", data)
    });
  }
  async connectMQ (){    
    let conn = await amqp.connect('amqp://localhost');
    this.channel = await conn.createChannel();
  }
  async sendMsg2MQ(q, msg) {
    let ok = await this.channel.assertQueue(q, {durable: true});     
    await this.channel.sendToQueue(q, Buffer.from(msg + ""), {
      deliveryMode: true,
      expiration: "10000"
    });
  }
  async sendMsg2PersonQueue(msg){
    const queueName = "person";
    this.sendMsg2MQ(queueName, msg)
  }
}

module.exports = new client();
