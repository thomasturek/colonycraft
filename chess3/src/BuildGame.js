import React, { useState } from "react";
import "./BuildGame.css";
import { Link } from "react-router-dom";

const BuildGame = () => {
  const [isPageChanging, setIsPageChanging] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ room: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // do something with the form data
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function togglePopup() {
  setShowPopup(!showPopup);
}

  return (
    <div className="home">


      <h1 className="titlebuildgame">Challenge a Friend</h1>

      <h2 className="joinaroom">Join a Room</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            id="username"
            className="form-input-roomname"
            value={formData.name}
            onChange={handleInputChange}
          />
        </form>

        <h2 className="createaroom">Create a Room</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              id="username"
              className="form-input-createroomname"
              value={formData.name}
              onChange={handleInputChange}
            />

          </form>

          <Link to={{
            pathname: "/Chess",
            state: { formData: formData },
          }}
          >
        <button className="joinroombutton" onClick={togglePopup}>
          Join Room
        </button>
          </Link>

          <Link to={{
            pathname: "/Chess",
            state: { formData: formData },
          }}
          >
        <button className="createroombutton" onClick={togglePopup}>
          Create Room
        </button>
          </Link>

    </div>
  );
};

export default BuildGame;
