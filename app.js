const { Server } = require("socket.io");

const io = new Server({ 
    cors: {
        origin: "*"
    }
});
const width = 10000;
const height = 10000;
// test data - will change later
var data = { // user: [xcor, ycor, area]
  "X": [250, 250, 10],
  "Y": [100, 100, 30],
  "Z": [400, 300, 20]
}
var agarPos = [] // store positions of agar

var spawnAgar = () => {
  agarPos.push([parseInt(Math.random() * 500), parseInt(Math.random() * 500)])
  console.log(agarPos)
  io.emit("updateFromServer", data, agarPos)
} 

io.on("connection", (socket) => {
  io.emit("updateFromServer", data, agarPos) // send to all connected clients
  // socket.emit("updateFromServer") // only send to the client who connected

  socket.on("getData", (arg) => {
    socket.emit("giveBackData", data[arg])
  })
  
  socket.on("updateFromClient", (args) => { // listen from a specific socket
    if(args == null) { // get data without sending data
      io.emit("updateFromServer", data, agarPos)
    }
    console.log("got it")
    user = null
    userdata = []
    for(var i = 0; i < args.length; i++) {
      if(i == 0){
        user = args[i]
      } else{
        userdata.push(args[i])
      }
    }
    data[user] = userdata
    console.log(data)
    io.emit("updateFromServer", data, agarPos)
  });
});


setInterval(spawnAgar, 1000) // create new agar every second
io.listen(3000);