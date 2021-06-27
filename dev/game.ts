import { Chamber } from "./chamber.js"
import { EndScreen } from "./endScreen.js"
import { StartScreen } from "./startScreen.js"

class Game {

    private chamber : Chamber
    private startScreen : StartScreen
    private endScreen : EndScreen

    private time : number = 0
    private bestTime : number = 0
    private ghostSpawnTimer : number = 0
    private gamestate : string = 'init'
    private music : any = new Audio('images/theme.mp3')

    constructor() {
        console.log('Created game!')
        this.music.loop = true

        //create start screen
        this.startScreen = new StartScreen()

        //add event listener to screen
        document.addEventListener('click', (e : MouseEvent) => this.clickHandler(e))
    }

    private gameLoop() : void {
        if (this.gamestate != 'gameover') {
            //timing
            this.time += 0.015
            this.ghostSpawnTimer += 0.009 + (this.time / 5)

            //updating chamber
            this.chamber.update(this.time)
    
            //checking to spawn new ghosts
            if (this.ghostSpawnTimer > 1) {
                let amount = (Math.random() * 9 + (this.time / 5))
                this.chamber.createGhosts(amount)
                this.ghostSpawnTimer = 0

                //checking if there are too many ghosts
                if (this.chamber.getPoints() >= 10) {
                    this.gamestate = 'gameover'
                    this.endScreen = new EndScreen(this.time, this.bestTime)
                    this.music.pause()

                    //changing best time if it was better
                    if (this.time > this.bestTime) {
                        this.bestTime = this.time
                    }
                }
            }
    
        }

        //TODO show time

        requestAnimationFrame(() => this.gameLoop())
    }

    private clickHandler(e : any) : void {

        if(e.target.id == 'startbutton') {
            this.music.play()
            this.chamber = new Chamber()
            this.gameLoop()
            this.gamestate = 'playing'
        } else if (e.target.id == 'againbutton') {
            this.music.play()
            this.chamber = new Chamber()
            this.gamestate = 'playing'
            this.time = 0
        }
    }


} 

new Game()