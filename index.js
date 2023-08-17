let cards = []
let sum = 0
let score = 0
let houseCards = []
let houseSum = []
let scoreChanged = false
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let houseSumEl = document.getElementById("hsum-el")
let houseCardsEl = document.getElementById("hcards-el")
let showHouseCards = false

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    makeDefault()
    isAlive = true
    hasBlackJack = false
    showHouseCards = false
    scoreChanged = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    houseCards = [getRandomCard(), getRandomCard()]
    houseSum = houseCards[0] + houseCards[1]
    enableButtonColor()
    if (score < -5){
        document.getElementById("taunt").textContent = "The house always wins"
    } else {
        document.getElementById("taunt").textContent = ""
    }
    renderGame()
}

function renderGame() {
    if (!scoreChanged){
        cardsEl.textContent = "Cards: "
        for (let i = 0; i < cards.length; i++) {
            cardsEl.textContent += cards[i] + " "
        }

        showHouseCardsFunction()
        
        sumEl.textContent = "Sum: " + sum
        if (sum <= 20) {
            message = "Do you want to draw a new card?"
        } else if (sum === 21) {
            message = "You've got Blackjack!"
            disableButtonColor()
            hasBlackJack = true
            score++
            scoreChanged =true
            makeGreen()
        } else {
            message = "You lost!"
            isAlive = false
            disableButtonColor()
            score--
            scoreChanged =true
            makeRed()
        }

        if(showHouseCards && isAlive && !hasBlackJack ){
            if(houseSum > sum && houseSum <= 21){
                houseWins()
            } else if(houseSum === sum && houseSum <= 21){
                tied()               
            } else {
                while(houseSum < 21 && houseSum < sum){
                    let card2 = getRandomCard()
                    houseSum += card2
                    houseCards.push(card2)
                    showHouseCardsFunction()
                    if (houseSum <= 21 && houseSum > sum){                   
                        houseWins()
                        makeRed()
                        break
                    } else if(houseSum === sum){
                        tied()
                        break
                    } else if (houseSum > 21){
                        message = "You beat the house!"
                        score++
                        scoreChanged =true
                        makeGreen()
                        break
                    }
                }                 
            }
        }

        document.getElementById("score-el").textContent = "Score: " + score
        messageEl.textContent = message
    }
    
}

function tied(){
    message = "Tie!"
    scoreChanged =true
}

function showHouseCardsFunction(){
    if (showHouseCards){
        houseSumEl.textContent = "House Sum: " + houseSum
    } else {
        houseSumEl.textContent = "House Sum: ?"
    }

    houseCardsEl.textContent = "House Cards: "
        
    if (showHouseCards){
        for (let i = 0; i < houseCards.length; i++) {
            houseCardsEl.textContent += houseCards[i] + " "
        }
    } else {
        for (let i = 0; i < houseCards.length; i++) {
            if (i === 0){
                houseCardsEl.textContent += houseCards[0] + " "
            } else {
                houseCardsEl.textContent += "? "
            }
            
        }
    }
}

function houseWins(){
    message = "The house wins!"
    score--
    scoreChanged =true
    makeRed()
}

function newCard() {
    if (isAlive === true && hasBlackJack === false && showHouseCards === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)

        // let card2 = getRandomCard()
        // let tempSum = houseSum + card2
        // if (tempSum <= 21){
        //     houseSum += card2
        //     houseCards.push(card2)
        // }
        
        renderGame()        
    }
}

function compareHouse(){
    showHouseCards = true
    disableButtonColor()
    renderGame()
}

function disableButtonColor() {
    const buttons = document.querySelectorAll('.changeColor')
    buttons.forEach(button => {
        button.style.backgroundColor = '#B8860B'
    });
    
}

function enableButtonColor() {
    const buttons = document.querySelectorAll('.changeColor')
    buttons.forEach(button => {
        button.style.backgroundColor = '#daa520'
    });
    
}

//Functions to change the color of the message
function makeGreen(){
    messageEl.style.color = '#7FFF00'
}
function makeDefault(){
    messageEl.style.color = '#FFFFFF'
}
function makeRed(){
    messageEl.style.color = '#FF0000'
}
