import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import DataContext from "./datacontext";

const App = () => {
  const [formData, setFormData] = useState({ room: "" });

  return (
    <Router>
      <DataContext.Provider value={{ formData, setFormData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </DataContext.Provider>
    </Router>
  );
};

export default App;
