import { useState, useEffect } from 'react'
import './admin.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { auth, db } from '../../firebaseConect'
import { signOut } from 'firebase/auth'

import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot
} from 'firebase/firestore'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail);
        const tarefasRef = collection(db, "tarefas")
        const q = query(tarefasRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        const unsub = onSnapshot(q, (snapshot) => {

          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            })
          })

          console.log(lista);
          setTarefas(lista);

        })
      }
    }

    loadTarefas();
  }, [])

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput === '') {
      toast.warn('Digite sua tarefa...')
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        toast.success('Tarefa Registrada com Sucesso!')
        setTarefaInput('')
      })
      .catch((error) => {
        console.log("ERRO AO REGISTRAR " + error)
      })


  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div className="admin-container">
      <h1>Adicione suas tarefas Preferidas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        <button className="btn-register" type="submit">Registrar tarefa</button>
      </form>

      <article className="list">
        <p>Estudar javascript e reactjs hoje a noite</p>

        <div>
          <button>Editar</button>
          <button className="btn-delete">Concluir</button>
        </div>
      </article>


      <button className="btn-logout" onClick={handleLogout}>Sair</button>

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
  )
}