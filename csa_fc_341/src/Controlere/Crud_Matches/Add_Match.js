import React, {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import { getFirestore, collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore"; 
import {app} from '../../DatabaseConnection';


const db = getFirestore(app);

export default function Create_Match() {
    const [adversar, setadversar] = useState('');
    const [arbitru, setarbitru] = useState('');
    const [competitie, setcompetitie] = useState('');
    const [data, setdata] = useState('');
    const [scor, setscor] = useState('');

    // NU MERG
    // const [id_stadion, setid_stadion] = useState('');
    // const [lista_jucatori, setlista_jucatori] = useState('');

    async function add_match(event) {
        
        //setWait(true)
        var a = await addDoc(collection(db, "meci"), {
            adversar: adversar,
            arbitru: arbitru,
            competitie: competitie,
            data: data,
            scor: scor
          }).then(
          alert(`The match you added is: ${adversar}`));
          await Promise.all([a]);
          window.location.href = "http://localhost:3000/tomeci";
    }

    return (
        <Form className="create-form1">
            <h2 className="bt2">Add a match</h2>
            
            <Form.Field>
                <label className='scris'>Adversar</label>
                <input className='raspuns' placeholder='Adverar' onChange={(e) => setadversar(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label className='scris'>Arbitru</label>
                <input className='raspuns' placeholder='Arbitru' onChange={(e) => setarbitru(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label className='scris'>Competitie</label>
                <input className='raspuns' placeholder='Competitie' onChange={(e) => setcompetitie(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label className='scris'>Data</label>
                <input className='raspuns' placeholder='Data' onChange={(e) => setdata(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label className='scris'>Scor</label>
                <input className='raspuns' placeholder='Scor' onChange={(e) => setscor(e.target.value)}/>
            </Form.Field>
            
            <Button className='bt2' onClick={add_match} type = 'submit'>Submit</Button>
        </Form>
    )
}