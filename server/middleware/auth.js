module.exports = (socket, next) => {
  console.log("socket.request.headers===>",socket.request.headers)
  // console.log("socket.request===>",Object.keys(socket.request));
  // console.log("socket.request===>",socket.request._query);
  
  return next();
}