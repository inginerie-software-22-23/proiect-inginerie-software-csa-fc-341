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

export default function Update_Contract() {
    const [contractId, setcontractid] = useState();
    const [impresar, setimpresar] = useState();
    const [salariu, setsalariu] = useState();
    const [data_inceput, setdata_inceput] = useState();
    const [data_final, setdata_final] = useState();
    const [bonusuri, setbonusuri] = useState();

    var id = localStorage.getItem('contract_id')
    console.log(id);
    const bebe=()=>{

    

    getDoc(doc(db, "contract", id)).then(docSnap =>{
       
    date = docSnap.data(); 
        setcontractid(date.id);
        setimpresar(date.impresar);
        setsalariu(date.salariu);
        setdata_inceput(date.data_inceput);
        setdata_final(date.data_final);
        setbonusuri(date.bonusuri);
        
    }
    );
    
    }
    

    useEffect(()=> {bebe()},[])
    
    const handleSubmit = (event) => {
        
        console.log(impresar)
        console.log(salariu)
        console.log(data_inceput)
        console.log(data_final)
        console.log(bonusuri)

        const washingtonRef = doc(db, "contract", id);

    updateDoc(washingtonRef, {
  impresar: impresar,
  salariu: salariu,
  data_inceput: data_inceput,
  data_final: data_final,
  bonusuri:bonusuri

});     event.preventDefault();
        alert(`S-a modificat contractul pentru impresar: ${impresar}`);
        window.location.href = "http://localhost:3000/tocontract";
}
    
    return (
        
        
        <form className='create-form1' onSubmit={handleSubmit}> 
        
        <div>
        
           <Form.Field className='ff'>
            <label>impresar</label>
            <input placeholder={impresar} value={impresar} onChange={(e) => setimpresar(e.target.value)}  />
        </Form.Field>
        <Form.Field className='ff'>
            <label>salariu</label>
            <input placeholder={salariu} value={salariu} onChange={(e) => setsalariu(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>data incepere</label>
            <input placeholder={data_inceput} value={data_inceput} onChange={(e) => setdata_inceput(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>data finalizare</label>
            <input placeholder={data_final} value={data_final} onChange={(e) => setdata_final(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>bonusuri</label>
            <input placeholder={bonusuri} value={bonusuri} onChange={(e) => setbonusuri(e.target.value)} />
        </Form.Field>
    
        
        </div>
        <Button className='b1' type='submit' >Update</Button>
        </form>
    )
}