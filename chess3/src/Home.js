import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [isPageChanging, setIsPageChanging] = useState(false);

  function handlePageChange() {
    setIsPageChanging(true);
  }

  return (
    <div className={`home ${isPageChanging ? "slide-out" : ""}`}>
      <h1>Welcome to Chess³</h1>
      <Link to="/dashboard">
        <button className="play-button" onClick={handlePageChange}>
          Login with Polygon Wallet
        </button>
      </Link>

      <div className="popdown-menu">
        <div className="popdown-menu-item">
          <img className="piece"/>
          <h3>Why Chess³?</h3>
          <p>
          Chess³ is a unique free to play chess platform that combines traditional chess with the ability to battle and trade others for unique digital chess pieces and tokens, adding an entirely new strategic depth to the game.

          With an easy-to-use interface and seamless integration of Polygon wallets, you can start playing, collecting, and trading in a player-based economy in no time.
          </p>
        </div>
        <div className="popdown-menu-item">
        <img className="castle"/>
          <h3>Chess Kingdoms</h3>
          <p>
            Team up with your friends and defend your kingdom against players enemy armies who want to raid you! Opposing teams will battle eachother in large-scale tournaments, adding a more competitive and strategic depth to chess.
          </p>
        </div>
        <div className="popdown-menu-item">
        <img className="token"/>
          <h3>Token</h3>
          <p>
            Earn tokens and pieces for completing challenges, fighting other players, and contributing in tournaments.

            For more information about $ROOK, check out our documentation
            and FAQs at www.chess3docs.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
