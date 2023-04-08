import React, { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <h1 className="welcomesign">Welcome, Player</h1>
      <h3 className="balance"> Balance: 100 $R</h3>
      <Link to="/chess">
        <button className="play-button">
          Play a Random Opponent
        </button>
      </Link>
      <Link to="/chess">
        <button className="play-button">
          Play a Friend
        </button>
      </Link>
      <Link to="/chess">
        <button className="play-button">
          My Digital Collectibles
        </button>
      </Link>
      <Link to="/chess">
        <button className="play-button">
          Challenges
        </button>
      </Link>
      <Link to="/chess">
        <button className="play-button">
          Chess Kingdoms
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
