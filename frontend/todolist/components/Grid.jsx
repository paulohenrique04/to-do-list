import React, { useState } from 'react';
import '../src/App.css';
import axios from 'axios';

const Grid = ({ tasks, setTasks, setOnEdit }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/${id}`)
      .then(({ data }) => {
        const newArray = tasks.filter((task) => task.id !== id);
        setTasks(newArray);
      })
      .catch(({ response }) => console.error(response.data));
    setOnEdit(null);
  };

  const handleToggleComplete = async (id) => {
    const task = tasks.find((task) => task.id === id);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, concluida: !task.concluida } : task
    );

    await axios.put(`http://localhost:3000/${id}`, { concluida: !task.concluida })
      .then(() => {
        setTasks(updatedTasks);
        if (task.concluida) {
          setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
        } else {
          setCompletedTasks([...completedTasks, id]);
        }
      })
      .catch((error) => console.error(error));
  };

  const isTaskCompleted = (id) => {
    return completedTasks.includes(id);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((item, i) => (
          <tr key={i}>
            <td style={{ textDecoration: isTaskCompleted(item.id) ? 'line-through' : 'none' }}>{item.nome_da_tarefa}</td>
            <td style={{ textDecoration: isTaskCompleted(item.id) ? 'line-through' : 'none' }}>{item.categoria}</td>
            <td align="center">
              <button className='buttonEdit' onClick={() => handleEdit(item)}>Editar</button>
              <button className='buttonDelete' onClick={() => handleDelete(item.id)}>Excluir</button>
              <button className='buttonCheck' onClick={() => handleToggleComplete(item.id)}>
                {isTaskCompleted(item.id) ? 'Desfazer' : 'Concluir'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
