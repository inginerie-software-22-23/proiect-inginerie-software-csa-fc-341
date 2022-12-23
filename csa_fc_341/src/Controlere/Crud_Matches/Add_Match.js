import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


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


    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");

    let navigate = useNavigate();

    async function get_detalii_user(docID){
        const ref = doc(db, "users", docID);

        await getDoc(ref)
        .then(async (response) => {
            let res = response.data();
            
            setRol_user(res.rol);
            if(res.rol !== "admin"){
                return navigate("/");
            }
        })
        .catch((e) => console.log(e));
    }

    useEffect(() => {
        if (loading){
            return;
        } else if(user){
            get_detalii_user(user.uid);
        } else {
            return navigate("/");
        }
    }, [loading, user]);

    return (
        <div>
            {
                rol_user !== ""
                ?
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
                :
                    <></>
            }
        </div>
    )
}