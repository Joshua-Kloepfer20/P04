var resizeCanvas = () => {
    c.width = document.body.clientWidth; 
    c.height = document.body.clientHeight; 
}

var drawGame = (players, agar) => {
    ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
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

resizeCanvas();
window.addEventListener('resize', resizeCanvas)