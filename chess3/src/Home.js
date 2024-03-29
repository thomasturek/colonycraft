import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import contractABI from "./contract.js";
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

    const provider = new ethers.BrowserProvider(window.ethereum);

    // Mint Island Code Here

    const contractAddress = "0x0659dCDcDeE0FF13dB37DF134C40D711E5965f2b";

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const nameInput = String(window.prompt("Island Name!"));

    const transaction = await contract.createIsland(nameInput);
    await transaction.wait();

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
      </div>
      <div className="title"></div>
      <div className="buttonbox">
        <button className="button" onClick={handleSubmit}>
          Play
        </button>
        <form>
        <button className="button" formaction="https://traderjoexyz.com/avalanche/pool/v21/0x1DAE10715B28f711EDEc1ecbBaa868274814A5ce/AVAX/100">
          Token Exchange
        </button>
        </form>
        <form>
        <button className="button" formaction="https://docs.colonycraft.xyz">
          Colonycraft Docs
        </button>
        </form>
        <form>
        <button className="button" formaction="https://discord.gg/rgKK5qGC">
          Join Our Discord
        </button>
        </form>
        </div>


        </div>
  );
};

export default Home;
