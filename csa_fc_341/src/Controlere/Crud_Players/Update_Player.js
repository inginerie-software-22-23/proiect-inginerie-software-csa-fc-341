import React, { useState,useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


const db = getFirestore(app);
var date;

export default function Update_Player() {
    const [playerId, setplayerid] = useState();
    const [nume, setnume] = useState();
    const [prenume, setprenume] = useState();
    const [picior, setpicior] = useState();
    const [pozitie, setpozitie] = useState();
    const [nationalitate, setnationalitate] = useState();
    const [inaltime, setinaltime] = useState();
    const [data_nastere, setdata_nastere] = useState();

    let navigate = useNavigate();

    var id = localStorage.getItem('player_id');


    const update = () =>{

        if(id){
            getDoc(doc(db, "jucator", id)).then(docSnap =>{
                date = docSnap.data(); 
                    setplayerid(date.id);
                    setnume(date.nume);
                    setprenume(date.prenume);
                    setpicior(date.picior);
                    setpozitie(date.pozitie);
                    setnationalitate(date.nationalitate);
                    setinaltime(date.inaltime);
                    setdata_nastere(date.data_nastere);
            });
        } else {
            navigate('/');
        }
    }
    


    useEffect(()=>{
        update();
      },[])
    
    const handleSubmit = (event) => {
        
        console.log(nume)
        console.log(prenume)
        console.log(picior)
        console.log(pozitie)
        console.log(nationalitate)
        console.log(inaltime)
        console.log(data_nastere)

        const washingtonRef = doc(db, "jucator", id);

    updateDoc(washingtonRef, {
  nume: nume,
  prenume: prenume,
  picior: picior,
  pozitie: pozitie,
  nationalitate: nationalitate,
  inaltime: inaltime,
  data_nastere: data_nastere

});     event.preventDefault();
        alert(`S-a modificat jucatorul: ${nume}`);
        window.location.href = "http://localhost:3000/tojucator";
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
                                <label>nume</label>
                                <input placeholder={nume} value={nume} onChange={(e) => setnume(e.target.value)}  />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>prenume</label>
                                <input placeholder={prenume} value={prenume} onChange={(e) => setprenume(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>picior</label>
                                <input placeholder={picior} value={picior} onChange={(e) => setpicior(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>pozitie</label>
                                <input placeholder={pozitie} value={pozitie} onChange={(e) => setpozitie(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>nationalitate</label>
                                <input placeholder={nationalitate} value={nationalitate} onChange={(e) => setnationalitate(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>inaltime</label>
                                <input placeholder={inaltime} value={inaltime} onChange={(e) => setinaltime(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>data_nastere</label>
                                <input placeholder={data_nastere} value={data_nastere} onChange={(e) => setdata_nastere(e.target.value)} />
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