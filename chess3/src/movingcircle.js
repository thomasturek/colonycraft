import React, { useState, useEffect } from "react";

const MovingCircle = ({ circleClassName, setCircleClassName }) => {
  const gridSize = 50; // Number of squares in each row and column
  const squareSize = 100; // Size of each square in pixels
  const moveStep = 50; // Adjust this value to control the movement speed

  const maxy = 350;
  const maxx = 650;
  const miny = -4500;
  const minx = -4200;

  const [circlePosition, setCirclePosition] = useState({ x: -1530, y: -1550 });

  useEffect(() => {
    const handleKeyDown = (event) => {

      let newX = circlePosition.x;
      let newY = circlePosition.y;

      const { key } = event;
      switch (key) {
        case "w":
          newY += moveStep;
          setCircleClassName("Character Running");
          break;
        case "a":
          newX += moveStep;
          setCircleClassName("Character RunningLeft");
          break;
        case "s":
          newY -= moveStep;
          setCircleClassName("Character Running");
          break;
        case "d":
          newX -= moveStep;
          setCircleClassName("Character Running");
          break;
          case "f":
          setCircleClassName("Character Fight");
        default:
          break;
      }

      if (newX > maxx) newX = maxx;
      if (newX < minx) newX = minx;
       if (newY > maxy) newY = maxy;
       if (newY < miny) newY = miny;

       setCirclePosition({ x: newX, y: newY });

       console.log(circlePosition);

    };

    const handleKeyUp = (event) => {
      setCircleClassName("Character");
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [moveStep, circlePosition]); // Include `moveStep` in the dependency array to prevent stale values

  const gridStyles = {
    position: "absolute",
    left: `${circlePosition.x}px`,
    top: `${circlePosition.y}px`,
    width: `${gridSize * squareSize}px`,
    height: `${gridSize * squareSize}px`,
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, ${squareSize}px)`,
    gridTemplateRows: `repeat(${gridSize}, ${squareSize}px)`,
    overflow: "hidden",
    transition: "left 0.1s, top 0.1s",
  };

  const islandMap = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill("green")
  );
  // Set the top row as sand
  for (let i = 0; i < gridSize; i++) {
    islandMap[0][i] = "yellow";
  }
  // Set the bottom row as sand
  for (let i = 0; i < gridSize; i++) {
    islandMap[gridSize - 1][i] = "yellow";
  }
  // Set the leftmost column as sand
  for (let i = 0; i < gridSize; i++) {
    islandMap[i][0] = "yellow";
  }
  // Set the rightmost column as sand
  for (let i = 0; i < gridSize; i++) {
    islandMap[i][gridSize - 1] = "yellow";
  }

  const renderGridSquares = () => {
    const gridSquares = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        gridSquares.push(
          <div
            key={`${row}-${col}`}
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              backgroundColor: islandMap[row][col],
              border: "1px solid black",
            }}
          />
        );
      }
    }

    return gridSquares;
  };

  return <div style={gridStyles}>{renderGridSquares()}</div>;
};

export default MovingCircle;
