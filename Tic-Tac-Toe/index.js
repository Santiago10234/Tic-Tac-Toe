const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
let isPlayerOne = true;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", userMove);
}

function userMove(e) {
    let cellValue = e.target.innerHTML;
    if (!cellValue.length) {
        e.target.innerHTML = "X";
        isPlayerOne = false;

        if (checkWinner("X")) {
            showWinner("X");
        } else {
            machineMove();
        }
    }
}

function machineMove() {
    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].innerHTML.length) {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        cells[emptyCells[randomIndex]].innerHTML = "O";
        isPlayerOne = true;

        if (checkWinner("O")) {
            showWinner("O");
        }
    }
}

function checkWinner(player) {
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

    for (const combination of winningCombinations) {
        const [c1, c2, c3] = combination;
        if (cells[c1].innerHTML === player && cells[c2].innerHTML === player && cells[c3].innerHTML === player) {
            return true;
        }
    }
    return false;
}

function showWinner(player) {
    document.querySelector("#statusText").innerHTML = player + " WIN";
    disableBoard();
}

function disableBoard() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", userMove);
    }
}

restartBtn.addEventListener("click", function () {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].addEventListener("click", userMove);
    }
    document.querySelector("#statusText").innerHTML = "";
    isPlayerOne = true;
});