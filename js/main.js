
const playerBoard = document.querySelector(".player-board");
const enemyBoard = document.querySelector(".enemy-board");
const resetBtn = document.querySelector(".reset-btn");
const shipSizeButtons = document.querySelectorAll(".ship-size");

let playerShips = [];
let enemyShips = [];
let playerGuesses = [];
let enemyGuesses = [];
let playerTurn = true;
let selectedShipSize = 4;


function createBoard(boardElement, isPlayer) {
  boardElement.innerHTML = ''; 
  for (let row = 0; row < 10; row++) {  
    for (let col = 0; col < 10; col++) {  
      const cell = document.createElement("div");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => handleCellClick(row, col, isPlayer));
      boardElement.appendChild(cell);
    }
  }


  logBoardCells(boardElement);
}


function logBoardCells(boardElement) {
  const boardCells = boardElement.querySelectorAll('div'); 
  console.log('Board Cells:');
  boardCells.forEach(cell => {
    console.log(cell);
  });
}


function placeShips() {
  playerShips = [];
  enemyShips = [];
  

  while (playerShips.length < 5) {  
    const row = Math.floor(Math.random() * 10);  
    const col = Math.floor(Math.random() * 10);  
    if (!playerShips.some(ship => ship.row === row && ship.col === col)) {
      playerShips.push({ row, col });
    }
  }


  while (enemyShips.length < 5) {  
    const row = Math.floor(Math.random() * 10);  
    const col = Math.floor(Math.random() * 10);  
    if (!enemyShips.some(ship => ship.row === row && ship.col === col)) {
      enemyShips.push({ row, col });
    }
  }
}


function handleCellClick(row, col, isPlayer) {

  if ((isPlayer && !playerTurn) || (!isPlayer && playerTurn)) {
    return;
  }

  if (isPlayer) {

    if (playerGuesses.some(guess => guess.row === row && guess.col === col)) {
      alert("You already guessed here!");
      return;
    }
    playerGuesses.push({ row, col });
    if (enemyShips.some(ship => ship.row === row && ship.col === col)) {
      markCell(enemyBoard, row, col, 'hit');
      enemyShips = enemyShips.filter(ship => ship.row !== row || ship.col !== col);
      if (enemyShips.length === 0) {
        alert("You win! All enemy ships are sunk.");
      }
    } else {
      markCell(enemyBoard, row, col, 'miss');
    }
  } else {

    if (enemyGuesses.some(guess => guess.row === row && guess.col === col)) return;
    enemyGuesses.push({ row, col });
    if (playerShips.some(ship => ship.row === row && ship.col === col)) {
      markCell(playerBoard, row, col, 'hit');
      playerShips = playerShips.filter(ship => ship.row !== row || ship.col !== col);
      if (playerShips.length === 0) {
        alert("You lose! All your ships are sunk.");
      }
    } else {
      markCell(playerBoard, row, col, 'miss');
    }
  }

  playerTurn = !playerTurn;
}

function markCell(boardElement, row, col, type) {
  const cell = boardElement.querySelector(`[data-row='${row}'][data-col='${col}']`);
  cell.classList.add(type);
}


function resetGame() {
  placeShips();
  createBoard(playerBoard, true);
  createBoard(enemyBoard, false);
  playerGuesses = [];
  enemyGuesses = [];
  playerTurn = true;  
}


resetBtn.addEventListener("click", resetGame);


shipSizeButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedShipSize = parseInt(button.dataset.size);
    alert(`Selected ship size: ${selectedShipSize}`);
  });
});

resetGame();
