import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import islandsData from './islands.json';

const generateRandomCoordinates = (existingSystems) => {
  const centerX = 2500; // X coordinate of the center of the circle
  const centerY = 2500; // Y coordinate of the center of the circle
  const radius = 2500; // Radius of the circle

  let validPosition = false;
  let angle, distance, x, y;

  while (!validPosition) {
    angle = Math.random() * 2 * Math.PI; // Random angle between 0 and 2π
    distance = Math.sqrt(Math.random()) * radius; // Random distance between 0 and radius

    x = Math.floor(centerX + distance * Math.cos(angle));
    y = Math.floor(centerY + distance * Math.sin(angle));

    validPosition = existingSystems.every((system) => {
      const systemDistance = Math.sqrt(Math.pow(system.x - x, 2) + Math.pow(system.y - y, 2));
      return systemDistance > 100; // Check if distance is greater than 100px
    });
  }

  return { x, y };
};

const SolarSystem = ({ name, x, y, zoomLevel, mapPosition, terrain, onClick }) => {
  const fontSize = 10 * zoomLevel;

  const transformedX = (x + mapPosition.x) * zoomLevel;
  const transformedY = (y + mapPosition.y) * zoomLevel;

  let islandImage;

  if (terrain === 'Forest') {
    islandImage = 'url(https://storage.googleapis.com/colonycraftbucket/forest.png)';
  } else if (terrain === 'Plains') {
    islandImage = 'url(https://storage.googleapis.com/colonycraftbucket/plains.png)';
  } else if (terrain === 'Rock') {
    islandImage = 'url(https://storage.googleapis.com/colonycraftbucket/rock.png)';
  } else if (terrain === 'Desert') {
    islandImage = 'url(https://storage.googleapis.com/colonycraftbucket/desert.png)';
  }

  return (
    <div
      className='solar-system'
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
      <h3 style={{ fontSize: `${fontSize}px`, color: 'white' }}>{name}</h3>
    </div>
  );
};


const Dashboard = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [solarSystems, setSolarSystems] = useState([]);

  const [resourcePanelVisible, setResourcePanelVisible] = useState(false);
  const [constructionPanelVisible, setConstructionPanelVisible] = useState(false);
  const [diplomacyPanelVisible, setDiplomacyPanelVisible] = useState(false);
  const [colonyPanelVisible, setColonyPanelVisible] = useState(false);
  const [fleetsPanelVisible, setFleetsPanelVisible] = useState(false);
  const [tradePanelVisible, setTradePanelVisible] = useState(false);

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedSystemVisible, setSelectedSystemVisible] = useState(false);
  const [selectedIslandTerrain, setSelectedIslandTerrain] = useState(null);

  const handleSolarSystemClick = (systemId, islandTerrain) => {
    setSelectedSystem(systemId);
    setSelectedIslandTerrain(islandTerrain);
    setSelectedSystemVisible(!selectedSystemVisible);
    setResourcePanelVisible(false);
    setConstructionPanelVisible(false);
    setDiplomacyPanelVisible(false);
    setColonyPanelVisible(false);
    setFleetsPanelVisible(false);
  };

  useEffect(() => {
    generateSolarSystems();
  }, []);

  const generateSolarSystems = () => {

    const systems = islandsData.map((island) => ({
      id: island.id,
      name: island.id,
      x: island.x,
      y: island.y,
      terrain: island.dominantTerrain,
    }));

    setSolarSystems(systems);
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
          <span className="material-symbols-outlined">rocket_launch</span>
          Fleets
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
        <div className="panel-row">Reasources</div>
        <div className="panel-row">1) Starstones</div>
        <div className="panel-row">2) Wood</div>
        <div className="panel-row">3) Metals</div>
        <div className="panel-row">4) Corn</div>
        <div className="panel-row">5) Wheat</div>
        <div className="panel-row">5) Fish</div>

        <div className="panel-row-last">
        <div className="panel-row">#</div>
        <div className="panel-row">100</div>
        <div className="panel-row">500</div>
        <div className="panel-row">200</div>
        <div className="panel-row">100</div>
        <div className="panel-row">800</div>
        <div className="panel-row">50</div>
        </div>
      </div>

      <div className={`panel ${constructionPanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Construction</div>

        <div class="grid">
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
        </div>
      </div>

      <div className={`panel ${diplomacyPanelVisible ? "visible" : "hidden"}`}>
        <div className="panel-row">Diplomacy</div>

        <div class="grid-diplomacy">
          <div class="grid-item"></div>
          <div class="grid-item"></div>
          <div class="grid-item"></div>
        </div>
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

      <div className={`solar-system-panel ${selectedSystemVisible ? "visible" : "hidden"}`}>
        <div className="solar-panel-row">Island #{selectedSystem}</div>
        <div className="solar-panel-row">Population: 0</div>
        <div className="solar-panel-row">Dominant Terrain: {selectedIslandTerrain}</div>
      </div>

    </div>
  );
};

export default Dashboard;
