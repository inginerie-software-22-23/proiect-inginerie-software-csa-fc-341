import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

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
          }).then(alert(`The stadium you added is: ${name}`));
          
          await Promise.all([a]);
          window.location.href = "http://localhost:3000/tostadion";
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
                    :
                        <></>
            }
        </div>
    )
}