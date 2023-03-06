import React from "react";
import Cell from "./Cell";
import { Player } from "../types/player";

interface BoardProps {
  board: Player[][];
  onClick: (colIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((player, colIndex) => (
            <Cell
              key={colIndex}
              player={player}
              onClick={() => onClick(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
