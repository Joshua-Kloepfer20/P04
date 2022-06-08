const { Server } = require("socket.io");
var express = require('express');
var app = express();

app.use(express.static('public'));

const io = new Server({ 
    cors: {
        origin: "*"
    }
});
const mapWidth = 10000;
const mapHeight = 10000;
// test data - will change later
var data = {} // user: [xcor, ycor, area]
var agarPos = [] // store positions of agar

var spawnAgar = () => {
  agarPos.push([parseInt(Math.random() * mapWidth), parseInt(Math.random() * mapHeight)])
  io.emit("updateFromServer", data, agarPos)
} 

io.on("connection", (socket) => {
  io.emit("updateFromServer", data, agarPos) // send to all connected clients
  // socket.emit("updateFromServer") // only send to the client who connected

  socket.on("getData", (arg) => {
    socket.emit("giveBackData", data[arg])
  })

  socket.on("getList", () => {
    socket.emit("giveList", data)
  })
  
  socket.on("updateFromClient", (args) => { // listen from a specific socket
    if(args == null) { // get data without sending data
      io.emit("updateFromServer", data, agarPos)
    }
    console.log("got it")
    userdata = []
    user = args[0]
    console.log(user)
    if (data[user] == null) {
      data[user] = []
    }
    for(var i = 0; i < args.length; i++) {
      data[user][i] = args[i]
    }
    console.log(data[user])
    io.emit("updateFromServer", data, agarPos)
  });
});


setInterval(spawnAgar, 1000) // create new agar every second
io.listen(3000);
