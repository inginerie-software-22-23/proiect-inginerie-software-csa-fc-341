import React, { useState,useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {app} from '../../DatabaseConnection';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const db = getFirestore(app);
var date;

export default function Update_Player() {
    const [playerId, setplayerid] = useState();
    const [nume, setnume] = useState();
    const [prenume, setprenume] = useState();
    const [picior, setpicior] = useState();
    const [pozitie, setpozitie] = useState();
    const [nationalitate, setnationalitate] = useState();
    const [inaltime, setinaltime] = useState();
    const [data_nastere, setdata_nastere] = useState();

    var id = localStorage.getItem('player_id')
    console.log(id);

    const bebe = () =>{

        getDoc(doc(db, "jucator", id)).then(docSnap =>{
            date = docSnap.data(); 
                setplayerid(date.id);
                setnume(date.nume);
                setprenume(date.prenume);
                setpicior(date.picior);
                setpozitie(date.pozitie);
                setnationalitate(date.nationalitate);
                setinaltime(date.inaltime);
                setdata_nastere(date.data_nastere);
        });
    }
    

    useEffect(()=> {bebe()})
    
    const handleSubmit = (event) => {
        
        console.log(nume)
        console.log(prenume)
        console.log(picior)
        console.log(pozitie)
        console.log(nationalitate)
        console.log(inaltime)
        console.log(data_nastere)

        const washingtonRef = doc(db, "jucator", id);

    updateDoc(washingtonRef, {
  nume: nume,
  prenume: prenume,
  picior: picior,
  pozitie: pozitie,
  nationalitate: nationalitate,
  inaltime: inaltime,
  data_nastere: data_nastere

});     event.preventDefault();
        alert(`S-a modificat jucatorul: ${nume}`);
        window.location.href = "http://localhost:3000/tojucator";
}
    
    return (
        
        
        <form className='create-form1' onSubmit={handleSubmit}> 
        
        <div>
        
           <Form.Field className='ff'>
            <label>nume</label>
            <input placeholder={nume} value={nume} onChange={(e) => setnume(e.target.value)}  />
        </Form.Field>
        <Form.Field className='ff'>
            <label>prenume</label>
            <input placeholder={prenume} value={prenume} onChange={(e) => setprenume(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>picior</label>
            <input placeholder={picior} value={picior} onChange={(e) => setpicior(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>pozitie</label>
            <input placeholder={pozitie} value={pozitie} onChange={(e) => setpozitie(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>nationalitate</label>
            <input placeholder={nationalitate} value={nationalitate} onChange={(e) => setnationalitate(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>inaltime</label>
            <input placeholder={inaltime} value={inaltime} onChange={(e) => setinaltime(e.target.value)} />
        </Form.Field>
        <Form.Field className='ff'>
            <label>data_nastere</label>
            <input placeholder={data_nastere} value={data_nastere} onChange={(e) => setdata_nastere(e.target.value)} />
        </Form.Field>
    
        
        </div>
        <Button className='b1' type='submit' >Update</Button>
        </form>
    )
}