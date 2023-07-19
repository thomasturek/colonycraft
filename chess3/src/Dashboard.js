import './Dashboard.css';
import MovingCircle from "./movingcircle.js";
import Zombie from "./Zombie.js";
import React, { useState, useEffect } from "react";
import startokenABI from './startokenABI.json';

const { ethers } = require("ethers");

const connectToBlockchain = async (setCurrentUser, setStarstones) => {

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
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length > 0) {
      const signerAddress = accounts[0];
      setCurrentUser(signerAddress);

      const starstoneContract = new ethers.Contract('0xcBA5115d74D0634225c7809D197E47FcdF2B690b', startokenABI, provider);

      //const ownsNFT = await nft_forum_contract.IsNFTHolder(signerAddress);

    } else {
      console.log("No accounts available");
    }

    // Rest of your code...
  } catch (error) {
    console.log("Error connecting to MetaMask or setting up the network:", error);
  }
} else {
  console.log("MetaMask is not installed or not detected");
}

};

const Dashboard = () => {

  const [resourcePanelVisible, setResourcePanelVisible] = useState(false);
  const [constructionPanelVisible, setConstructionPanelVisible] = useState(false);
  const [diplomacyPanelVisible, setDiplomacyPanelVisible] = useState(false);
  const [colonyPanelVisible, setColonyPanelVisible] = useState(false);
  const [fleetsPanelVisible, setFleetsPanelVisible] = useState(false);
  const [tradePanelVisible, setTradePanelVisible] = useState(false);
  const [panelAnimation, setPanelAnimation] = useState('');
  const [currentStarstones, setStarstones] = useState('0');
  const [currentUser, setCurrentUser] = useState('Not Logged In!');

  // Reasources

  const [wheatValue, setWheatValue] = useState(0);
  const [starstoneValue, setStarstoneValue] = useState(0);
  const [coffeeValue, setCoffeeValue] = useState(0);
  const [woodValue, setWoodValue] = useState(0);
  const [metalsValue, setMetalsValue] = useState(0);
  const [fishValue, setFishValue] = useState(0);

  // Player Stats

  const [healthValue, setHealthValue] = useState(100);
  const [staminaValue, setStaminaValue] = useState(100);
  const [hungerValue, setHungerValue] = useState(100);
  const [className, setClassName] = useState("Character");
  const [zombieClassName, setZombieClassName] = useState("Zombie");
  const [isStaminaTimerActive, setStaminaTimerActive] = useState(true);

  // blockchain

  const [blockchainConnected, setBlockchainConnected] = useState(false);

  const constructLumberMill = () => {
  };

  const constructWheatFarm = () => {
  };

  const constructCornFarm = () => {
  };

  const constructMine = () => {
  };

  const constructFishingHut = () => {
  };

  const constructHarbor = () => {
  };

  const constructTradeVessel = () => {
  };

  const constructShip = () => {
  };

  const constructCannon = () => {
  };

  const constructMinuteMen = () => {
  };

  if(!blockchainConnected) {
    connectToBlockchain(setCurrentUser, setStarstones);
    setBlockchainConnected(true);
  }

  useEffect(() => {

    if (treeElements.length === 0) {
      generateRandomTreeElements();
    }

    if (staminaValue < 100) {
      increaseStamina();
    }

}, [staminaValue]);


const [treeElements, setTreeElements] = useState([]);

const generateRandomTreeElements = () => {
    const numberOfTrees = 10; // Adjust this to change the number of trees
    const maxX = 100; // Adjust this to set the maximum X coordinate
    const maxY = 100; // Adjust this to set the maximum Y coordinate
    const trees = [];

    for (let i = 0; i < numberOfTrees; i++) {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      trees.push({ x, y });
    }

    setTreeElements(trees);
  };

  const handleResourceButtonClick = () => {
    setResourcePanelVisible(!resourcePanelVisible);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleConstructionButtonClick = () => {
    setConstructionPanelVisible(!constructionPanelVisible);
    setResourcePanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleDiplomacyButtonClick = () => {
    setDiplomacyPanelVisible(!diplomacyPanelVisible);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleColonyButtonClick = () => {
    setColonyPanelVisible(!colonyPanelVisible);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleFleetsButtonClick = () => {
    setFleetsPanelVisible(!fleetsPanelVisible);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setTradePanelVisible(false);
  };

  const handleTradeButtonClick = () => {
    setTradePanelVisible(!tradePanelVisible);
    setFleetsPanelVisible(false);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
  };

  const takeDamange = (damageTaken) => {
    setHealthValue((prevHealth) => prevHealth - damageTaken);
  };

  const increaseStamina = () => {
    const newStaminaValue = Math.min(staminaValue + 0.1, 100);
    setStaminaValue(newStaminaValue);
};

  return (
    <div className="Dashboard">
    <head>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
   </head>

   <button className="user">
     <h1 className="text-user">{currentUser}</h1>
   </button>
   <button className="starstones">
     <h1 className="text-user">Starstones Earned: {currentStarstones}</h1>
   </button>


    <div className="game">
      <button className="play-button" onClick={handleResourceButtonClick}>
        <span className="material-symbols-outlined">construction</span>
        Inventory
      </button>
      <button className="play-button" onClick={handleConstructionButtonClick}>
        <span className="material-symbols-outlined">Engineering</span>
        Construction
      </button>
      <button className="play-button" onClick={handleDiplomacyButtonClick}>
        <span className="material-symbols-outlined">group</span>
        Weapons
      </button>
      <div className="health-bar" style={{ width: `${healthValue}%` }} ></div>

      <div className="stamina-bar" >

      <div className="stamina-level" style={{ width: `${staminaValue}%` }}></div>

      </div>

      <div className="hunger-bar" style={{ width: `${hungerValue}%` }} ></div>
    </div>

    <div className={`panel ${resourcePanelVisible ? "visible" : "hidden"}`}>

    <div class="grid-reasources">
      <div class="grid-item-reasources">
        <h1 style={{top: '3%'}} className="text">Starstones</h1>
        <h1 style={{top: '3%', marginLeft: '-5%', textAlign: 'right'}} className="text">{currentStarstones}</h1>
        <div className="reasource-image-starstone" style={{top: '2.5%', left: '33%'}}></div>
      </div>
      <div class="grid-item-reasources">
        <h1 style={{top: '20%'}} className="text">Wood</h1>
        <h1 style={{top: '20%', marginLeft: '-5%', textAlign: 'right'}} className="text">{woodValue}</h1>
        <div className="reasource-image-wood" style={{top: '19%', left: '15%'}}></div>
      </div>
      <div class="grid-item-reasources">
        <h1 style={{top: '36%'}} className="text">Wheat</h1>
        <h1 style={{top: '36%', marginLeft: '-5%', textAlign: 'right'}} className="text">{wheatValue}</h1>
        <div className="reasource-image" style={{top: '35.5%', left: '17%'}}></div>
      </div>
      <div class="grid-item-reasources">
        <h1 style={{top: '53%'}} className="text">Coffee</h1>
        <h1 style={{top: '53%', marginLeft: '-5%', textAlign: 'right'}} className="text">{coffeeValue}</h1>
        <div className="reasource-image-coffee" style={{top: '53%', left: '21%'}}></div>
      </div>
      <div class="grid-item-reasources">
        <h1 style={{top: '70%'}} className="text">Metals</h1>
        <h1 style={{top: '70%', marginLeft: '-5%', textAlign: 'right'}} className="text">{metalsValue}</h1>
        <div className="reasource-image-metals" style={{top: '70%', left: '21%'}}></div>
      </div>
      <div class="grid-item-reasources">
        <h1 style={{top: '86%'}} className="text">Fish</h1>
        <h1 style={{top: '86%', marginLeft: '-5%', textAlign: 'right'}} className="text">{fishValue}</h1>
        <div className="reasource-image-fish" style={{top: '84.5%', left: '15%'}}></div>
      </div>
    </div>

      <div className="panel-row">Reasources</div>
    </div>

    <div className={`panel ${constructionPanelVisible ? "visible" : "hidden"}`}>
      <div className="panel-row">Construction</div>

      <div class="grid">
        <div class="grid-item lumbermill" onClick={constructLumberMill}>Lumbermill</div>
        <div class="grid-item wheatfarm" onClick={constructWheatFarm}>Wheat Farm</div>
        <div class="grid-item coffeefarm" onClick={constructCornFarm}>Coffee Farm</div>
        <div class="grid-item mine" onClick={constructMine}>Mine</div>
        <div class="grid-item fishinghut" onClick={constructFishingHut}>Fishing Hut</div>
        <div class="grid-item harbor" onClick={constructHarbor}>Harbor</div>
        <div class="grid-item" onClick={constructTradeVessel}>Trade Vessel</div>
        <div class="grid-item" onClick={constructShip}>Ship</div>
        <div class="grid-item cannon" onClick={constructCannon}>Cannon</div>
        <div class="grid-item" onClick={constructMinuteMen}>Minute Men</div>
      </div>
    </div>

    <div className={`panel ${diplomacyPanelVisible ? "visible" : "hidden"}`}>
    <div className="panel-row">Weapons</div>
    <div class="grid">
      <div class="grid-item lumbermill" onClick={constructLumberMill}>Lumbermill</div>
      <div class="grid-item wheatfarm" onClick={constructWheatFarm}>Wheat Farm</div>
      <div class="grid-item coffeefarm" onClick={constructCornFarm}>Coffee Farm</div>
      <div class="grid-item mine" onClick={constructMine}>Mine</div>
      <div class="grid-item fishinghut" onClick={constructFishingHut}>Fishing Hut</div>
      <div class="grid-item harbor" onClick={constructHarbor}>Harbor</div>
      <div class="grid-item" onClick={constructTradeVessel}>Trade Vessel</div>
      <div class="grid-item" onClick={constructShip}>Ship</div>
      <div class="grid-item cannon" onClick={constructCannon}>Cannon</div>
      <div class="grid-item" onClick={constructMinuteMen}>Minute Men</div>
    </div>
    </div>

      <div className={className}/>
      <MovingCircle circleClassName={className} setCircleClassName={setClassName} setStaminaValue={setStaminaValue} staminaValue={staminaValue}/>
      <Zombie zombieClassName={zombieClassName} setZombieClassName={setZombieClassName} staminaValue={staminaValue}/>
    </div>
  );
};

export default Dashboard;
