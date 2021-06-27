import { GameObject } from "./gameObject.js";
export class Ghost extends GameObject {
    constructor(chamber) {
        super(chamber);
        this.speed = 1;
        this.killed = false;
        console.log('Created ghost!');
        this.object = document.createElement('ghost');
        this.div.appendChild(this.object);
        this.randomizer();
        this.object.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    randomizer() {
        let random = 0;
        this.speed = 0;
        random = Math.round(Math.random() * 100);
        this.speed = Math.random() * 11;
        switch (true) {
            case (random >= 0 && random <= 24):
                this.movement = "up";
                this.y = this.div.clientHeight;
                this.x = Math.random() * 437;
                break;
            case (random >= 25 && random <= 49):
                this.movement = "down";
                this.y = 0;
                this.x = Math.random() * 437;
                break;
            case (random >= 50 && random <= 74):
                this.movement = "left";
                this.x = this.div.clientWidth;
                this.y = Math.random() * 437;
                break;
            case (random >= 75 && random <= 100):
                this.movement = "right";
                this.x = 0;
                this.y = Math.random() * 437;
                break;
        }
    }
    update() {
        switch (this.movement) {
            case "up":
                this.y -= this.speed;
                break;
            case "down":
                this.y += this.speed;
                break;
            case "left":
                this.x -= this.speed;
                break;
            case "right":
                this.x += this.speed;
                break;
        }
        super.update();
        if (this.x > 720 || this.y > 720 || this.x < 0 || this.y < 0) {
            this.randomizer();
        }
    }
    killGhost() {
        this.swoosh = new Audio('images/swoosh.mp3');
        this.swoosh.volume = 0.3;
        this.swoosh.playbackRate = 0.9;
        this.swoosh.play();
        this.killed = true;
        this.object.remove();
    }
}
//# sourceMappingURL=ghost.js.map