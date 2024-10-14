let randomNumber = parseInt(Math.random()*100 + 1)

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1
let playGame = true

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value)
        console.log(guess)
        validateGuess(guess)
    })
}
function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }else if(guess<1){
        alert('Number should be in the range of 1 to 100')
    }else if(guess>100){
        alert('Number should be in the range of 1 to 100')
    }else{
        prevGuess.push(guess)
        if(numGuess===11){
            cleanUpGuess(guess)
            displayMessage(`Game over. Random number was ${randomNumber}`)
            endGame()
        }else{
            cleanUpGuess(guess)
            checkGuess(guess)
        }
    }
}
function checkGuess(guess){
    if(guess===randomNumber){
        displayMessage(`You guessed it right`)
        endGame();
    }else if(guess<randomNumber){
        displayMessage(`Number is too low`)
    }else if(guess>randomNumber){
        displayMessage(`Number is too high`)
    }
}
function cleanUpGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess},` //pushing the guess values
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`
}
function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`
}
function endGame(){
   userInput.value=''
   userInput.setAttribute('disabled','') //This line disables an HTML input element by setting its disabled attribute, preventing user interaction with it.
   //Even if you don't explicitly use the disabled attribute in the HTML tag, you can dynamically add it via JavaScript with setAttribute('disabled', ''). This effectively disables the input element during runtime.
   p.classList.add('button')
   p.innerHTML = '<h2 id="newGame">Start new game</h2>'
   startOver.appendChild(p);
   playGame = false;
   newGame();
} 
function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click',function(e){
        randomNumber = parseInt(Math.random()*100 + 1)
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })

}
