const numColumns = 110; // Anzahl der Spalten
const maxCharsPerColumn = 7; // Max. 7 Zeichen pro Spalte
const delay = 100; // Millisekunden zwischen den Updates
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const columns = [];

// Größe des Canvas anpassen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Funktion, um zufällige Zeichen zu erzeugen
function spawnChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Initialisierung der Spalten
function init() {
    for (let i = 0; i < numColumns; i++) {
        columns[i] = {
            chars: [],
            x: i * 15,  // Abstand zwischen den Spalten
            y: Math.random() * canvas.height // Zufällige Startposition in Y-Richtung
        };
    }
    // Alle 100ms die Spalten aktualisieren
    setInterval(updateColumns, delay);
}

// Spalten aktualisieren: Zeichen fallen lassen
function updateColumns() {
    for (let i = 0; i < numColumns; i++) {
        // Neues Zeichen oben hinzufügen
        columns[i].chars.unshift(spawnChar());

        // Wenn die Spalte mehr als maxCharsPerColumn hat, entfernen wir das unterste Zeichen
        if (columns[i].chars.length > maxCharsPerColumn) {
            columns[i].chars.pop();
        }
    }

    // Hintergrund mit dem Zeichenoutput füllen
    draw();
}

// Die Spalten und deren Zeichen zeichnen
function draw() {
    // Canvas leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichnen der Spalten
    for (let i = 0; i < numColumns; i++) {
        for (let j = 0; j < columns[i].chars.length; j++) {
            const char = columns[i].chars[j];
            ctx.fillText(char, columns[i].x, columns[i].y + j * 20); // Zeichen an der richtigen Position
        }

        // Die Spalten in Y-Richtung "fallen" lassen
        columns[i].y += 20;
        if (columns[i].y > canvas.height) {
            columns[i].y = -20;  // Wenn die Spalte unten angekommen ist, nach oben zurücksetzen
        }
    }
}

// Zeichnen der Schriftarten
ctx.font = '20px monospace';
ctx.fillStyle = '#00FF00';  // grüne Schriftfarbe für den Matrix-Look

// Die Animation starten
init();