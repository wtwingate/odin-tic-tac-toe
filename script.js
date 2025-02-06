/* Game */
function createGame() {
  const board = createBoard();
  const playerOne = createPlayer("X");
  const playerTwo = createPlayer("O");

  return { board, playerOne, playerTwo };
}

/* Board */
function createBoard() {
  const squares = [null, null, null, null, null, null, null, null, null];

  function placeMark(index, mark) {
    if (!squares[index]) {
      squares[index] = mark;
    } else {
      throw new Error(`Square ${index} is already marked.`);
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

  return { board, placeMark, hasThreeInARow, isFull };
}

/* Player */
function createPlayer(mark) {
  const mark = mark;

  return { mark };
}

/* Display Controller */
function createDisplayController() {}
