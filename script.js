

const grid = document.querySelector('.grid-container');
const rows = 6;
const cols = 5;
let gameOver = false;

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

function checkGuess(){
    console.log('answer', answer);

    const guess = createGuess(activeRowIndex);
    console.log('guess', guess);

    if(guess.lenth < 5){
        console.log('not enough letters');
        return;
    }

    if(!wordList.includes(guess)){
        console.log('not a real word');
        return;
    }

    if(guess === answer){
        setColors(answer, guess);
        setTimeout(function() {
            document.querySelector('.win-container').classList.remove('hidden');
        }, 3000);

        document.querySelector('.score-div').innerHTML = `Score: ${activeRowIndex+1}/6`;
        //getDefintion()
        gameOver = true;
        console.log('win game');
    }

    if(activeRowIndex < 5 && !gameOver){
        setColors(answer, guess);
        activeRowIndex++;
        activateRow(activeRowIndex);
        //focus on next first box
        // document.querySelector(`.input${activeRowIndex} letter-0`).focus();
    }
};


function setColors(answer, guess){

    const guessArray = guess.split('');
    const answerArray = answer.split('');
    console.log('guess: ', guessArray);
    console.log('answer: ', answerArray);

    for(let x = 0; x < guessArray.length; x++){
        console.log(guessArray[x], " : ", answerArray[x]);
        if(guessArray[x] === answerArray[x]){
            console.log('green letter');
            document.querySelector(`.row${activeRowIndex} .letter-${x}`).style.color = 'green';
        }
        else if( answerArray.includes(guessArray[x])){
            console.log('yellow letter');
            document.querySelector(`.row${activeRowIndex} .letter-${x}`).style.color = 'yellow';
        }
        else{
            console.log('grey letter');
            document.querySelector(`.row${activeRowIndex} .letter-${x}`).style.color = 'grey';
        }
    }
}

// randomly selects a word from words.js
function createGuess(index) {
    const row = document.querySelectorAll(`.input${index}`);
    const guess = Array.from(row)
        .map(input => input.value)
        .join('');
    return guess;
}


document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="text"][maxlength]');

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
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0){
                inputs[index - 1].focus();
            }
        });
        
        //enter
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter'){
                checkGuess();
            }
        });
    });
});


// Start Game - create the squares and unlock the first row
createGrid();
let activeRowIndex = 0;
activateRow(activeRowIndex);
const answer = setRandomWord(wordList);
document.querySelector(`.input${activeRowIndex}.letter-0`).focus();
