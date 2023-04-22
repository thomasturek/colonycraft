import "./Dashboard.css";
import { Link } from "react-router-dom";
import AdsComponent from "./AdsComponent";
import { useEffect } from "react";


const Dashboard = () => {

  useEffect(() => {
    const squares = document.querySelectorAll('.squarecontainer > div');
    let currentRotation = 0;
    squares.forEach(square => {
      square.addEventListener('click', () => {
        squares.forEach(otherSquare => {
          otherSquare.classList.remove('active');
        });
        square.classList.add('active');
        currentRotation += 90;
        const squareContainer = document.querySelector('.squarecontainer');
        squareContainer.style.transform = `rotate(${currentRotation}deg)`;
      });
    });
  }, []);

  return (

    <div className="dashboard">
      <head>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
     </head>

     <div className="squarecontainer">

       <div className="profile"/>

       <div className="wallet"/>

       <div className="battle"/>

       <div className="factions"/>

     </div>

      <div className="game">
      
      <h2 className="boxtitle">Battlefield</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
        <span class="material-symbols-outlined">
        swords
        </span>
          Play a Random Opponent
        </button>
      </Link>
      <Link className = "link" to="/BuildGame">
        <button className="play-button">
        <span class="material-symbols-outlined">
        group
        </span>
          Challenge a Friend
        </button>
      </Link>
      <Link className = "link" to="/Chess">
        <button className="play-button">
        <span class="material-symbols-outlined">
          computer
          </span>
          Train Against a Computer
        </button>
      </Link>
      <Link className = "link" to="/Chess">
        <button className="play-button">
        <span class="material-symbols-outlined">
        task_alt
        </span>
          Challenges
        </button>
      </Link>
      </div>

      <div className="myFriends">

      <h2 className="boxtitle">Factions</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
        <span class="material-symbols-outlined">
          flag
          </span>
          My Faction
        </button>
      </Link>
      <Link className = "link" to="/Chess">
      <button className="play-button">
      <span class="material-symbols-outlined">
      map
      </span>
        Campaigns
      </button>
      </Link>

      <Link className = "link" to="/Chess">
      <button className="play-button">
      <span class="material-symbols-outlined">
        reorder
        </span>
        Classic Tournaments
      </button>
      </Link>

      <Link className = "link" to="/Chess">
      <button className="play-button">
      <span class="material-symbols-outlined">
        patient_list
          </span>
        Global Leaderboard
      </button>
      </Link>

      </div>

      <div className="collectibleswrapper">
        <div className="profiletab">
        <h2 className="boxtitle">My Profile</h2>

        <button className="play-button">
          Multiplayer Rank: 0
        </button>

        <button className="play-button">
          0 Napoleon Tokens
        </button>

        <button className="play-button">
        <span class="material-symbols-outlined">
        settings
        </span>
          Settings
        </button>

        <button className="play-button">
        <span class="material-symbols-outlined">
          military_tech
          </span>
          Medals
        </button>

        </div>

        <div className="ad">

        <h2 className="boxtitle"> AD </h2>

        <AdsComponent dataAdSlot='X7XXXXXX5X' />

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
