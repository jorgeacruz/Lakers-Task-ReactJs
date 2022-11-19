import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { auth } from '../firebaseConect';
import { onAuthStateChanged } from "firebase/auth";



export default function Private({ children }) {

    const [loading, setloading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                // se tem user logado
                if(user){
                const userData = {
                    uid: user.uid,
                    email:user.email,
                }
                // Salva no localstorage
                localStorage.setItem('@detailUser', JSON.stringify(userData))

                setloading(false);
                setSigned(true);

                } else {
                //nao possui user logado
                setloading(false);
                setSigned(false);
                }
            })
        }

        checkLogin();

    }, [])

    if(loading){
        return(
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to='/'/>
    }

    return children;
}