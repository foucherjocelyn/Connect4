const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'player1';
let isGameFinished = false;

const messageElement = document.getElementById('message');
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restartButton');



const createBoard = () => {
    restartButton.style.display = 'none';
    isGameFinished = false;
    board = [];
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        const rowArr = [];
        for (let col = 0; col < COLS; col++) {
            rowArr.push(null);
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
        board.push(rowArr);
    }
    updateMessage();
}

const gameFinished = () => {
    messageElement.textContent = `${currentPlayer} wins!`;
    isGameFinished = true;
    restartButton.style.display = 'block';
}

const handleCellClick = (event) => {
    if (isGameFinished)
        return;
    const col = parseInt(event.target.dataset.col);
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                gameFinished();
            } else {
                currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
                updateMessage();
            }
            break;
        }
    }
}

const checkHorizontal = (row, col) => {
    let count = 0;
    if (board[row][col] === currentPlayer)
        count++;
    let i = 1;
    while (col - i >= 0 && board[row][col - i] === currentPlayer) {
        i++;
        count++;
    }
    i = 1;
    while (col + i < COLS && board[row][col + i] === currentPlayer) {
        i++;
        count++;
    }
    return count >= 4;
}

const checkVertical = (row, col) => {
    let count = 0;
    if (board[row][col] === currentPlayer)
        count++;
    let i = 1;
    while (row + i < ROWS && board[row + i][col] === currentPlayer) {
        i++;
        count++;
    }
    return count >= 4;
}

const checkUpwardDiagonal = (row, col) => {
    let count = 0;
    if (board[row][col] === currentPlayer)
        count++;
    let i = 1;
    while (row + i < ROWS && col - i >= 0 && board[row + i][col - i] === currentPlayer) {
        i++;
        count++;
    }
    i = 1;
    while (row - i >= 0 && col + i < COLS && board[row - i][col + i] === currentPlayer) {
        i++;
        count++;
    }
    return count >= 4;
}

const checkDownwardDiagonal = (row, col) => {
    let count = 0;
    if (board[row][col] === currentPlayer)
        count++;
    let i = 1;
    while (row - i >= 0 && col + i >= 0 && board[row - i][col - i] === currentPlayer) {
        i++;
        count++;
    }
    i = 1;
    while (row + i < ROWS && col + i < COLS && board[row + i][col + i] === currentPlayer) {
        i++;
        count++;
    }
    return count >= 4;
}

const checkWin = (row, col) => {
    return (
        checkHorizontal(row, col) ||
        checkVertical(row, col) ||
        checkUpwardDiagonal(row, col) ||
        checkDownwardDiagonal(row, col)
    );
}

const updateMessage = () => {
    messageElement.textContent = `${currentPlayer}'s turn`;
}

restartButton.addEventListener('click', createBoard);

createBoard();