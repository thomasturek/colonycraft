import { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import socketIO from "socket.io-client";
import { Chess } from "chess.js";
import "./ChessGame.css";
import { useContext } from 'react';
import DataContext from './datacontext';

const socket = socketIO.connect("https://server.napoleonchess.xyz:443", {
  transports: ["websocket"],
  cors: { origin: "*" }
});

const ChessGame = () => {
  const { formData } = useContext(DataContext);
  console.log(formData)
  const [fen, setFen] = useState(new Chess().fen());
  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [username, setUserName] = useState("");
  const [connected, setConnection] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {

    socket.on("startGame", (fen) => setFen(fen));

    socket.on("connect", () => {
      if (!connected) {
        const userName = Math.floor(Math.random() * 900) + 100;
        setUserName(userName);
        setRoom(formData.room);
        console.log(userName);
        socket.emit("joinRoom", formData, userName);
        setConnection(true);
      }
    });

    socket.on("listen", listen);

    socket.on("setOrientation", (color) => setOrientation(color));

    socket.on("turn", (isTurn) => setIsMyTurn(isTurn));

    socket.on("gameover", (result) => alert(`Game over. ${result}`));

    return () => {
    socket.off("startGame");
    socket.off("connect");
    socket.off("listen");
    socket.off("setOrientation");
    socket.off("turn");
    socket.off("gameover");
    };
  }, [formData, room, orientation, setIsMyTurn, connected, setOrientation, setConnection]);

  const movePiece = (move) => {

  if (!isMyTurn) return;

  const chess = new Chess(fen);

  const newMove = {
    from: move.from,
    to: move.to,
  };

  if (chess.move(newMove)===null){
    return;
  }

  const piece = chess.get(move.from);

  if (piece && piece.type === 'p' && (move.to[1] === '1' || move.to[1] === '8')) {
    newMove.promotion = 'q';
  }

  chess.load(fen);

  chess.move(newMove);

  const newFen = chess.fen();
  setFen(newFen);
  socket.emit("move", { room: room, move: move, username: username, fen: newFen });

};

const listen = ({ move, fen }) => {
  setFen(fen);
};

  return (
  <div className="chessboard-wrapper">
  <head> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
     crossorigin="anonymous"></script> </head>
    <div className="room-info">
      <h2> Room Chat </h2> <br /><br />

      <input
        type="text"
        id="form-input-chat"
        className="form-input-chat"
      />
      <button className="form-submit-button">
        Send
      </button>

    </div>

    <div className="room-moves">
      <h2> Move History </h2> <br /><br />

    </div>

      <div className="wrapper">
      <Chessboard
        position={fen}
        orientation={orientation}
        onDrop={({ sourceSquare, targetSquare,  }) =>
          movePiece({
            from: sourceSquare,
            to: targetSquare,
            color: orientation === "white" ? "w" : "b",
          })
        }
        dropSquareStyle={{ boxShadow: "inset 0 0 1px 4px #90EE90" }}
        className="chessboard"
        calcWidth={({ screenWidth }) => screenWidth * 0.35}
      />
      </div>

    <div className="room-detail">
      <h2 className = "room"> Room: {room}</h2>
    </div>

    <div className="turn">
      <h2 className= "playerturn">
        {isMyTurn ? "Your turn" : "Opponent's turn"}
      </h2>
    </div>
  </div>
);
};

export default ChessGame;
