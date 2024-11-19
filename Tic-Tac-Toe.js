let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'playerVsPlayer';
let gameStatus = document.getElementById('gameStatus');
let resetBtn = document.getElementById('resetBtn');
let gameModeSelect = document.getElementById('gameMode');

gameModeSelect.addEventListener('change', () => {
    gameMode = gameModeSelect.value;
    resetGame();
});

function handleCellClick(index) {
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell${index}`).innerText = currentPlayer;

        if (checkWin()) {
            gameStatus.innerText = `Player ${currentPlayer} wins!`;
            disableBoard();
        } else if (gameBoard.includes('')) {
            if (gameMode === 'playerVsAI' && currentPlayer === 'X') {
                currentPlayer = 'O';
                gameStatus.innerText = "AI's turn (O)";
                setTimeout(aiMove, 500);
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                gameStatus.innerText = `Player ${currentPlayer}'s turn (${currentPlayer})`;
            }
        } else {
            gameStatus.innerText = "It's a draw!";
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function disableBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell${i}`).disabled = true;
    }
}

function aiMove() {
    let availableMoves = gameBoard
        .map((val, index) => val === '' ? index : null)
        .filter(val => val !== null);

    if (availableMoves.length === 0) return;

    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard[move] = 'O';
    document.getElementById(`cell${move}`).innerText = 'O';

    if (checkWin()) {
        gameStatus.innerText = "AI wins!";
        disableBoard();
    } else {
        currentPlayer = 'X'; 
        gameStatus.innerText = "Player's turn (X)";
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameStatus.innerText = "Player 1's turn (X)";
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell${i}`).innerText = '';
        document.getElementById(`cell${i}`).disabled = false;
    }
}

for (let i = 0; i < 9; i++) {
    document.getElementById(`cell${i}`).addEventListener('click', () => handleCellClick(i));
}

resetBtn.addEventListener('click', resetGame);