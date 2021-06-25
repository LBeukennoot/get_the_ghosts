import { Chamber } from "./chamber.js"

class Game {

    private chamber : Chamber[] = []
    private grid : HTMLElement
    private points : HTMLElement
    private time : HTMLElement
    private div1 : HTMLElement
    private div : HTMLElement
    private playAgainButton : HTMLElement

    private timer : number = 1000
    private playtime : boolean = true
    private hits : number = 0
    private music : any = new Audio('images/theme.mp3')
    private level : number = 1

    constructor() {
        console.log('Created game!')
        
        //create grid to center the game
        this.grid = document.createElement('div')
        this.grid.classList.add('grid-container')
        document.body.appendChild(this.grid)

        this.createChamber()
        this.gameLoop()
    }

    private createChamber() {

        //fill grid
        //left
        this.div1 = document.createElement('div')
        this.div1.classList.add('grid-item');

        this.points = document.createElement('p')
        this.points.style.color = 'white'
        this.points.innerText = `kills: 0`
        this.points.classList.add('kills')
        this.div1.appendChild(this.points)

        this.time = document.createElement('p')
        this.time.style.color = 'white'
        this.time.innerText = `time: 0`
        this.time.classList.add('time')
        this.div1.appendChild(this.time)

        this.createGameOverScreen()
        //middle
        this.div = document.createElement('div')
        this.div.classList.add('grid-item');

        this.chamber.push(new Chamber(this.div, this.level))
        //right
        let div3 = document.createElement('div')
        div3.classList.add('grid-item');

        //and append them
        this.grid.appendChild(this.div1)
        this.grid.appendChild(this.div)
        this.grid.appendChild(div3)

        this.music.loop = true

    }

    private gameLoop() {
        
        //checking if timer is over
        if (this.timer < 0) {
            //timer is over so game is over
            this.playtime = false
            this.music.pause()
            this.chamber[this.chamber.length - 1].removeChamber()
            if (!this.playtime) {
                this.playAgainButton.classList.remove('transparent')
            }
        } else {
            //timer is not over so count down and show time
            this.timer -= (this.level / 4 + 0.8)
            this.time.innerText = `time: ${Math.round(this.timer/60)}`
        }

        //if there is time left
        if (this.playtime) {
            //update chamber
            this.chamber[this.chamber.length - 1].update()
            //this.music.play()
            //if all ghosts are gone
            if (this.chamber[this.chamber.length - 1].getHits() == this.chamber[this.chamber.length - 1].getGhosts()) {

                //remove old chamber and make a new one
                this.hits = this.hits + this.chamber[this.chamber.length - 1].getHits()

                this.chamber[this.chamber.length - 1].removeChamber()
                this.chamber.push(new Chamber(this.div, this.level))
                this.level = this.level + 1
                //this.music.play()
                this.timer += (this.level * 50)

            //if there are still ghosts left
            } else {

                //there is a hit so add it! :)
                this.points.innerText = `hits: ${this.hits + this.chamber[this.chamber.length - 1].getHits()}`
            }
        }

        requestAnimationFrame(() => this.gameLoop())
    }

    private createGameOverScreen() {
        this.playAgainButton = document.createElement('div')
        this.playAgainButton.classList.add('transparent','replay-button')
        this.playAgainButton.innerText = 'Play again!'
        this.playAgainButton.addEventListener('click', this.buttonHandler)
        this.div1.appendChild(this.playAgainButton)
    }

    private buttonHandler() {
        location.reload()
    }


} 

new Game()