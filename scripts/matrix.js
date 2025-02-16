const numColumns = 110; // Anzahl der Spalten
const maxCharsPerColumn = 7; // Max. 7 Zeichen pro Spalte
const delay = 100; // Millisekunden zwischen den Updates
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const columns = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // Passt sich der gesamten Seite an
    initColumns(); // Spalten nach dem Resize neu initialisieren
}

// Funktion, um zufällige Zeichen zu erzeugen
function spawnChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Initialisierung der Spalten
function initColumns() {
    columns.length = 0; // Spalten zurücksetzen
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
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Leichter Schatten für den Matrix-Effekt
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px monospace";
    ctx.fillStyle = "#00FF00"; // Grüne Schriftfarbe

    for (let col of columns) {
        for (let j = 0; j < col.chars.length; j++) {
            ctx.fillText(col.chars[j], col.x, col.y + j * 20);
        }
        col.y += 20;
        if (col.y > canvas.height) col.y = -20;
    }
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", () => {
    resizeCanvas();
    setInterval(updateColumns, delay);
});