const statusDisplay = document.querySelector('.status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
statusDisplay.innerHTML = `Current Player: ${currentPlayer}`;

function changePlayer() {
    if (currentPlayer==="X") {
      currentPlayer="O";
    }
    else {
      currentPlayer="X";
    }
    statusDisplay.innerHTML = `Current Player: ${currentPlayer}`;
}

function check() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          roundWon = true;
          statusDisplay.innerHTML = `${currentPlayer} won!`;
          gameActive = false;
          return;
      }
  }
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
      statusDisplay.innerHTML = `It is a Tie!`;
      gameActive = false;
      return;
  }
  changePlayer();
}

function markCell(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function clicked(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(
        clickedCell.getAttribute('cell')
      );
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
          return;
      }   
      markCell(clickedCell, clickedCellIndex);
      check();
  }

function restart() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Current Player: ${currentPlayer}`;
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', clicked));
document.querySelector('#restart').addEventListener('click', restart);