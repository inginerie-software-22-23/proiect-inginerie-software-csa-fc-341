import React, { useState,useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);
var date;


export default function Update_Stadium() {
    const [stadiumId, setstadiumid] = useState();
    const [name, setname] = useState();
    const [capacity, setcapacity] = useState();
    const [surface, setsurface] = useState();
    const [address, setaddress] = useState();

    let navigate = useNavigate();

    var id = localStorage.getItem('stadium_id');
    
    
    const update=()=>{
        
        if(id){
            getDoc(doc(db, "stadion", id)).then(docSnap =>{
                
            date = docSnap.data(); 
            
            setstadiumid(date.id)
            setname(date.denumire);
            setcapacity(date.capacitate);
            setsurface(date.tip_gazon)
            setaddress(date.adresa);

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
        
        console.log(name)
        console.log(capacity)
        console.log(surface)
        console.log(address)

        const washingtonRef = doc(db, "stadion", id);

        updateDoc(washingtonRef, {
            denumire: name,
            adresa: address,
            capacitate: capacity,
            tip_gazon: surface
        });
        
        event.preventDefault();
        alert(`The stadium you updated was: ${name}`);
        window.location.href = "http://localhost:3000/tostadion";
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
                                    <label>name</label>
                                    <input placeholder={name} value={name} onChange={(e) => setname(e.target.value)}  />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>capacity</label>
                                    <input placeholder={capacity} value={capacity} onChange={(e) => setcapacity(e.target.value)} />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>surface</label>
                                    <input placeholder={surface} value={surface} onChange={(e) => setsurface(e.target.value)} />
                                </Form.Field>
                                <Form.Field className='ff'>
                                    <label>address</label>
                                    <input placeholder={address} value={address} onChange={(e) => setaddress(e.target.value)} />
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