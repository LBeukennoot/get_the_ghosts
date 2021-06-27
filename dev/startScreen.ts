export class StartScreen {

    private keys : HTMLElement

    constructor() {
        console.log('Created startscreen')

        let card = document.createElement('div')
        card.classList.add('card')

        let title = document.createElement('h1')
        title.innerText = 'Get the Ghosts!'

        let keys = document.createElement('img')
        keys.src = 'images/keys.png'
        keys.classList.add('keys')

        let button = document.createElement('button')
        button.innerText = 'Start game'
        button.setAttribute('id', 'startbutton')
        
        card.appendChild(title)
        card.appendChild(keys)
        card.appendChild(button)
        document.body.appendChild(card)

    }
}