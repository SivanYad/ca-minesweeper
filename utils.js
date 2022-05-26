function checkFreeCells() {
  var emptyCells = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    for (var j = 0; j < gLevel.SIZE; j++) {
        // console.log(gBoard[i][j])
      if (!gBoard[i][j].isMine){
        //   console.log(gBoard[i][j])
      } emptyCells.push({ i: i, j: j });
    }
  }
  return emptyCells;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function addRandomMines(minesAmount) {
    var freeCells 
    var cell = {}
    for (var i = 0; i < minesAmount; i++) {
        freeCells = checkFreeCells()
        // console.log(freeCells)
        cell.i = getRandomInt(0, gLevel.SIZE -1)
        cell.j = getRandomInt(0, gLevel.SIZE -1)
        // console.log(gBoard[cell.i][cell.j].isMine)
        
        // console.log(`I:  ${cell.i}, J ${cell.j}`)
        gBoard[cell.i][cell.j].isMine = true
    }
    // console.log(gBoard[cell.i][cell.j])
}


// function countNeighbors(mat, rowIdx, colIdx) {
//     var count = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i > mat.length - 1) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (j < 0 || j > mat[0].length - 1) continue
//             if (i === rowIdx && j === colIdx) continue
//             if (mat[i][j]) {
//                 count++
//             }
//         }
//     }
//     return count
// }

function countMines(mat, rowIdx, colIdx) {
    var minesCounter = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
      if (i < 0 || i > mat.length - 1) continue;
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (j < 0 || j > mat[0].length - 1) continue;
        if (i === rowIdx && j === colIdx) continue;
        if (mat[i][j].isMine) {
            minesCounter++
        }
      }
    }
    return minesCounter
  }


  function setDiff(selectedDiff = 4) {
    var diffNum = +selectedDiff.dataset.diff
    console.log(selectedDiff)
    switch(diffNum) {
        case 4:
            gLevel.MINES = 2
            break;
        case 8:
            gLevel.MINES = 12
            break;
        case 12:
            gLevel.MINES = 30
            break;
    
    }
    gLevel.SIZE =diffNum
    reset()
}


function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function updateTime() {
    var now = Date.now()
    var diff = now - gStartTime
    var secondsPast = diff / 1000
    var elTimer = document.querySelector('.timer')
    elTimer.style.display = 'block'
    elTimer.innerText = `Your time is ${secondsPast.toFixed(3)}`

}

function checkFirstClick(click) {
    
}


// function openNeighbors(mat, rowIdx, colIdx) {
    
//         for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//             if (i < 0 || i > mat.length - 1) continue
//             for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//                 if (j < 0 || j > mat[0].length - 1) continue
//                 if (i === rowIdx && j === colIdx) continue
//                 if (mat[i][j].isMine === false) {
//                     renderCell({i: i, j: j}, mat[i][j].minesAroundCount)
//                     // openNeighbors(gBoard, i, j)
//                 }
//             }
//         }
    
//     }

function checkOpenCells(board) {
  var openCounter = 0
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board[i][j].isShown) openCounter++
    }
  }
  return openCounter
}

function removeCellsOnclicks() {
  elCells = document.querySelectorAll(".cell")
  for (var i = 0; i < elCells.length; i++) {
    var cell = elCells[i]
    cell.removeAttribute("onclick");
    cell.removeAttribute("oncontextmenu");
  }
  // console.log(elCells)
}

// function renderLives(lives) {
//   var elLives = document.querySelector(".lives")
//   var strHTML = ''

//   for (var i = 0; i <lives; i++) {
//     console.log(i)
//   }
//     // strHTML += `<div class="life">${LIFE}</div>`
//     // console.log(strHTML)
 
//   // console.log(strHTML)
//   // elLives.innerHTML = strHTML
  
// }

function renderLives(lives) {
  console.log('you are alive')
  for (var idx = 0; idx< lives; i++) {
    console.log(idx)
  }
}