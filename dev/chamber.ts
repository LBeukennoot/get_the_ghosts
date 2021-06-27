import { Ghost } from "./ghost.js"
import { Player } from "./player.js"

export class Chamber {

    private player : Player
    private ghosts : Ghost[] = []

    private chamber : HTMLElement
    private timer : HTMLElement

    private points : number = 0

    constructor() {
        console.log('Created chamber!')

        //emptying body
        document.body.innerHTML = ""

        //creating centered chamber image
        let container = document.createElement('div')
        container.classList.add('card')

        this.chamber = document.createElement('chamber')
        container.appendChild(this.chamber)
        document.body.appendChild(container)

        //creating player
        this.player = new Player(this.chamber)

        //adding ghosts
        this.createGhosts(1)

        //creating timer
        this.timer = document.createElement('timer')
        this.timer.innerText = '0s'
        this.chamber.appendChild(this.timer)
    }

    public createGhosts(amount : number) : void {
        for (let i = 0; i < Math.floor(amount); i++) {
            this.ghosts.push(new Ghost(this.chamber))
        }
        this.points += Math.floor(amount)
    }

    public getPoints() : number {
        return this.points
    }

    public update(time : number) : void {
        this.player.update()

        //making sure player can't leave room
        if (this.player.getX() < 1) {
            this.player.setHorizontalSpeed(-5)
        } else if (this.player.getX() > (this.chamber.clientWidth - this.player.getRectangle().width)) {
            this.player.setHorizontalSpeed(5)
        } else if (this.player.getY() < 0) {
            this.player.setVerticalSpeed(-5)
        } else if (this.player.getY() > (document.body.clientHeight - this.player.getRectangle().height)) {
            this.player.setVerticalSpeed(5)
        }

        //updating ghosts
        for (const ghost of this.ghosts) {
            ghost.update()

            //checking collision between player and ghosts
            if(this.checkCollision(this.player.getRectangle(), ghost.getRectangle())) {
                ghost.killGhost()
                this.points -= 1
            }
        }

        this.timer.innerText = `${Math.floor(time)}s`

    }

    private checkCollision(a: ClientRect, b: ClientRect) : boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

}