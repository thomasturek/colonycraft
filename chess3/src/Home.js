import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const Home = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyD_NhL2SagoMPoWLy4q48FSjcsaxMGZIeQ",
    authDomain: "colonycraft-a8fc5.firebaseapp.com",
    projectId: "colonycraft-a8fc5",
    storageBucket: "colonycraft-a8fc5.appspot.com",
    messagingSenderId: "964689343361",
    appId: "1:964689343361:web:f5d06f70456745f12aee80"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  function togglePopup() {
  setShowPopup(!showPopup);
}

  async function registerUser(walletAddress) {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => doc.data());

      if(userList.includes(walletAddress)) {

        console.log("user already has an island!")

      } else {

        await usersCollection.doc(walletAddress).set({
          wood: 0,
          wheat: 0,
          fish: 0,

        });

      }

  }

  return (
    <div className="homepage">
    <head> <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
     crossorigin="anonymous"></script> </head>
      <div className="background">
      <div className="planet"></div>
      <div className="waterplanet"></div>
      <div className="mountainisland"></div>
      <div className="rockyisland"></div>
      </div>
      <h1 className="title">Welcome to Colonycraft!</h1>
      <div className="buttonbox">
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
        <button className="button" onClick={registerUser('0x')}>
          Buy Island ($1)
        </button>
        <form>
        <button className="button" formaction="https://docs.colonycraft.xyz">
          Colonycraft Docs
        </button>
        </form>
        <form>
        <button className="button" formaction="https://discord.gg/9XhNSdRg">
          Join Our Discord
        </button>
        </form>
        </div>


        </div>
  );
};

export default Home;
