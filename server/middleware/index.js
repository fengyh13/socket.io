const auth = require("./auth");

module.exports.attach = (io)=>{
  io.use(auth)
}