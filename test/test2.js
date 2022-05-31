// Getting key presses
document.onkeydown = function (event) {
  // Create scheduler for each and have up key cancel
      switch (event.keyCode) {
         case 37:
            console.log("Left key.");
            break;
         case 38:
            console.log("Up key.");
            break;
         case 39:
            console.log("Right key.");
            break;
         case 40:
            console.log("Down key.");
            break;
      }
   };
