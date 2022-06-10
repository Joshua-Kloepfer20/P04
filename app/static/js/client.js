var sendUpdate = (args) => {
    console.log("send")
    socket.emit("updateFromClient", args)
  }
  socket.on("updateFromServer", (players, agar) => {
      update(players, agar)
      drawGame(players, agar)
  });
var sendUpdate2 = (args) => {
    console.log("send")
    socket.emit("updateFromClient2", args)
  }
var sendUpdate3 = (k) => {
    socket.emit("updateFromClient2.5", "agar", k, null, null)
  }
var sendUpdate4 = (k) => {
  socket.emit("updateFromClient2.5", "users", k, null, null)
}
var sendupdate5 = (k, i, size) => {
  socket.emit("updateFromClient2.5", "size", k, i, size)
}
var sendUpdate6 = (k, i) => {
  socket.emit("updateFromClient2.5", "cell", k, i, null)
}
var mouseX = 0;
var mouseY = 0;
// Getting key presses
// Calls function that sees if an arrow key was pressed along with parameter
// stating whether a keydown (true) or keyup event occured
document.onkeydown = function(){arrowChange(true, "User")};
document.onkeyup = function(){arrowChange(false, "User")};

  function arrowChange(isDown, user) {
  var key = event.keyCode;
      // determines if an arrow key was pressed or space bar
      switch (key) {
        // each case is the key code assosciated with an arrow press except 32
         case 37: case 38: case 39: case 40: case 32:
            // if a keydown event occured, starts movement by calling change
            // timer with isStart as true
            if (isDown) {
              // user is only specified in instances of changeTimer so that it
              // is there when move is called and can be used to update server
              // data
              changeTimer(user, key, true);
            }
            // if the event was keyup, stops movement by calling change timer
            // with isStart as false
            else {
              changeTimer(user, key, false);
            }
            break;
      }
   };

   // variables to allow functions to be called at appropriate interval
   // separately for left, right, up and down movement
   var timerL;
   var timerU;
   var timerR;
   var timerD;
   var pressed = false;
   var timerM;
   var theta;
   var curtime = new Date();

   function changeTimer(user, key, isStart) {
    console.log(key)
     switch (key) {
       // for left key
        case 37:
           // if starting movement
           if (isStart) {
             // console.log("starting" + user + key);
             // clears interval (stops calling function at interval specified in
             // ms) to avoid multiple assignments to same variable
             timerL = clearInterval(timerL);
             // sets appropriate interval for the function move to be called at
             // with user and key as parameters
             timerL = setInterval(move, 0.5, key);
           }
           // if stopping movement
           else {
             // console.log("stopping" + user + key);
             // clears interval so move is no longer called
             timerL = clearInterval(timerL);
           }
           break;
        // same as left key but for up
        case 38:
           if (isStart) {
             timerU = clearInterval(timerU);
             // console.log("starting" + user + key);
             timerU = setInterval(move, 0.5, key);
           }
           else {
             // console.log("stopping" + user + key);
             timerU = clearInterval(timerU);
           }
           break;
        // same as other arrow keys but for right
        case 39:
        if (isStart) {
          timerR = clearInterval(timerR);
          // console.log("starting" + user + key);
          timerR = setInterval(move, 0.5, key);
        }
        else {
          //console.log("stopping" + user + key);
          timerR = clearInterval(timerR);
        }
           break;
        // same as other arrow keys but for down
        case 40:
          if (isStart) {
            timerD = clearInterval(timerD);
            // console.log("starting" + user + key);
            timerD = setInterval(move, 0.5, key);
          }
          else {
            // console.log("stopping" + user + key);
            timerD = clearInterval(timerD);
          }
           break;
        case 32:
          if (isStart) {
            pressed = true

          }
          else if (pressed == true) {
            split()
            pressed = false
          }
          break;
     }
   }

var move = (key) => {
  socket.emit("getData", myUsername)
  console.log("moved" + key)
  actualKey = key
  ran = false
  socket.on("giveBackData", (args) => { // this runs multiple times for some reason
    if(!ran) { // this will make it not run multiple times
      // args[i][0] will be x coordinates
      // args[i][1] will be y
      // args[i][2] will be area
      // by adding +- 25 / args[i][2] move speed inversely proportional to area
      if(actualKey == 37) {
        console.log("left");
        for (let i = 0; i < args.length; i++) {
          console.log(args[i][0]);
          console.log(args[i][2]);
          args[i][0] -= 25 / args[i][2];
          if(args[i][0] < 0) {
            args[i][0] = 0
          }
        }
      } else if(actualKey == 39) {
        console.log("right");
        for (let i = 0; i < args.length; i++) {
          console.log(args[i][2]);
          args[i][0] += 25 / args[i][2];
          if(args[i][0] > 10000) {
            args[i][0] = 10000
          }
        }
      } else if(actualKey == 38) {
        for (let i = 0; i < args.length; i++) {
          console.log(args[i][2]);
          args[i][1] -= 25 / args[i][2];
          if(args[i][1] < 0) {
            args[i][1] = 0
          }
        }
      } else if(actualKey == 40) {
        for (let i = 0; i < args.length; i++) {
          console.log(args[i][2]);
          args[i][1] += 25 / args[i][2];
          if(args[i][1] > 10000) {
            args[i][1] = 10000
          }
        }
      }
      
      console.log(args[0])
      // update the position
      args.unshift(myUsername)
      sendUpdate2(args)
      //update(myUsername, args)
      ran = true
    }
 })
}

var split = () => {
  socket.emit("getData", myUsername)
  socket.on("giveBackdata", (args) => {
    //console.log(args[myUsername][0])
    // console.log("yes")
    timerM = clearInterval(timerM)
    curtime = Date.now()
    theta = Math.atan((mouseY - center_y) / (mouseX - center_x)) * 180 / Math.PI
    let i = 1
    let smallest = [0, getCenterDistance(args[0][0], args[0][1], mouseX, mouseY)]
    while (i < args.length) {
      let distance = getCenterDistance(args[i][0], args[i][1], mouseX, mouseY)
      if (distance < smallest[1]) {
        smallest[0] = i
        smallest[1] = distance
      }
      i++
    }
    args.push([args[smallest[0]][0], args[smallest[0]][1], Math.pow(Math.sqrt(args[smallest[0]][2] / Math.PI) / 2, 2) * Math.PI])
    timerM = setInterval(shoot, 1000, args, smallest)
    //console.log(mouseX)
    //console.log(mouseY)
  })
}

var shoot = (args, smallest) => {
  if (Date.now() - curtime > 5000) {
    timerM = clearInterval(timerM)
  }
  else {

  }
}

addEventListener("mousemove", function(e) {
  var rect = c.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  //mouseX = e.mouseX;
  //mouseY = e.mouseY;
})
// allows all changes that need to be made to data to occur
// call at the end of each move
function update(users, agar) {
  user = myUsername
  var data = {}
  var data2 = []
  console.log("Users: " + JSON.stringify(users));
  if(users.length >= 2) {
    for (let k in users) {
      // console.log("On user " + k);
      if (k != user) {
        for (let l in users[user]) {
          // console.log(users[user][l]);
          for (let m in users[k]) {
            // console.log(m);
            // console.log(users[k][m]);
            if (
              // determines if one cell of user is eating one of other user
              isEating(
                // users[user][l] <- example syntax to retrieve value
                users[user][l][0], users[user][l][1], users[user][l][2],
                users[k][m][0], users[k][m][1], users[k][m][2]
              )
            ) // updates if so
            {
              // console.log(user + "[" + l + "]" + " eating " + m + "[" + l + "]");
              users[user][l][2] += .9 * users[k][m][2];
              sendupdate5(user, l, users[user][l][2])
              // deletes eaten cell
              delete users[k][m];
              sendUpdate6(k, m)
              // if cell attributes are empty, deletes cell
              users[k] = users[k].filter(Boolean);
              //  console.log("Users: " + JSON.stringify(users));
            }
            // determines if one cell of other user is eating one of user
            else if (
              isEating(
                // users[user][0] <- example syntax to retrieve value
                users[k][m][0], users[k][m][1], users[k][m][2],
                users[user][l][0], users[user][l][1], users[user][l][2]
              )
            ) // updates if so
            {
              // console.log(k + "[" + m + "]" + " eating " + user + "[" + l + "]");
              users[k][m][2] += .9 * users[user][l][2];
              sendupdate5(k, m, users[k][m][2])
              // deletes eaten cell
              delete users[user][l];
              sendUpdate6(user, l)
              // if cell attributes are empty, deletes cell
              users[user] = users[user].filter(Boolean);
              // console.log("Users: " + JSON.stringify(users));
              // if users[user][l] deleted stops iterating through different
              // users[k][m] to look for interactions with that users[user][l]
              // since it is null (not required)
              break;
            }
          }
        }
        // Deletes users with no cells on map from dictionary
        if (users[user].length == 0) {
          sendUpdate4(user)
          break
        }
        if (users[k].length == 0) {
          sendUpdate4(k)
          break
        }
      }
    }

  }

  // determines eating with agar
  for (let i in users[user]) {
    for (let k in agar) {
      // determines if any agar close enough to eat
      if (
        isEatingAgar(
          users[user][i][0], users[user][i][1], users[user][i][2],
          agar[k][0], agar[k][1], agar[k][2]
        )
      )
      // updates if so
      {
        users[user][i][2] += agar[k][2];
        sendupdate5(user, i, users[user][i][2])
        sendUpdate3(k)
        break
      }
    }
  }
};

// gets radius associated with the cell's mass
function getRadius(area) {
  return Math.sqrt(
    area / Math.PI
  );
};

// gets the radius assosciated with 90% of the blob's mass
function getInnerRadius(area) {
  return Math.sqrt(
    .9 * area / Math.PI
  );
}

// gets distance between centers of two cells
function getCenterDistance(xcorA, ycorA, xcorB, ycorB) {
  return Math.sqrt(
    Math.pow((xcorA - xcorB), 2)
    +
    Math.pow((ycorA - ycorB), 2)
  );
}

// checks if close enough for interaction
function isInteracting(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  var distance = getCenterDistance(xcorA, ycorA, xcorB, ycorB);
  // console.log("Distance: " + distance)
  // gives distance close enough for interaction (wrong rn)
  var close = getInnerRadius(areaA) + getInnerRadius(areaB);
  // console.log("Inner Radius A: " + getInnerRadius(areaA));
  // console.log("Inner Radius B: " + getInnerRadius(areaB));
  // console.log("Close: " + close);
  if (distance <= close) {
    return true;
  }
  else {
    return false;
  }
}

// checks if user A is eating
function isEating(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  // eats if ineracting and
  // console.log("Interacting? " + isInteracting(xcorA, ycorA, areaA, xcorB, ycorB, areaB));
  if (isInteracting(xcorA, ycorA, areaA, xcorB, ycorB, areaB)) {
    // 90% userA mass is greater than or equal to userB mass
    if (.9 * areaA >= areaB) {
      return true;
    }
  }
  // returns false otherwise
  return false;
}

// // checks if user A is eaten (B is eating)
// // only called when B is a user
// function isEaten(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
//   if (isEatingUser(xcorB, ycorB, areaB, xcorA, ycorA, areaA)) {
//     return true;
//   }
//   return false;
// }

// checks if user A is eating agar
// as long as two cells are close enough to touch, eating will occur
function isEatingAgar(xcorA, ycorA, areaA, xcorB, ycorB, areaB) {
  var distance = getCenterDistance(xcorA, ycorA, xcorB, ycorB);
  // console.log("Distance: " + distance)
  // gives distance close enough for interaction (wrong rn)
  var close = getRadius(areaA) + getRadius(areaB);
  // console.log("Radius A: " + getRadius(areaA));
  // console.log("Radius B: " + getRadius(areaB));
  // console.log("Close: " + close);
  if (distance <= close) {
    return true;
  }
  else {
    return false;
  }
}
