import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import { createContext } from 'react';
import ChessGame from "./ChessGame";
import Dashboard from "./Dashboard";
import BuildGame from "./BuildGame";
import DataContext from "./datacontext";

const App = () => {

  const [formData, setFormData] = useState({ room: "" });

  return (
    <Router>
    <DataContext.Provider value={{ formData, setFormData }}>
      <Routes>
        <Route path="" Component={Home}/>
        <Route path="/Chess" Component={ChessGame}/>
        <Route path="/Dashboard" Component={Dashboard}/>
        <Route path="/BuildGame" Component={BuildGame}/>
      </Routes>
      </DataContext.Provider>
    </Router>
  );
};

export default App;
