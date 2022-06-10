// Constants
const AGAR_SIZE = 5
const font_face = "Comic Sans"

var center_x = Math.floor(c.clientWidth / 2);
var center_y = Math.floor(c.clientHeight / 2);
var agar_offset = [0, 0]

var resizeCanvas = () => {
  c.width = document.body.clientWidth; 
  c.height = document.body.clientHeight; 
  center_x = Math.floor(c.clientWidth / 2);
  center_y = Math.floor(c.clientHeight / 2);
}

var drawAgar = (x, y, radius, fill = "pink", stroke = "black") => {
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

var drawText = (x, y, text, fill = "black", stroke = "black") => {
  ctx.strokeStyle = stroke;
  ctx.fillStyle = fill;
  ctx.font = "20px " + font_face;
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

var drawPlayer = (x, y, radius, label, player = [null, null]) => {
  drawAgar(x, y, radius, "green");
  console.log(label)
  drawText(x, y, label);
  if (DEBUG) {
    drawText(x, y + 20, player[0] + ", " + player[1])
  }
}

var drawOpponents = (user, players, offset_x, offset_y) => {
  for (p in players) {
    if (p != user) {
      drawAgar(players[p][0][0] - offset_x, players[p][0][1] - offset_y, players[p][0][2]);
    }
  }
}

var drawAgarPellets = (offset_x, offset_y, agar) => {
  for (i in agar) {
    drawAgar(agar[i][0] - offset_x, agar[i][1] - offset_y, AGAR_SIZE);
    if (DEBUG) {
      drawText(agar[i][0] - offset_x, agar[i][1] - offset_y, (agar[i][0])+ ", " + (agar[i][1]))
    }
  }
}

var drawGame = (players, agar) => {
  
  // Clear screen
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
  
  let player = players[myUsername][0];
  let viewport_player = [center_x, center_y];
  
  if (player == null || player == 0) {
    // console.log("No player found");
    return null;
  }

  if (player[0] <= (c.clientWidth / 2)) {
    // Player is at left bound of map
    viewport_player[0] = player[0];

    debug("At left corner. Distance to left wall (player_xcor): " + player[0])

  } else if (false) {
    // Player is at right bound of map
  } else {
    // Offset if player is not at map bounds
    agar_offset[0] = player[0] - (c.clientWidth / 2);
  }

  if (player[1] <= (c.clientHeight / 2)) {
    // Player is at top bound of map
    viewport_player[1] = player[1];
  } else if (false) {
    // Player is at bottom bound of map
  } else {
    // Offset if player is not at map bounds
    agar_offset[1] = player[1] - (c.clientHeight / 2);
  }

  agar_offset[0] = clamp(agar_offset[0], 0, mapWidth - (c.clientWidth / 2))
  agar_offset[1] = clamp(agar_offset[1], 0, mapHeight - (c.clientHeight / 2))

  //console.log("VIEWPORT: " + viewport_player[0] + ", " + viewport_player[1])
  //console.log("OFFSET: " + agar_offset[0] + ", " + agar_offset[1])
  
  drawPlayer(viewport_player[0], viewport_player[1], player[2], myUsername, player);
  
  drawAgarPellets(agar_offset[0], agar_offset[1], agar)

  drawOpponents(user, players, agar_offset[0], agar_offset[1])


  // Draw others
    // draw viruses (TODO)
  }

resizeCanvas();
window.addEventListener('resize', resizeCanvas)