// Constants
const AGAR_SIZE = 5
const font_face = "Comic Sans"

var center_x = Math.floor(c.clientWidth / 2);
var center_y = Math.floor(c.clientHeight / 2);

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

var drawGame = (players, agar) => {
  
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
  var player = players[user];

  // Draw Agar
  for (i in agar) {
    drawAgar(agar[i][0] - player[0], agar[i][1] - player[1], AGAR_SIZE)
  }
  
  // Draw player in center
  drawAgar(center_x, center_y, players[user][2], "green")
  drawText(center_x, center_y, myUsername)

  // Draw others
  for (p in players) {
    if (p != user) {
      drawAgar(players[p][0] - player[0], players[p][1] - player[1], players[p][2])
    }
  }
    // draw viruses (TODO)
  }

resizeCanvas();
window.addEventListener('resize', resizeCanvas)