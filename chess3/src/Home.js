import React, { useState } from "react";
import "./Home.css";
import useTypewriterEffect from "./typewriter";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const typewriterText = useTypewriterEffect(
   [
     "Chess with digital ownership",
     "Chess with web3",
     "Chess with community",
     "Chess with substainable play to earn mechanics",
     "Chess with dynamic player tournaments",
     "Chess with blockchain integration",
     "Chess with skill based rewards",
     "Chess with blockchain integration",
   ],
   100
 );

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  function togglePopup() {
  setShowPopup(!showPopup);
}

  return (
    <div className="homepage">
    <head> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
     crossorigin="anonymous"></script> </head>
      <div className="logo"/>
      <h1 className="title">Welcome to Napoleon.</h1>
      <h2 className="subtitle">{typewriterText}</h2>
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
        <button className="button" onClick={togglePopup}>
          Create an Account
        </button>
        <form>
        <button className="button" formaction="https://docs.napoleonchess.xyz">
          The Napoleon Docs
        </button>
        </form>
        <form>
        <button className="button" formaction="https://discord.gg/9XhNSdRg">
          Join Our Discord
        </button>

        </form>

        {showPopup && (
            <form className="form">
            <h2 className="form-title">Coming Soon!</h2>

            </form>
        )}

        <div className = "point" >

        <h2 className="explanation">Why Napoleon?</h2>
        <h3 className="text"> Napoleon is a unique free to play chess platform that combines traditional chess with the ability to battle and trade others for unique digital chess pieces and tokens, adding an entirely new strategic depth to the game.

        <br/> <br/>

        With an easy-to-use interface and seamless integration of blockchain, you can start playing, collecting, and trading in a substainable player-based economy with real digital ownership.

        <br/> <br/>

        Chess has an endured history of 1400 years. The next 1400 years are even brighter, with the help of web3.

        </h3>

        <div class="board"></div>

        </div>

        <div className = "point2" >

        <h2 className="explanation">Introducing Chess Campaigns</h2>
        <h3 className="text"> Team up with your friends and battle in factions on a real-world map inspired by Napoleon Bonaparte's campaigns. Opposing factions wage war in large-scale tournaments for dynamic territories powered by player driven decision making and strategy.

        <br/> <br/>

        Players capture and defend territories for their faction by battling in matches of chess, winning or losing their team tokens.

        <br/> <br/>

        Pay attention when creating or joining your faction - the faction's country will have its own set of strengths and weaknesses for a diverse gameplay experience.

        </h3>

        <div className="map"/>

        </div>

        <div className = "point3" >

        <h2 className="explanation">The Napoleon Token</h2>
        <h3 className="text"> Earn tokens and unique chess pieces for completing challenges, fighting other players, and contributing to your faction in tournaments and campaigns. Token value is derived from advertising on the Napoleon platform.

        <br/> <br/>

        Tokens can be used for faction creation, purchases in the Napoleon marketplace, and Napoleon DAO governance.

        <br/> <br/>

        For more information about Napoleon token, you can check out our documentation at docs.napoleonchess.xyz/token.

        </h3>

        <div className="token"/>

        </div>


        </div>
  );
};

export default Home;
