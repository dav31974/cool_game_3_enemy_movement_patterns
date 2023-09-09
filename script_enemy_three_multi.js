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
        this.image.src = "enemies/enemy3.png";
        this.speed = Math.random() * 2 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;  //  tools for animate sprite (position x de l'image source)
        this.flapSpeed = Math.floor(Math.random() * 8 + 1);  // regler la vitesse en changeant le multiplicateur
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.9;  // vitesse mouvement horizontale ou (circulaire si ligne30 decommentée - passer le multiplicateur de 0.9 à 2 + 0.5)
        this.curve = Math.random() * 200;
    }
    // pour plus de variante - voir 2:05
    update() {
        this.x = this.curve * Math.sin(this.angle * Math.PI / 180) + (canvas.width / 2 - this.width / 2);
        // this.y = this.curve * Math.cos(this.angle * Math.PI / 180) + (canvas.height / 2 - this.height / 2);    Animation circulaire (decommenter pour activer- jouer avec / 180 pour animations différentes)
        this.angle += this.angleSpeed;
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