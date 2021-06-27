import { Chamber } from "./chamber.js";
import { EndScreen } from "./endScreen.js";
import { StartScreen } from "./startScreen.js";
class Game {
    constructor() {
        this.time = 0;
        this.bestTime = 0;
        this.ghostSpawnTimer = 0;
        this.gamestate = 'init';
        this.music = new Audio('images/theme.mp3');
        console.log('Created game!');
        this.startScreen = new StartScreen();
        document.addEventListener('click', (e) => this.clickHandler(e));
    }
    gameLoop() {
        if (this.gamestate != 'gameover') {
            this.time += 0.015;
            this.ghostSpawnTimer += 0.005;
            this.chamber.update(this.time);
            if (this.ghostSpawnTimer > 1) {
                let amount = (Math.random() * 9);
                this.chamber.createGhosts(amount);
                this.ghostSpawnTimer = 0;
                if (this.chamber.getPoints() >= 10) {
                    this.gamestate = 'gameover';
                    this.endScreen = new EndScreen(this.time, this.bestTime);
                    this.music.pause();
                    if (this.time > this.bestTime) {
                        this.bestTime = this.time;
                    }
                }
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    clickHandler(e) {
        if (e.target.id == 'startbutton') {
            this.music.play();
            this.chamber = new Chamber();
            this.gameLoop();
            this.gamestate = 'playing';
        }
        else if (e.target.id == 'againbutton') {
            this.music.play();
            this.chamber = new Chamber();
            this.gamestate = 'playing';
            this.time = 0;
        }
    }
}
new Game();
//# sourceMappingURL=game.js.map