import React, {useEffect, useState} from "react";
import Chessboard from 'chessboardjsx';
import socketIO from 'socket.io-client';
import { Chess } from 'chess.js';
import './ChessGame.css';

const socket = socketIO.connect('http://localhost:8080');

const ChessGame = () => {

  const [fen, setFen] = useState(new Chess().fen());
  const [highlight, setHighlight] = useState({});
  const [room, setRoom] = useState(""); // current room
  const [player, setPlayer] = useState(""); // current player (white or black)
  const [chatInput, setChatInput] = useState(""); // chat input text
  const [chatHistory, setChatHistory] = useState([]); // chat history

  useEffect(() => {
    socket.on("connect", () => {
      setRoom("exampleRoom"); // replace with your desired room name
      socket.emit("joinRoom", "exampleRoom"); // replace with your desired room name
    });

    socket.on("move", (data) => {
      handleMove(data);
    });

    socket.on("chat", (data) => {
      setChatHistory([...chatHistory, data]);
    });
  }, []);

  const handleSelect = (square) => {
  const chess = new Chess(fen);

  const moves = chess.moves({ square: square });

  const newHighlight = { [square]: 'yellow' };

  moves.forEach((move) => {
    newHighlight[move] = 'green';
  });

  setHighlight({...highlight, ...newHighlight});
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

const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const data = {
        message: chatInput,
        sender: player,
        timestamp: Date.now(),
      };
      socket.emit("chat", data);
      setChatInput("");
    }
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
