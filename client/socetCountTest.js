const client = require("./client");
let count = 0;
async function send(uid){

  console.log("uid===>", uid);
  client.connect({uid: uid+''}).on("connect", ()=>{
    count++
    console.log("connect count is ", count);
  });
}

let uid = 0;
setInterval(async ()=>{
  await send(uid);
  uid++;
}, 10) //每10ms发起一个连接



