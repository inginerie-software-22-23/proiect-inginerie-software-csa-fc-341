import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);
var date;


export default function Update_Stadium() {
    const [staffId, setstaffid] = useState();
    const [nume, setnume] = useState('');
    const [prenume, setprenume] = useState('');
    const [data_nastere, setdata_nastere] = useState('');
    const [rol, setrol] = useState('');
    const [email, setemail] = useState('');
    const [telefon, settelefon] = useState('');

    let navigate = useNavigate();
    
    var id = localStorage.getItem('staff_id')
    
    
    const update=()=>{
        
        if(id){
            getDoc(doc(db, "staff", id)).then(docSnap =>{
            
            date = docSnap.data(); 
            setstaffid(date.id);
            setnume(date.nume);
            setprenume(date.prenume);
            setdata_nastere(date.data_nastere);
            setrol(date.rol);
            setemail(date.email);
            settelefon(date.telefon);

            // setnameform(date.denumire);
            // setcapacityform(date.capacitate);
            // setsurfaceform(date.tip_gazon)
            // setaddressform(date.adresa);
                
            });
        } else {
            navigate("/");
        }
    }
    

    useEffect(()=>{
        update();
    },[])
    
    const handleSubmit = (event) => {
        console.log(nume)
        console.log(prenume)
        console.log(data_nastere)
        console.log(rol)
        console.log(email)
        console.log(telefon)

        const washingtonRef = doc(db, "staff", id);

        updateDoc(washingtonRef, {
            nume: nume,
            prenume: prenume,
            data_nastere: data_nastere,
            rol: rol,
            email: email,
            telefon: telefon

        });
        
        event.preventDefault();
        alert(`The staff you updated was: ${nume}`);
        window.location.href = "http://localhost:3000/tostaff";
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
                                    <label>Nume</label>
                                    <input placeholder={nume} value={nume} onChange={(e) => setnume(e.target.value)}  />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>Prenume</label>
                                    <input placeholder={prenume} value={prenume} onChange={(e) => setprenume(e.target.value)} />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>Data_nastere</label>
                                    <input placeholder={data_nastere} value={data_nastere} onChange={(e) => setdata_nastere(e.target.value)} />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>Rol</label>
                                    <input placeholder={rol} value={rol} onChange={(e) => setrol(e.target.value)} />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>Email</label>
                                    <input placeholder={email} value={email} onChange={(e) => setemail(e.target.value)} />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>Telefon</label>
                                    <input placeholder={telefon} value={telefon} onChange={(e) => settelefon(e.target.value)} />
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