import "./Dashboard.css";
import React, { useState } from "react";

const Dashboard = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [panelVisible, setPanelVisible] = useState(false);

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => Math.min(prevZoomLevel + 0.1, 1));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 0.1));
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
    const offsetX = (event.clientX - dragStart.x) * (1 / zoomLevel);
    const offsetY = (event.clientY - dragStart.y) * (1 / zoomLevel);
    setMapPosition((prevPosition) => ({
      x: prevPosition.x + offsetX,
      y: prevPosition.y + offsetY,
    }));
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const SolarSystem = ({ name, x, y, zoomLevel }) => {
    const fontSize = 16 * zoomLevel;

    return (
      <div
        className="solar-system"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: `scale(${zoomLevel}) translate(${mapPosition.x}px, ${mapPosition.y}px)`,
        }}
      >
        <div className="sun"></div>
        <div className="circle"></div>
        <h3 style={{ fontSize: `${fontSize}px`, color: "white" }}>{name}</h3>
      </div>
    );
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
        className={`map zoom-level-${Math.round(zoomLevel)}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <SolarSystem x={100} y={100} zoomLevel={zoomLevel} name="0001" />
        <SolarSystem x={400} y={100} zoomLevel={zoomLevel} name="0002" />
        <SolarSystem x={300} y={300} zoomLevel={zoomLevel} name="0003" />
      </div>

      <div className={`panel ${panelVisible ? "visible" : "hidden"}`}>
        {/* Your panel content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
