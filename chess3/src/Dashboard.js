import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <h1 className="welcomesign">Welcome, Player</h1>

      <div className="game">

      <h2 className="boxtitle">Arena</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
          Challenge a Random Opponent
        </button>
      </Link>
      <Link className = "link" to="/BuildGame">
        <button className="play-button">
          Challenge a Friend
        </button>
      </Link>
      <Link className = "link" to="/Chess">
        <button className="play-button">
          Train Against a Computer
        </button>
      </Link>
      </div>
      <div className="myFriends">

      <h2 className="boxtitle">Factions</h2>

      <Link className = "link" to="/Chess">
        <button className="play-button">
          My Faction
        </button>
      </Link>
      <Link className = "link" to="/Chess">
      <button className="play-button">
        Campaigns
      </button>
      </Link>

      <Link className = "link" to="/Chess">
      <button className="play-button">
        View Factions
      </button>
      </Link>

      </div>

      <div className="collectibleswrapper">
        <div className="myCollectibles">
        <h2 className="boxtitle">My Profile</h2>

        <button className="play-button">
          Settings
        </button>

        <button className="play-button">
          Achievments
        </button>

        </div>

        <div className="wallet">

        <h2 className="boxtitle"> AD </h2>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7400163886565608"
        crossorigin="anonymous"></script>

        </div>

        <h1 className="collection">Your Collection</h1>

        <div className="chesspieces">

        <img src="https://secure.img1-fg.wfcdn.com/im/05978016/resize-h800-w800%5Ecompr-r85/1523/152303032/Chess+Piece+Study+I+by+Ethan+Harper+-+Wrapped+Canvas+Drawing+Print.jpg" className = "scrollableimage"/>
        <img src="https://as1.ftcdn.net/v2/jpg/02/26/24/34/1000_F_226243479_zf3trlngA4b5MpnxWlZUWXOETxQLWKgM.jpg" className = "scrollableimage"/>
        <img src="https://as1.ftcdn.net/v2/jpg/02/19/72/00/1000_F_219720088_tyxPaLgvlruFla9t2nR9rJyCP0sdFFLy.jpg" className = "scrollableimage"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpt4eeNkey6uV64R4SEmxLVZklXSxcwesZkQ&usqp=CAU" className = "scrollableimage"/>
        <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/11-chess-piece-csa-images.jpg" className = "scrollableimage"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCuYdBN6aCtEevg0VFUgAXbtzvgHawr2UcQ&usqp=CAU" className = "scrollableimage"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT78ZMvWpGY7pYR7QbgBqG2PHrDn4kr8qF0qw&usqp=CAU" className = "scrollableimage"/>
        <img src="https://static.displate.com/857x1200/displate/2021-12-06/c8418fa894ad25ef2218b17693087ff8_a9506b1f7b21cf2938b0d131709142e3.jpg" className = "scrollableimage"/>

        </div>

        <div className="chessboards">

        <img src="https://i.pinimg.com/736x/79/df/2b/79df2b7ef729cbd02bdc3177e60178d9--perspective-chess.jpg" className = "scrollableimage"/>
        <img src="https://www.shutterstock.com/image-vector/chess-vintage-engraving-old-engraved-260nw-82913716.jpg" className = "scrollableimage"/>
        <img src="https://img.freepik.com/premium-vector/hand-drawn-vector-drawing-checkered-chess-board-symbol-black-white-sketch-transparent_725846-192.jpg?w=2000" className = "scrollableimage"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6pO2HqmcgIQVTm7oGWIbLvFiapSs0qudHZw&usqp=CAU" className = "scrollableimage"/>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WfvXFIQG0A45_6_wN63XtkcW7EmZCzboNQ&usqp=CAU" className = "scrollableimage"/>
        <img src="https://render.fineartamerica.com/images/rendered/default/flat/puzzle/images/artworkimages/medium/3/checkered-chess-board-symbol-drawing-frank-ramspott.jpg?&targetx=0&targety=-102&imagewidth=1000&imageheight=954&modelwidth=1000&modelheight=750&backgroundcolor=2D2D2C&orientation=0&producttype=puzzle-18-24&brightness=765&v=6" className = "scrollableimage"/>
        <img src="https://media.istockphoto.com/id/1291788174/vector/hand-drawn-silhouettes-of-chess-pieces-and-chessboard-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=y1ELX5h2Gzz0PMmzkQcv2stFpXHIStnrpXKNL9Meh7g=" className = "scrollableimage"/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Chess_Board.svg/1200px-Chess_Board.svg.png" className = "scrollableimage"/>

        </div>
        <div className="knights">Your Knights</div>
      </div>
    </div>
  );
};

export default Dashboard;
