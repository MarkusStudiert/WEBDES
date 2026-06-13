"use strict";

const canvas = document.getElementById("schachCanvas");
const ctx = canvas.getContext("2d");

const feldGroesse = canvas.width / 8;

let turmBild = new Image();
turmBild.src = "assets/svg/turm.svg";

let turmX = feldGroesse;
let turmY = feldGroesse * 3;
let geschwindigkeit = 2;

function zeichneSchachbrett() {
    for (let zeile = 0; zeile < 8; zeile++) {
        for (let spalte = 0; spalte < 8; spalte++) {

            if ((zeile + spalte) % 2 === 0) {
                ctx.fillStyle = "#f3efe7";
            } else {
                ctx.fillStyle = "#1f1813";
            }

            ctx.fillRect(
                spalte * feldGroesse,
                zeile * feldGroesse,
                feldGroesse,
                feldGroesse
            );
        }
    }
}

function zeichneTurm() {
    const turmBreite = 50;
    const turmHoehe = 60;

    ctx.drawImage(
        turmBild,
        turmX,
        turmY,
        turmBreite,
        turmHoehe
    );
}

function bewegeTurm() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    zeichneSchachbrett();
    zeichneTurm();

    turmX = turmX + geschwindigkeit;

    if (turmX > canvas.width - feldGroesse) {
        geschwindigkeit = -geschwindigkeit;
    }

    if (turmX < 0) {
        geschwindigkeit = -geschwindigkeit;
    }

    requestAnimationFrame(bewegeTurm);
}

turmBild.onload = function() {
    bewegeTurm();
};