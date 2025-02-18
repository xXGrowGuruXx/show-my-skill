const numColumns = 110; 
const maxCharsPerColumn = 7; 
const delay = 100; 
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const columns = [];

///////////////     Layout Fixen  ////////////////////
function fixZoom() {
    let zoomFactor = 1 / window.devicePixelRatio;

    if ("zoom" in document.body.style) {
        document.body.style.zoom = zoomFactor; // Für Chrome & Co.
    } else {
        document.body.style.transform = `scale(${zoomFactor})`;
        document.body.style.transformOrigin = "top left";
        document.documentElement.style.overflow = "hidden";
    }
}

/////////////   Background   ///////////////////////
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; // Ganze Seitenhöhe nehmen
    initColumns();
}

// Funktion, um zufällige Zeichen zu erzeugen
function spawnChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Initialisierung der Spalten
function initColumns() {
    columns.length = 0; 
    for (let i = 0; i < numColumns; i++) {
        columns.push({
            chars: [],
            x: i * 15,  
            y: Math.random() * canvas.height 
        });
    }
}

// Spalten aktualisieren: Zeichen fallen lassen
function updateColumns() {
    for (let col of columns) {
        col.chars.unshift(spawnChar());
        if (col.chars.length > maxCharsPerColumn) {
            col.chars.pop();
        }
    }
    draw();
}

// Die Spalten und deren Zeichen zeichnen
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = "#00FF00"; 

    for (let col of columns) {
        for (let j = 0; j < col.chars.length; j++) {
            ctx.fillText(col.chars[j], col.x, col.y + j * 20);
        }
        col.y += 20;
        if (col.y > canvas.height) col.y = -20;
    }
}

window.addEventListener("DOMContentLoaded", fixZoom);
window.addEventListener("resize", () => {
    fixZoom();
    resizeCanvas();
});
window.addEventListener("load", () => {
    fixZoom();
    resizeCanvas();
    setInterval(updateColumns, delay);
});