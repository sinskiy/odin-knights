const SIZE = 7;

const array = populateArray();
fillArray();

function fillArray() {
  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      const moves = getPossibleMoves(x, y);
      array[x][y] = moves;
    }
  }
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

      if (array[nextX] === undefined || array[nextX][nextY] === undefined)
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
