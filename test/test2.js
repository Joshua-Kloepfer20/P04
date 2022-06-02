// Getting key presses
document.onkeydown = arrowChange(true);
document.onkeyup = arrowChange(false);

  function arrowChange(isDown) {
  // Create scheduler for each and have up key cancel
      switch (event.keyCode) {
         case 37:
            console.log("Left key.");
            if (isDown) {
              startMove("Test", "L");
            }
            else {
              stopMove();
            }
            break;
         case 38:
            console.log("Up key.");
            if (isDown) {
              startMove("Test", "U");
            }
            else {
              stopMove();
            }
            break;
         case 39:
            console.log("Right key.");
            if (isDown) {
              startMove("Test", "R");
            }
            else {
              stopMove();
            }
            break;
         case 40:
            console.log("Down key.");
            if (isDown) {
              startMove("Test", "D");
            }
            else {
              stopMove();
            }
            break;
      }
   };

   var timer;

   function startMove(user, key) {
   	console.log("starting" + user + key);
     timer = setInterval(move, .1, user, key);
   }

   function move(user, key) {
     console.log("move" + user + key)
   }

   // stops metronome by clearing interval
   function stopMove() {
     console.log("stopping");
     // console.log(timer);
     timer = clearInterval(timer);
     // console.log(timer);
   }
