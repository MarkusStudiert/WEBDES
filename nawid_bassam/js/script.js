/*
   Canvas-2D Animation
   Projekt: Nawids Duft- und Autowelt
   Idee: Auto mit bewegender Duftwolke
*/

/*
   document.addEventListener wartet darauf, dass die HTML-Seite fertig geladen ist.
   Erst danach wird der JavaScript-Code ausgeführt.
*/
document.addEventListener("DOMContentLoaded", function () {

    /*
       getElementById sucht im HTML nach dem Element mit der ID "duftCanvas".
       In der index.html ist das:
       <canvas id="duftCanvas" width="700" height="350">
    */
    var canvas = document.getElementById("duftCanvas");

    /*
       Sicherheitsprüfung:
       Wenn kein Canvas gefunden wird oder der Browser Canvas nicht unterstützt,
       wird der Code mit return beendet.
    */
    if (!canvas || !canvas.getContext) {
        return;
    }

    /*
       getContext("2d") aktiviert den 2D-Zeichenbereich des Canvas.
       ctx ist danach unser Zeichenwerkzeug.
       Über ctx zeichnen wir Rechtecke, Kreise, Linien und Texte.
    */
    var ctx = canvas.getContext("2d");

    /*
       wolkenPosition speichert die aktuelle Position der Duftwolke.
       Der Wert wird später immer erhöht, damit sich die Wolke bewegt.
    */
    var wolkenPosition = 0;

    /*
       function erstellt eine eigene Funktion.
       Diese Funktion zeichnet den Hintergrund, die Straße und die Fahrbahnlinie.
    */
    function zeichneHintergrund() {

        /*
           createLinearGradient erstellt einen Farbverlauf.
           Die Zahlen bestimmen Start- und Endpunkt des Verlaufs:
           von oben links bis unten rechts.
        */
        var verlauf = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

        /*
           addColorStop legt die Farben des Verlaufs fest.
           0 bedeutet Anfang, 1 bedeutet Ende.
        */
        verlauf.addColorStop(0, "#111111");
        verlauf.addColorStop(1, "#2b2b2b");

        /*
           fillStyle bestimmt die aktuelle Füllfarbe.
           Hier wird als Füllung der Verlauf verwendet.
        */
        ctx.fillStyle = verlauf;

        /*
           fillRect zeichnet ein gefülltes Rechteck.
           Parameter: x, y, Breite, Höhe.
           Hier wird der komplette Canvas gefüllt.
        */
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Straße */
        ctx.fillStyle = "#080808";
        ctx.fillRect(0, 240, canvas.width, 90);

        /* Goldene Fahrbahnlinie */
        ctx.fillStyle = "#c9a24d";
        ctx.fillRect(0, 280, canvas.width, 4);
    }

    /*
       Diese Funktion zeichnet das Auto.
       Das Auto besteht aus einfachen Canvas-Formen:
       Rechtecken, Linien, Pfaden und Kreisen.
    */
    function zeichneAuto() {

        /*
           Karosserie oben:
           beginPath startet eine neue Form.
        */
        ctx.fillStyle = "#b80000";
        ctx.beginPath();

        /*
           moveTo setzt den Startpunkt der Form.
           lineTo zeichnet Linien zu weiteren Punkten.
        */
        ctx.moveTo(170, 220);
        ctx.lineTo(230, 165);
        ctx.lineTo(410, 165);
        ctx.lineTo(500, 220);

        /*
           closePath schließt die Form.
           fill füllt die Form mit der aktuellen fillStyle-Farbe.
        */
        ctx.closePath();
        ctx.fill();

        /*
           Unterer Teil der Karosserie als Rechteck.
        */
        ctx.fillStyle = "#e00000";
        ctx.fillRect(130, 210, 420, 45);

        /*
           Fenster des Autos.
        */
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

        /*
           Scheinwerfer als kleines gelbes Rechteck.
        */
        ctx.fillStyle = "#f5d76e";
        ctx.fillRect(520, 220, 22, 10);

        /*
           Räder:
           arc zeichnet einen Kreis.
           Parameter: x, y, Radius, Startwinkel, Endwinkel.
           Math.PI * 2 bedeutet vollständiger Kreis.
        */
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(220, 260, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(460, 260, 35, 0, Math.PI * 2);
        ctx.fill();

        /*
           Felgen als kleinere graue Kreise.
        */
        ctx.fillStyle = "#777777";
        ctx.beginPath();
        ctx.arc(220, 260, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(460, 260, 16, 0, Math.PI * 2);
        ctx.fill();
    }

    /*
       Diese Funktion zeichnet die bewegte Duftwolke.
    */
    function zeichneDuftwolke() {

        /*
           save speichert den aktuellen Zeichenstatus.
           Das ist wichtig, weil wir gleich Transparenz ändern.
        */
        ctx.save();

        /*
           globalAlpha bestimmt die Transparenz.
           1 wäre komplett sichtbar, 0 wäre unsichtbar.
        */
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = "#f3efe7";

        /*
           for-Schleife:
           Wiederholt den Code 8-mal, um mehrere Duftwolken-Kreise zu zeichnen.
        */
        for (var i = 0; i < 8; i++) {

            /*
               x berechnet die horizontale Position des Kreises.
               wolkenPosition sorgt dafür, dass sich die Kreise bewegen.
               % sorgt dafür, dass die Wolke nach rechts wieder vorne beginnt.
            */
            var x = 80 + ((wolkenPosition + i * 70) % 620);

            /*
               y berechnet die vertikale Position.
               Math.sin erzeugt eine leichte Wellenbewegung.
            */
            var y = 105 + Math.sin((wolkenPosition + i * 20) / 35) * 18;

            /*
               radius verändert die Kreisgröße leicht.
               Dadurch sehen die Wolken nicht alle gleich aus.
            */
            var radius = 22 + (i % 3) * 8;

            /*
               Kreis für die Duftwolke zeichnen.
            */
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        /*
           Goldene geschwungene Duftlinie.
        */
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = "#c9a24d";
        ctx.lineWidth = 3;

        /*
           beginPath startet die Linie.
           moveTo setzt den Startpunkt.
           bezierCurveTo zeichnet eine geschwungene Kurve.
           stroke zeichnet nur die Linie, nicht die Fläche.
        */
        ctx.beginPath();
        ctx.moveTo(80, 120);
        ctx.bezierCurveTo(180, 60, 300, 170, 420, 95);
        ctx.bezierCurveTo(500, 50, 580, 110, 640, 75);
        ctx.stroke();

        /*
           restore stellt den vorher gespeicherten Zeichenstatus wieder her.
           Dadurch bleibt die Transparenz nicht für andere Elemente aktiv.
        */
        ctx.restore();
    }

    /*
       Diese Funktion zeichnet einen kleinen Parfumflakon links.
    */
    function zeichneParfumflakon() {

        /*
           Hauptkörper des Flakons als goldenes Rechteck.
        */
        ctx.fillStyle = "#c9a24d";
        ctx.fillRect(45, 155, 45, 70);

        /*
           Sprühkopf / Deckel des Flakons.
        */
        ctx.fillStyle = "#f3efe7";
        ctx.fillRect(55, 140, 25, 15);

        /*
           Text auf dem Flakon.
           font legt Schriftgröße und Schriftart fest.
           fillText schreibt Text in das Canvas.
        */
        ctx.fillStyle = "#000000";
        ctx.font = "12px Arial";
        ctx.fillText("DUFT", 52, 195);
    }

    /*
       Diese Funktion ist die Hauptfunktion der Animation.
       Sie wird immer wieder neu aufgerufen.
    */
    function animieren() {

        /*
           clearRect löscht den kompletten Canvas.
           Ohne diese Zeile würden alte Zeichnungen stehen bleiben.
        */
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /*
           Danach wird die Szene jedes Mal neu gezeichnet.
           Die Reihenfolge ist wichtig:
           erst Hintergrund, dann Wolke, Flakon und Auto.
        */
        zeichneHintergrund();
        zeichneDuftwolke();
        zeichneParfumflakon();
        zeichneAuto();

        /*
           Die Position der Wolke wird erhöht.
           Dadurch verschiebt sie sich bei jedem neuen Frame.
        */
        wolkenPosition = wolkenPosition + 1.2;

        /*
           requestAnimationFrame ruft die Funktion animieren erneut auf.
           Dadurch entsteht eine flüssige Animation.
        */
        requestAnimationFrame(animieren);
    }

    /*
       Startet die Animation zum ersten Mal.
       Danach läuft sie durch requestAnimationFrame weiter.
    */
    animieren();
});