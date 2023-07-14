import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import islandsData from './islands.json';
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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length > 0) {
      const signerAddress = accounts[0];
      setCurrentUser(signerAddress);

      const starstoneContract = new ethers.Contract('0xcBA5115d74D0634225c7809D197E47FcdF2B690b', startokenABI, provider);

      //const ownsNFT = await nft_forum_contract.IsNFTHolder(signerAddress);

      const tokenBalance = (await starstoneContract.balanceOf(signerAddress)).toString();
      const tokenBalanceFormatted = ethers.utils.formatUnits(tokenBalance, 18);
      const roundedBalance = Math.ceil(parseFloat(tokenBalanceFormatted));
      setStarstones(roundedBalance);


    } else {
      // Handle case when no accounts are available
      console.log("No accounts available");
    }

    // Rest of your code...
  } catch (error) {
    // Handle error if the user rejects the account connection or the network setup
    console.log("Error connecting to MetaMask or setting up the network:", error);
  }
} else {
  // Handle case when MetaMask is not installed or not detected
  console.log("MetaMask is not installed or not detected");
}

};

const SolarSystem = ({ name, x, y, zoomLevel, mapPosition, terrain, onClick, selectedSystem}) => {
  const fontSize = 10 * zoomLevel;

  const transformedX = (x + mapPosition.x) * zoomLevel;
  const transformedY = (y + mapPosition.y) * zoomLevel;

  let islandImage;

  if (terrain === 'Forest') {
    islandImage = 'url(https://storage.cloud.google.com/colonycraftbucket/forest.png)';
  } else if (terrain === 'Plains') {
    islandImage = 'url(https://storage.cloud.google.com/colonycraftbucket/plains.png)';
  } else if (terrain === 'Rock') {
    islandImage = 'url(https://storage.googleapis.com/colonycraftbucket/stone.png)';
  } else if (terrain === 'Desert') {
    islandImage = 'url(https://storage.cloud.google.com/colonycraftbucket/desert.png)';
  }

  return (
    <div
      className = 'solar-system'
      onClick={onClick}
      style={{
        left: `${transformedX}px`,
        top: `${transformedY}px`,
        transform: `scale(${zoomLevel})`,
        backgroundImage: islandImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '40px',
        height: '40px',
      }}
    >
      <h3 style={{ position: 'absolute', left: '10%', top: '100%', fontSize: `${fontSize}px`, color: 'white' }}>{name}</h3>
     </div>
  );
};


const Dashboard = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: -2500, y: -2500 });
  const [solarSystems, setSolarSystems] = useState([]);

  const [resourcePanelVisible, setResourcePanelVisible] = useState(false);
  const [constructionPanelVisible, setConstructionPanelVisible] = useState(false);
  const [diplomacyPanelVisible, setDiplomacyPanelVisible] = useState(false);
  const [colonyPanelVisible, setColonyPanelVisible] = useState(false);
  const [fleetsPanelVisible, setFleetsPanelVisible] = useState(false);
  const [tradePanelVisible, setTradePanelVisible] = useState(false);
  const [panelAnimation, setPanelAnimation] = useState('');

  //blockchain

  const [currentUser, setCurrentUser] = useState('Not Logged In!');
  const [currentStarstones, setStarstones] = useState('0');

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedSystemOpen, setSelectedSystemOpen] = useState(false);
  const [selectedSystemVisible, setSelectedSystemVisible] = useState(false);
  const [selectedIslandTerrain, setSelectedIslandTerrain] = useState(null);
  const [selectedIslandImage, setSelectedIslandImage] = useState('');


  const handleSolarSystemClick = (systemId, islandTerrain) => {

      const islandNumber = systemId;

      if (islandTerrain === 'Forest') {
      setSelectedIslandImage('https://storage.cloud.google.com/colonycraftbucket/forest.png');
    } else if (islandTerrain === 'Plains') {
      setSelectedIslandImage('https://storage.cloud.google.com/colonycraftbucket/plains.png');
    } else if (islandTerrain === 'Rock') {
      setSelectedIslandImage('https://storage.cloud.google.com/colonycraftbucket/rock.png');
    } else if (islandTerrain === 'Desert') {
      setSelectedIslandImage('https://storage.cloud.google.com/colonycraftbucket/desert.png');
    }

    if (systemId === selectedSystem) {

      setSelectedSystemVisible(!selectedSystemVisible);

    }
    else {

      setSelectedSystemVisible(false); // Hide the panel initially

      // Add a timeout to allow the panel to be hidden before applying the animation class
      setTimeout(() => {
        setSelectedSystemVisible(true); // Show the panel
      }, 200);


      setSelectedSystem(systemId);
      setSelectedIslandTerrain(islandTerrain);

  }

    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
  };

  useEffect(() => {
    generateSolarSystems();
    connectToBlockchain(setCurrentUser, setStarstones);
  }, []);

  const generateSolarSystems = () => {

    const systems = islandsData.map((island) => ({
      id: island.id,
      name: island.id,
      x: island.x,
      y: island.y,
      terrain: island.dominantTerrain,
      selectedSystem: selectedSystem
    }));

    setSolarSystems(systems);
    };

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

    const constructTradeVesel = () => {
    };

    const constructShip = () => {
    };

    const constructCannon = () => {
    };

    const constructMinuteMen = () => {
    };

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 0.5));
  };

  const handleResourceButtonClick = () => {
    setResourcePanelVisible(!resourcePanelVisible);
    setSelectedSystemVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleConstructionButtonClick = () => {
    setConstructionPanelVisible(!constructionPanelVisible);
    setSelectedSystemVisible(false);
    setResourcePanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleDiplomacyButtonClick = () => {
    setDiplomacyPanelVisible(!diplomacyPanelVisible);
    setSelectedSystemVisible(false);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleColonyButtonClick = () => {
    setColonyPanelVisible(!colonyPanelVisible);
    setSelectedSystemVisible(false);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setFleetsPanelVisible(false);
    setTradePanelVisible(false);
  };
  const handleFleetsButtonClick = () => {
    setFleetsPanelVisible(!fleetsPanelVisible);
    setSelectedSystemVisible(false);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setTradePanelVisible(false);
  };

  const handleTradeButtonClick = () => {
    setTradePanelVisible(!tradePanelVisible);
    setFleetsPanelVisible(false);
    setSelectedSystemVisible(false);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
  };

  const handleMouseDown = (event) => {
    setDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!dragging) return;
    const offsetX = (event.clientX - dragStart.x) / zoomLevel;
    const offsetY = (event.clientY - dragStart.y) / zoomLevel;
    setMapPosition((prevPosition) => ({
      x: prevPosition.x + offsetX,
      y: prevPosition.y + offsetY,
    }));
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="dashboard">
      <head>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
     </head>
     <button className="user">
       <h1 className="text-user">{currentUser}</h1>
     </button>
      <div className="game">
        <button className="play-button" onClick={handleResourceButtonClick}>
          <span className="material-symbols-outlined">construction</span>
          Resources
        </button>
        <button className="play-button" onClick={handleConstructionButtonClick}>
          <span className="material-symbols-outlined">Engineering</span>
          Construction
        </button>
        <button className="play-button" onClick={handleDiplomacyButtonClick}>
          <span className="material-symbols-outlined">group</span>
          Diplomacy
        </button>
        <button className="play-button" onClick={handleColonyButtonClick}>
          <span className="material-symbols-outlined">flag_circle</span>
          Colonies
        </button>
        <button className="play-button" onClick={handleFleetsButtonClick}>
          <span className="material-symbols-outlined">sailing</span>
          Ships
        </button>
        <button className="play-button" onClick={handleTradeButtonClick}>
          <span className="material-symbols-outlined">handshake</span>
          Trade
        </button>
      </div>

      <div className="zoom-buttons">
        <button className="zoom-button1" onClick={handleZoomIn}>
          <span className="material-symbols-outlined">zoom_in</span>
        </button>
        <button className="zoom-button2" onClick={handleZoomOut}>
          <span className="material-symbols-outlined">zoom_out</span>
        </button>
      </div>

      <div
        className="map"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {solarSystems.map((system) => (
          <SolarSystem
            key={system.id}
            x={system.x}
            y={system.y}
            zoomLevel={zoomLevel}
            mapPosition={mapPosition}
            name={system.name}
            terrain={system.terrain}
            onClick={() => handleSolarSystemClick(system.id, system.terrain)} // Add this line
          />
        ))}
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
          <h1 style={{top: '20%', marginLeft: '-5%', textAlign: 'right'}} className="text">0</h1>
          <div className="reasource-image-wood" style={{top: '19%', left: '15%'}}></div>
        </div>
        <div class="grid-item-reasources">
          <h1 style={{top: '36%'}} className="text">Wheat</h1>
          <h1 style={{top: '36%', marginLeft: '-5%', textAlign: 'right'}} className="text">0</h1>
          <div className="reasource-image" style={{top: '35.5%', left: '17%'}}></div>
        </div>
        <div class="grid-item-reasources">
          <h1 style={{top: '53%'}} className="text">Coffee</h1>
          <h1 style={{top: '53%', marginLeft: '-5%', textAlign: 'right'}} className="text">0</h1>
          <div className="reasource-image-coffee" style={{top: '53%', left: '21%'}}></div>
        </div>
        <div class="grid-item-reasources">
          <h1 style={{top: '70%'}} className="text">Metals</h1>
          <h1 style={{top: '70%', marginLeft: '-5%', textAlign: 'right'}} className="text">0</h1>
          <div className="reasource-image-metals" style={{top: '70%', left: '21%'}}></div>
        </div>
        <div class="grid-item-reasources">
          <h1 style={{top: '86%'}} className="text">Fish</h1>
          <h1 style={{top: '86%', marginLeft: '-5%', textAlign: 'right'}} className="text">0</h1>
          <div className="reasource-image-fish" style={{top: '84.5%', left: '15%'}}></div>
        </div>
      </div>

        <div className="panel-row">Reasources</div>
      </div>

      <div className={`panel ${constructionPanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Construction</div>

        <div class="grid">
          <div class="grid-item lumbermill" onClick={constructLumberMill}>Lumbermill</div>
          <div class="grid-item" onClick={constructWheatFarm}>Wheat Farm</div>
          <div class="grid-item" onClick={constructCornFarm}>Coffee Farm</div>
          <div class="grid-item" onClick={constructMine}>Mine</div>
          <div class="grid-item" onClick={constructFishingHut}>Fishing Hut</div>
          <div class="grid-item" onClick={constructHarbor}>Harbor</div>
          <div class="grid-item" onClick={constructTradeVesel}>Trade Vesel</div>
          <div class="grid-item" onClick={constructShip}>Ship</div>
          <div class="grid-item" onClick={constructCannon}>Cannon</div>
          <div class="grid-item" onClick={constructMinuteMen}>Minute Men</div>
        </div>
      </div>

      <div className={`panel ${diplomacyPanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Diplomacy</div>
        <div className="panel-row">Coming Soon!</div>
      </div>

      <div className={`panel ${colonyPanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Colonies</div>
        <div className="panel-row">You Have No Colonies!</div>
      </div>

      <div className={`panel ${fleetsPanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Fleets</div>
        <div className="panel-row">You Have No Fleets!</div>
      </div>

      <div className={`panel ${tradePanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Trade</div>
        <div className="panel-row">You Have No Trade Routes!</div>
      </div>

      <div className={`solar-system-panel ${selectedSystemVisible ? 'visible' : 'hidden'} ${panelAnimation}`}>
        <div className="solar-panel-row">Island #{selectedSystem}</div>

        <div className="solar-panel-row">Population: 0</div>
        <div className="solar-panel-row">Dominant Terrain: {selectedIslandTerrain}</div>


        <div class="grid-island-panel">
          <div class="grid-item">Attack</div>
          <div class="grid-item">Raid</div>
          <div class="grid-item">Trade</div>
        </div>

    </div>
    </div>
  );
};

export default Dashboard;
