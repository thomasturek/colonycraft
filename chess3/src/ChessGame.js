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
  const [orientation, setOrientation] = useState("");
  const [username, setUserName] = useState("");
  const [connected, setConnection] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {

  socket.on("startGame", (fen) => {
    setFen(fen);
  });

  socket.on("connect", () => {

    if (!connected) {

      const roomName = "hello";
      setUserName("a");
      setRoom(roomName);
      socket.emit("joinRoom", roomName, "a");
      setConnection(true);
    }

  });

  socket.on("move", function (move) {
    movePiece(move);
  });

  socket.on("listen", function (move) {
    listen(move);
  });

  socket.on("setOrientation", function (orientation) {
    setOrientation(orientation);
  });

  socket.on("turn", function (turn) {
    if (isMyTurn) {
      setIsMyTurn(false);
    } else if (!isMyTurn) {
      setIsMyTurn(true);
    }
  });

  socket.on("gameover", function (result) {
    alert(`Game over. ${result}`);
  });
}, [room, orientation]);

  const movePiece = (move) => {

    if(isMyTurn) {

    const chess = new Chess(fen);
    const result = chess.move(move);

    if (result !== null) {

      setFen(chess.fen());
      setHighlight({});

      socket.emit("move", { room: room, move: move, username: username});

    }
  }
  };

  const listen = (move) => {

      const chess = new Chess(fen);
      const result = chess.move(move);

      if (result !== null) {

        setFen(chess.fen());
        setHighlight({});
      }
  };

  return (
    <div className="chessboard-wrapper">
      <div className="room-info">
        Room Info <br /><br />
        Room: {room} <br />
        <br />
        {isMyTurn
          ? `your turn (${isMyTurn})`
          : `${orientation === "white" ? "Black" : "White"}'s turn`} <br /><br />

        Chat:<br /><br />

      </div>

      <div className="chessboard">
      <Chessboard
        position={fen}
        orientation={orientation}
        onDrop={({ sourceSquare, targetSquare }) =>
          movePiece({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
          })
        }
        squareStyles={highlight}
        dropSquareStyle={{ boxShadow: "inset 0 0 1px 4px #90EE90" }}
      />
      </div>
    </div>
  );
};

export default ChessGame;
