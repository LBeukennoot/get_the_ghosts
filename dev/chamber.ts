import { Ghost } from "./ghost.js"
import { Player } from "./player.js"

export class Chamber {

    private chamber : HTMLElement
    private chamberHitbox : HTMLElement
    private player : Player
    private ghost : Ghost[] = []
    private div : HTMLElement
    private hits : number = 0
    private level : number

    constructor(div : HTMLElement, level : number) {
        console.log('Created chamber!')
        this.level = level

        //create chamber and add to center div
        this.chamber = document.createElement('chamber')
        div.appendChild(this.chamber)

        //create chamber hitbox, according to chamber image
        this.chamberHitbox = document.createElement('div')
        this.chamberHitbox.classList.add('chamber-hitbox')
        this.chamber.appendChild(this.chamberHitbox)

        //create ghost and player
        this.player = new Player(this.chamber)

        for(let i = 0; i < (this.level / 2); i++){
            this.ghost.push(new Ghost(this.chamberHitbox))
        }
    }

    public removeChamber() : void{
        this.chamber.remove()
    }

    public getHits() : number {
        return this.hits
    }

    public getGhosts() : number{
        return this.ghost.length
    }

    public update() {
        this.player.update()

        for (const ghost of this.ghost) {
            ghost.update()

            if(this.checkCollision(this.player.getRectangle(), ghost.getRectangle())) {
                ghost.killGhost()
                this.hits++
            }
        }

        //check if player is on the left side
        if (this.player.getX() < 141) {
            this.player.setHorizontalSpeed(-5)
            //check if the player is on the right side
        } else if (this.player.getX() > this.chamberHitbox.clientWidth + 141 - this.player.getRectangleWidth()) {
            this.player.setHorizontalSpeed(5)
        }

        //check if player is on the top
        if (this.player.getY() < 80) {
            this.player.setVerticalSpeed(-5)
            //check if player is on the bottom
        } else if (this.player.getY() > this.chamberHitbox.clientHeight - 50 + this.player.getRectangleHeight()) {
            this.player.setVerticalSpeed(5)
        }
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

}