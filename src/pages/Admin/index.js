import { useState, useEffect } from 'react'
import './admin.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { auth, db } from '../../firebaseConect'
import { signOut } from 'firebase/auth'

import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})
  const [tarefas, setTarefas] = useState([]);

  const [edit, setEdit] = useState({});

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
      toast.warn('Descreva sua jogada!!')
      return;
    }

    if (edit?.id) {
      handleUpadateTarefa();
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid
    })
      .then(() => {
        toast.success('Booom Shakalaka!')
        setTarefaInput('')
      })
      .catch((error) => {
        console.log("ERRO AO REGISTRAR " + error)
      })


  }

  // btn - atualuzar tarefa
  async function handleUpadateTarefa() {
    const docRef = collection(db, "tarefas", edit?.id)

    await updateDoc(docRef, {
      tarefa: tarefaInput
    })
      .then(() => {
        toast.success('Jogada Atualizada! ');
        setTarefaInput('');
        setEdit({});
      })
      .catch((error) => {
        console.log(error);
        setTarefaInput('');
        setEdit({});
      })
  }

  // deslogando do private
  async function handleLogout() {
    await signOut(auth);
  }

  // deletando a tarefa do Collection
  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  // funcao editar tarefa
  function editTarefa(item) {
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  return (
    <div className="admin-container">

      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1280px-Los_Angeles_Lakers_logo.svg.png' alt="" className="img-logo" />

      <h1>Sua jogada Favorita do Lakers</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Descreva sua jogada favorita dos jogadores do Lakers"
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" style={{ backgroundColor: '#000', color: '#fff' }} type="submit">Atualizar Tarefa</button>
        ) : (
          <button className="btn-register" type="submit">Registrar Tarefa</button>
        )}
      </form>

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>

          <div>
            <button onClick={() => editTarefa(item)}>Editar</button>
            <button onClick={() => deleteTarefa(item.id)} className="btn-delete">Concluir</button>
          </div>
        </article>

      ))}

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