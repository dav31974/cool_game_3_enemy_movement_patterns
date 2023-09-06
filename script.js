/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

function animate() {
    ctx.fillRect(10, 10, 200, 200);   // methode de canvas (dessine un rectangle)
}
animate();