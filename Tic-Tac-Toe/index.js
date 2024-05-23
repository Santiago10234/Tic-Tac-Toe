// Obtener todas las celdas del tablero y el botón de reinicio
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");
let isPlayerOne = true; // Variable para rastrear de quién es el turno

// Agregar un evento de clic a cada celda del tablero
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", userMove);
}

// Función para manejar el movimiento del jugador
function userMove(e) {
    let cellValue = e.target.innerHTML;
    // Verificar si la celda está vacía
    if (!cellValue.length) {
        e.target.innerHTML = "X"; // Marcar la celda con 'X'
        isPlayerOne = false; // Cambiar al turno de la máquina

        // Verificar si el jugador ha ganado
        if (checkWinner("X")) {
            showWinner("X"); // Mostrar mensaje de victoria
        } else if (checkDraw()) { // Verificar si el juego ha terminado en empate
            showDraw(); // Mostrar mensaje de empate
        } else {
            machineMove(); // Si no hay ganador ni empate, es el turno de la máquina
        }
    }
}

// Función para que la máquina haga su movimiento
function machineMove() {
    let emptyCells = [];
    // Encontrar todas las celdas vacías
    for (let i = 0; i < cells.length; i++) {
        if (!cells[i].innerHTML.length) {
            emptyCells.push(i);
        }
    }

    // Si hay celdas vacías, la máquina elige una al azar y la marca con 'O'
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        cells[emptyCells[randomIndex]].innerHTML = "O";
        isPlayerOne = true; // Cambiar al turno del jugador

        // Verificar si la máquina ha ganado
        if (checkWinner("O")) {
            showWinner("O"); // Mostrar mensaje de victoria
        } else if (checkDraw()) { // Verificar si el juego ha terminado en empate
            showDraw(); // Mostrar mensaje de empate
        }
    }
}

// Función para verificar si hay un ganador
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

    // Iterar sobre todas las combinaciones ganadoras
    for (const combination of winningCombinations) {
        const [c1, c2, c3] = combination;
        // Si las celdas en la combinación actual pertenecen al jugador actual, hay un ganador
        if (cells[c1].innerHTML === player && cells[c2].innerHTML === player && cells[c3].innerHTML === player) {
            return true;
        }
    }
    return false; // No hay ganador
}

// Función para verificar si el juego ha terminado en empate
function checkDraw() {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
            return false; // Todavía hay celdas vacías, el juego no es un empate
        }
    }
    return true; // Todas las celdas están llenas y no hay un ganador, es un empate
}

// Función para mostrar el mensaje de victoria
function showWinner(player) {
    document.querySelector("#statusText").innerHTML = player + " WIN";
    disableBoard(); // Desactivar el tablero
}

// Función para mostrar el mensaje de empate
function showDraw() {
    document.querySelector("#statusText").innerHTML = "It's a draw!";
    disableBoard(); // Desactivar el tablero
}

// Función para desactivar el tablero después de que el juego haya terminado
function disableBoard() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", userMove); // Eliminar los manejadores de clic
    }
}

// Agregar un evento de clic al botón de reinicio
restartBtn.addEventListener("click", function () {
    // Restablecer el tablero y reiniciar el juego
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].addEventListener("click", userMove); // Agregar los manejadores de clic nuevamente
    }
    document.querySelector("#statusText").innerHTML = ""; // Limpiar el mensaje de estado
    isPlayerOne = true; // Establecer el turno del jugador como verdadero
});

// Evento de clic para mostrar el modal
let openModal = document.querySelector(".link");
let modal = document.querySelector(".modal");
let modal_close = document.querySelector(".modal_close");

openModal.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("modal--show");
});

// Evento de clic para cerrar el modal
modal_close.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("modal--show");
});
