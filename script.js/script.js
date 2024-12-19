let fields = Array(9).fill(null);
let currentPlayer = 'circle';
let gameOver = false;

function init(){
    render();
}

function render() {
    let container = document.getElementById('container');
    let statusHTML = `<div class="current-player text-center mb-3">
        <span class="player ${currentPlayer === 'circle' ? 'active' : 'inactive'}">Spieler <strong style="color:#24ACE3">O</strong></span>
        <span class="mx-2">vs</span>
        <span class="player ${currentPlayer === 'cross' ? 'active' : 'inactive'}">Spieler <strong style="color:#FDBE00">X</strong></span>
    </div>`;

    let gridHTML = '<div class="game-board">';

    for (let i = 0; i < 9; i++) {
        let symbol = '';
        let colorClass = 'text-white';
        let borderClass = (i % 3 !== 2 ? 'border-end ' : '') + (i < 6 ? 'border-bottom ' : '');

        if (fields[i] === 'circle') {
            symbol = '<span class="fixed-circle">O</span>';
            colorClass = 'text-circle no-animation';
        } else if (fields[i] === 'cross') {
            symbol = '<span class="fixed-cross">X</span>';
            colorClass = 'text-cross no-animation';
        }

        gridHTML += `<div class="game-cell ${colorClass} ${borderClass}" id="cell-${i}" onclick="handleClick(${i})">${symbol}</div>`;
    }
    gridHTML += '</div>';

    container.innerHTML = statusHTML + gridHTML + '<div id="winner" class="text-center mt-3"></div>';
}

function handleClick(index) {
    if (!fields[index] && !gameOver) {
        fields[index] = currentPlayer;

        const cell = document.getElementById(`cell-${index}`);
        if (currentPlayer === 'circle') {
            cell.innerHTML = '<span class="animated-circle text-circle">O</span>';
            cell.classList.add('text-circle');
        } else {
            cell.innerHTML = '<span class="animated-cross text-cross">X</span>';
            cell.classList.add('text-cross');
        }

        checkWinner();
        if (!gameOver) {
            currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        }
        updateStatus();
    }
}

function updateStatus() {
    let statusHTML = `<div class="current-player text-center mb-3">
        <span class="player ${currentPlayer === 'circle' ? 'active' : 'inactive'}">Spieler <strong style="color:#24ACE3">O</strong></span>
        <span class="mx-2">vs</span>
        <span class="player ${currentPlayer === 'cross' ? 'active' : 'inactive'}">Spieler <strong style="color:#FDBE00">X</strong></span>
    </div>`;
    document.querySelector('.current-player').outerHTML = statusHTML;
}

function checkWinner() {
    const winnerElement = document.getElementById('winner');


    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Zeilen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]            // Diagonalen
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameOver = true;
            winnerElement.innerHTML += `Spieler ${fields[a] === 'circle' ? '<strong style="color:#24ACE3">O</strong>' : '<strong style="color:#FDBE00">X</strong>'} gewinnt!`;
            showRestartButton();
            return;
        }
    }

    if (!fields.includes(null)) {
        gameOver = true;
        setTimeout(() => {
            document.getElementById('winner').innerHTML = 'Unentschieden!';
            showRestartButton();
        }, 100);
    }
}

function restartGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'circle';
    gameOver = false;
    render();
    document.getElementById('winner').remove();

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.remove();
    }
    
}

function showRestartButton() {
    let container = document.getElementById('container');
    let restartButton = document.createElement('button');
    restartButton.id = 'restart-btn';
    restartButton.textContent = 'Nochmal spielen';
    restartButton.className = 'btn btn-primary mt-3 restart-button';
    restartButton.onclick = restartGame;
    container.appendChild(restartButton);
}

document.addEventListener('DOMContentLoaded', render);