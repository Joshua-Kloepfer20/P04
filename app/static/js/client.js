var sendUpdate = (myPositionX, myPositionY, mySize) => {
    console.log("send")
    socket.emit("updateFromClient", [myUsername, myPositionX, myPositionY, mySize])
  }
  socket.on("updateFromServer", (players, agar) => {
    drawGame(players, agar)
  });

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

c.addEventListener( "click", move);
