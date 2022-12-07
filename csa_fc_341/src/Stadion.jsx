import * as React from 'react';
import Read_Stadium from './Controlere/Crud_Stadiums/Read_Stadium';
import Add_Stadium from './Controlere/Crud_Stadiums/Add_Stadium';
import './Stadion.css';
export function Stadion() {
  return (
    <div className="main">

  <body>
    <h2 className="main-header">Stadiums List</h2>

   
    <div className="pls">
       <Read_Stadium/>
    
  </div>
 
  </body>  
  </div>
  );
}
