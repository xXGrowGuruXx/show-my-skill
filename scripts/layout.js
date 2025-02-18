function fixZoom() {
    let zoomFactor = 1 / window.devicePixelRatio;

    if ("zoom" in document.body.style) {
        document.body.style.zoom = zoomFactor; // Für Chrome & Co.
    } else {
        document.body.style.transform = `scale(${zoomFactor})`;
        document.body.style.transformOrigin = "top left";
        document.documentElement.style.overflow = "hidden"; // Fix für Scrollprobleme
    }
}

window.addEventListener("DOMContentLoaded", fixZoom);
window.addEventListener("resize", fixZoom);