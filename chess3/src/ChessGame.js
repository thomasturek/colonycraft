import React, { useState } from "react";
import Chessboard from 'chessboardjsx';
import io from "socket.io-client";
import { Chess } from 'chess.js';
import './ChessGame.css';

const socket = io("ec2-54-163-168-91.compute-1.amazonaws.com");

const ChessGame = () => {

  const [fen, setFen] = useState(new Chess().fen());
  const [highlight, setHighlight] = useState({});
  const [room, setRoom] = useState(""); // current room
  const [player, setPlayer] = useState(""); // current player (white or black)

  useEffect(() => {
    socket.on("connect", () => {
      setRoom("exampleRoom"); // replace with your desired room name
      socket.emit("joinRoom", "exampleRoom"); // replace with your desired room name
    });
  }, []);

  useEffect(() => {
    socket.on("move", (data) => {
      handleMove(data);
    });
  }, [fen]);

  const handleSelect = (square) => {
    const chess = new Chess(fen);

    const moves = chess.moves({ square: square });

    const newHighlight = { [square]: 'yellow' };

    moves.forEach((move) => {
      newHighlight[move] = 'green';
    });

    setHighlight(newHighlight);
  };

  const handleMove = (move) => {
  const chess = new Chess(fen);

  try {
    const result = chess.move(move);

    if (result === null) {
      throw new Error("Invalid move");
    }

    setFen(chess.fen());
    setHighlight({});
  } catch (error) {
    console.log(error.message);
    // Revert the piece to its original square
    setFen(chess.fen());
    setHighlight({});
  }
  socket.emit("move", move);
};

  return (
    <div className="chessboard-wrapper">
      <Chessboard
        position={fen}
        onSquareClick={handleSelect}
        onDrop={(move) => handleMove({ from: move.sourceSquare, to: move.targetSquare, promotion: "q" })}
        squareStyles={highlight}
        dropSquareStyle={{ boxShadow: "inset 0 0 1px 4px #90EE90" }}
        className="chessboard"
      />
    </div>
  );
};

export default ChessGame;
