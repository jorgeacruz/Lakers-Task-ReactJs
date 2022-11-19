import { useState } from 'react';
import { auth } from '../../firebaseConect';
import { signOut } from 'firebase/auth';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './admin.css';

export default function Admin() {

  const [tarefasInput, setTarefasInput] = useState();

  function registrarTarefa(e) {
    e.preventDefault();

    toast.success('Valeu');
  }

  async function btnLogout() {
    await signOut(auth)
    toast.warn('saiu')
  }

  return (
    <div className='admin-container'>

      <h1> Adicione suas tarefas Preferidas</h1>

      <form className='form-admin' onSubmit={registrarTarefa}>
        <textarea
          placeholder='Digite sua tarefa...'
          value={tarefasInput}
          onChange={(e) => setTarefasInput(e.target.value)} />
        <button type='submit'>Registrar</button>

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