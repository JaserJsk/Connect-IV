import { Player } from "../types/player";

const LOCAL_STORAGE_KEY = "connect-4-board";
const LOCAL_STORAGE_PLAYER_KEY = "connect-4-player";

export const getBoardFromLocalStorage = (): Player[][] | null => {
  const storedBoard = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedBoard) {
    return JSON.parse(storedBoard);
  } else {
    return null;
  }
};

export const saveBoardToLocalStorage = (board: Player[][]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
};

export const getPlayerFromLocalStorage = (): Player | null => {
  const storedPlayer = localStorage.getItem(LOCAL_STORAGE_PLAYER_KEY);
  if (storedPlayer) {
    return JSON.parse(storedPlayer);
  } else {
    return null;
  }
};

export const savePlayerToLocalStorage = (player: Player): void => {
  localStorage.setItem(LOCAL_STORAGE_PLAYER_KEY, JSON.stringify(player));
};
