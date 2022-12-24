import { Button } from "semantic-ui-react";
import { useState } from "react";
import { app, auth } from "./DatabaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, where, query, collection, getDocs, limit } from "firebase/firestore";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


const db = getFirestore(app);

function Register(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [rol, setRol] = useState("");


    async function checkUser(tabel, nume, prenume) {
        const col = collection(db, tabel);

        let q = query(col, where("nume", "==", nume));
        q = query(q, where("prenume", "==", prenume));
        q = query(q, limit(1));

        const snapshot = await getDocs(q);
        
        var docref = null;
        snapshot.forEach((doc) =>{
            docref = doc.ref;
        });

        return docref;
    }

    const register = async (event) => {
        try{
            event.preventDefault();

            const userRef = await checkUser(rol, nume, prenume);

            if (userRef){
                createUserWithEmailAndPassword(auth, email, passwd)
                .then(async (res) => {

                    await setDoc(doc(db, "users", res.user.uid), {
                        email: email,
                        parola: passwd,
                        rol: rol,
                        user: userRef,
                    })

                })
                .catch((e) => console.log("E-mail deja folosit!"));
            } else {
                console.log("Userul nu exista!");
            }
        } catch (error){
            console.log(error.message);
        }
    }
    

    return(
        <div>
            
            <h3>Register</h3>

            <input 
                placeholder="Email"
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
                value={email}
            />

            <br /> <br />

            <input 
                placeholder="Parola"
                onChange={(event) => {
                    setPasswd(event.target.value);
                }}
                value={passwd}
            />

            <br /> <br />

            <input 
                placeholder="Nume"
                onChange={(event) => {
                    setNume(event.target.value);
                }}
                value={nume}
            />

            <br /> <br />

            <input 
                placeholder="Prenume"
                onChange={(event) => {
                    setPrenume(event.target.value);
                }}
                value={prenume}
            />

            <br /> <br />

            <Box sx={{ maxWidth: 120 }}>

                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rol}
                        label="Rol"
                        onChange={(event) => {
                            setRol(event.target.value);
                        }}>

                            <MenuItem value={"jucator"}>Jucator</MenuItem>
                            <MenuItem value={"staff"}>Staff</MenuItem>
                    </Select>

                </FormControl>

            </Box>
            
            <br /> <br />

            <Button onClick={(event) => {
                register(event);

                setEmail('');
                setPasswd('');
                setNume('');
                setPrenume('');
                setRol('');
                }}>
                    Register
            </Button>
            
        </div>
    );
}

export default Register;