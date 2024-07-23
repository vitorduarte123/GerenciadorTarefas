import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Task from './Task';
import TaskForm from './TaskForm';
import './TaskList.css';
import config from '../config';

const TaskList = ({ token, onLogout, username }) => {
    const [tasks, setTasks] = useState([]);
    const [showTasks, setShowTasks] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/tasks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erro ao buscar tarefas', error);
        }
    };

    useEffect(() => {
        if (showTasks) {
            fetchTasks();
        }
    }, [showTasks]);

    const handleShowTasks = () => {
        setShowTasks(!showTasks);
    };

    return (
        <div className="task-list-container">
            <div className="header">
                <span className="welcome-message">Bem-vindo, {username}</span>
                <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
            <TaskForm fetchTasks={fetchTasks} />
            <button onClick={handleShowTasks} className="list-tasks-button">
                {showTasks ? 'Ocultar Tarefas' : 'Listar Tarefas'}
            </button>
            {showTasks && (
                <ul className="task-list">
                    {tasks.map(task => (
                        <Task key={task._id} task={task} fetchTasks={fetchTasks} />
                    ))}
                </ul>
            )}
        </div>
    );
};

TaskList.propTypes = {
    token: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};

export default TaskList;
