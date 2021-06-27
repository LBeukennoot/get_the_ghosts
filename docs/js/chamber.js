import { Ghost } from "./ghost.js";
import { Player } from "./player.js";
export class Chamber {
    constructor() {
        this.ghosts = [];
        this.points = 0;
        console.log('Created chamber!');
        document.body.innerHTML = "";
        let container = document.createElement('div');
        container.classList.add('card');
        this.chamber = document.createElement('chamber');
        container.appendChild(this.chamber);
        document.body.appendChild(container);
        this.player = new Player(this.chamber);
        this.createGhosts(1);
        this.timer = document.createElement('timer');
        this.timer.innerText = '0s';
        this.chamber.appendChild(this.timer);
    }
    createGhosts(amount) {
        for (let i = 0; i < Math.floor(amount); i++) {
            this.ghosts.push(new Ghost(this.chamber));
        }
        this.points += Math.floor(amount);
    }
    getPoints() {
        return this.points;
    }
    update(time) {
        this.player.update();
        if (this.player.getX() < 1) {
            this.player.setHorizontalSpeed(-5);
        }
        else if (this.player.getX() > (this.chamber.clientWidth - this.player.getRectangle().width)) {
            this.player.setHorizontalSpeed(5);
        }
        else if (this.player.getY() < 0) {
            this.player.setVerticalSpeed(-5);
        }
        else if (this.player.getY() > (document.body.clientHeight - this.player.getRectangle().height)) {
            this.player.setVerticalSpeed(5);
        }
        for (const ghost of this.ghosts) {
            ghost.update();
            if (this.checkCollision(this.player.getRectangle(), ghost.getRectangle())) {
                ghost.killGhost();
                this.points -= 1;
            }
        }
        this.timer.innerText = `${Math.floor(time)}s`;
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
}
//# sourceMappingURL=chamber.js.map