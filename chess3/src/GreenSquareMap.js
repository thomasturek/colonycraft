import React from "react";

const GreenSquareMap = () => {
  const gridSize = 100; // Adjust this value to change the grid size
  const squareSize = 50;

  const renderSquares = () => {
    const squares = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const key = `${x}-${y}`;
        squares.push(
          <div
            key={key}
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              backgroundColor: "green",
              border: "1px solid black",
            }}
          />
        );
      }
    }
    return squares;
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, ${squareSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${squareSize}px)`,
      }}
    >
      {renderSquares()}
    </div>
  );
};

export default GreenSquareMap;
