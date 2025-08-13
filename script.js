

const grid = document.querySelector('.grid-container');
const rows = 6;
const cols = 5;

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
            // input.placeholder = `Row ${i+1}, Col ${j+1}`;
            input.setAttribute('readonly', true);
            input.setAttribute('maxlength', 1);
            row.appendChild(input);
        }
        grid.appendChild(row);
    }
};

function activateRow(index){
    // console.log(document.querySelector(`.row${index}`))
    document.querySelector(`.row${index}`).removeAttribute('readonly');
    document.querySelector(`.row${index}`).classList.remove('readonly');
    document.querySelectorAll(`.input${index}`).forEach(input => input.removeAttribute('readonly'));

    // const guess = 
}

function setRandomWord(wordList){
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', () => {
    console.log('answer', answer);

    const guess = createGuess(activeRowIndex);

    if(guess.lenth < 5){
        console.log('not enough letters');
        return;
    }

    if(!wordList.includes(guess)){
        console.log('not a real word');
        return;
    }

    if(guess === answer){
        console.log('win game');
        return;
    }

    setColors(answer, guess);
    activeRowIndex++;
    activateRow(activeRowIndex);

});

function setColors(answer, guess){

    const guessArray = guess.split('');
    const answerArray = answer.split('');
    console.log('guess: ', guessArray);
    console.log('answer: ', answerArray);

    // TODO need to chack only the current row index for x
    for(let x = 0; x < guessArray.length; x++){
        console.log(guessArray[x], " : ", answerArray[x]);
        if(guessArray[x] === answerArray[x]){
            console.log('green letter');
            document.querySelector(`.letter-${x}`).style.color = 'green';
        }
        else if( answerArray.includes(guessArray[x])){
            console.log('yellow letter');
            document.querySelector(`.letter-${x}`).style.color = 'yellow';
        }
        else{
            console.log('grey letter');
            document.querySelector(`.letter-${x}`).style.color = 'grey';
        }
    }
}


function createGuess(index) {
    const row = document.querySelectorAll(`.input${index}`);
    const guess = Array.from(row)
        .map(input => input.value)
        .join('');
    return guess;
}


// Start Game - create the squares and unlock the first row
createGrid();
let activeRowIndex = 0;
activateRow(activeRowIndex);
const answer = setRandomWord(wordList);
