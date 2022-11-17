import { useState } from "react"
import { Link } from 'react-router-dom';

import './home.css';

export default function Home() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleLogin(e) {
    // Event para nâo recarregar o form
    e.preventDefault();
    // condicional
    if( email !== '' && password !== ''){
      alert('teste');
    } else {
      alert('Preencha os campos vazios');
    }
  }

  return (
    <div className="home-container">
      <img src='https://1000logos.net/wp-content/uploads/2017/03/los-angeles-lakers-logo.jpg' alt="" className="img-logo" />
      <h1>Clube Lakers Advanced</h1>
      <span>Gerencie sua agenda de forma fácil</span>

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