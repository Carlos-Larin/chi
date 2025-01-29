const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

const tileSize = 30;
let cipote = [{ x: 150, y: 150 }];
let pupusa = { x: getRandomPosition(), y: getRandomPosition() };
let direction = "RIGHT";
let score = 0;

const backgroundImg = new Image();
backgroundImg.src = "https://diarioelsalvador.com/wp-content/uploads/2021/07/fnac28072021dgolocuilta055-300x200.png";

const cipoteImg = new Image();
cipoteImg.src = "https://i.pinimg.com/736x/f3/b0/f8/f3b0f8c2bec7bdb996c103ea3fc0c677.jpg";

const pupusaImg = new Image();
pupusaImg.src = "https://i.pinimg.com/736x/32/38/be/3238be6a905bc075c7a6665eb1ca6a3c.jpg";

function getRandomPosition() {
    return Math.floor(Math.random() * (canvasSize / tileSize)) * tileSize;
}

function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvasSize, canvasSize);
}

function drawCipote() {
    cipote.forEach(segment => ctx.drawImage(cipoteImg, segment.x, segment.y, tileSize, tileSize));
}

function drawPupusa() {
    ctx.drawImage(pupusaImg, pupusa.x, pupusa.y, tileSize, tileSize);
}

function updateGame() {
    const head = { ...cipote[0] };

    if (direction === "UP") head.y -= tileSize;
    else if (direction === "DOWN") head.y += tileSize;
    else if (direction === "LEFT") head.x -= tileSize;
    else if (direction === "RIGHT") head.x += tileSize;

    cipote.unshift(head);

    if (head.x === pupusa.x && head.y === pupusa.y) {
        score++;
        pupusa = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        cipote.pop();
    }

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        alert("¡Perdiste! Pupusas recolectadas: " + score);
        document.location.reload();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawBackground(); // Dibuja la imagen de fondo
    drawCipote();
    drawPupusa();
    updateGame();
    setTimeout(gameLoop, 200);
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

gameLoop();
