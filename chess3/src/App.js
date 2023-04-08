import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import ChessGame from "./ChessGame";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" Component={Home}/>
        <Route path="/Chess" Component={ChessGame}/>
        <Route path="/Dashboard" Component={Dashboard}/>
      </Routes>
    </Router>
  );
};

export default App;
