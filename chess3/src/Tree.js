import React, { useState, useEffect } from "react";

const Tree = ({ position: initialPosition }) => {
  const [treePosition, setTreePosition] = useState(initialPosition);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newX = treePosition.x;
      let newY = treePosition.y;
      const moveStep = 25;

      const { key } = event;
      switch (key) {
        case "f":
          console.log("Cut");
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

      const maxy = -4500;
      const maxx = 2100;
      const miny = 300;
      const minx = -2100;

      if (newX > maxx) newX = maxx;
      if (newX < minx) newX = minx;
       if (newY > maxy) newY = maxy;
       if (newY < miny) newY = miny;

      setTreePosition({ x: newX, y: newY });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [treePosition]);

  const treeStyles = {
    position: "absolute",
    width: "50px",
    height: "50px",
    left: `${treePosition.x}px`, // Set the position based on the state
    top: `${treePosition.y}px`, // Set the position based on the state
    transition: "left 0.1s, top 0.1s",
  };

  const renderTree = () => {
    return (
      <>
        <div
          className="Tree"
          style={{
            width: `100px`,
            height: `100px`,
          }}
        />
      </>
    );
  };

  return <div style={treeStyles}>{renderTree()}</div>;
};

export default Tree;
