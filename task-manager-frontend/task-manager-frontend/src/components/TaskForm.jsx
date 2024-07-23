import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './TaskForm.css';
import config from '../config';

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${config.apiUrl}/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      setMessage('Tarefa adicionada com sucesso!');
      setMessageType('success');
      fetchTasks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao criar tarefa', error);
      if (error.response && error.response.data) {
        setMessage(`Erro: ${error.response.data.error}`);
        setMessageType('error');
      } else {
        setMessage('Erro ao criar tarefa');
        setMessageType('error');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <button type="submit">Adicionar Tarefa</button>
      {message && <p className={`confirmation-message ${messageType}`}>{message}</p>}
    </form>
  );
};

TaskForm.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
};

export default TaskForm;
