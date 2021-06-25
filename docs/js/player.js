import { GameObject } from "./gameObject.js";
export class Player extends GameObject {
    constructor(chamber) {
        super(chamber);
        this.verticalSpeed = 0;
        this.horizontalSpeed = 0;
        console.log('Created player!');
        this.x = 321;
        this.y = 310;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.object = document.createElement('player');
        this.object.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.div.appendChild(this.object);
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setHorizontalSpeed(speed) {
        this.x -= speed;
    }
    setVerticalSpeed(speed) {
        this.y -= speed;
    }
    getRectangleWidth() {
        return this.object.clientWidth;
    }
    getRectangleHeight() {
        return this.object.clientHeight;
    }
    update() {
        this.y += this.verticalSpeed;
        this.x += this.horizontalSpeed;
        super.update();
    }
    onKeyDown(e) {
        switch (e.key) {
            case "ArrowUp":
            case "w":
                this.verticalSpeed = -5;
                break;
            case "ArrowDown":
            case "s":
                this.verticalSpeed = 5;
                break;
            case "ArrowLeft":
            case "a":
                this.horizontalSpeed = -5;
                break;
            case "ArrowRight":
            case "d":
                this.horizontalSpeed = 5;
                break;
            case " ":
                console.log('space');
        }
    }
    onKeyUp(e) {
        if (e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
            this.verticalSpeed = 0;
            this.horizontalSpeed = 0;
        }
    }
}
//# sourceMappingURL=player.js.map