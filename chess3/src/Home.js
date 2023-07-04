import React, { useState } from "react";
import "./Home.css";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [balanceInfo, setBalanceInfo] = useState({
    balance: 0
  });

  const connectToBlockchain = async (e) => {
    e.preventDefault()

    // MetaMask Connection

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signerAddress = await provider.getSigner().getAddress();

    /*
    // Contract Initiated

    const nft_forum_contract = new ethers.Contract(contractInfo.address, abi, signer);

    // Asking Contract For User Balance Of NFT

    const ownsNFT = await nft_forum_contract.IsNFTHolder(signerAddress);

    */

    // Fething And Setting Balance

    const balance = await provider.getBalance(signerAddress);
    const balanceAmount = Math.round(ethers.utils.formatEther(balance) * 100) / 100;

    setBalanceInfo({balance: balanceAmount});

};

  const handleSubmit = (event) => {
    event.preventDefault();
    connectToBlockchain(event);
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
      <div className="background">
      <div className="planet"></div>
      </div>
      <h1 className="title">Welcome to Colonycraft.</h1>
      <div className="buttonbox">
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
        <button className="button" onClick={togglePopup}>
          Mint a New Planet
        </button>
        <form>
        <button className="button" formaction="https://docs.napoleonchess.xyz">
          Colonycraft Docs
        </button>
        </form>
        <form>
        <button className="button" formaction="https://discord.gg/9XhNSdRg">
          Join Our Discord
        </button>
        </form>
        </div>

        {showPopup && (
            <form className="form">
            <h2 className="form-title">Coming Soon! You have {balanceInfo} planets</h2>

            </form>
        )}


        </div>
  );
};

export default Home;
