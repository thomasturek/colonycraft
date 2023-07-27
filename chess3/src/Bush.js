import React, { useState, useEffect } from "react";

const Bush = ({ position: initialPosition }) => {
  const [bushPosition, setBushPosition] = useState(initialPosition);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newX = bushPosition.x;
      let newY = bushPosition.y;
      const moveStep = 25;

      const { key } = event;
      switch (key) {
        case "f":
          console.log("Picked");
          break;
        case "w":
          newY += moveStep;
          break;
        case "a":
          newX += moveStep;
          break;
        case "s":
          newY -= moveStep;
          break;
        case "d":
          newX -= moveStep;
          break;
        default:
          break;
      }

      setBushPosition({ x: newX, y: newY });
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bushPosition]); // Add bushPosition to the dependencies array to update the event listener when the position changes

  const bushStyles = {
    position: "absolute",
    width: "50px",
    height: "50px",
    left: `${bushPosition.x}px`, // Set the position based on the state
    top: `${bushPosition.y}px`, // Set the position based on the state
    transition: "left 0.1s, top 0.1s",
  };

  const renderBush = () => {
    return (
      <>
        <div
          className="Bush"
          style={{
            width: `100px`,
            height: `100px`,
            /* Add any additional styles for the bush here */
          }}
        />
      </>
    );
  };

  return <div style={bushStyles}>{renderBush()}</div>;
};

export default Bush;
