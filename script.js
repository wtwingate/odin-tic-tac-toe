let game = createGame();

const displayController = createDisplayController();
displayController.render(game);

const squares = document.querySelectorAll(".square");
for (const square of squares) {
  square.addEventListener("click", () => {
    const index = square.dataset.index;
    try {
      game.takeTurn(index);
    } catch (error) {
      displayController.showError(error.message);
    }
    displayController.render(game);
  });
}

const resetButton = document.querySelector("button");
resetButton.addEventListener("click", () => {
  game = createGame();
  displayController.clear();
});

/* Game */
function createGame() {
  const board = createBoard();
  const playerOne = createPlayer("Player 1", "X");
  const playerTwo = createPlayer("Player 2", "O");
  let currentPlayer = playerOne;
  let winner = null;
  let over = false;

  function takeTurn(index) {
    if (over) return;

    board.placeMark(index, currentPlayer.mark);
    if (board.hasThreeInARow(currentPlayer.mark)) {
      winner = currentPlayer;
      over = true;
    } else if (board.isFull()) {
      over = true;
    } else {
      switchPlayer();
    }
  }

  function isOver() {
    return over;
  }

  function results() {
    if (winner) {
      return `${winner.name} wins!`;
    } else {
      return "That's a tie!";
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  return { board, playerOne, playerTwo, takeTurn, isOver, results };
}

/* Board */
function createBoard() {
  const squares = [null, null, null, null, null, null, null, null, null];

  function placeMark(index, mark) {
    if (!squares[index]) {
      squares[index] = mark;
    } else {
      throw new Error("That square is already marked!");
    }
  }

  function hasThreeInARow(mark) {
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const row of rows) {
      if (
        squares[row[0]] === mark &&
        squares[row[1]] === mark &&
        squares[row[2]] === mark
      ) {
        return true;
      }
    }
    return false;
  }

  function isFull() {
    return !squares.includes(null);
  }

  function print() {
    const board = `
      ${squares[0] || " "} | ${squares[1] || " "} | ${squares[2] || " "}
      ---------
      ${squares[3] || " "} | ${squares[4] || " "} | ${squares[5] || " "}
      ---------
      ${squares[6] || " "} | ${squares[7] || " "} | ${squares[8] || " "}
    `;

    console.log(board);
  }

  return { squares, placeMark, hasThreeInARow, isFull, print };
}

/* Player */
function createPlayer(name, mark) {
  return { name, mark };
}

/* Display Controller */
function createDisplayController() {
  function render(game) {
    const playerOne = document.querySelector("#player-one");
    playerOne.textContent = `X: ${game.playerOne.name}`;

    const playerTwo = document.querySelector("#player-two");
    playerTwo.textContent = `O: ${game.playerTwo.name}`;

    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
      const index = square.dataset.index;
      if (game.board.squares[index]) {
        square.textContent = game.board.squares[index];
      } else {
        square.textContent = "";
      }
    }

    if (game.isOver()) {
      showMessage(game.results());
    }
  }

  function clear() {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
      square.textContent = "";
    }
    showMessage("");
  }

  function showMessage(message) {
    const messageDisplay = document.querySelector(".message-display");
    messageDisplay.textContent = message;
  }

  function showError(message) {
    const messageDisplay = document.querySelector(".message-display");
    messageDisplay.textContent = message;
    setTimeout(() => {
      messageDisplay.textContent = "";
    }, 3000);
  }

  return { render, clear, showMessage, showError };
}
