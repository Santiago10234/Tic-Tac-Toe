// Obtener todas las celdas del tablero y el botón de reinicio
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");

// Variable que indica de quién es el turno actual
let isPlayerOneTurn = true;

// Agregar un evento de clic a cada celda del tablero
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", userMove)
}
// cells.forEach(cell => {
//     cell.addEventListener("click", userMove);
// });

// Función que se ejecuta cuando el usuario hace un movimiento
function userMove(e) {
    const cell = e.target;
    // Verificar si la celda está vacía
    if (!cell.innerHTML) {
        // Obtener el símbolo del jugador actual
        const symbol = isPlayerOneTurn ? "X" : "O";
        // Colocar el símbolo en la celda
        cell.innerHTML = symbol;
        // Cambiar al turno del otro jugador
        isPlayerOneTurn = !isPlayerOneTurn;

        // Verificar si hay un ganador
        checkWinner();
    }
}

// Función para verificar si hay un ganador
function checkWinner() {
    // Definir las líneas a verificar para determinar el ganador
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

    // Iterar sobre cada línea
    for (const line of winningCombinations) {
        const [c1, c2, c3] = line;
        // Obtener los valores de las celdas en la línea
        const cell1 = cells[c1].innerHTML;
        const cell2 = cells[c2].innerHTML;
        const cell3 = cells[c3].innerHTML;

        // Verificar si todas las celdas de la línea tienen el mismo valor (y no están vacías)
        if (cell1 && cell1 === cell2 && cell1 === cell3) {
            // Mostrar al ganador
            showWinner(cell1);
            return;
        }
    }
}

// Función para mostrar al ganador
function showWinner(player) {
    document.querySelector("#statusText").innerHTML = player + " WIN";
    // Deshabilitar todas las celdas para evitar más movimientos
    disableCells();
}

// Función para deshabilitar todas las celdas
function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener("click", userMove);
    });
}

// Agregar evento de clic al botón de reinicio
restartBtn.addEventListener("click", resetGame);

// Función para reiniciar el juego
function resetGame() {
    // Limpiar todas las celdas y restablecer el evento de clic
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.addEventListener("click", userMove);
    });
    // Restablecer el turno al jugador uno
    isPlayerOneTurn = true;
    // Limpiar el mensaje de estado
    document.querySelector("#statusText").innerHTML = "";
}

 
let openModal = document.querySelector(".link")
let modal = document.querySelector(".modal")
let modal_close = document.querySelector(".modal_close")

openModal.addEventListener("click", function (e) {
    e.preventDefault()
    modal.classList.add("modal--show")
})

modal_close.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("modal--show")
})