import React, { useState, useEffect } from "react";

const MovingCircle = ({ circleClassName, setCircleClassName, circlePosition, setCirclePosition, lastDirection, setLastDirection,isDead, outOfBounds, setOutOfBounds}) => {

  const gridSize = 50; // Number of squares in each row and column
  const squareSize = 100; // Size of each square in pixels

  const [islandMap, setIslandMap] = useState([]);

  const moveStep = 25;

  const maxy = 4000;
  const maxx = 1000;
  const miny = -1000;
  const minx = -4000;

  useEffect(() => {

    const handleKeyDown = (event) => {

      let newX = circlePosition.x;
      let newY = circlePosition.y;

      const { key } = event;
      switch (key) {
        case "w":
          newY += moveStep;
          setCircleClassName("Character RunningUp");
          break;
        case "a":
          newX += moveStep;
          setCircleClassName("Character RunningLeft");
          break;
        case "s":
          newY -= moveStep;
          setCircleClassName("Character RunningDown");
          break;
        case "d":
          newX -= moveStep;
          setCircleClassName("Character RunningRight");
          break;
          case "f":
          setCircleClassName("Character Fight");
        default:
          break;
      }

      if (newX > maxx) {
        newX = maxx;
        setOutOfBounds(true);
      } else if (newX < minx) {
        newX = minx;
        setOutOfBounds(true);
      } else if (newY > maxy) {
         newY = maxy;
         setOutOfBounds(true);
       } else if (newY < miny) {
         newY = miny;
         setOutOfBounds(true);
       } else {
         setOutOfBounds(false);
       }

       setCirclePosition({ x: newX, y: newY });
    }

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

  useEffect(() => {

      const generateIslandMap = () => {

        const newIslandMap = Array.from({ length: gridSize }, () =>
          Array(gridSize).fill("green")
        );

        // Set the top row as sand
        for (let i = 0; i < gridSize; i++) {
          newIslandMap[0][i] = "yellow";
        }
        // Set the sec. top row as sand
        for (let i = 0; i < gridSize; i++) {
          if (Math.random() < 0.45) {
          newIslandMap[1][i] = "yellow";
          }
        }
        // Set the bottom row as sand
        for (let i = 0; i < gridSize; i++) {
          newIslandMap[gridSize - 1][i] = "yellow";
        }
        for (let i = 0; i < gridSize; i++) {
          if (Math.random() < 0.45) {
          newIslandMap[gridSize-2][i] = "yellow";
          }
        }
        // Set the leftmost column as sand
        for (let i = 0; i < gridSize; i++) {
          newIslandMap[i][0] = "yellow";
        }
        for (let i = 0; i < gridSize; i++) {
          if (Math.random() < 0.45) {
          newIslandMap[i][1] = "yellow";
          }
        }
        // Set the rightmost column as sand
        for (let i = 0; i < gridSize; i++) {
          newIslandMap[i][gridSize - 1] = "yellow";
        }
        for (let i = 0; i < gridSize; i++) {
          if (Math.random() < 0.45) {
          newIslandMap[i][gridSize-2] = "yellow";
          }
        }

        setIslandMap(newIslandMap);
      };

      generateIslandMap();
    }, []);

  const renderGridSquares = () => {

    if (!islandMap || islandMap.length === 0) {
      return null; // Return null if islandMap is not ready yet
    }

  const gridSquares = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {

      gridSquares.push(
        <div
          key={`${row}-${col}`}
          className={islandMap[row][col]} // Use the class name based on islandMap data
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            border: "0px solid black",
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
