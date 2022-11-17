import { useState } from "react"

export default function Home(){

  const [email,setEmail] = useState();
  const [password, setPassword] = useState();

    return(
      <div>
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma fácil</span>

        <form className="form">
          
          <input
          autoComplete={false}
          type="text"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          
          <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

          <button type="submit"></button>

        </form>
      </div>
    )
  }