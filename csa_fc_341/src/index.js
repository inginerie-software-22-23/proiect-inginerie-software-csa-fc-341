import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Stadion} from './Stadion';
import {Meci} from './Meci';
import {Jucator} from './Jucator';
import {Weather} from './Weather';
import Update_Stadium from './Controlere/Crud_Stadiums/Update_Stadium';
import Add_Stadium from './Controlere/Crud_Stadiums/Add_Stadium'
import Add_Player from './Controlere/Crud_Players/Add_Player'
// import Update_Match from './Controlere/Crud_Matches/Update_Match';
// import Add_Match from './Controlere/Crud_Matches/Add_Match'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation  from "./Controlere/Navigation";
import Home from "./Controlere/Home";
import Update_Player from './Controlere/Crud_Players/Update_Player';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Navigation />
    <Routes>
      {/* Ruta pentru pagina de Home */}
      <Route path="/" element={<Home />} />

      {/* Ruta pentru pagina de Stadioane */}
      <Route path="/tostadion" element={<Stadion />} />
      <Route path="/toweather" element={<Weather />} />
      <Route path="/update_stadium" element={<Update_Stadium />} />
      <Route path="/add_stadium" element={<Add_Stadium />} />

      {/* Ruta pentru pagina de Meciuri */}
      <Route path="/tomeci" element={<Meci />} />
      {/* <Route path="/update_match" element={<Update_Match />} />
      <Route path="/add_match" element={<Add_Match />} /> */}


      {/* Ruta pentru pagina de Jucatori */}
      <Route path="/tojucator" element={<Jucator />} />
      <Route path="/update_player" element={<Update_Player />} />
      <Route path="/add_player" element={<Add_Player />} />


    </Routes>
  </Router>
);
