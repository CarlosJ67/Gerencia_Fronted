<template>
  <div class="error-page">
    <!-- Juego -->
    <div class="game-container">
      <!-- Mensaje de error dentro del contenedor del juego -->
      <div class="error-message">
        <span class="error-icon">🚫</span> <!-- Ícono de prohibición -->
        <h1>403 - Lo sentimos, no eres parte del equipo de gerencia.</h1>
        <p>No te preocupes, mientras esperas a ser gerente, ¡puedes jugar este divertido juego!</p>
      </div>

      <div id="score">Puntos: 0</div>
      <div id="controls">
        <h2>Controles del Juego</h2>
        <p><strong>Movimiento:</strong></p>
        <ul>
          <li><strong>W</strong> - Mover arriba</li>
          <li><strong>S</strong> - Mover abajo</li>
          <li><strong>A</strong> - Mover izquierda</li>
          <li><strong>D</strong> - Mover derecha</li>
        </ul>
      </div>
      <div id="highscore">Puntaje más alto: 0</div>
      <canvas id="canvas"></canvas>
      <div id="gameOverModal" class="modal">
        <h2>¡Perdiste!</h2>
        <p id="finalScore"></p>
        <button id="restart-btn">Volver a jugar</button>
        <button id="back-home">Regresar al inicio</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameError',
  mounted() {
    // Importar imágenes desde assets
    const playerImage = require('@/assets/images/astronauta.png');
    const mercurioImage = require('@/assets/images/mercurio.png');
    const venusImage = require('@/assets/images/venus.png');
    const cometaImage = require('@/assets/images/cometa.png');

    // Importar música desde assets
    const backgroundMusic = new Audio(require('@/assets/music/Noche.mp3'));

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const modal = document.getElementById("gameOverModal");
    const finalScore = document.getElementById("finalScore");
    const restartBtn = document.getElementById("restart-btn");
    const backHomeBtn = document.getElementById("back-home");
    let gameLoopId;
    let gameRunning = true;

    // Función para ajustar el tamaño del canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Jugador
    const player = new Image();
    player.src = playerImage; // Usar la imagen importada
    let x = 100, y = 500;
    const playerWidth = 80, playerHeight = 90;
    let keyState = {};
    let score = 0;
    let highScore = localStorage.getItem("highScore") || 0;
    let rotationAngle = 0;
    document.getElementById("highscore").textContent = `Puntaje más alto: ${highScore}`;

    // Obstáculos
    const obstacleImages = {
      mercurio: mercurioImage, // Usar la imagen importada
      venus: venusImage,       // Usar la imagen importada
      cometa: cometaImage,     // Usar la imagen importada
    };
    let obstacles = [];

    function resetObstacles() {
      obstacles = Array.from({ length: 10 }, () => ({
        x: Math.random() * 1500 + 500,
        y: Math.random() * 800,
        size: Math.random() * 50 + 30,
        speed: Math.random() * 2 + 1,
        type: Object.keys(obstacleImages)[Math.floor(Math.random() * 3)],
        img: new Image(),
      }));
      obstacles.forEach(obstacle => obstacle.img.src = obstacleImages[obstacle.type]);
    }
    resetObstacles();

    // Controles
    document.addEventListener("keydown", (e) => keyState[e.key] = true);
    document.addEventListener("keyup", (e) => keyState[e.key] = false);

    function drawObstacle(obstacle) {
      ctx.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.size * 2, obstacle.size * 2);
    }

    function updateScore() {
      score++;
      document.getElementById("score").textContent = `Puntos: ${score}`;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highscore").textContent = `Puntaje más alto: ${highScore}`;
      }
    }

    function handleCollision(obstacle) {
      return !(y + playerHeight < obstacle.y || y > obstacle.y + obstacle.size * 2 ||
               x + playerWidth < obstacle.x || x > obstacle.x + obstacle.size * 2);
    }

    function endGame() {
      gameRunning = false;
      cancelAnimationFrame(gameLoopId);
      finalScore.textContent = `Tu puntaje final fue: ${score}`;
      modal.style.display = "block";
      backgroundMusic.pause();
    }

    function restartGame() {
      modal.style.display = "none";
      x = 100;
      y = 500;
      score = 0;
      rotationAngle = 0;
      document.getElementById("score").textContent = `Puntos: 0`;
      resetObstacles();
      gameRunning = true;
      backgroundMusic.currentTime = 0;
      backgroundMusic.play();
      gameLoop();
    }

    function gameLoop() {
      if (!gameRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Movimiento del jugador
      if (keyState["w"] && y > 0) y -= 5;
      if (keyState["s"] && y < canvas.height - playerHeight) y += 5;
      if (keyState["a"] && x > 0) x -= 5;
      if (keyState["d"] && x < canvas.width - playerWidth) x += 5;

      // Dibujar y rotar jugador
      ctx.save();
      ctx.translate(x + playerWidth / 2, y + playerHeight / 2);
      ctx.rotate(rotationAngle);
      ctx.drawImage(player, -playerWidth / 2, -playerHeight / 2, playerWidth, playerHeight);
      ctx.restore();
      rotationAngle += 0.05;

      // Dibujar y actualizar obstáculos
      obstacles.forEach(obstacle => {
        obstacle.x -= obstacle.speed;
        if (obstacle.x + obstacle.size < 0) {
          obstacle.x = canvas.width + Math.random() * 500;
          obstacle.y = Math.random() * (canvas.height - obstacle.size);
          updateScore();
        }
        drawObstacle(obstacle);
        if (handleCollision(obstacle)) endGame();
      });

      gameLoopId = requestAnimationFrame(gameLoop);
    }

    player.onload = gameLoop;

    // Configurar música de fondo
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();

    backHomeBtn.addEventListener("click", () => {
  backgroundMusic.pause();
  this.$router.push('/inicio'); // ✅ Redirige correctamente
});

    restartBtn.addEventListener("click", restartGame);
  },
};
</script>

<style scoped>
.error-page {
  text-align: center;
  background-color: black;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.game-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.error-message {
  position: absolute;
  font-size: 14px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  padding: 14px;
  border-radius: 10px;
  border: 2px solid cyan;
  text-align: center;
}

.error-icon {
  font-size: 25px;
  display: block;
  margin-bottom: 10px;
}

canvas {
  width: 100%;
  height: 100%;
  background-color: rgba(9, 9, 26, 0.938);
}

#score, #highscore {
  position: absolute;
  color: cyan;
  font-size: 24px;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 8px cyan;
  padding: 10px;
  border: 2px solid cyan;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}

#score { top: 60px; left: 10px; }
#highscore { top: 60px; right: 10px; }

.modal {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(10, 10, 30, 0.95);
  padding: 20px;
  text-align: center;
  border: 2px solid rgb(255, 0, 221);
  box-shadow: 0 0 20px rgb(215, 43, 221);
  border-radius: 15px;
  color: white;
  font-family: Arial, sans-serif;
}

.modal button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: white;
  background: rgb(212, 0, 255);
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(255, 0, 64);
}

#controls {
  position: fixed;
  top: 120px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: rgb(0, 255, 242);
  padding: 15px;
  font-family: Arial, sans-serif;
  font-size: 18px;
  border: 2px solid rgb(0, 247, 255);
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 0 10px rgb(29, 231, 231);
}

#controls h2 {
  margin: 0;
  font-size: 24px;
  text-shadow: 0 0 8px rgb(0, 238, 255);
}

#controls ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

#controls ul li {
  margin-bottom: 8px;
}
</style>