var canvas = document.getElementById("pixelCanvas");
var ctx = canvas.getContext("2d");

var moduleY = -50;
var direction = 1;

function drawNES() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Hintergrund */
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* Spielmodul */
    ctx.fillStyle = "#cfcfcf";
    ctx.fillRect(130, moduleY, 60, 45);
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 3;
    ctx.strokeRect(130, moduleY, 60, 45);

    /* Label auf dem Modul */
    ctx.fillStyle = "#d82424";
    ctx.fillRect(142, moduleY + 10, 36, 14);

    /* Schatten unter der Konsole */
    ctx.fillStyle = "#050505";
    ctx.fillRect(65, 122, 190, 8);

    /* Konsole Hauptkörper */
    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(70, 55, 180, 65);
    ctx.strokeStyle = "#111111";
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 55, 180, 65);

    /* Oberer schwarzer Modulschacht */
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(120, 55, 80, 14);

    /* Rechte schwarze Leiste */
    ctx.fillStyle = "#222222";
    ctx.fillRect(210, 55, 20, 65);

    /* Lüftungsschlitze */
    ctx.fillStyle = "#777777";
    for (var i = 0; i < 8; i++) {
        ctx.fillRect(214, 60 + i * 6, 12, 2);
    }

    /* Vorderer dunkler Bereich */
    ctx.fillStyle = "#2b2b2b";
    ctx.fillRect(85, 82, 110, 25);

    /* Linkes graues Feld */
    ctx.fillStyle = "#9a9a9a";
    ctx.fillRect(92, 88, 55, 13);

    /* Controller-Ports */
    ctx.fillStyle = "#111111";
    ctx.fillRect(88, 110, 30, 8);
    ctx.fillRect(125, 110, 30, 8);

    /* Power / Reset */
    ctx.fillStyle = "#666666";
    ctx.fillRect(78, 110, 8, 8);
    ctx.fillRect(158, 110, 8, 8);

    /* kleiner roter Schriftzug */
    ctx.fillStyle = "#d82424";
    ctx.font = "8px Arial";
    ctx.fillText("Nintendo", 85, 78);

    /* Animation Modul rein / raus */
    moduleY = moduleY + direction * 1.4;

    if (moduleY >= 15) {
        direction = -1;
    }

    if (moduleY <= -50) {
        direction = 1;
    }

    requestAnimationFrame(drawNES);
}

drawNES();