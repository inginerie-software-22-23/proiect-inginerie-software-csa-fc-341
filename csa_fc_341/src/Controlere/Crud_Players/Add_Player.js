import React, { useState, useEffect } from 'react'
import { Button,  Form } from 'semantic-ui-react'
import { getFirestore, collection, doc, getDoc, addDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


const db = getFirestore(app);

export default function Create_Staff() {
    const [nume, setnume] = useState('');
    const [prenume, setprenume] = useState('');
    const [data_nastere, setdata_nastere] = useState('');
    const [pozitie, setpozitie] = useState('');
    const [picior, setpicior] = useState('');
    const [nationalitate, setnationalitate] = useState('');
    const [inaltime, setinaltime] = useState(0);

    async function add_player(event) {
        
        var a = await addDoc(collection(db, "jucator"), {
            nume: nume,
            prenume: prenume,
            data_nastere: data_nastere,
            pozitie: pozitie,
            picior: picior,
            nationalitate: nationalitate,
            inaltime: inaltime
        }).then(alert(`The player you added is: ${nume}`));
          
        await Promise.all([a]);
        window.location.href = "http://localhost:3000/tojucator";
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
                            
                            <h2 className="bt2">Add a player</h2>
                            
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
                                <label className='scris'>Pozitie</label>
                                <input className='raspuns' placeholder='Pozitie' onChange={(e) => setpozitie(e.target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Picior</label>
                                <input className='raspuns' placeholder='Picior' onChange={(e) => setpicior(e.target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Nationalitate</label>
                                <input className='raspuns' placeholder='Nationalitate' onChange={(e) => setnationalitate(e.target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Inaltime</label>
                                <input className='raspuns' placeholder='Inaltime' onChange={(e) => setinaltime(e.target.value)}/>
                            </Form.Field>
                            
                            <Button className='bt2' onClick={add_player} type = 'submit'>Submit</Button>

                        </Form>
                    :
                        <></>
            }
        </div>
    )
}