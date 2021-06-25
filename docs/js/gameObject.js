export class GameObject {
    constructor(chamber) {
        this.y = 0;
        this.x = 0;
        this.div = chamber;
        console.log('game object created');
    }
    update() {
        this.object.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
    getRectangle() {
        return this.object.getBoundingClientRect();
    }
}
//# sourceMappingURL=gameObject.js.map