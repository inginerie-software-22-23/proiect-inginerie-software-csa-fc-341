import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { app, auth } from '../../DatabaseConnection';
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";


const db = getFirestore(app);

export default function Create_Contract() {
    const [impresar, setimpresar] = useState('');
    const [salariu, setsalariu] = useState(0);
    const [data_inceput, setdata_inceput] = useState('');
    const [data_final, setdata_final] = useState('');
    const [bonusuri, setbonusuri] = useState(0);

    //NU MERGE 
    // const [id_persoana, setpersoana] = useState('');


    async function add_contract(event) {
        
        //setWait(true)
        var a = await addDoc(collection(db, "contract"), {
            impresar: impresar,
            salariu: salariu,
            data_inceput: data_inceput,
            data_final: data_final,
            bonusuri: bonusuri
        }).then(alert(`The contract you added is: ${data_inceput}`));
          
        await Promise.all([a]);
        window.location.href = "http://localhost:3000/tocontract";
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

                            <h2 className="bt2">Add a contract</h2>

                            <Form.Field>
                                <label className='scris'>Impresar</label>
                                <input className='raspuns' placeholder='Impresar' onChange={(e) => setimpresar(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Salariu</label>
                                <input className='raspuns' placeholder='Salariu' onChange={(e) => setsalariu(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Data inceput</label>
                                <input className='raspuns' placeholder='Data_inceput' onChange={(e) => setdata_inceput(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Data final</label>
                                <input className='raspuns' placeholder='Data_final' onChange={(e) => setdata_final(e.target.value)}/>
                            </Form.Field>
                            <Form.Field>
                                <label className='scris'>Bonusuri</label>
                                <input className='raspuns' placeholder='Bonusuri' onChange={(e) => setbonusuri(e.target.value)}/>
                            </Form.Field>
                            
                            <Button className='bt2' onClick={add_contract} type = 'submit'>Submit</Button>
                            
                        </Form>
                    :
                        <></>
            }
        </div>
    )
}