import React, { useState } from "react";
import "./Home.css";
import useTypewriterEffect from "./typewriter";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: ""
  });

  const typewriterText = useTypewriterEffect(
   [
     "Chess with digital ownership",
     "Chess with web3",
     "Chess with community",
     "Chess with substainable play to earn mechanics",
     "Chess with dynamic player tournaments"
   ],
   100
 );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    navigate("/dashboard");
  };

  function togglePopup() {
  setShowPopup(!showPopup);
}

  return (
    <div className="homepage">
    <head> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
     crossorigin="anonymous"></script> </head>
      <h1 className="title">Welcome to Napoleon.</h1>
      <h2 className="subtitle">{typewriterText}</h2>
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
        <button className="button" onClick={togglePopup}>
          Create an Account
        </button>
        <form>
        <button className="button" formaction="http://docs.napoleonchess.xyz">
          The Napoleon Docs
        </button>
        </form>
        <form>
        <button className="button" formaction="https://discord.gg/9XhNSdRg">
          Join Our Discord
        </button>
        </form>
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
                Email
              </label>
              <input
                type="text"
                id="username"
                className="form-input-username"
                value={formData.name}
                onChange={handleChange}
              /> <br/> <br/>
            <label htmlFor="name" className="form-label">
              I agree to terms and conditions of Napoleon Chess
            </label>
            <input type="checkbox" id="myCheckbox" name="myCheckbox" value="true"/>

            <button className="button" formaction="https://discord.gg/9XhNSdRg">
              Submit
            </button>

            </form>
          </div>
        )}

        <div className = "point" >

        <h2 className="explanation">Why Napoleon?</h2>
        <h3 className="text"> Napoleon is a unique chess platform that combines traditional chess with the ability to battle and trade others for unique digital chess pieces and tokens, adding an entirely new strategic depth to the game.

        <br/> <br/>

        With an easy-to-use interface and seamless integration of blockchain, you can start playing, collecting, and trading in a substainable player-based economy with real digital ownership.

        <br/> <br/>

        Chess has an endured history of 1400 years. It's time to reimagine this classic game with the help of web3.

        </h3>

        <div class="chess-piece"></div>

        </div>

        <div className = "point2" >

        <h2 className="explanation">Chess Campaigns</h2>
        <h3 className="text"> Team up with your friends and defend your empire against enemy armies who want to conquer you! Opposing factions will battle in large-scale tournaments for dynamic territories, adding strategic depth to chess.

        <br/> <br/>

      Players contribute to their faction by capturing and holding territories, and factions gain bonuses based on the number of territories they control.

        </h3>

        <div className="faction"/>

        </div>

        <div className = "point3" >

        <h2 className="explanation">The Napoleon Token</h2>
        <h3 className="text"> Earn tokens and unique chess pieces for completing challenges, fighting other players, and contributing to your faction in tournaments and campaigns. Token value is derived from advertising on the Napoleon platform.

        <br/> <br/>

        The token's symbol is inspired by the Napoleonic Imperial Eagle and blockchain technology.

        <br/> <br/>

        For more information about $NPLN, you can check out our documentation and FAQs at docs.napoleonchess.xyz/token.

        </h3>

        <div className="token"/>

        </div>

    </div>
  );
};

export default Home;
