import { GameObject } from "./gameObject.js"

export class Player extends GameObject {

    //private x : number = 321
    //private y : number = 310
    private verticalSpeed : number = 0
    private horizontalSpeed : number = 0
    //private div : HTMLElement

    constructor(chamber : HTMLElement) {
        super(chamber)
        console.log('Created player!')

        this.x = 321
        this.y = 310

        window.addEventListener("keydown",  (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup",    (e: KeyboardEvent) => this.onKeyUp(e))

        this.object = document.createElement('player')
        this.object.style.transform = `translate(${this.x}px, ${this.y}px)`
        this.div.appendChild(this.object)
    }

    public getX() : number {
        return this.x
    }

    public getY() : number {
        return this.y
    }

    public setHorizontalSpeed(speed : number) : void {
        this.x -= speed
    }

    public setVerticalSpeed(speed : number) : void {
        this.y -= speed
    }

    public update() : void {
        
        this.y += this.verticalSpeed
        this.x += this.horizontalSpeed
        
        super.update()
    }

    private onKeyDown(e : KeyboardEvent) : void {
        switch (e.key) {
            case "ArrowUp":
            case "w":
                this.verticalSpeed = -5
                break
            case "ArrowDown":
            case "s":
                this.verticalSpeed = 5
                break
            case "ArrowLeft":
            case "a":
                this.horizontalSpeed = -5
                break
            case "ArrowRight":
            case "d":
                this.horizontalSpeed = 5
                break
            case " ":
                console.log('space')
        }
    }

    private onKeyUp(e : KeyboardEvent) : void {
        if(e.key == "w" || e.key == "s" || e.key == "a" || e.key == "d" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
            // Make the vertical speed 0
            this.verticalSpeed = 0
            this.horizontalSpeed = 0
        }
    }

}