

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
}

function setRandomWord(wordList){
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}




// Start Game - create the squares and unlock the first row
createGrid();
activateRow(0);
