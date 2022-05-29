const socket = io("ws://localhost:3000")

var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var myUsername = "X"; // GET FROM LOGIN, also fix later (this needs to be protected)
// fix this later (these also need to be protected)
// get data from server each time instead of storing these client-side
var myPositionX = null;
var myPositionY = null;
var mySize = null;
var drawDot = (data) => {
  ctx.clearRect(0,0,500,500);
  for(i in data) {
    ctx.beginPath();
    ctx.arc(data[i][0], data[i][1], data[i][2], 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
};
var move = () => {
  myPositionX += 100
  sendUpdate() // add parameters
}

var sendUpdate = () => {
  console.log("send")
  socket.emit("updateFromClient", [myUsername, myPositionX, myPositionY, mySize])
}
socket.on("updateFromServer", (args) => {
  myPositionX = args[myUsername][0]
  myPositionY = args[myUsername][1]
  mySize = args[myUsername][2]
  drawDot(args)
});

c.addEventListener( "click", move);

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   console.log(args)
// });