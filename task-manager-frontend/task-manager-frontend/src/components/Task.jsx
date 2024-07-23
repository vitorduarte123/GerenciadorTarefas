import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import './Task.css';

const Task = ({ task, fetchTasks, token }) => {
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.apiUrl}/tasks/${task._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
            setMessage('Tarefa deletada com sucesso!');
            setTimeout(() => setMessage(''), 3000); // Limpa a mensagem após 3 segundos
        } catch (error) {
            console.error('Erro ao deletar tarefa', error);
        }
    };

    const handleToggleComplete = async () => {
        try {
            await axios.patch(`${config.apiUrl}/tasks/${task._id}`, { completed: !task.completed }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTasks();
        } catch (error) {
            console.error('Erro ao atualizar tarefa', error);
        }
    };

    return (
        <li className={`task ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
            />
            <span>{task.title} - {task.description}</span>
            <button onClick={handleDelete} className="delete-button">Deletar</button>
            {message && <p className="confirmation-message">{message}</p>}
        </li>
    );
};

export default Task;
