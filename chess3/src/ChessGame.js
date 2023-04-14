import { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import socketIO from "socket.io-client";
import { Chess } from "chess.js";
import "./ChessGame.css";
import { useLocation } from "react-router-dom";

const socket = socketIO.connect("https://54.163.168.91:3000", {
  transports: ["websocket"],
  cors: { origin: "*" }
});

const ChessGame = () => {
  const location = useLocation();
  const { formData } = location.state || {};
  console.log(formData)
  const [fen, setFen] = useState(new Chess().fen());
  const [highlight, setHighlight] = useState({});
  const [room, setRoom] = useState("");
  const [orientation, setOrientation] = useState("");
  const [username, setUserName] = useState("");
  const [connected, setConnection] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);

  useEffect(() => {
    socket.on("startGame", (fen) => setFen(fen));

    socket.on("connect", () => {
      if (!connected) {
        const roomName = "Room1";
        setUserName("a");
        setRoom(roomName);
        socket.emit("joinRoom", roomName, "a");
        setConnection(true);
      }
    });

    socket.on("listen", listen);

    socket.on("setOrientation", (color) => setOrientation(color));

    socket.on("turn", (isTurn) => setIsMyTurn(isTurn));

    socket.on("gameover", (result) => alert(`Game over. ${result}`));
  }, [room, orientation, setIsMyTurn, connected, setOrientation, setConnection]);

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
  setHighlight({});

};

const listen = ({ move, fen }) => {
  setFen(fen);
};

  return (
  <div className="chessboard-wrapper">
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
