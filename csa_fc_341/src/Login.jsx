import { Box, IconButton, TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./DatabaseConnection";

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import "./Controlere/Stil.css";


function Login(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    const [showPassword, setShowPassword] = useState(true);

    const [emailError, setEmailError] = useState(false);
    const [passwdError, setPasswdError] = useState(false);


    const handleShowPassword = () => setShowPassword(!showPassword);

    const login = async (event) => {
        try{
            event.preventDefault();

            setEmailError(false);
            setPasswdError(false);

            await signInWithEmailAndPassword(auth, email, passwd);
            
            setEmail('');
            setPasswd('');
        } catch (error){
            if(error.code === "auth/invalid-email"){
                setEmailError(true);
            }
            else if (error.code === "auth/wrong-password"){
                setPasswdError(true);
            } else if(error.code === "auth/user-not-found"){
                setEmailError(true);
                setPasswdError(true);
            }
        }
    }
    

    return(
        <div className = "login">

            <h2>Login</h2>

            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <EmailOutlinedIcon sx = {{ color: 'action.active', mr: 2, mt: 2 }} />
                <TextField
                    variant = "outlined"
                    error = {emailError}
                    helperText = {emailError ? passwdError ? "Userul nu exista" : "Email incorect" : ""}
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
            
            <Box
                className = "field"
                sx = {{ display: 'flex', alignItems: 'flex-start' }}
            >
                <PasswordOutlinedIcon sx = {{ color: 'action.active', mr: 2, mt: 2 }} />
                <TextField
                    variant = "outlined"
                    error = {passwdError}
                    helperText = {passwdError ? emailError ? "Userul nu exista" : "Parola incorecta" : ""}
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

            <Button
                className = "buton"
                variant = "contained"
                onClick = {(event) => {
                    login(event);
                    }}>
                        Login
            </Button>

        </div>
    );
}

export default Login;