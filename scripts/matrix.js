const maxCharsPerColumn = 7; 
const delay = 100; 
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const columns = [];

///////////////     Layout Fixen  ////////////////////
function fixZoom() {
    let zoomFactor = 1 / window.devicePixelRatio;
    let aspectRatio = window.innerWidth / window.innerHeight;

    if (navigator.userAgent.toLowerCase().includes("firefox")) {
        alert("Diese Seite funktioniert im FireFox Browser nicht ordnungsgemäß!\nBitte verwende Opera, Chrome oder Edge!");
        let adjustedZoom = zoomFactor * (aspectRatio > 1 ? 1 : aspectRatio); 
        document.body.style.zoom = adjustedZoom;
    } else {
        let adjustedZoom = zoomFactor * (aspectRatio > 1 ? 1 : aspectRatio); 
        document.body.style.zoom = adjustedZoom;
    }
}

/////////////   Background   ///////////////////////
function resizeCanvas() {
    let zoomFactor = 1 / window.devicePixelRatio;
    let aspectRatio = window.innerWidth / window.innerHeight;
    let adjustedZoom = zoomFactor * (aspectRatio > 1 ? 1 : aspectRatio);

    // Berechne die sichtbare Breite und Höhe
    let viewportWidth = document.documentElement.clientWidth;
    let viewportHeight = document.documentElement.clientHeight;

    // Berechne die Scrollgrößen
    let scrollWidth = document.documentElement.scrollWidth;
    let scrollHeight = document.documentElement.scrollHeight;

    // Verhindere, dass ein kleiner Strich erscheint, indem du die Breite und Höhe auf volle Pixel aufrundest
    let width = scrollWidth > viewportWidth ? scrollWidth : viewportWidth;
    let height = scrollHeight > viewportHeight ? scrollHeight : viewportHeight;

    if (navigator.userAgent.toLowerCase().includes("firefox")) 
    {
        canvas.width = Math.ceil(width / 1);
        canvas.height = Math.ceil(height / 1);
    }
    else
    {
        // Setze die Canvas-Größe auf gerundete Werte
        canvas.width = Math.ceil(width / adjustedZoom);
        canvas.height = Math.ceil(height / adjustedZoom);
    }
    initColumns();
}

// Funktion, um zufällige Zeichen zu erzeugen
function spawnChar() {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

// Initialisierung der Spalten
function initColumns() {
    const numColumns = Math.floor(canvas.width / 25);
    columns.length = 0; 
    for (let i = 0; i < numColumns; i++) {
        columns.push({
            chars: [],
            x: i * 25,  
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
    ctx.font = "30px monospace";
    ctx.fillStyle = "#00FF00"; 

    for (let col of columns) {
        for (let j = 0; j < col.chars.length; j++) {
            ctx.fillText(col.chars[j], col.x, col.y + j * 30);
        }
        col.y += 30;
        if (col.y > canvas.height) col.y = -30;
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
// Dynamische Erkennung für devicePixelRatio-Änderungen in Firefox
if (window.matchMedia) {
    window.matchMedia("(resolution: 1dppx)").addEventListener("change", fixZoom);
}