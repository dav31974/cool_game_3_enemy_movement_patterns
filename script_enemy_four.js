/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 10;
const enemiesArray = [];

let gameFrame = 1; // variable utilisé pour la frequence de l'animation de l'ennemie dans la methode draw de l'objet Enemy

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "enemies/enemy4.png";
        this.speed = Math.random() * 2 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.newX = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newY = Math.random() * (canvas.height - this.height);
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.frame = 0;  //  tools for animate sprite (position x de l'image source)
        this.interval = Math.floor(Math.random() * 200 + 50);

    }
    // pour plus de variante - voir 2:05
    update() {
        if (gameFrame % this.interval == 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx / 50;  // modificateur anim
        this.y -= dy / 50;   // modificateur anim

        if (this.x + this.width < 0) this.x = canvas.width;
        // animate sprites (la condition sert à ralentir la frequence de l'animation)
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame += 1;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);   // supprime le contenu précédemment dessiné
    enemiesArray.forEach(function (enemy) {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);  // raffraichit l'animation
}
animate();