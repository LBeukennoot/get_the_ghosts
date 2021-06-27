export class EndScreen {


    constructor(time : number = 0, bestTime : number = 0) {
        console.log('Created endscreen')

        document.body.innerHTML = ""

        let card = document.createElement('div')
        card.classList.add('card')

        let title = document.createElement('h1')
        title.innerText = 'Game over!'

        let text = document.createElement('a')
        text.innerHTML = 'The ghosts have invaded your house! <br><br><br><br><br>'

        let timeDiv = document.createElement('a')
        if (time > bestTime) {
            timeDiv.innerText = `You survived ${Math.floor(time)}s, your new best time!`
        } else {
            timeDiv.innerText = `You survived ${Math.floor(time)}s, best was ${Math.floor(bestTime)}s`
        }
        

        let button = document.createElement('button')
        button.innerText = 'Play again'
        button.setAttribute('id', 'againbutton')
                
        card.appendChild(title)
        card.appendChild(text)
        card.appendChild(timeDiv)
        card.appendChild(button)
        document.body.appendChild(card)
    }
}