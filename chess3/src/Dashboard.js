import './Dashboard.css';
import MovingCircle from "./movingcircle.js";
import Zombie from "./Zombie.js";
import React, { useState, useEffect } from "react";
import startokenABI from './startokenABI.json';

const { ethers } = require("ethers");

const collectToken = async (currentStarstones, receiverAddress, tokenCollected, setTokenCollected) => {

    if(!tokenCollected) {

      try {

            // Mint Tokens

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);

            const signer = provider.getSigner();

            const starstoneContract = new ethers.Contract(
              "0x1DAE10715B28f711EDEc1ecbBaa868274814A5ce",
              startokenABI,
              signer
            );

            const txOptions = {
              gasLimit: 100000,
            };

            const amount = ethers.utils.parseUnits(currentStarstones, 18);

            const tx = await starstoneContract.mint(amount, txOptions);

            setTokenCollected(true);

        } catch (error) {
          console.log("Error setting up the network:", error);
        }

      } else {
        window.alert("Tokens Already Connected!")
      }
};

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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length > 0) {
      const signer = provider.getSigner();

      setCurrentUser(await signer.getAddress());

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
  const [tokenCollected, setTokenCollected] = useState(false);
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
  const [hungerValue, setHungerValue] = useState(100);
  const [timeValue, setTimeValue] = useState(0);
  const [className, setClassName] = useState("Character");
  const [lastDirection, setLastDirection] = useState("Right");
  const [isDead, setIsDead] = useState(false);

  // Zombie Stats

  const [zombieHealth, setZombieHealth] = useState(100);
  const [zombieDeath, setZombieDeath] = useState(false);
  const [zombiePosition, setZombiePosition] = useState({ x: 400, y: 100 });
  const [zombieClassName, setZombieClassName] = useState("Zombie");

  // islandsData

  const [circlePosition, setCirclePosition] = useState({ x: -1530, y: -1550 });

  // Game Data

  const [notLoaded, setNotLoaded] = useState(true);

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
    console.log(currentUser);
    setBlockchainConnected(true);
  }

  const handleZombieAttack = (zombieHealth) => {

    if(!zombieDeath) {

    const playerX = 650;
    const playerY = 340;

    const zombieX = zombiePosition.x;
    const zombieY = zombiePosition.y;

    const distance = Math.sqrt((playerX - zombieX) ** 2 + (playerY - zombieY) ** 2);

    if (distance <= 100) {
      setZombieClassName("Zombie-Fighting")

      setTimeout(() => {
      setHealthValue(healthValue-5);
    }, 1000);


    } else {

      setZombieClassName("Zombie")

      const angle = Math.atan2(playerY - zombieY, playerX - zombieX);

       const moveSpeed = 10; // Adjust the move speed as needed

       const deltaX = moveSpeed * Math.cos(angle);
       const deltaY = moveSpeed * Math.sin(angle);

       setZombiePosition((prevPosition) => ({
         x: prevPosition.x + deltaX,
         y: prevPosition.y + deltaY,
       }));

     }

    }

    if (healthValue <= 0) {
     setIsDead(true);
   }

  };

  function refreshPage() {
      // Reload the current page
      window.location.reload();
    }

  const renderYouDiedOverlay = () => {
  return (
    <div className="you-died-overlay">
      <h1 className="you-died-text">You Died!</h1>
      <h3 className="time-text">Time: {timeValue} Seconds</h3>

      <button className="starstones-death">
        <h1 className="text-user" onClick={() => collectToken(currentStarstones, currentUser, tokenCollected, setTokenCollected)}>Collect {currentStarstones} Starstones</h1>
      </button>

      <button className="starstones-death-2">
        <h1 className="text-user">Share Your Score!</h1>
      </button>

      <button className="starstones-death-3">
        <h1 className="text-user" onClick={refreshPage}>Try Again!</h1>
      </button>

    </div>
  );
}

const renderLoading = () => {

  /*

  return (
  <div className="you-died-overlay">

    <h1 className="you-died-text">Loading...</h1>

    <div className="loading-bar" ></div>

  </div>
  );

  */

setNotLoaded(false);
}

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

  const updateElapsedTime = () => {
    setTimeValue((prevTimeValue) => prevTimeValue + 1);

    setStarstones(Math.floor((timeValue + 1) / 50).toString());
};

  useEffect(() => {

    if(!isDead){

    const zombieInterval = setInterval(handleZombieAttack, 100);

    return () => {
    clearInterval(zombieInterval);
  };

  }

}, [zombiePosition, healthValue]);

  useEffect(() => {

    if(!isDead){

    const timerInterval = setInterval(updateElapsedTime, 1000);

    // Clear the interval when the component is unmounted or when specific dependencies change
    return () => {
      clearInterval(timerInterval);
    };

  }
  }, [timeValue]);

  return (
    <div className="Dashboard">
    <head>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
   </head>

   <button className="user">
     <h1 className="text-user-wallet">{currentUser}</h1>
   </button>
   <button className="starstones">
     <h1 className="text-user" style={{height: '100%', width: '100%', position: 'absolute', left: '1%', top: '5%'}}>

     Starstones Earned: {currentStarstones}</h1>

      <div className="reasource-image-starstone" style={{top: '25%', width: '10%', height:'50%', left: '4%'}}></div>
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
        <span className="material-symbols-outlined">swords</span>
        Weapons
      </button>
      <div className="health-bar heart" style={{ width: `${healthValue}%` }} ></div>

      <div className="hunger-bar porkchop" style={{ width: `${hungerValue}%` }} ></div>

    </div>

    <div className="time-bar">Time Survived: {timeValue}</div>

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
        <h1 style={{top: '36%'}} className="text">Berries</h1>
        <h1 style={{top: '36%', marginLeft: '-5%', textAlign: 'right'}} className="text">{wheatValue}</h1>
        <div className="reasource-image" style={{top: '35%', left: '23%'}}></div>
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
      <div class="grid-item" onClick={constructLumberMill}>Spear</div>
      <div class="grid-item" onClick={constructWheatFarm}>Sword</div>
      <div class="grid-item" onClick={constructCornFarm}>Dagger</div>
      <div class="grid-item" onClick={constructMine}>Bow</div>
      <div class="grid-item" onClick={constructFishingHut}>Shield</div>
    </div>
    </div>

      <div className={className}/>
      <MovingCircle circleClassName={className} setCircleClassName={setClassName} circlePosition={circlePosition} setCirclePosition={setCirclePosition}/>
      <Zombie zombieClassName={zombieClassName} setZombieClassName={setZombieClassName} zombiePosition={zombiePosition} setZombiePosition={setZombiePosition} zombieHealth={zombieHealth} setZombieHealth={setZombieHealth} zombieDeath={zombieDeath} setZombieDeath={setZombieDeath}/>

      {isDead && renderYouDiedOverlay()}

      {notLoaded && renderLoading()}

      <div className="nighttime-overlay" />
    </div>
  );
};

export default Dashboard;
