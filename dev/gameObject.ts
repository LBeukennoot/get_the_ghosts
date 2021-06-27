export class GameObject {

    protected y : number = 0
    protected x : number = 0
    protected div : HTMLElement
    protected object : HTMLElement

    constructor(chamber : HTMLElement) {
        this.div = chamber
    }

    public update() : void {
        this.object.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    
    public getRectangle() : DOMRect {
        return this.object.getBoundingClientRect()
    }
}