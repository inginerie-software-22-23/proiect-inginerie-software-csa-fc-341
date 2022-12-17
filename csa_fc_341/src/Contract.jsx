import * as React from 'react';
import Read_Contract from './Controlere/Crud_Contracts/Read_Contract';


export function Contract() {
  return (
    <div className="main">

      <div className="container_coperta">
        <img src="https://www.freewebheaders.com/wp-content/gallery/office-finance/currency-bank-notes-and-coins-website-header.jpg" alt="poza contracte" id="poza_coperta"/>
        <div className="centered"> &#x2605;    LISTA CONTRACTE    &#x2605; </div>
      </div>   
   
      <div className="pls">
        <Read_Contract/>
      </div>

    </div>
  );
}
