import { useState } from "react";
import { app, auth } from "./DatabaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc, where, query, collection, getDocs, limit } from "firebase/firestore";

import { InputLabel, MenuItem, FormControl, Select, Box, TextField, IconButton, Button, FormHelperText } from '@mui/material';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import "./Controlere/Stil.css";


const db = getFirestore(app);

function Register(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [rol, setRol] = useState("");

    const [showPassword, setShowPassword] = useState(true);

    const [userError, setUserError] = useState(false);
    const [emailUsedError, setEmailUsedError] = useState(false);
    const [emailInvalidError, setEmailInvalidError] = useState(false);
    const [passwdError, setPasswdError] = useState(false);


    const handleShowPassword = () => setShowPassword(!showPassword);

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
                    });

                    setEmail('');
                    setPasswd('');
                    setNume('');
                    setPrenume('');
                    setRol('');
                })
                .catch((error) => {
                    if(error.code === "auth/weak-password"){
                        setPasswdError(true);
                    } else if(error.code === "auth/email-already-in-use"){
                        setEmailUsedError(true);
                    } else if(error.code === "auth/invalid-email"){
                        setEmailInvalidError(true);
                    }
                });
            } else {
                setUserError(true);
            }
        } catch (error){
            console.log(error.message);
        }
    }
    

    return(
        <div className = "register">
            
            <h2>Register</h2>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <EmailOutlinedIcon sx = {{ color: 'action.active', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "new-password"
                    variant = "outlined"
                    error = {emailUsedError || emailInvalidError}
                    helperText = {emailUsedError ? "Email deja utilizat" : emailInvalidError ? "Format nevalid de e-mail" : ""}
                    placeholder = "Email"
                    onChange = {(event) => {
                        if(emailUsedError){
                            setEmailUsedError(false);
                        } else if (emailInvalidError){
                            setEmailInvalidError(false);
                        }
                        setEmail(event.target.value);
                    }}
                    value = {email}
                />
            </Box>
            
            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <PasswordOutlinedIcon sx = {{ color: 'action.active', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "new-password"
                    variant = "outlined"
                    error = {passwdError}
                    helperText = {passwdError ? "Parola slaba" : ""}
                    type = {showPassword ? "text" : "password"}
                    placeholder = "Parola"
                    onChange = {(event) => {
                        if(passwdError){
                            setPasswdError(false);
                        }
                        setPasswd(event.target.value);
                    }}
                    value = {passwd}
                />
                <IconButton
                    onClick = { handleShowPassword }
                    sx = {{ color: 'action.active', ml: 2, mt: 1 }}
                >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </IconButton>
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <AccountCircleOutlinedIcon sx = {{ color: 'action.active', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "off"
                    variant = "outlined"
                    error = {userError}
                    helperText = {userError ? "Membru inexistent" : ""}
                    placeholder = "Nume"
                    onChange = {(event) => {
                        if(userError){
                            setUserError(false);
                        }
                        setNume(event.target.value);
                    }}
                    value = {nume}
                />
            </Box>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <AccountCircleOutlinedIcon sx = {{ color: 'action.active', mr: 2, mt: 2 }} />
                <TextField
                    autoComplete = "off"
                    variant = "outlined"
                    error = {userError}
                    helperText = {userError ? "Membru inexistent" : ""}
                    placeholder = "Prenume"
                    onChange = {(event) => {
                        if(userError){
                            setUserError(false);
                        }
                        setPrenume(event.target.value);
                    }}
                    value = {prenume}
                />
            </Box>

            <Box 
                className = "field"
                sx = {{ maxWidth: 135, margin: "auto" }}
            >

                <FormControl fullWidth>

                    <InputLabel id = "demo-simple-select-label">Rol</InputLabel>

                    <Select
                        labelId = "demo-simple-select-label"
                        id = "demo-simple-select"
                        error = {userError}
                        value = {rol}
                        label = "Rol"
                        onChange = {(event) => {
                            setRol(event.target.value);
                        }}>

                            <MenuItem value = {"jucator"}>Jucator</MenuItem>
                            <MenuItem value = {"staff"}>Staff</MenuItem>
                    </Select>

                    {userError ? <FormHelperText sx={{color: 'error.main'}}>Membru inexistent</FormHelperText> : <></>}

                </FormControl>

            </Box>

            <Button 
                className = "buton"
                variant = "contained"
                onClick={(event) => {
                    register(event);
                    }}>
                        Register
            </Button>
            
        </div>
    );
}

export default Register;