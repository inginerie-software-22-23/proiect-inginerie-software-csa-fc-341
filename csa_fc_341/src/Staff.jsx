import * as React from 'react';
import Read_Staff from './Controlere/Crud_Staffs/Read_Staff';


// import Add_Match from './Controlere/Crud_Matches/Add_Match';
export function Staff() {
  return (
    <div className="main">

        
    <h2 className="main-header">Lista membrii staff</h2>

   
    <div className="pls">
       <Read_Staff/>
    
  </div>

 
  
  </div>
  );
}
