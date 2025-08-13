

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

    // check if theres 5 letters
    // check if word is real
    // for each letter in current row -> does answer.contain(letter)
    // for each letter update color
    // for(i = 0 to 5){ 
    //    if(guess[i] === word[i]){ green }
    //    else if(word.contains(guess[i])){ yellow }
    //    else{ grey }
    // }
    // activate Next Row (i+1)

    const guess = createGuess(0);

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
