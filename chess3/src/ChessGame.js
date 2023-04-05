import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import socketIO from "socket.io-client";
import { Chess } from "chess.js";
import "./ChessGame.css";

const socket = socketIO.connect("http://54.163.168.91:3000", {
  transports: ["websocket"],
  cors: {
    origin: "*",
  },
});

const ChessGame = () => {
  const [fen, setFen] = useState(new Chess().fen());
  const [highlight, setHighlight] = useState({});
  const [room, setRoom] = useState("");
  const [player, setPlayer] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {

    socket.on("connect", () => {

      if (room !== null) {
        socket.emit("joinRoom", room);
      } else {
        const roomName = prompt("Please enter a room name:");
        setRoom(roomName);
        socket.emit("joinRoom", room);
      }
    });

    socket.on("move", function (move) {
      handleMove(move);
    });

    socket.on("player", function (player) {
      setPlayer(player);
    });

    socket.on("turn", function () {
      setIsMyTurn(true);
    });

    socket.on("gameover", function (result) {
      alert(`Game over. ${result}`);
    });
  }, []);

  const handleSelect = (square) => {

    const chess = new Chess(fen);

    const moves = chess.moves({ square: square });

    const newHighlight = { [square]: "red" };

    moves.forEach((move) => {
      newHighlight[move] = "green";
    });

    setHighlight({ ...highlight, ...newHighlight });
  };

  const handleMove = (move) => {
    const chess = new Chess(fen);

    setFen(chess.fen());
    setHighlight({});

    setIsMyTurn(true);
  };

  const movePiece = (move) => {
    const chess = new Chess(fen);

    setFen(chess.fen());
    setHighlight({});

    socket.emit("move", { room, move });

    setIsMyTurn(false);
  };

  return (
      <div className="chessboard-wrapper">
        <div className="room-info">
          Room: {room}
          <br />
          It is {isMyTurn ? `your turn (${player})` : `${player === 'white' ? 'black' : 'white'}'s turn`}
        </div>
        <Chessboard
          position={fen}
          orientation={player}
          onSquareClick={handleSelect}
          onDrop={(move) => movePiece({ from: move.sourceSquare, to: move.targetSquare, promotion: "q" })}
          squareStyles={highlight}
          dropSquareStyle={{ boxShadow: "inset 0 0 1px 4px #90EE90" }}
          className="chessboard"
        />

      </div>
    );
};

export default ChessGame;
