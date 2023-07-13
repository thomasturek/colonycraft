import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const { ethers } = require("ethers");

const buyIsland= async () => {

  if (window.ethereum) {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xa86a",
          chainName: "Avalanche C-Chain",
          nativeCurrency: {
            name: "AVAX",
            symbol: "AVAX",
            decimals: 18,
          },
          rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
          blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
        },
      ],
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    // Mint Island Code Here

  } catch (error) {
    console.log("Error connecting to MetaMask or setting up the network:", error);
  }
} else {
  console.log("MetaMask is not installed or not detected");
}

  /*
  // Contract Initiated

  const nft_forum_contract = new ethers.Contract(contractInfo.address, abi, signer);

  // Asking Contract For User Balance Of NFT

  const ownsNFT = await nft_forum_contract.IsNFTHolder(signerAddress);

  */

};

const Home = () => {

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

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
      <div className="background">
      <div className="planet"></div>
      <div className="waterplanet"></div>
      <div className="mountainisland"></div>
      <div className="rockyisland"></div>
      </div>
      <h1 className="title">Welcome to Colonycraft!</h1>
      <div className="buttonbox">
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
        <button className="button" onClick={buyIsland}>
          Mint an Island
        </button>
        <form>
        <button className="button" formaction="https://docs.colonycraft.xyz">
          Colonycraft Docs
        </button>
        </form>
        <form>
        <button className="button" formaction="https://discord.gg/9XhNSdRg">
          Join Our Discord
        </button>
        </form>
        </div>


        </div>
  );
};

export default Home;
