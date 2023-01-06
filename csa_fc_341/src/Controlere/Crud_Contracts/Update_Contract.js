import React, { useState,useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


const db = getFirestore(app);
var date;

export default function Update_Contract() {
    const [contractId, setcontractid] = useState();
    const [impresar, setimpresar] = useState();
    const [salariu, setsalariu] = useState();
    const [data_inceput, setdata_inceput] = useState();
    const [data_final, setdata_final] = useState();
    const [bonusuri, setbonusuri] = useState();
    const [idpersoana, setidpersoana] = useState();

    let navigate = useNavigate();

    var id = localStorage.getItem('contract_id');
    

    const update = () =>{
        if(id){
            getDoc(doc(db, "contract", id)).then(docSnap =>{
                date = docSnap.data();

                setidpersoana(date.id_persoana);
                setcontractid(date.id);
                setimpresar(date.impresar);
                setsalariu(date.salariu);
                setdata_inceput(date.data_inceput);
                setdata_final(date.data_final);
                setbonusuri(date.bonusuri);
                
            });
        } else {
            navigate('/');
        }
    }
    
    useEffect(()=>{
        update();
    },[])
    
    const handleSubmit = (event) => {

        const washingtonRef = doc(db, "contract", id);

        updateDoc(washingtonRef, {
            impresar: impresar,
            salariu: salariu,
            data_inceput: data_inceput,
            data_final: data_final,
            bonusuri:bonusuri
        });     
        
        event.preventDefault();
        alert(`S-a modificat contractul pentru impresar: ${impresar}`);
        window.location.href = "http://localhost:3000/tocontract";
    }

    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");


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
                    :
                        <></>
            }
        </div>
    )
}