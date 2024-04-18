import React, { useState } from "react";
import './App.css';
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import { ResetBoardButton } from "./components/ResetBoardButton";
import { ResetScoreBoardButton } from "./components/ResetScoreBoardButton";

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);

  const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const handleBoxClick = (boxIdx) => {
    
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O";
      } else {
        return value;
      }
    })

    const winner = checkWinner(updatedBoard);
    if (winner) {
      if(winner === "O") {
        let {oScore} = scores;
        oScore += 1
        setScores({...scores, oScore})
      } else {
        let {xScore} = scores;
        xScore += 1
        setScores({...scores, xScore})
      }
    }
    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i=0; i < winningConditions.length; i++) {
      const [x,y,z] = winningConditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setXPlaying(true)
  }

  const resetScoreBoard = () => {
    setGameOver(false)
    setBoard(Array(9).fill(null));
    setXPlaying(true);
    setScores({xScore: 0, oScore: 0})
  }

  return (
    <div className="App">
      <h1 className="title">Tic-Tac-Toe</h1>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <ResetScoreBoardButton resetScoreBoard={resetScoreBoard} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetBoardButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
