import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< Updated upstream
=======
import {Stadion} from './Stadion';
import {Weather} from './Weather'
import Update_Stadium from './Controlere/Crud_Stadiums/Update_Stadium';
import Add_Stadium from './Controlere/Crud_Stadiums/Add_Stadium'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation  from "./Controlere/Navigation";
import Home from "./Controlere/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< Updated upstream
  <React.StrictMode>
    <App />
  </React.StrictMode>
=======
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tostadion" element={<Stadion />} />
      <Route path="/toweather" element={<Weather />} />
      <Route path="/update_stadium" element={<Update_Stadium />} />
      <Route path="/add_stadium" element={<Add_Stadium />} />
    </Routes>
  </Router>
>>>>>>> Stashed changes
);
