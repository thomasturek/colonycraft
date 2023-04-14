import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import ChessGame from "./ChessGame";
import Dashboard from "./Dashboard";
import BuildGame from "./BuildGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" Component={Home}/>
        <Route path="/Chess" Component={ChessGame}/>
        <Route path="/Dashboard" Component={Dashboard}/>
        <Route path="/BuildGame" Component={BuildGame}/>
      </Routes>
    </Router>
  );
};

export default App;
