import React from "react";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Player } from "../types/player";

interface CellProps {
  player: Player;
  onClick: () => void;
}

const useStyles = makeStyles({
  cell: {
    width: 100,
    height: 100,
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "blue",
  },
  player1: {
    width: 80,
    height: 80,
    borderRadius: "100%",
    backgroundColor: "red",
  },
  player2: {
    width: 80,
    height: 80,
    borderRadius: "100%",
    backgroundColor: "yellow",
  },
});

const Cell: React.FC<CellProps> = ({ player, onClick }) => {
  const classes = useStyles();

  const playerClassName =
    player === "Player 1" ? classes.player1 : classes.player2;

  return (
    <Box className={classes.cell} onClick={onClick}>
      {player && <Box className={playerClassName} />}
    </Box>
  );
};

export default Cell;
