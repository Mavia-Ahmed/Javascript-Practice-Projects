const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        let basket = { x: 175, y: 450, width: 50, height: 10 };
        let ball = { x: Math.random() * 380, y: 0, radius: 10, dy: 2 };
        let score = 0;
        let highScore = localStorage.getItem("highScore") || 0;
        let difficulty = 'easy';
        let gameOver = false;
        document.getElementById("highScore").innerText = "High Score: " + highScore;
        document.addEventListener("keydown", moveBasket);

        function setDifficulty(level) {
            difficulty = level;
            if (level === 'easy') {
                ball.dy = 2;
            } else if (level === 'medium') {
                ball.dy = 4;
            } else if (level === 'hard') {
                ball.dy = 6;
            }
        }

        function moveBasket(event) {
            if (event.key === "ArrowLeft" && basket.x > 0) {
                basket.x -= 20;
            } else if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) {
                basket.x += 20;
            }
        }

        function drawBasket() {
            ctx.fillStyle = "brown";
            ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }

        function updateBall() {
            if (gameOver) return;
            ball.y += ball.dy;
            if (ball.y + ball.radius >= basket.y && ball.x >= basket.x && ball.x <= basket.x + basket.width) {
                score++;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem("highScore", highScore);
                    document.getElementById("highScore").innerText = "High Score: " + highScore;
                }
                resetBall();
            } else if (ball.y > canvas.height) {
                endGame();
            }
        }

        function resetBall() {
            ball.x = Math.random() * 380;
            ball.y = 0;
        }

        function drawScore() {
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 30);
        }

        function endGame() {
            gameOver = true;
            document.getElementById("gameOverScreen").style.display = "block";
        }

        function restartGame() {
            gameOver = false;
            score = 0;
            document.getElementById("gameOverScreen").style.display = "none";
            resetBall();
            gameLoop();
        }

        function gameLoop() {
            if (gameOver) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBasket();
            drawBall();
            updateBall();
            drawScore();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();