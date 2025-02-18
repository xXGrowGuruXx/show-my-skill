function fixZoom() {
    let zoomFactor = 1 / window.devicePixelRatio;
    document.body.style.transform = `scale(${zoomFactor})`;
    document.body.style.transformOrigin = "top left";
    document.body.style.width = `calc(100% * ${zoomFactor})`;
    document.body.style.height = `calc(100% * ${zoomFactor})`;
}

window.addEventListener("DOMContentLoaded", fixZoom);
window.addEventListener("resize", fixZoom);