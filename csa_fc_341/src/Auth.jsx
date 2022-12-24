import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { app, auth } from './DatabaseConnection';

import Login from './Login';
import Register from './Register';


const db = getFirestore(app);

function Auth(){
    
    const [email, setEmail] = useState("");

    const sendPasswordReset = async (event) => {
        try {
            event.preventDefault();

            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!");
        } catch (error) {
            console.error(error.message);
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
                    <div>
                        <Login />

                        <br /> <br />

                        <Register />

                        <br /> <br />

                        <div>
                            <h3>Forgot password</h3>
                            <input 
                                placeholder="Email"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                value={email}
                            />
                            <br /> <br />

                            <Button onClick={(event) => {
                                sendPasswordReset(event);

                                setEmail('');
                                }}>
                                    Reset
                            </Button>
                        </div>
                    </div>
                : user ?

                        <div>
                            <br /> <br />

                            <div>
                                    <h3>Logged in as: {user.email}</h3>
                                    <h3>Role: {rol_user}</h3>
                            </div>

                            <br /> <br />

                            <Link to="/">
                                <Button onClick={() => {
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