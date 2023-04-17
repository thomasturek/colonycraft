import "./Dashboard.css";
import { Link } from "react-router-dom";
import AdsComponent from "./AdsComponent";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <head> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
     crossorigin="anonymous"></script> </head>

      <div className="game">

      <h2 className="boxtitle">Battlefield</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
          Play a Random Opponent
        </button>
      </Link>
      <Link className = "link" to="/BuildGame">
        <button className="play-button">
          Challenge a Friend
        </button>
      </Link>
      <Link className = "link" to="/Chess">
        <button className="play-button">
          Train Against a Computer
        </button>
      </Link>
      <Link className = "link" to="/Chess">
        <button className="play-button">
          Challenges
        </button>
      </Link>
      </div>
      <div className="myFriends">

      <h2 className="boxtitle">Factions</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
          My Faction
        </button>
      </Link>
      <Link className = "link" to="/Chess">
      <button className="play-button" background-image="./images/factions.png">
        Campaigns
      </button>
      </Link>

      <Link className = "link" to="/Chess">
      <button className="play-button">
        Classic Tournaments
      </button>
      </Link>

      <Link className = "link" to="/Chess">
      <button className="play-button">
        Global Leaderboard
      </button>
      </Link>

      </div>

      <div className="collectibleswrapper">
        <div className="profile">
        <h2 className="boxtitle">My Profile</h2>

        <button className="play-button">
          Multiplayer Rank: 0
        </button>

        <button className="play-button">
          0 Napoleon Tokens
        </button>

        <button className="play-button">
          Settings
        </button>

        <button className="play-button">
          Medals
        </button>

        </div>

        <div className="wallet">

        <h2 className="boxtitle"> AD </h2>

        <AdsComponent dataAdSlot='X7XXXXXX5X' />

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
