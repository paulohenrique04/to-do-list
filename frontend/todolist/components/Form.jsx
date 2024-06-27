import React, { useRef, useEffect } from 'react';
import '../src/App.css';
import axios from 'axios';

const Form = ({ onEdit, setOnEdit, getTasks }) => {
    const ref = useRef();
  
    useEffect(() => {
      if(onEdit) {
          const task = ref.current;
  
          task.nome_da_tarefa.value = onEdit.nome_da_tarefa;
          task.categoria.value = onEdit.categoria;
      }
    }, [onEdit]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const task = ref.current;
  
      if(!task.nome_da_tarefa.value || !task.categoria.value) {
          return console.warn("Preencha todos os campos!");
      }
  
      if(onEdit) {
          await axios.put(`http://localhost:3000/${onEdit.id}`, {
              nome_da_tarefa: task.nome_da_tarefa.value,
              categoria: task.categoria.value,
          });
      } else {
          await axios.post("http://localhost:3000", {
              nome_da_tarefa: task.nome_da_tarefa.value,
              categoria: task.categoria.value,
          });
      }
  
      task.nome_da_tarefa.value = "";
      task.categoria.value = "Estudos";
  
      setOnEdit(null);
      getTasks();
    };
  
    return (
      <form ref={ref} onSubmit={handleSubmit}>
          <div className='input-area'>
              <label>Tarefa</label>
              <input name='nome_da_tarefa' />
  
              <label htmlFor="category_task">Categoria:</label>
              <select id="category_task" name="categoria" required>
                  <option value="Estudos">Estudos</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Pessoal">Pessoal</option>
              </select>
          <button type='submit'>Adicionar</button>
          </div>
      </form>
    );
  };
  
  export default Form;
  