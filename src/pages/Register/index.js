import { useState } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import './register.css';

import '../../firebaseConect';
import { auth } from "../../firebaseConect";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

    const navigation = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    
  async function CadConta(e) {
    // Event para nâo recarregar o form
    e.preventDefault();

    // condicional
    if (email !== '' && password !== '') {

      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success('Cadastrado com sucesso!');
          setEmail('');
          setPassword('');
          navigation('../', { replace:true });
        })
        .catch((error) => {
          console.log(error)
        })

    } else {
      toast.warn('Preencha os campos vazios')
    }
  }


    return (
        <div className="register-container">

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1280px-Los_Angeles_Lakers_logo.svg.png' alt="" className="img-logo" />
            <h1 className="register-h1">Cadastre-se Agora</h1>
            <span className="register-span">Gerencie sua agenda de forma fácil</span>

            <form className="form" onSubmit={CadConta}>

                <input
                    autoComplete={false}
                    type="text"
                    placeholder="Cadastre seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <input
                    type="password"
                    placeholder="Cadastre uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input" />

                <button type="submit">Cadastrar Conta</button>
                <Link to="/" className="register-link">Já possui uma conta? Faça o login.</Link>

            </form>

        </div>
    )
}