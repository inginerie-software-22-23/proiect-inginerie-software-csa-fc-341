import * as React from 'react';
import Read_Contract from './Controlere/Crud_Contracts/Read_Contract';


// import Add_Match from './Controlere/Crud_Matches/Add_Match';
export function Contract() {
  return (
    <div className="main">

        
    <div className="container_coperta">
        <img src="https://www.freewebheaders.com/wp-content/gallery/office-finance/currency-bank-notes-and-coins-website-header.jpg" id="poza_coperta"/>
         <div className="centered"> &#x2605;    LISTA CONTRACTE    &#x2605; </div>
      </div>   
   
    <div className="pls">
       <Read_Contract/>
    
  </div>

 
  
  </div>
  );
}
