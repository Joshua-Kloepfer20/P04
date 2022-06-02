const socket = io("ws://localhost:3000")

var c = document.getElementById("playground");
var ctx = c.getContext("2d");
const myUsername = "X"; // immutable

var drawDot = (data) => {
  ctx.clearRect(0,0,500,500);
  for(i in data) {
    ctx.beginPath();
    ctx.arc(data[i][0], data[i][1], data[i][2], 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
};
var move = (e) => {
  socket.emit("getData", myUsername)
  ran = false
  socket.on("giveBackData", (args) => { // this runs multiple times for some reason
    if(!ran) { // make it not run multiple times
      console.log("data returned")
      args[0] += 100
      console.log(args)
      // update the position
      sendUpdate(args[0], args[1], args[2])
      ran = true
    }
  })
}

var sendUpdate = (myPositionX, myPositionY, mySize) => {
  console.log("send")
  socket.emit("updateFromClient", [myUsername, myPositionX, myPositionY, mySize])
}
socket.on("updateFromServer", (args) => {
  drawDot(args)
});

c.addEventListener( "click", move);

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   console.log(args)
// });