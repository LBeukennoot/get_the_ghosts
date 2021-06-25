import { Chamber } from "./chamber.js";
class Game {
    constructor() {
        this.chamber = [];
        this.timer = 1000;
        this.playtime = true;
        this.hits = 0;
        this.music = new Audio('images/theme.mp3');
        this.level = 1;
        console.log('Created game!');
        this.grid = document.createElement('div');
        this.grid.classList.add('grid-container');
        document.body.appendChild(this.grid);
        this.createChamber();
        this.gameLoop();
    }
    createChamber() {
        this.div1 = document.createElement('div');
        this.div1.classList.add('grid-item');
        this.points = document.createElement('p');
        this.points.style.color = 'white';
        this.points.innerText = `kills: 0`;
        this.points.classList.add('kills');
        this.div1.appendChild(this.points);
        this.time = document.createElement('p');
        this.time.style.color = 'white';
        this.time.innerText = `time: 0`;
        this.time.classList.add('time');
        this.div1.appendChild(this.time);
        this.createGameOverScreen();
        this.div = document.createElement('div');
        this.div.classList.add('grid-item');
        this.chamber.push(new Chamber(this.div, this.level));
        let div3 = document.createElement('div');
        div3.classList.add('grid-item');
        this.grid.appendChild(this.div1);
        this.grid.appendChild(this.div);
        this.grid.appendChild(div3);
        this.music.loop = true;
    }
    gameLoop() {
        if (this.timer < 0) {
            this.playtime = false;
            this.music.pause();
            this.chamber[this.chamber.length - 1].removeChamber();
            if (!this.playtime) {
                this.playAgainButton.classList.remove('transparent');
            }
        }
        else {
            this.timer -= (this.level / 4 + 0.8);
            this.time.innerText = `time: ${Math.round(this.timer / 60)}`;
        }
        if (this.playtime) {
            this.chamber[this.chamber.length - 1].update();
            if (this.chamber[this.chamber.length - 1].getHits() == this.chamber[this.chamber.length - 1].getGhosts()) {
                this.hits = this.hits + this.chamber[this.chamber.length - 1].getHits();
                this.chamber[this.chamber.length - 1].removeChamber();
                this.chamber.push(new Chamber(this.div, this.level));
                this.level = this.level + 1;
                this.timer += (this.level * 50);
            }
            else {
                this.points.innerText = `hits: ${this.hits + this.chamber[this.chamber.length - 1].getHits()}`;
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    createGameOverScreen() {
        this.playAgainButton = document.createElement('div');
        this.playAgainButton.classList.add('transparent', 'replay-button');
        this.playAgainButton.innerText = 'Play again!';
        this.playAgainButton.addEventListener('click', this.buttonHandler);
        this.div1.appendChild(this.playAgainButton);
    }
    buttonHandler() {
        location.reload();
    }
}
new Game();
//# sourceMappingURL=game.js.map