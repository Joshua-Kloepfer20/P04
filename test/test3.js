// Getting key presses
// Calls function that sees if an arrow key was pressed along with parameter
// stating whether a keydown (true) or keyup event occured
document.onkeydown = function(){arrowChange(true, "User")};
document.onkeyup = function(){arrowChange(false, "User")};

  function arrowChange(isDown, user) {
  var key = event.keyCode;
      // determines if an arrow key was pressed
      switch (key) {
         case 37: case 38: case 39: case 40:
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

   // logs that a move occured, upon integration will update server data
   function move(user, key) {
     console.log("move" + user + key);
     
     // at new position test if can eat any (other users will do same)
     // go through data to see if the inner portion (contained by the circle
     // with in same center but Math.sqrt(9/10) * radius or 90% of the mass) of
     // this user touches the inner portion of the other
     // if so, checks to see if the mass of the user is <= 90% of this one
     // if it is, this user consumes other and recieves 90% of mass and radius
     // recalculated
   }

   function changeTimer(user, key, isStart) {
     switch (key) {
       // for left key
        case 37:
           // if starting movement
           if (isStart) {
             console.log("starting" + user + key);
             // clears interval (stops calling function at interval specified in
             // ms) to avoid multiple assignments to same variable
             timerL = clearInterval(timerL);
             // sets appropriate interval for the function move to be called at
             // with user and key as parameters
             timerL = setInterval(move, 1, user, key);
           }
           // if stopping movement
           else {
             console.log("stopping" + user + key);
             // clears interval so move is no longer called
             timerL = clearInterval(timerL);
           }
           break;
        // same as left key but for up
        case 38:
           if (isStart) {
             timerU = clearInterval(timerU);
             console.log("starting" + user + key);
             timerU = setInterval(move, 1, user, key);
           }
           else {
             console.log("stopping" + user + key);
             timerU = clearInterval(timerU);
           }
           break;
        // same as other arrow keys but for right
        case 39:
        if (isStart) {
          timerR = clearInterval(timerR);
          console.log("starting" + user + key);
          timerR = setInterval(move, 1, user, key);
        }
        else {
          console.log("stopping" + user + key);
          timerR = clearInterval(timerR);
        }
           break;
        // same as other arrow keys but for down
        case 40:
        if (isStart) {
          timerD = clearInterval(timerD);
          console.log("starting" + user + key);
          timerD = setInterval(move, 1, user, key);
        }
        else {
          console.log("stopping" + user + key);
          timerD = clearInterval(timerD);
        }
           break;
     }
   }
