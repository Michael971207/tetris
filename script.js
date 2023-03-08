const CELL_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const COLORS = ["#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"];

const TETROMINOS = [
  { shape: [[1, 1], [1, 1]], color: 1 },
  { shape: [[1, 1, 1, 1]], color: 2 },
  { shape: [[1, 1, 0], [0, 1, 1]], color: 3 },
  { shape: [[0, 1, 1], [1, 1, 0]], color: 4 },
  { shape: [[0, 1, 0], [1, 1, 1]], color: 5 },
  { shape: [[1, 0, 0], [1, 1, 1]], color: 6 },
  { shape: [[0, 0, 1], [1, 1, 1]], color: 7 }
];

let board = new Array(BOARD_HEIGHT).fill().map(() => new Array(BOARD_WIDTH).fill(0));
let currentTetromino = null;
let gameLoop = null;

function init() {
  const canvas = document.getElementById("canvas");
  canvas.width = CELL_SIZE * BOARD_WIDTH;
  canvas.height = CELL_SIZE * BOARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  drawBoard(ctx);
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      moveTetromino(-1);
      break;
    case 38: // up arrow
      rotateTetromino();
      break;
    case 39: // right arrow
      moveTetromino(1);
      break;
    case 40: // down arrow
      moveTetromino(0, 1);
      break;
  }
}

function drawBoard(ctx) {
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      drawCell(ctx, j, i, COLORS[board[i][j]]);
    }
  }
}

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  ctx.strokeStyle = "#333333";
  ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function generateRandomTetromino() {
  const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
  const tetromino = TETROMINOS[randomIndex];
  const shape = tetromino.shape;
  const color = tetromino.color;
  return {
    shape: shape,
    color: color,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
    y: 0
  };
}

function addTetrominoToBoard() {
  for (let i = 0; i < currentTetromino.shape.length; i++) {
    for (let j = 0; j < currentTetromino.shape[i].length; j++) {
      if
