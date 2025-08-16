

const grid = document.querySelector('.grid-container');
const message = document.querySelector('.messages-div');
const rows = 6;
const cols = 5;
let gameOver = false;
let greyKeys = [];
let yellowKeys = [];
let greenkeys = [];

function createGrid(){

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'grid-row';
        row.classList.add(`row${i}`);
        row.classList.add('readonly');
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add(`input${i}`);
            input.classList.add(`letter-${j}`);
            input.setAttribute('readonly', true);
            input.setAttribute('maxlength', 1);
            row.appendChild(input);
        }
        grid.appendChild(row);
    }
};

function activateRow(index){
    document.querySelector(`.row${index}`).removeAttribute('readonly');
    document.querySelector(`.row${index}`).classList.remove('readonly');
    document.querySelectorAll(`.input${index}`).forEach(input => input.removeAttribute('readonly'));

}

function setRandomWord(wordList){
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', () => {
    checkGuess();
});

const reloadButton = document.querySelector('.reset-button');
reloadButton.addEventListener('click', () =>{
    location.reload();
});

//validate the guess and change the colors
function checkGuess(){
    // turn the guess into an array of the letters
    const guess = createGuess(activeRowIndex);

    //check if all letters are used
    if(guess.length < 5){
        message.textContent = 'Not enough letters';
        return;
    }

    //check if its a 'real' word
    if(!wordList.includes(guess)){
        message.textContent = 'Not a real word';
        return;
    }

    // setTimeout(function(){}, 500);
    setColors(answer, guess);
    colorKeyboard();

    // if guessed the correct word
    if(guess === answer){
        gameOver = true;
        setTimeout(function() {
            document.querySelector('.win-container').classList.remove('hidden');
        }, 2000);

        document.querySelector('.score-div').innerHTML = `Score: ${activeRowIndex+1}/6`;
        //getDefintion()
    }

    if(activeRowIndex === 5 && !gameOver){
        setTimeout(function() {
            document.querySelector('.lose-container').classList.remove('hidden');
        }, 2000);

        document.querySelector('.answer-div').innerHTML = `Answer: ${answer}`;
        //getDefintion()
        gameOver = true;
    }

    Array.from(document.querySelector(`.row${activeRowIndex}`).children).forEach(input => input.setAttribute("readonly", true));

    if(activeRowIndex < 5 && !gameOver){
        activeRowIndex++;
        activateRow(activeRowIndex);
    }

    message.textContent = '';
};

function setColors(answer, guess) {
    const guessArray = guess.split('');
    const answerArray = answer.split('');
    const answerLetterCounts = {};

    // how many of each letter
    answerArray.forEach(letter => {
        answerLetterCounts[letter] = (answerLetterCounts[letter] || 0) + 1;
    });

    //find all correct letters to be green
    for (let x = 0; x < guessArray.length; x++) {
        if (guessArray[x] === answerArray[x]) {
            greenkeys.push(guessArray[x]);
            document.querySelector(`.row${activeRowIndex} .letter-${x}`).style.backgroundColor = 'green';
            answerLetterCounts[guessArray[x]]--;
        }
    }

    // check for correct letters in the  wrong spot and incorrect letters
    for (let x = 0; x < guessArray.length; x++) {
        const tile = document.querySelector(`.row${activeRowIndex} .letter-${x}`);
        if (tile.style.backgroundColor !== 'green') {
            if (answerLetterCounts[guessArray[x]] > 0) {
                yellowKeys.push(guessArray[x]);
                tile.style.backgroundColor = 'yellow';
                answerLetterCounts[guessArray[x]]--;
            } else {
                greyKeys.push(guessArray[x]);
                tile.style.backgroundColor = 'grey';
            }
        }
    }
}

// creates an array containing individual letters of the guess
function createGuess(index) {
    const row = document.querySelectorAll(`.input${index}`);
    const guess = Array.from(row)
        .map(input => input.value)
        .join('');
    return guess;
}


document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="text"][maxlength]');
    let nextGroupIndex = 0;
    console.log(inputs)

    //continuously type thru the input boxes
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === parseInt(input.maxLength)){
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        //backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0 && !input.readonly){ // todo check which group you can delete
                // if(index % 5){ inputs[index - 1].focus(); }
                inputs[index - 1].focus();
            }
        });
        
        //enter
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter'){
                checkGuess();
                nextGroupIndex+5;
            }
        });
    });
});

//match mini keyboard
function colorKeyboard(){
    greenkeys.forEach(letter => {
        document.querySelector(`.${letter}`).style.backgroundColor = 'green';
    });
    greyKeys.forEach(letter => {
        document.querySelector(`.${letter}`).style.backgroundColor = 'grey';
    });
    yellowKeys.forEach(letter => {
        document.querySelector(`.${letter}`).style.backgroundColor = 'yellow';
    });
}


// Start Game - create the squares and unlock the first row
createGrid();
let activeRowIndex = 0;
activateRow(activeRowIndex);
const answer = setRandomWord(wordList);
document.querySelector(`.input${activeRowIndex}.letter-0`).focus();
