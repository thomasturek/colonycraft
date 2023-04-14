import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <h1 className="welcomesign">Welcome, Player</h1>

      <div className="game">

      <h2 className="boxtitle">Arena</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
          Challenge a Random Opponent
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
      </div>
      <div className="myFriends">

      <h2 className="boxtitle">Factions</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
          My Faction
        </button>
      </Link>
      <Link className = "link" to="/Chess">
      <button className="play-button">
        Campaigns
      </button>
      </Link>

      <Link className = "link" to="/Chess">
      <button className="play-button">
        View Factions
      </button>
      </Link>

      </div>

      <div className="collectibleswrapper">
        <div className="myCollectibles">
        <h2 className="boxtitle">My Profile</h2>

        <button className="play-button">
          Settings
        </button>

        <button className="play-button">
          Achievments
        </button>

        </div>

        <div className="wallet">

        <h2 className="boxtitle"> AD </h2>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
        crossorigin="anonymous"></script>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
