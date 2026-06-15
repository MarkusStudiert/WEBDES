var canvas = document.getElementById("tetris-background");
var ctx = canvas.getContext("2d");

var blockSize = 24;
var pieces = [];

var colors = [
    "#8b5cf6",
    "#2563eb",
    "#22c55e",
    "#facc15",
    "#ef4444",
    "#06b6d4"
];

var shapes = [
    [[1, 1, 1], [0, 1, 0]],      // T-Block
    [[1, 1], [1, 1]],            // O-Block
    [[1, 1, 1, 1]],              // I-Block
    [[1, 0, 0], [1, 1, 1]],      // J-Block
    [[0, 0, 1], [1, 1, 1]],      // L-Block
    [[0, 1, 1], [1, 1, 0]],      // S-Block
    [[1, 1, 0], [0, 1, 1]]       // Z-Block
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createPiece() {
    var shape = shapes[Math.floor(Math.random() * shapes.length)];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var pieceWidth = shape[0].length * blockSize;

    pieces.push({
        x: Math.random() * (canvas.width - pieceWidth),
        y: -100,
        speed: 1 + Math.random() * 2,
        shape: shape,
        color: color
    });
}

function drawPiece(piece) {
    ctx.fillStyle = piece.color;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;

    for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[row].length; col++) {
            if (piece.shape[row][col] === 1) {
                var x = piece.x + col * blockSize;
                var y = piece.y + row * blockSize;

                ctx.fillRect(x, y, blockSize, blockSize);
                ctx.strokeRect(x, y, blockSize, blockSize);
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) {
        createPiece();
    }

    for (var i = 0; i < pieces.length; i++) {
        pieces[i].y = pieces[i].y + pieces[i].speed;
        drawPiece(pieces[i]);
    }

    pieces = pieces.filter(function (piece) {
        return piece.y < canvas.height + 100;
    });

    requestAnimationFrame(animate);
}

resizeCanvas();
animate();

window.addEventListener("resize", resizeCanvas);