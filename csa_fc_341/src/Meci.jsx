import * as React from 'react';
import Read_Match from './Controlere/Crud_Matches/Read_Match';


// import Add_Match from './Controlere/Crud_Matches/Add_Match';
export function Meci() {
  return (
    <div className="main">

        
    <h2 className="main-header">Lista meciuri</h2>

   
    <div className="pls">
       <Read_Match/>
    
  </div>

 
  
  </div>
  );
}
