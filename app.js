"use strict";
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  markedCorrectley: 0,
  isWin: false,
  lives: 3,
};
const MINE = "💣";
const FLAG = "🚩";
const LIFE = "❤️";

var gClicks = [];
var gStartTime;
var gTimeInterval;

function initGame() {
  gBoard = buildBoard();
  addRandomMines(gLevel.MINES);
  console.log(gBoard);
  setMinesNegsCount(gBoard);
  console.log(gBoard);
  renderBoard(gBoard);
  renderLives(gBoard.lives);
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.SIZE; j++) {
      // console.log(cell)
      board[i].push({
        isShown: false,
        isMine: false,
        isMarked: false,
      });
    }
  }
  //   console.log(board)
  return board;
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var cell = board[i][j];
      //   console.log(cell);
      cell.minesAroundCount = countMines(gBoard, i, j);
    }
  }
}

function renderBoard(mat) {
  var strHTML = '<table border="0"><tbody class=board>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = `cell cell-${i}-${j}`;
      strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})"></td>`;
      // if (cell.isMine) {
      //     // strHTML += `<td class="${className}">${MINE}</td>`
      //     strHTML += `<td class="${className}"></td>`
      // } else {
      //     // strHTML += `<td class="${className}">${cell.minesAroundCount}</td>`
      //     strHTML += `<td class="${className}"></td>`
      // }
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(".game");
  elContainer.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
  var modelCell = gBoard[i][j];
  var click = { i: i, j: j };
  //   console.log(click);
  gClicks.push(click);
  if (gClicks[0] === click) {
    if (modelCell.isMine) {
      reset();
    }
    console.log("First Click");
    gGame.isOn = true;
    gStartTime = Date.now();
    gTimeInterval = setInterval(updateTime, 1000);
  }
  //    console.log(modelCell)
  gBoard[i][j].isShown = true;
  gGame.shownCount++;
  if (modelCell.isMine && gGame.lives === 1) {
    // elCell.innerText = MINE;
    renderCell({ i: i, j: j }, MINE);
    console.log("game over");
    gameOver();
  } else if (modelCell.isMine) {
    renderCell({ i: i, j: j }, MINE);
    // console.log(gGame.lives)
    gGame.lives--;
    // console.log('life status 2', gGame.lives)
    renderLives(gBoard.lives);
  } else {
    elCell.innerText = modelCell.minesAroundCount;
    expandShown(gBoard, elCell, i, j);
  }

  checkGameOver();
}

function gameOver() {
  clearInterval(gTimeInterval);
  gGame.isOn = false;
  removeCellsOnclicks();
  var elModal = document.querySelector(".modal");
  var elTable = document.querySelector(".game table");
  var elSmiley = document.querySelector(".smiley");
  if (gGame.isWin) {
    // console.log(elTable)
    elTable.style.display = "none";
    elModal.style.display = "block";
    elModal.innerHTML += `<h2 class="modal-header">👑YOU WIN!!!👑</h2>`;
    elSmiley.innerText = "😎";
  } else {
    elModal.style.display = "block";
    elModal.innerHTML += `<h2 class="modal-header">YOU LOSE!!!</h2>`;
    elSmiley.innerText = "😵";
  }
}

function expandShown(board, elCell, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      if (board[i][j].isMine === false) {
        board[i][j].isShown = true;
        renderCell({ i: i, j: j }, board[i][j].minesAroundCount);
        // openNeighbors(gBoard, i, j)
      }
    }
  }
}

function cellMarked(elCell, rowIdx, colIdx) {
  // console.log(elCell);
  var cell = gBoard[rowIdx][colIdx];
  cell.isMarked = true;
  gGame.markedCount++;
  if (cell.isMine) gGame.markedCorrectley++;
  // console.log(gGame)
  // console.log(cell)
  renderCell({ i: rowIdx, j: colIdx }, FLAG);
  checkGameOver();
}

function checkGameOver() {
  var openCells = checkOpenCells(gBoard);
  var boardSize = gLevel.SIZE ** 2;
  console.log(gBoard);
  if (
    gGame.markedCorrectley === gLevel.MINES &&
    openCells === boardSize - gLevel.MINES
  ) {
    gGame.isWin = true;
    gameOver();
  }
}

function reset() {
  clearInterval(gTimeInterval);
  var elTimer = document.querySelector(".timer");
  var elModal = document.querySelector(".modal");
  var elSmiley = document.querySelector(".smiley")
  elModal.innerText = "";
  elSmiley.innerText = "😀"
  elTimer.innerText = "Your time is 0";
  gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    markedCorrectley: 0,
    isWin: false,
    lives: 3,
  };
  gClicks = [];
  initGame();
}
