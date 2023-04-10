import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    favoriteColor: "",
    favoriteFood: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // do something with the form data
  };

  function handlePageChange() {
    setIsPageChanging(true);
  }

  function togglePopup() {
  setShowPopup(!showPopup);
}

  return (
    <div className="home">
      <h1 className="title">Welcome to Chess³</h1>
      <h2 className="subtitle">Chess reimagined on the blockchain.</h2>
      <Link to="/dashboard">
        <button className="play-button" onClick={handlePageChange}>
          Login with Polygon Wallet
        </button>
      </Link>
        <button className="mint-button" onClick={togglePopup}>
          No Account? Mint a New Board!
        </button>
        {showPopup && (
          <div className="popup">
            <form>
            <h2 className="form-title">Create an Account</h2>
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input-username"
                value={formData.name}
                onChange={handleChange}
              /> <br/> <br/>
            <label htmlFor="name" className="form-label">
              I agree to terms and conditions of Chess3
            </label>
            <input type="checkbox" id="myCheckbox" name="myCheckbox" value="true"/>
            </form>
          </div>
        )}

      <div className="popdown-menu">
        <div className="popdown-menu-item">
          <h3>Why Chess³?</h3>
          <p>
          Chess³ is a unique chess platform that combines traditional chess with the ability to battle and trade others for unique digital chess pieces and tokens, adding an entirely new strategic depth to the game.
          <br/> <br/>
          With an easy-to-use interface and seamless integration of Polygon wallets, you can start playing, collecting, and trading in a player-based economy in no time.
          </p>
        </div>
        <div className="popdown-menu-item2">
          <h3>Chess Kingdoms</h3>
          <p>
            Team up with your friends and defend your kingdom against enemy armies who want to raid you! Opposing factions will battle in large-scale tournaments for dynamic territories, adding strategic depth to chess.
            <br/> <br/>
            Players contribute to their faction by capturing and holding territories, and factions gain bonuses based on the number of territories they control.
          </p>
        </div>
        <div className="popdown-menu-item3">
          <h3>Token</h3>
          <p>
            Earn tokens and unique chess pieces for completing challenges, fighting other players, and contributing to your guild in tournaments and wars.
            <br/> <br/>
            For more information about $MATE, you can check out our documentation and FAQs at www.chess3docs.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
