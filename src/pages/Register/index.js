import { useState } from "react"
import { Link } from 'react-router-dom';
import './register.css';


export default function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleRegister(e) {
        // Event para nâo recarregar o form
        e.preventDefault();
        // condicional
        if (email !== '' && password !== '') {
            alert('teste');
        } else {
            alert('Preencha os campos vazios');
        }
    }

    return (
        <div className="register-container">
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1280px-Los_Angeles_Lakers_logo.svg.png' alt="" className="img-logo" />
            <h1 className="register-h1">Cadastre-se Agora</h1>
            <span className="register-span">Gerencie sua agenda de forma fácil</span>

            <form className="form" onSubmit={handleRegister}>

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
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input" />

                <button type="submit" style={{}}>Cadastrar Conta</button>
                <Link to="/" className="register-link">Já possui uma conta? Faça o login.</Link>

            </form>

        </div>
    )
}