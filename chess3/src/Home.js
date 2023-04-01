import React from "react";
import './Home.css';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Chess³</h1>
      <p>Please Login with Your Polygon Wallet</p>
      <Link to="/chess">
        <button className="play-button">Login</button>
      </Link>
    </div>
  );
};

export default Home;
