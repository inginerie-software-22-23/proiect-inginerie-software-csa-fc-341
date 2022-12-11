import React, {useState} from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { getFirestore, collection, getDocs, query, where, waitForPendingWrites } from "firebase/firestore";
import { addDoc } from "firebase/firestore"; 
import {app} from '../../DatabaseConnection';
import { wait } from '@testing-library/user-event/dist/utils';

const db = getFirestore(app);
export default function Create_Staff() {
    const [nume, setnume] = useState('');
    const [prenume, setprenume] = useState('');
    const [data_nastere, setdata_nastere] = useState('');
    const [rol, setrol] = useState('');
    const [email, setemail] = useState('');
    const [telefon, settelefon] = useState('');

    async function add_staff(event) {
        
        //setWait(true)
        var a = await addDoc(collection(db, "staff"), {
            nume: nume,
            prenume: prenume,
            data_nastere: data_nastere,
            rol: rol,
            email: email,
            telefon: telefon
          }).then(
          alert(`The staff member you added is: ${nume}`));
          await Promise.all([a]);
          window.location.href = "http://localhost:3000/tostaff";
    }


    return (
    
        <Form className="create-form1">
        <h2 className="bt2">Add a staff member</h2>
        <Form.Field>
            <label className='scris'>Nume</label>
            <input className='raspuns' placeholder='Nume' onChange={(e) => setnume(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label className='scris'>Prenume</label>
            <input className='raspuns' placeholder='Prenume' onChange={(e) => setprenume(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label className='scris'>Data nastere</label>
            <input className='raspuns' placeholder='Data nastere' onChange={(e) => setdata_nastere(e.target.value)} />
        </Form.Field>
        <Form.Field>
            <label className='scris'>Rol</label>
            <input className='raspuns' placeholder='Rol' onChange={(e) => setrol(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label className='scris'>Email</label>
            <input className='raspuns' placeholder='Email' onChange={(e) => setemail(e.target.value)}/>
        </Form.Field>
        <Form.Field>
            <label className='scris'>Telefon</label>
            <input className='raspuns' placeholder='Telefon' onChange={(e) => settelefon(e.target.value)}/>
        </Form.Field>
        <Button className='bt2' onClick={add_staff} type = 'submit'>Submit</Button>
    </Form>
)
}