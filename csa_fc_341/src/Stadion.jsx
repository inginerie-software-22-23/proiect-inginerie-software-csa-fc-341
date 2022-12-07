import * as React from 'react';
import Read_Stadium from './Controlere/Crud_Stadiums/Read_Stadium';
import Add_Stadium from './Controlere/Crud_Stadiums/Add_Stadium';
export function Stadion() {
  return (
    <div className="main">

        
    <h2 className="main-header">Stadiums List</h2>

   
    <div className="pls">
       <Read_Stadium/>
    
  </div>

 
  
  </div>
  );
}
