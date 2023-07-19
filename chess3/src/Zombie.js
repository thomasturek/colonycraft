import React, { useState, useEffect } from "react";

const Zombie = ({ zombieClassName, setZombieClassName, staminaValue}) => {

  let moveStep;

  if(staminaValue<10) {

      moveStep = 25; // Adjust this value to control the movement speed

  } else {
    moveStep = 50;
  }

  const maxy = 3000;
  const maxx = 3000;
  const miny = -3000;
  const minx = -3000;

  const [zombiePosition, setZombiePosition] = useState({ x: 650, y: 340 });

  useEffect(() => {

    const handleKeyDown = (event) => {

      let newX = zombiePosition.x;
      let newY = zombiePosition.y;

      const { key } = event;
      switch (key) {
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
          case "f":
        default:
          break;
      }

      if (newX > maxx) newX = maxx;
      if (newX < minx) newX = minx;
       if (newY > maxy) newY = maxy;
       if (newY < miny) newY = miny;

       setZombiePosition({ x: newX, y: newY });

    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [moveStep, zombiePosition]); // Include `moveStep` in the dependency array to prevent stale values

  const zombieStyles = {
    position: "absolute",
    left: `${zombiePosition.x}px`,
    top: `${zombiePosition.y}px`,
    width: `50px`,
    height: `50px`,
    transition: "left 0.1s, top 0.1s",
  };

  const renderZombie = () => {

      return(
        <div
          className={zombieClassName}
          style={{
            width: `100px`,
            height: `100px`,
          }}
        />
      );

};

  return <div style={zombieStyles}>{renderZombie()}</div>;
};

export default Zombie;
