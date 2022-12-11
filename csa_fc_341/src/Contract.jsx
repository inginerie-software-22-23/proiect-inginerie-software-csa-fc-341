import * as React from 'react';
import Read_Contract from './Controlere/Crud_Contracts/Read_Contract';


// import Add_Match from './Controlere/Crud_Matches/Add_Match';
export function Contract() {
  return (
    <div className="main">

        
    <h2 className="main-header">Lista contracte</h2>

   
    <div className="pls">
       <Read_Contract/>
    
  </div>

 
  
  </div>
  );
}
