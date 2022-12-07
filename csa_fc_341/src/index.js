import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Stadion} from './Stadion';
import {Weather} from './Weather'
import Update_Stadium from './Controlere/Crud_Stadiums/Update_Stadium';
import Add_Stadium from './Controlere/Crud_Stadiums/Add_Stadium'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tostadion" element={<Stadion />} />
      <Route path="/toweather" element={<Weather />} />
      <Route path="/update_stadium" element={<Update_Stadium />} />
      <Route path="/add_stadium" element={<Add_Stadium />} />
    </Routes>
  </Router>
);
