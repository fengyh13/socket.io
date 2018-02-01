const Koa = require('koa')
const app = new Koa();
const server = require('http').createServer(app.callback());
const redis = require('socket.io-redis');
const middleware = require("./middleware");
const adapter = require("./adapter");
const rabbitmq = require("./rabbitmq");
const event = require("./event");
global.SOCKET_G = {}; 

const io = require('socket.io')(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  transports: ['websocket']
});

adapter.attach(io);
middleware.attach(io);
event.attach(io);
rabbitmq.attach(io);

const PORT = process.env.PORT;
server.listen(PORT);
console.log(`service is listening in port ${PORT}`);