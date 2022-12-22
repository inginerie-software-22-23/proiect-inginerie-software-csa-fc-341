import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { auth } from "./DatabaseConnection";


function Login(){
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");

    const login = async (event) => {
        try{
            event.preventDefault();

            await signInWithEmailAndPassword(auth, email, passwd);
        } catch (error){
            console.log(error.message);
        }
    }

    return(
        <div>
            <h3>Login</h3>
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

            <Button onClick={(event) => {
                login(event);

                setEmail('');
                setPasswd('');
                }}>
                    Login
            </Button>
        </div>
    );
}

export default Login;