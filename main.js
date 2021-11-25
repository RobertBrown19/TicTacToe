let currentPlayer = "X";
let winner = null;
let row = null;
let column = null;
let aiPlayer = "O";
let firstMove = true;
let playersRow = null;
let playersColumn = null;
let aiRow = null;
let aiColumn = null;

let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function changeTurns() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  if (currentPlayer === aiPlayer){
    aiCheckMove();
  }
}

function makeTurn(row, column) {
    playersRow = row;
    playersColumn = column;
    board[row][column] = currentPlayer;
    checkWinner(playersRow, playersColumn);
}

let boardNode = document.querySelector("#board");

function handleClick(event) {
  if (event.target.className === "cell") {
    let data = event.target.dataset;
    row = parseInt(data.row);
    column = parseInt(data.col);
    let spanNode = event.target.querySelector("span");
    if (winner === null && board[row][column] === null) { // check if cell is empty
        spanNode.innerText = currentPlayer;
        makeTurn(row, column);
    } else {
        event.target.style.background = "red"; // change background of cell if not empty to let player know they clicked an invalid cell
        setTimeout(function(){event.target.style.background = "#f8f8ff"}, 200); // change background back after 0.2 second
    }
  }
}

boardNode.addEventListener("click", handleClick);

function checkWinner(row, column) {
    if (board[row][0] === currentPlayer && board[row][1] === currentPlayer && board[row][2] === currentPlayer){
        winner = currentPlayer;
        console.log ("The winner was", winner);
    }
    if (board[0][column] === currentPlayer && board[1][column] === currentPlayer && board[2][column] === currentPlayer){
        winner = currentPlayer;
        console.log ("The winner was", winner);
    } else if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        winner = currentPlayer;
        console.log ("The winner was", winner);
    } else if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        winner = currentPlayer;
        console.log ("The winner was", winner);
    } else if (!board[0].includes(null) && !board[1].includes(null) && !board[2].includes(null)){
        console.log("the game was a draw");
    } else {
        changeTurns();
    }
}

// ...Try to implement an Computer Player
function aiMakeMove(){
    if (aiColumn === 0 && aiRow === 0) {
        board[0][0] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(1) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 1 && aiRow === 0) {
        board[0][1] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(2) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 2 && aiRow === 0) {
        board[0][2] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(3) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 0 && aiRow === 1) {
        board[1][0] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(4) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 1 && aiRow === 1) {
        board[1][1] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(5) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 2 && aiRow === 1) {
        board[1][2] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(6) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 0 && aiRow === 2) {
        board[2][0] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(7) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 1 && aiRow === 2) {
        board[2][1] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(8) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    } else if (aiColumn === 2 && aiRow === 2) {
        board[2][2] = currentPlayer;
        currentCell = document.querySelector(".cell:nth-of-type(9) span");
        currentCell.innerText = currentPlayer;
        checkWinner(aiRow, aiColumn);
    }  
}
        
function aiCheckMove(){
    // If First move
        // if centre is empty take centre
        // else take corner
    if (firstMove) {
        if (board[1][1] === null) {
            aiRow = 1;
            aiColumn = 1;
            firstMove = false;
            aiMakeMove();
        } else {
            aiRow = 0;
            aiColumn = 0;
            firstMove = false;
            aiMakeMove();
        }
        return;
    } else if (!firstMove) {
        if (board[playersRow].includes(null) && !board[playersRow].includes(aiPlayer)) {
            let count = 0;
            for (let i = 0; i < 3; i += 1) {
                if (board[playersRow][i] === null) {
                    count += 1;
                }
            }
            if (count === 1) {
                playRow();
                return;
            } 
        }
        let count = 3;
        for (let i = 0; i < 3; i += 1) {
            if (board[i][playersColumn] === null || board[i][playersColumn] === aiPlayer) {
                count -= 1;
            }
        }
        if (count === 2) {
            playColumn();
            return;
        }
        if (board[0][2] === null) {
            aiRow = 0;
            aiColumn = 2;
            aiMakeMove();
        } else if (board[2][0] === null) {
            aiRow = 2;
            aiColumn = 0;
            aiMakeMove();
        } else {
            playEmptyCell();
        }
    }
}

function playRow() {
    if (playersRow === 0) {
        if (board[0][0] === null) {
            aiRow = 0;
            aiColumn = 0;
            aiMakeMove();
        } else if (board[0][1] === null) {
            aiRow = 0;
            aiColumn = 1;
            aiMakeMove();
        } else if (board[0][2] === null) {
            aiRow = 0;
            aiColumn = 2;
            aiMakeMove();
        }  
    } 
    if (playersRow === 1) {
        if (board[1][0] === null) {
            aiRow = 1;
            aiColumn = 0;
            aiMakeMove();
        } else if (board[1][1] === null) {
            aiRow = 1;
            aiColumn = 1;
            aiMakeMove();
        } else if (board[1][2] === null) {
            aiRow = 1;
            aiColumn = 2;
            aiMakeMove();
        }  
    }
    if (playersRow === 2) {
        if (board[2][0] === null) {
            aiRow = 2;
            aiColumn = 0;
            aiMakeMove();
        } else if (board[2][1] === null) {
            aiRow = 2;
            aiColumn = 1;
            aiMakeMove();
        } else if (board[2][2] === null) {
            aiRow = 2;
            aiColumn = 2;
            aiMakeMove();
        }  
    }
}
function playColumn(){
    if (playersColumn === 0) {
        if (board[0][0] === null) {
            aiRow = 0;
            aiColumn = 0;
            aiMakeMove();
        } else if (board[1][0] === null) {
            aiRow = 1;
            aiColumn = 0;
            aiMakeMove();
        } else if (board[2][0] === null) {
            aiRow = 2;
            aiColumn = 0;
            aiMakeMove();
        }
    }
    if (playersColumn === 1) {
        if (board[0][1] === null) {
            aiRow = 0;
            aiColumn = 1;
            aiMakeMove();
        } else if (board[1][1] === null) {
            aiRow = 1;
            aiColumn = 1;
            aiMakeMove();
        } else if (board[2][1] === null) {
            aiRow = 2;
            aiColumn = 1;
            aiMakeMove();
        }
    }  
    if (playersColumn === 2) {
        if (board[0][2] === null) {
            aiRow = 0;
            aiColumn = 2;
            aiMakeMove();
        } else if (board[1][2] === null) {
            aiRow = 1;
            aiColumn = 2;
            aiMakeMove();
        } else if (board[2][2] === null) {
            aiRow = 2;
            aiColumn = 2;
            aiMakeMove();
        }  
    }
}
function playEmptyCell() {
    for(let r = 0; r < 3; r += 1) {
        for (let c = 0; c < 3; c += 1) {
            if (board[r][c] === null) {
                aiRow = r;
                aiColumn = c;
                aiMakeMove();
                return;
            }
        }

    }
}