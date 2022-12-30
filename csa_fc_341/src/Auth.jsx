import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { app, auth } from './DatabaseConnection';

import { Box, TextField, Button } from '@mui/material';

import Login from './Login';
import Register from './Register';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import "./Controlere/Stil.css";


const db = getFirestore(app);

function Auth(){
    
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);


    const sendPasswordReset = async (event) => {
        try {
            event.preventDefault();

            await sendPasswordResetEmail(auth, email);
            
            setEmail('');

            alert("Password reset link sent!");
        } catch (error) {
            if(error.code === "auth/invalid-email"){
                setEmailError(true);
            }
        }
    };

    const logout = () => {
        signOut(auth);
    }

    const [user, loading, error] = useAuthState(auth);
    const [rol_user, setRol_user] = useState("");
    const [det_user, setDet_user] = useState({});

    async function get_detalii_user(docID){
        const ref = doc(db, "users", docID);

        await getDoc(ref)
        .then(async (response) => {
            let res = response.data();
            
            setRol_user(res.rol);

            if (res.rol !== "admin"){
                await getDoc(res.user)
                .then((response2) => {
                    let res2 = response2.data();

                    setDet_user(res2);
                })
                .catch((e) => console.log(e));
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
            setRol_user("guest");
        }
    }, [loading, user]);

    return (
        <div>
            {
                rol_user === "guest" ?
                    <div className='test'>
                        
                        <Login />

                        <Register />

                        
                         
                        <div className = "reset">

                             <label>RESET PASSWORD</label>

                            <Box
                                className = "field"
                                sx = {{ display: 'flex', alignItems: 'flex-start' }}
                            >
                                <EmailOutlinedIcon sx = {{ color: '#E3F6F5', mr: 2, mt: 2 }} />
                                <TextField
                                    variant = "outlined"
                                    className="scriere"
                                    error = {emailError}
                                    helperText = {emailError ? "Email inexistent" : ""}
                                    placeholder = "Email"
                                    onChange = {(event) => {
                                        if(emailError){
                                            setEmailError(false);
                                        }
                                        setEmail(event.target.value);
                                    }}
                                    value = {email}
                                />
                            </Box>

                            <Button 
                                 className = "butonlogin"
                                variant = "contained"
                                onClick={(event) => {
                                    sendPasswordReset(event);
                                    }}>
                                        Reset
                            </Button>
                        </div>
                    </div>
                : user ?

                        <div className = "logged">

                            <div className = "text">
                                    <h3>Logged in as: {user.email}</h3>
                                    <p></p>
                                    <h3>Role: {rol_user}</h3>
                            </div>

                            <Link to="/">
                                <Button 
                                    className = "buton"
                                    variant = "contained"
                                    onClick={() => {
                                        logout();
                                        }}>
                                            Logout
                                </Button>
                            </Link>
                        </div>
                        
                        :

                        <></>

            }
        </div>
    )
}

export default Auth;