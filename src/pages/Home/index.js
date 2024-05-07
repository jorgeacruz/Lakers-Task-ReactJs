import { useState } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import '../../firebaseConect';
import { auth } from "../../firebaseConect";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './home.css';


export default function Home() {

  const navigation = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleLogin(e) {
    // Event para nâo recarregar o form
    e.preventDefault();
    
    // condicional
    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation('./admin', { replace:true })
        })
        .catch((error) => {
          console.log(error);
          toast.error('Preencha seus Dados')
        })

    } 
  }

  return (
    <div className="home-container">

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
      <h1>ToDo List - Lakers Club</h1>
      <span>Jogadas memoraveis na sua lista.</span>

      <form className="form" onSubmit={handleLogin}>

        <input
          autoComplete={false}
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="btn-submit">Acessar</button>
        <Link to="/register" className="button-link">Não possuo uma conta? Cadastra-se.</Link>

      </form>

    </div>
  )
}