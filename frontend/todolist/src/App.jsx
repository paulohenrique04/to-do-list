import './App.css'
import Form from '../components/Form.jsx'
import Grid from '../components/Grid.jsx'
import { useEffect, useState } from 'react'
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000");
      setTasks(res.data.sort((a, b) => (a.nome_da_tarefa > b.nome_da_tarefa ? 1 : -1)));
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    getTasks();
  }, [setTasks]);
  
  return (
    <div className='container'>
      <h1>To-do List</h1>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getTasks={getTasks} />
      <Grid tasks={tasks} setTasks={setTasks} setOnEdit={setOnEdit}/>
    </div>
  )
}

export default App
