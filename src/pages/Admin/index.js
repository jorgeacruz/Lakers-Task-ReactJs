import { useState, useEffect } from 'react';

import { auth, db } from '../../firebaseConect';
import { signOut } from 'firebase/auth';

import { 
  addDoc,
  collection
} from 'firebase/firestore'

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './admin.css';

export default function Admin() {

  const [tarefaInput, setTarefaInput] = useState();
  const [user, setUser] = useState({})

  useEffect(() => {
    async function loadTarefas() {

      const userDetail = localStorage.setItem('@userDetail');
      setUser(JSON.parse(userDetail))
    }

    loadTarefas();

  }, [])

  // Cadastrar tarefa
  async function registrarTarefa(e){
    e.preventDefault();

    if(tarefaInput === ''){
      alert("Digite sua tarefa...")
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tafefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
    .then(() => {
      console.log("TAREFA REGISTRADA")
      setTarefaInput('')
    })
    .catch((error) => {
      console.log("ERRO AO REGISTRAR " + error)
    })
  }

  // função logout
  async function btnLogout() {
    await signOut(auth)
    toast.warn('saiu')
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

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}