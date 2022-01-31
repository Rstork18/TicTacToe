import React, { useState, useEffect } from 'react';
import './JogoDaVelha.css';

function JogoDaVelha() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard)

  const [currentPlayer, setCurrentPlayer] = useState("O")
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {

    if (winner) {
      console.log("Fim de Jogo");
      return null;
    }

    if (board[index] !== "") {
      console.log("Posição ocupada");
      return null;
    }

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer
        : item));

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const CheckWinner = () => {
    const PossibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    PossibleWaysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) setWinner("O");
      if (cells.every(cell => cell === "X")) setWinner("X");
    });

    checkDraw();
  }

  const checkDraw = () => {
    if (board.every(item => item !== "")) {
      setWinner("E")
    }
  }


  useEffect(CheckWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("X");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}>
            {item}
          </div>
        ))}
      </div>

      {winner &&
        <footer>
          {winner === "E" ?
            <h2 className='winnerMessage'>
              <span className={winner}> Empatou! </span>
            </h2>
            :
            <h2 className='winnerMessage'>
              <span className={winner}> {winner} </span>
              venceu! Próximo Jogador será <span className={winner}> {winner}</span>
            </h2>

          }
          <div className='div'>
            <button className='qqq' onClick={resetGame}> Recomeçar </button>

          </div>
        </footer>
      }
    </main>
  );
}

export default JogoDaVelha;