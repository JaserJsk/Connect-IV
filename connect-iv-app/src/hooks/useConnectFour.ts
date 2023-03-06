import { useState, useEffect } from "react";
import { Player } from "../types/player";
import { ROWS, COLS } from "../helpers/Constants";
import {
  getBoardFromLocalStorage,
  saveBoardToLocalStorage,
  getPlayerFromLocalStorage,
  savePlayerToLocalStorage,
} from "../helpers/Storage";

import {
  CheckHorizontal,
  CheckVertical,
  BLeftToTRight,
  BRightToTLeft,
  TLeftToBRight,
  TRightToBLeft,
  CheckForDraw,
} from "../logic/CheckForWin";

const useConnectFour = () => {
  const [board, setBoard] = useState<Player[][]>(() => {
    const boardFromLocalStorage = getBoardFromLocalStorage();
    if (boardFromLocalStorage) {
      return boardFromLocalStorage;
    } else {
      return Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => null)
      );
    }
  });
  const [currentPlayer, setCurrentPlayer] = useState<Player>(() => {
    const playerFromLocalStorage = getPlayerFromLocalStorage();
    if (playerFromLocalStorage) {
      return playerFromLocalStorage;
    } else {
      return "Player 1";
    }
  });
  const [winner, setWinner] = useState<Player | null>(null);
  const [lastMove, setLastMove] = useState<{ row: number; col: number } | null>(
    null
  );

  // Save the current board state and player to local storage
  useEffect(() => {
    saveBoardToLocalStorage(board);
    savePlayerToLocalStorage(currentPlayer);
  }, [board, currentPlayer]);

  // Handle a player clicking on a column
  const handleClick = (colIndex: number) => {
    if (winner) return;

    const emptyRowIndex = findLowestEmptyRow(colIndex);
    if (emptyRowIndex === null) return;

    const updatedBoard = getUpdatedBoard(
      board,
      currentPlayer,
      emptyRowIndex,
      colIndex
    );
    setBoard(updatedBoard);

    const newWinner = checkForWin(updatedBoard, emptyRowIndex, colIndex);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "Player 1" ? "Player 2" : "Player 1");
    }

    setLastMove({ row: emptyRowIndex, col: colIndex });
  };

  // Find the lowest empty row in a given column
  const findLowestEmptyRow = (colIndex: number): number | null => {
    for (let rowIndex = ROWS - 1; rowIndex >= 0; rowIndex--) {
      if (board[rowIndex][colIndex] === null) {
        return rowIndex;
      }
    }
    return null;
  };

  // Get a new board with the current player's move added
  const getUpdatedBoard = (
    board: Player[][],
    player: Player,
    rowIndex: number,
    colIndex: number
  ): Player[][] => {
    const updatedBoard = [...board];
    updatedBoard[rowIndex][colIndex] = player;
    return updatedBoard;
  };

  const checkForWin = (
    board: Player[][],
    rowIndex: number,
    colIndex: number
  ): Player | null => {
    const player = board[rowIndex][colIndex];

    if (
      CheckHorizontal(board, player) ||
      CheckVertical(board, player) ||
      BLeftToTRight(board, player) ||
      TLeftToBRight(board, player) ||
      BRightToTLeft(board, player) ||
      TRightToBLeft(board, player)
    ) {
      return player;
    }

    if (CheckForDraw(board)) {
      return "draw";
    }

    return null;
  };

  // Handle resetting the game
  const handleReset = () => {
    setBoard(
      Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => null)
      )
    );
    setCurrentPlayer("Player 1");
    setWinner(null);
    // Added this line to clear local storage on reset
    localStorage.clear();
  };

  // Handle undoing the last move
  const handleResetLastMove = () => {
    if (lastMove && board.some((row) => row.some((col) => col !== null))) {
      const updatedBoard = getUpdatedBoard(
        board,
        null,
        lastMove.row,
        lastMove.col
      );
      setBoard(updatedBoard);
      setCurrentPlayer(currentPlayer === "Player 1" ? "Player 2" : "Player 1");
      setLastMove(null);
      // Update the player in localStorage after undoing the last move
      savePlayerToLocalStorage(
        currentPlayer === "Player 1" ? "Player 2" : "Player 1"
      );
    }
  };

  // Save the current player to local storage
  useEffect(() => {
    savePlayerToLocalStorage(currentPlayer);
  }, [currentPlayer]);

  // Load the current player from local storage
  useEffect(() => {
    const storedPlayer = getPlayerFromLocalStorage();
    if (storedPlayer) {
      setCurrentPlayer(storedPlayer);
    }
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    handleClick,
    handleReset,
    handleResetLastMove,
  };
};

export default useConnectFour;
