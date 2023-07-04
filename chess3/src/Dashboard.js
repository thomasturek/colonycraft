import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const generateRandomCoordinates = (existingSystems) => {
  const minX = 0; // Minimum X coordinate
  const maxX = 2000; // Maximum X coordinate
  const minY = 0; // Minimum Y coordinate
  const maxY = 2000; // Maximum Y coordinate

  let x, y;
  let validPosition = false;
  while (!validPosition) {
    x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    validPosition = existingSystems.every((system) => {
      const distance = Math.sqrt(Math.pow(system.x - x, 2) + Math.pow(system.y - y, 2));
      return distance > 100; // Check if distance is greater than 100px
    });
  }

  return { x, y };
};

const SolarSystem = ({ name, x, y, zoomLevel, mapPosition }) => {
  const fontSize = 16 * zoomLevel;

  const transformedX = (x + mapPosition.x) * zoomLevel;
  const transformedY = (y + mapPosition.y) * zoomLevel;

  return (
    <div
      className="solar-system"
      style={{
        left: `${transformedX}px`,
        top: `${transformedY}px`,
        transform: `scale(${zoomLevel})`,
      }}
    >
      <div className="sun"></div>
      <div className="circle"></div>
      <h3 style={{ fontSize: `${fontSize}px`, color: "white" }}>{name}</h3>
    </div>
  );
};

const Dashboard = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [panelVisible, setPanelVisible] = useState(false);
  const [solarSystems, setSolarSystems] = useState([]);

  useEffect(() => {
    generateSolarSystems();
  }, []);

  const generateSolarSystems = () => {
    const existingSystems = [];
    const systems = [];

    for (let i = 1; i <= 100; i++) {
      const { x, y } = generateRandomCoordinates(existingSystems);
      const name = i.toString().padStart(4, "0");
      const system = {
        id: i,
        x,
        y,
        name,
      };
      systems.push(system);
      existingSystems.push({ x, y });
    }

    setSolarSystems(systems);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 0.5));
  };

  const handleButtonClick = () => {
    setPanelVisible(!panelVisible);
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
        <button className="play-button" onClick={handleButtonClick}>
          <span className="material-symbols-outlined">construction</span>
          Resources
        </button>
        <button className="play-button" onClick={handleButtonClick}>
          <span className="material-symbols-outlined">Engineering</span>
          Construction
        </button>
        <button className="play-button" onClick={handleButtonClick}>
          <span className="material-symbols-outlined">group</span>
          Diplomacy
        </button>
        <button className="play-button" onClick={handleButtonClick}>
          <span className="material-symbols-outlined">flag_circle</span>
          Colonies
        </button>
        <button className="play-button" onClick={handleButtonClick}>
          <span className="material-symbols-outlined">rocket_launch</span>
          Fleets
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
          />
        ))}
      </div>

      <div className={`panel ${panelVisible ? "visible" : "hidden"}`}>
        {/* Your panel content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
