import React, {useState} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { getFirestore, collection, getDocs, query, where, waitForPendingWrites } from "firebase/firestore";
import { addDoc } from "firebase/firestore"; 
import {app} from '../../DatabaseConnection';
import { wait } from '@testing-library/user-event/dist/utils';

const db = getFirestore(app);
export default function Create_Stadium() {
    const [name, setname] = useState('');
    const [capacity, setcapacity] = useState(0);
    const [surface, setsurface] = useState('');
    const [address, setaddress] = useState('');

    async function add_stadium(event) {
        
        //setWait(true)
        var a = await addDoc(collection(db, "stadion"), {
            adresa: address,
            capacitate: capacity,
            denumire: name,
            tip_gazon: surface
          }).then(
          alert(`The stadium you added is: ${name}`));
          await Promise.all([a]);
          window.location.href = "http://localhost:3000/tostadion";
    }


    return (
    
        <Form className="create-form1">
        <h2 className="bt2">Add a stadium</h2>
        <Form.Field>
            <label className='scris'>name</label>
            <input className='raspuns' placeholder='Name' onChange={(e) => setname(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label className='scris'>capacity</label>
            <input className='raspuns' placeholder='Capacity' onChange={(e) => setcapacity(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label className='scris'>surface</label>
            <input className='raspuns' placeholder='Surface' onChange={(e) => setsurface(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label className='scris'>address</label>
            <input className='raspuns' placeholder='Address' onChange={(e) => setaddress(e.target.value)}/>
        </Form.Field>
        <Button className='bt2' onClick={add_stadium} type = 'submit'>Submit</Button>
    </Form>
)
}