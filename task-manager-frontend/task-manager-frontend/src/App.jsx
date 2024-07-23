import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrigido aqui
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import icon from './assets/task-icon.png';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
        } else {
            localStorage.removeItem('token');
            setUsername('');
        }
    }, [token]);

    const handleLogout = () => {
        setToken(null);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={icon} className="App-icon" alt="Task Icon" />
                    <h1>Gestão de Tarefas</h1>
                    <img src={icon} className="App-icon" alt="Task Icon" />
                </header>
                <div className="container">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={!token ? <Login setToken={setToken} /> : <TaskList token={token} onLogout={handleLogout} username={username} />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
