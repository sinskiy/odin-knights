const SIZE = 8;

const emptyBoard = populateArray();
const array = fillArray(emptyBoard);

function knightMoves(start, end) {
  const queue = [start];

  let histories = [[start]];
  while (queue.length) {
    const coords = queue.shift();
    const moves = array[coords[0]][coords[1]];

    let newHistories = [];
    for (const i in moves) {
      const move = [...moves[i]];

      const thisHistory = [
        ...histories.find((history) => {
          const last = history.at(-1);
          return last[0] === coords[0] && last[1] === coords[1];
        }),
      ];
      thisHistory.push([...move]);

      if (move[0] === end[0] && move[1] === end[1]) {
        return thisHistory;
      }

      queue.push([...move]);

      newHistories.push([...thisHistory]);
    }
    histories = [...histories, ...newHistories];
  }

  return "not found";
}

function fillArray(array) {
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      const moves = getPossibleMoves(x, y);
      array[x][y] = moves;
    }
  }
  return array;
}

function getPossibleMoves(x, y) {
  const COORDS_CHANGES = [
    [1, 2],
    [2, 1],
  ];
  const COORDS_MULTIPLIERS = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  const moves = [];
  for (const change of COORDS_CHANGES) {
    for (const multiplier of COORDS_MULTIPLIERS) {
      const nextX = x + change[0] * multiplier[0];
      const nextY = y + change[1] * multiplier[1];

      // if there is no cell at these coordinates
      if (
        emptyBoard[nextX] === undefined ||
        emptyBoard[nextX][nextY] === undefined
      )
        continue;
      moves.push([nextX, nextY]);
    }
  }

  return moves;
}

function populateArray() {
  const array = Array(SIZE);
  for (let i = 0; i < SIZE; i++) {
    array[i] = Array(SIZE).fill([]);
  }
  return array;
}
