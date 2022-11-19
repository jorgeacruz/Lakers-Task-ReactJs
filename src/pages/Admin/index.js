import { useState } from 'react';

import { auth, db } from '../../firebaseConect';
import { signOut } from 'firebase/auth';

import { collection, addDoc } from 'firebase/firestore'

import './admin.css';

export default function Admin() {

  const [tarefaInput, setTarefaInput] = useState();
  const [user, setUser] = useState({});

  async function registrarTarefa(){
    await addDoc(collection(db, "tarefas"), {
      tarefa:tarefaInput,
      created:new Date(),
      userUid: user.uid
    })
    .then(() => {
      console.log('Passei aqui');
      alert('resgistro feito');
      setTarefaInput('')
    })
    .catch((erro) => {
      console.log("Erro " + erro);
    })
  }


  // função logout
  async function btnLogout() {
    await signOut(auth)
  }

  return (
    <div className='admin-container'>

      <h1> Adicione suas tarefas Preferidas</h1>

      <form className='form-admin'>
        <textarea
          placeholder='Digite sua tarefa...'
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)} />
        <button type='submit' onClick={registrarTarefa}>Registrar</button>

      </form>

      <article className='list'>
        <p> estudando Javascript hoje durante o dia</p>

        <div>
          <button className='btn-editar'> Editar Tarefa</button>
          <button className='btn-concluir'> Concluir tarefa</button>
        </div>

        <button className='btn-sair' onClick={btnLogout}>Sair</button>
      </article>

      
    </div>
  );
}