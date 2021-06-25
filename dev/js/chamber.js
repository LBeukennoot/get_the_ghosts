import { Ghost } from "./ghost.js";
import { Player } from "./player.js";
export class Chamber {
    constructor(div, level) {
        this.ghost = [];
        this.hits = 0;
        console.log('Created chamber!');
        this.level = level;
        this.chamber = document.createElement('chamber');
        div.appendChild(this.chamber);
        this.chamberHitbox = document.createElement('div');
        this.chamberHitbox.classList.add('chamber-hitbox');
        this.chamber.appendChild(this.chamberHitbox);
        this.player = new Player(this.chamber);
        for (let i = 0; i < (this.level / 2); i++) {
            this.ghost.push(new Ghost(this.chamberHitbox));
        }
    }
    removeChamber() {
        this.chamber.remove();
    }
    getHits() {
        return this.hits;
    }
    getGhosts() {
        return this.ghost.length;
    }
    update() {
        this.player.update();
        for (const ghost of this.ghost) {
            ghost.update();
            if (this.checkCollision(this.player.getRectangle(), ghost.getRectangle())) {
                ghost.killGhost();
                this.hits++;
            }
        }
        if (this.player.getX() < 141) {
            this.player.setHorizontalSpeed(-5);
        }
        else if (this.player.getX() > this.chamberHitbox.clientWidth + 141 - this.player.getRectangleWidth()) {
            this.player.setHorizontalSpeed(5);
        }
        if (this.player.getY() < 80) {
            this.player.setVerticalSpeed(-5);
        }
        else if (this.player.getY() > this.chamberHitbox.clientHeight - 50 + this.player.getRectangleHeight()) {
            this.player.setVerticalSpeed(5);
        }
    }
    checkCollision(a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    }
}
//# sourceMappingURL=chamber.js.map