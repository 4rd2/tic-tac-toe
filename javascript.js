//Have 3 three objects: Gameboard, Player, and Game


//Player Object
function Player (name, symbol) {
    return {name, symbol};
}

//Creates the board and functionality of the board
function Gameboard() {
    //Creates the board
    let rows = 3;
    let cols = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = "";
        }
    }
    //Creates a reset function that sets the board back to 0;
    function reset() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = "";
            }
        }
    }
    return {board,reset};
}

//Game Object
function Game(playerX, playerO, board) {
    let currentPlayer = playerX;

    function changePlayer() {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }

    //Makes a move
    function makeMove(row, col) {
        if (board[row][col] !== "") return;
        board[row][col] = currentPlayer.symbol;
        changePlayer();
    }

    //Checks if either player has won.
    function checkWin() {
        let win = false;
        for (let i = 0; i < board[0].length; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
                win = true;
            }
            else if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
                win = true;
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            win = true;
        }
        else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
            win = true;
        }
        return win;
    }

    return {changePlayer, makeMove, checkWin};
}

//Changes the display
function displayController(game, gameboard) {
    //C
    const board = gameboard.board;
    const main = document.querySelector("main");
    function attachListeners() {

        document.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", () => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);

                if (board[row][col] === "") {
                    game.makeMove(row, col);
                    cell.textContent = board[row][col];

                    if (game.checkWin()) {
                        const message = document.createElement("p");
                        message.textContent = `${board[row][col]} wins!`;
                        main.appendChild(message);
                        const resetBtn = document.createElement("button");
                        resetBtn.textContent = 'New Game';
                        main.appendChild(resetBtn);
                    }
                }
            });
        });
        const btn = document.querySelector(button);
        btn.addEventListener("click", () => {
            gameboard.reset();
        })
    }

    return { attachListeners };
}

const gameboard = Gameboard();
const player1 = Player("Test", "X");
const player2 = Player("Test2", "O");
const game = Game(player1, player2, gameboard.board);
const controller = displayController(game, gameboard);
controller.attachListeners();