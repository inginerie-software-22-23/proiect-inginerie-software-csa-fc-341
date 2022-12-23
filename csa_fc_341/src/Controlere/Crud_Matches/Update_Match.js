import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { app, auth } from '../../DatabaseConnection';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


const db = getFirestore(app);
var date ;

export default function Update_Match() {
    const [matchId, setmatchid] = useState();
    const [adversar, setadversar] = useState();
    const [arbitru, setarbitru] = useState();
    const [competitie, setcompetitie] = useState();
    const [data, setdata] = useState();
    const [scor, setscor] = useState();

    let navigate = useNavigate();
    
    var id = localStorage.getItem('match_id')
    

    const update = () => {
        
        if(id){
            getDoc(doc(db, "meci", id)).then(docSnap =>{
                date = docSnap.data();

                setmatchid(date.id);
                setadversar(date.adversar);
                setarbitru(date.arbitru);
                setcompetitie(date.competitie);
                setdata(date.data);
                setscor(date.scor); 
            });
        } else {
            navigate('/');
        }
    }
    

    useEffect(()=>{
        update();
      },[])
    
    const handleSubmit = (event) => {
        
        console.log(adversar)
        console.log(arbitru)
        console.log(competitie)
        console.log(data)
        console.log(scor)

        const washingtonRef = doc(db, "meci", id);

    updateDoc(washingtonRef, {
  adversar:adversar,
  arbitru:arbitru,
  competitie:competitie,
  data:data,
  scor: scor

});     event.preventDefault();
        alert(`S-a modificat meciul cu: ${adversar}`);
        window.location.href = "http://localhost:3000/tomeci";
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
                                <label>adversar</label>
                                <input placeholder={adversar} value={adversar} onChange={(e) => setadversar(e.target.value)}  />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>arbitru</label>
                                <input placeholder={arbitru} value={arbitru} onChange={(e) => setarbitru(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>competitie</label>
                                <input placeholder={competitie} value={competitie} onChange={(e) => setcompetitie(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>data</label>
                                <input placeholder={data} value={data} onChange={(e) => setdata(e.target.value)} />
                            </Form.Field>
                            <Form.Field className='ff'>
                                <label>scor</label>
                                <input placeholder={scor} value={scor} onChange={(e) => setscor(e.target.value)} />
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