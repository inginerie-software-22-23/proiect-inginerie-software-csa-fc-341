import React, { useState,useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {app} from '../../DatabaseConnection';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Jucator } from '../../Jucator';
const db = getFirestore(app);
var date ;

export default function Update_Match() {
    const [matchId, setmatchid] = useState();
    const [adversar, setadversar] = useState();
    const [arbitru, setarbitru] = useState();
    const [competitie, setcompetitie] = useState();
    const [data, setdata] = useState();
    const [scor, setscor] = useState();
    
    var id = localStorage.getItem('match_id')
    console.log(id);
    const bebe=()=>{

    

    getDoc(doc(db, "meci", id)).then(docSnap =>{
       
    date = docSnap.data(); 
        setmatchid(date.id);
        setadversar(date.adversar);
        setarbitru(date.arbitru);
        setcompetitie(date.competitie);
        setdata(date.data);
        setscor(date.scor);
        
    }
    );
    
    }
    

    useEffect(()=> {bebe()},[])
    
    const handleSubmit = (event) => {
        
        console.log(adversar)
        console.log(arbitru)
        console.log(competitie)
        console.log(data)
        console.log(scor)

        const washingtonRef = doc(db, "meci", id);

    updateDoc(washingtonRef, {
  adversar:adversar,
  arbitru:arbitru,
  competitie:competitie,
  data:data,
  scor: scor

});     event.preventDefault();
        alert(`S-a modificat meciul cu: ${adversar}`);
        window.location.href = "http://localhost:3000/tomeci";
}
    
    return (
        
        
        <form className='create-form1' onSubmit={handleSubmit}> 
        
        <div>
        
           <Form.Field className='ff'>
            <label>adversar</label>
            <input placeholder={adversar} value={adversar} onChange={(e) => setadversar(e.target.value)}  />
        </Form.Field>
        <Form.Field className='ff'>
            <label>arbitru</label>
            <input placeholder={arbitru} value={arbitru} onChange={(e) => setarbitru(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>competitie</label>
            <input placeholder={competitie} value={competitie} onChange={(e) => setcompetitie(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>data</label>
            <input placeholder={data} value={data} onChange={(e) => setdata(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>scor</label>
            <input placeholder={scor} value={scor} onChange={(e) => setscor(e.target.value)} />
        </Form.Field>
    
        
        </div>
        <Button className='b1' type='submit' >Update</Button>
        </form>
    )
}