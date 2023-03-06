import { Player } from "../types/player";
import { ROWS, COLS } from "../helpers/Constants";

// Check for horizontal win
export const CheckHorizontal = (board: Player[][], player: Player): boolean => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col <= COLS - 4; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

// Check for vertical win
export const CheckVertical = (board: Player[][], player: Player): boolean => {
  for (let row = 0; row <= ROWS - 4; row++) {
    for (let col = 0; col < COLS; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

// Check for diagonal win (bottom-left to top-right)
export const BLeftToTRight = (board: Player[][], player: Player): boolean => {
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

// Check for diagonal win (bottom-right to top-left)
export const BRightToTLeft = (board: Player[][], player: Player): boolean => {
  for (let row = 3; row < ROWS; row++) {
    for (let col = 3; col < COLS; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col - 1] === player &&
        board[row - 2][col - 2] === player &&
        board[row - 3][col - 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

// Check for diagonal win (top-left to bottom-right)
export const TLeftToBRight = (board: Player[][], player: Player): boolean => {
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

// Check for diagonal win (top-right to bottom-left)
export const TRightToBLeft = (board: Player[][], player: Player): boolean => {
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col - 1] === player &&
        board[row + 2][col - 2] === player &&
        board[row + 3][col - 3] === player
      ) {
        return true;
      }
    }
  }
  return false;
};

// Check for draw
export const CheckForDraw = (board: Player[][]): boolean => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
};
