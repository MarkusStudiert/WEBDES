/* ==========================================
   Canvas-2D Animation
   Projekt: Nawids Duft- und Autowelt
   Idee: Auto mit bewegender Duftwolke
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("duftCanvas");

    if (!canvas || !canvas.getContext) {
        return;
    }

    var ctx = canvas.getContext("2d");
    var wolkenPosition = 0;

    function zeichneHintergrund() {
        var verlauf = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        verlauf.addColorStop(0, "#111111");
        verlauf.addColorStop(1, "#2b2b2b");

        ctx.fillStyle = verlauf;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Straße */
        ctx.fillStyle = "#080808";
        ctx.fillRect(0, 240, canvas.width, 90);

        /* Goldene Fahrbahnlinie */
        ctx.fillStyle = "#c9a24d";
        ctx.fillRect(0, 280, canvas.width, 4);
    }

    function zeichneAuto() {
        /* Karosserie */
        ctx.fillStyle = "#b80000";
        ctx.beginPath();
        ctx.moveTo(170, 220);
        ctx.lineTo(230, 165);
        ctx.lineTo(410, 165);
        ctx.lineTo(500, 220);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#e00000";
        ctx.fillRect(130, 210, 420, 45);

        /* Fenster */
        ctx.fillStyle = "#1f5f75";
        ctx.beginPath();
        ctx.moveTo(245, 172);
        ctx.lineTo(315, 172);
        ctx.lineTo(305, 205);
        ctx.lineTo(220, 205);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(330, 172);
        ctx.lineTo(400, 172);
        ctx.lineTo(450, 205);
        ctx.lineTo(320, 205);
        ctx.closePath();
        ctx.fill();

        /* Scheinwerfer */
        ctx.fillStyle = "#f5d76e";
        ctx.fillRect(520, 220, 22, 10);

        /* Räder */
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(220, 260, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(460, 260, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#777777";
        ctx.beginPath();
        ctx.arc(220, 260, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(460, 260, 16, 0, Math.PI * 2);
        ctx.fill();
    }

    function zeichneDuftwolke() {
        ctx.save();

        ctx.globalAlpha = 0.75;
        ctx.fillStyle = "#f3efe7";

        for (var i = 0; i < 8; i++) {
            var x = 80 + ((wolkenPosition + i * 70) % 620);
            var y = 105 + Math.sin((wolkenPosition + i * 20) / 35) * 18;
            var radius = 22 + (i % 3) * 8;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = "#c9a24d";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(80, 120);
        ctx.bezierCurveTo(180, 60, 300, 170, 420, 95);
        ctx.bezierCurveTo(500, 50, 580, 110, 640, 75);
        ctx.stroke();

        ctx.restore();
    }

    function zeichneParfumflakon() {
        /* Flakon als kleines Symbol links */
        ctx.fillStyle = "#c9a24d";
        ctx.fillRect(45, 155, 45, 70);

        ctx.fillStyle = "#f3efe7";
        ctx.fillRect(55, 140, 25, 15);

        ctx.fillStyle = "#000000";
        ctx.font = "12px Arial";
        ctx.fillText("DUFT", 52, 195);
    }

    function animieren() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        zeichneHintergrund();
        zeichneDuftwolke();
        zeichneParfumflakon();
        zeichneAuto();

        wolkenPosition = wolkenPosition + 1.2;

        requestAnimationFrame(animieren);
    }

    animieren();
});