const socket = io("ws://localhost:3000")

var c = document.getElementById("playground");
var ctx = c.getContext("2d");
const myUsername = "X"; // immutable

var drawGame = (players, agar) => {
  ctx.clearRect(0,0,500,500);
  // draw players
  for(i in players) {
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.arc(players[i][0], players[i][1], players[i][2], 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  // draw agar
  for(i in agar) {
    ctx.fillStyle = "pink"
    ctx.beginPath();
    ctx.arc(agar[i][0], agar[i][1], 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
  // draw viruses (TODO)
}

var move = (e) => {
  socket.emit("getData", myUsername)
  ran = false
  socket.on("giveBackData", (args) => { // this runs multiple times for some reason
    if(!ran) { // this will make it not run multiple times
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
socket.on("updateFromServer", (players, agar) => {
  drawGame(players, agar)
});


c.addEventListener( "click", move);

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   console.log(args)
// });


