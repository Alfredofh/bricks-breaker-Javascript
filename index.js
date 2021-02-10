var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
//to move

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
//ladrillos 
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var lives = 2;
//Contador
var score = 0;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Mover con ratón 
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

//Pintar ladrillos 
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//Mover con flechas <- ->
function keyDownHandler(e) {
    if (e.keyCode == 39) {

        rightPressed = true;

    }
    else if (e.keyCode == 37) {

        leftPressed = true;

    }

}

function keyUpHandler(e) {

    if (e.keyCode == 39) {

        rightPressed = false;
    }
    else if (e.keyCode == 37) {

        leftPressed = false;

    }
}
//Dibujar bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillstyle = "##21b880";
    ctx.fillStroke = "##21b880";
    ctx.Stroke = "10"
    ctx.fill();
    ctx.closePath();
}

//Dibujar pala
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillstyle = "#21b880";
    ctx.fill();
    ctx.closePath();
}

//Dibujar bloques
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#21b880";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//detectar colisiones
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        Swal.fire({
                            title: '',
                            text: '',
                            imageUrl: 'https://lh3.googleusercontent.com/proxy/zqYSr3n7q_QnirGJ2_7a_5wbnbXxU1vD-XoY8364-fuL1TpEsGAnN6qeBMFHiGxX35N5MTsYG-akQR-8JqQtM-fAzSBWYiMa',
                            imageWidth: 800,
                            imageHeight: 300,
                            imageAlt: '',
                        })
                        victoria()
                        Document.location.reload();
                    }
                }
            }
        }
    }
}

//Dibujar puntuación
function drawScore() {
    ctx.font = "16px monospace ";
    ctx.fillStyle = "#21b880";
    ctx.fillText("Score:" + score, 8, 20);
}

//Dibujar vidas
function drawLives() {
    ctx.font = "16px monospace";
    ctx.fillStyle = "#21b880";
    ctx.fillText("Lives:" + lives, canvas.width - 75, 20);
}

//Dibujar canvas y llamar a las funciones 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        }
        else {
            lives--;
            if (!lives) {
                Swal.fire({
                    title: '',
                    text: '',
                    imageUrl: 'https://m.media-amazon.com/images/I/71yu6yl+X0L._SS500_.jpg',
                    imageWidth: 800,
                    imageHeight: 300,
                    imageAlt: '',
                })
                gameOver()
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {

        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;

    }

    x = x + dx;
    y = y + dy;
    requestAnimationFrame(draw);
}

draw();

