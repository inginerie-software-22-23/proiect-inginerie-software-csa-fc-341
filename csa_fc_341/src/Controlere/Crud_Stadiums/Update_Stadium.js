import React, { useState,useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {app} from '../../DatabaseConnection';
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(app);
var date ;

export default function Update_Stadium() {
    const [stadiumId, setstadiumid] = useState();
    const [name, setname] = useState();
    const [capacity, setcapacity] = useState();
    const [surface, setsurface] = useState();
    const [address, setaddress] = useState();
    var id = localStorage.getItem('stadium_id')
    //console.log(id);
    const bebe=()=>{

    getDoc(doc(db, "stadion", id)).then(docSnap =>{
       
    date = docSnap.data(); 
        setstadiumid(date.id)
        setname(date.denumire);
        setcapacity(date.capacitate);
        setsurface(date.tip_gazon)
        setaddress(date.adresa);

        // setnameform(date.denumire);
        // setcapacityform(date.capacitate);
        // setsurfaceform(date.tip_gazon)
        // setaddressform(date.adresa);
        
    });
    
    }
    

    useEffect(()=> {bebe()},[])
    
    const handleSubmit = (event) => {
        
        console.log(name)
        console.log(capacity)
        console.log(surface)
        console.log(address)

        const washingtonRef = doc(db, "stadion", id);

    updateDoc(washingtonRef, {
  denumire: name,
  adresa: address,
  capacitate: capacity,
  tip_gazon: surface

});     event.preventDefault();
        alert(`The stadium you updated was: ${name}`);
        window.location.href = "http://localhost:3000/tostadion";
      }
    
    return (
        
        <form className='create-form1' onSubmit={handleSubmit}> 
        <div>
        
           <Form.Field className='ff'>
            <label>name</label>
            <input placeholder={name} value={name} onChange={(e) => setname(e.target.value)}  />
        </Form.Field>
        <Form.Field className='ff'>
            <label>capacity</label>
            <input placeholder={capacity} value={capacity} onChange={(e) => setcapacity(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>surface</label>
            <input placeholder={surface} value={surface} onChange={(e) => setsurface(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>address</label>
            <input placeholder={address} value={address} onChange={(e) => setaddress(e.target.value)} />
        </Form.Field>
        
        </div>
        <Button className='b1' type='submit' >Update</Button>
        </form>
    )
}