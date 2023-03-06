import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Board from "../components/Board";
import useConnectFour from "../hooks/useConnectFour";

const Game: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    handleClick,
    handleReset,
    handleResetLastMove,
  } = useConnectFour();

  return (
    <Box sx={{ m: 6 }}>
      <Typography variant="h3" gutterBottom>
        Connect 4
      </Typography>
      {winner ? (
        <>
          <Typography variant="h4" gutterBottom>
            {winner === "draw" ? "Draw!" : `${winner} wins!`}
          </Typography>
          <Button variant="contained" color="success" onClick={handleReset}>
            Play Again
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Current player: {currentPlayer}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleResetLastMove}
          >
            Undo Move
          </Button>
        </>
      )}
      <Board board={board} onClick={handleClick} />
    </Box>
  );
};

export default Game;
