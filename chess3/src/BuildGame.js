import React, { useContext } from "react";
import "./BuildGame.css";
import { Link } from "react-router-dom";
import DataContext from "./datacontext";

const BuildGame = () => {
  const { formData, setFormData } = useContext(DataContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData.room);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormData({ room: value });
  };

  return (
    <div className="home">

      <head> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
     crossorigin="anonymous"></script> </head>


      <h1 className="titlebuildgame">Challenge a Friend</h1>

      <h2 className="joinaroom">Join a Room</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            id="username"
            className="form-input-roomname"
            value={formData.room}
            onChange={handleInputChange}
            name="joinRoom" // Add the "name" attribute
          />
        </form>

        <h2 className="createaroom">Create a Room</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              id="username"
              className="form-input-createroomname"
              value={formData.room}
              onChange={handleInputChange}
              name="createRoom" // Add the "name" attribute
            />

          </form>

          <Link to={{
            pathname: "/Chess",
            state: { formData: formData.room },
          }}
          >
        <button className="joinroombutton">
          Join Room
        </button>
          </Link>

          <Link to={{
            pathname: "/Chess",
            state: { formData: formData.room },
          }}
          >
        <button className="createroombutton">
          Create Room
        </button>
          </Link>

    </div>
  );
};

export default BuildGame;
