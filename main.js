//this is such a mess smh
//init... I should use an object for this huh
let board = []
let WIDTH = 3
let HEIGHT = 3
let maxDigits = 1
let gameOver = false
let maxNum = 2
let hasChanged = true
let squaresUsed = 0
resetBoard()

function draw() { //converts board iand prints as string
  let boardString = ''
  board.map((rowArray, row) => {
    let tempString = ''
    rowArray.map((obj) => {
      let spaces = ''
      if (obj == 0 || numDigits(obj) < maxDigits)
        for (let i = 0; i < (obj == 0 ? maxDigits : maxDigits - numDigits(obj)); i++) {
          spaces += ' '
        }
      tempString += `[ ${spaces}${obj > 1 ? obj : ''} ]`
    })
    boardString += '\n' + tempString
  })
  if (!gameOver) {
    console.clear()
    console.info(boardString) //change this function for other colors!
  } else {
    console.error("Game over! You reached " + maxNum + '!\nClick the reset button or "r" to restart.')
  }
}
function resetBoard() {
  squaresUsed = 1
  board = getNewBoard()
  gameOver = false
  maxNum = 2
  maxDigits = numDigits(maxNum)
  hasChanged = true
  draw()
}
function getNewBoard() { //completely reinitializes the board... purely
  let newBoard = []
  for (let i = 0; i < HEIGHT; i++) {
    let temp = []
    for (let j = 0; j < WIDTH; j++)
      temp.push(0)
    newBoard.push(temp)
  }
  newBoard[Math.floor(Math.random() * HEIGHT)][Math.floor(Math.random() * WIDTH)] = 2
  return newBoard
}

//iter rows
function moveRight() {
  board.map((obj, j) => {
    for (let i = WIDTH - 2; i >= 0; i--) {
      if (obj[i] != 0) {
        if (obj[i + 1] == 0) {
          board[j][i + 1] = board[j][i]
          board[j][i] = 0
          i += 2
          hasChanged = true
        } else if (board[j][i + 1] == board[j][i]) {
          board[j][i + 1] += board[j][i]
          if (board[j][i] * 2 > maxNum) {
            maxNum = board[j][i] * 2
            maxDigits = numDigits(maxNum)
          }
          squaresUsed--
          board[j][i] = 0
          i++
          hasChanged = true
        }
      }
    }
  })
  addNewTile()
  draw()
}

function moveLeft() {
  board.map((obj, j) => {
    for (let i = 1; i < WIDTH; i++) {
      if (board[j][i] != 0) { //zeroes don't move
        if (board[j][i - 1] == 0) {
          board[j][i - 1] = board[j][i]
          board[j][i] = 0
          i -= 2 //checks to see after movement
          hasChanged = true
        } else if (board[j][i - 1] == board[j][i]) {
          board[j][i - 1] += board[j][i]
          if (board[j][i] * 2 > maxNum) {
            maxNum = board[j][i] * 2
            maxDigits = numDigits(maxNum)
          }
          squaresUsed--
          board[j][i] = 0
          i-- //checks same square
          hasChanged = true
        }
      }
    }
  })
  addNewTile()
  draw()
}

//iter columns
function moveUp() {
  for (let i = 0; i < WIDTH; i++) { //iterates l->r
    for (let j = 1; j < HEIGHT; j++) {
      if (j != 0 && board[j][i] != 0) { //impossible for these squares to move
        if (board[j - 1][i] == 0) {
          board[j - 1][i] = board[j][i]
          board[j][i] = 0
          j -= 2
          hasChanged = true
        } else if (board[j - 1][i] == board[j][i]) {
          board[j - 1][i] += board[j][i]
          if (board[j][i] * 2 > maxNum) {
            maxNum = board[j][i] * 2
            maxDigits = numDigits(maxNum)
          }
          squaresUsed--
          board[j][i] = 0
          hasChanged = true
        }
      }
    }
  }
  addNewTile()
  draw()
}
function moveDown() {
  for (let i = 0; i < WIDTH; i++) { //iterates l->r
    for (let j = HEIGHT - 2; j >= 0; j--) {
      if (j < HEIGHT - 1 && board[j][i] != 0) { //impossible for these squares to move
        if (board[j + 1][i] == 0) {
          board[j + 1][i] = board[j][i]
          board[j][i] = 0
          j += 2
          hasChanged = true
        } else if (board[j + 1][i] == board[j][i]) {
          board[j + 1][i] += board[j][i]
          if (board[j][i] * 2 > maxNum) {
            maxNum = board[j][i] * 2
            maxDigits = numDigits(maxNum)
          }
          squaresUsed--
          board[j][i] = 0
          j++
          hasChanged = true
        }
      }
    }
  }
  addNewTile()
  draw()
}


function addNewTile() { //there's surely a more efficient way to do this but w/e
  checkLoss()
  while (!gameOver && hasChanged) { //this while loop will take longer has size of board increases and squares become filled
    let a = [Math.floor(Math.random() * HEIGHT), Math.floor(Math.random() * WIDTH)]
    if (board[a[0]][a[1]] == 0) {
      board[a[0]][a[1]] = 2
      squaresUsed++
      break
    }
  }
  if (gameOver)
    console.error(`Game over! You reached ${maxNum}!`)
  hasChanged = false
}

function changeWidth(n) {
  if (WIDTH > 1 || n >= 1) {
    WIDTH += n
    resetBoard()
  } else {
    console.clear()
    console.error("Width can't be decreased!")
  }
}
function changeHeight(n) {
  if (HEIGHT > 1 || n >= 1) {
    HEIGHT += n;
    resetBoard();
  } else {
    console.clear()
    console.error("Height can't be decreased!")
  }
}
function checkLoss() {
  if (squaresUsed != WIDTH * HEIGHT) {
    gameOver = false
    return
  }
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (i % 2 == 0 && j % 2 == 0) {
        if (board[i][j + 1] == board[i][j]) {
          gameOver = false
          return
        }
      } else if (i % 2 == 1 && j % 2 == 1) {
        gameOver == false
        return
      }
    }
  }
  gameOver = true
}
function testFunction() {
  board = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2]
  ]
  WIDTH = 4; HEIGHT = 4
  draw()
}