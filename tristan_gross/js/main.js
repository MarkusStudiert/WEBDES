const canvas = document.getElementById("tacho");
const ctx = canvas.getContext("2d");
const panel = document.getElementById("info-panel");
const btnRev = document.getElementById("btn-rev");
const btnBrake = document.getElementById("btn-brake");
const btnReset = document.getElementById("btn-reset");

let rpm = 0;
let ZielRpm = 0;

const hotspots =
document.querySelectorAll(".svg-hotspot");

const komponenten = {

motor: {
titel: "Motor",
text:"Der Motor ist mit 218ps bei 14.500 U/min ein geiles Teil\n\n0-100km/h in 3,1s\n999ccm Hubraum\nWasser-/ölgekühlter Vierzylinder-Viertakt-Reihenmotor\n314km/h Höchstgeschwindgikeit"
        
},

auspuff: {
titel: "Auspuff",
text: "Der Akrapovic Auspuff röhrt durch die ganze Frankfurter Innenstadt\n\nAus Titan gefertigt, soll die Motorleistung maximieren und gleichzeitig das Gesamtgewicht reduzieren"
},

bremsen: {
titel: "Bremsen",
text: "Die hochwertigen Doppelscheibenbremsen mit 320mm Durchmesser sichern dich vor jedem Unfall\n\nHinten wurde das Motorrad mit einer Einscheibenbremse mit einem Durchmesser von 220mm ausgetattet"

},

tank: {
titel: "Tank",
text: "Der große Tank umfasst 17,5 nutzbare Liter und verbraucht auf 100km 6,5l\n\nMit dieser Rakete sollte man am besten Super Plus tanken, trotz der aktuellen Spritpreise"

}
}

hotspots.forEach(hotspot => {

  hotspot.addEventListener("click", () => {

    const id = hotspot.dataset.comp;

    const info = komponenten[id];

    panel.innerHTML = `
    <div class="info-panel-inner">

    <div class="comp-number">
    KOMPONENTE
    </div>

    <h2 class="comp-title">
    ${info.titel}
    </h2>

    <p class="comp-desc">
    ${info.text}
    </p>

    </div>
    `;

  });

});

btnRev.addEventListener("click", () => {
ZielRpm = Math.min(ZielRpm + 2500, 14500);
});

btnBrake.addEventListener("click", () => {
ZielRpm = Math.max(ZielRpm - 2500, 0);
})

btnReset.addEventListener("click", () => {
ZielRpm = 0;
});

function animate() {

rpm += (ZielRpm - rpm) * 0.08;

zeichneTacho();

requestAnimationFrame(animate);
}

function zeichneTacho() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hintergrundkreis
    ctx.beginPath();
    ctx.arc(190, 190, 150, 0, Math.PI * 2);
    ctx.fillStyle = "#111";
    ctx.fill();

    // RPM Text
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(rpm) + " U/min", 190, 200);

    // Zeiger
    let winkel = (rpm / 15000) * Math.PI * 1.5 + Math.PI * 0.75;

    ctx.beginPath();
    ctx.moveTo(190, 190);
    ctx.lineTo(
        190 + Math.cos(winkel) * 120,
        190 + Math.sin(winkel) * 120
    );

    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    ctx.stroke();
};

animate();