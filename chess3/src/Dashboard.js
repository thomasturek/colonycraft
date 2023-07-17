import './Dashboard.css';
import MovingCircle from "./movingcircle.js";
import React, { useState, useEffect } from "react";

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
  }

;

  return (
    <div className="Dashboard">
    <head>
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
   </head>

   <button className="user">
     <h1 className="text-user">//</h1>
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
        Weapons
      </button>
      <div className="health-bar" style={{ width: `${healthValue}%` }} >Health</div>

      <div className="stamina-bar" style={{ width: `${staminaValue}%` }} >Stamina</div>

      <div className="hunger-bar" style={{ width: `${hungerValue}%` }} >Hunger</div>
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
      <MovingCircle circleClassName={className} setCircleClassName={setClassName} />
    </div>
  );
};

export default Dashboard;
