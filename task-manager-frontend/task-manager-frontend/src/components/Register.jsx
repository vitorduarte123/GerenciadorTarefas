import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import './AuthForm.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.apiUrl}/auth/register`, { username, password });
            setMessage('Usuário registrado com sucesso!');
            setMessageType('success');
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Erro ao registrar usuário', error);
            if (error.response && error.response.data) {
                setMessage(`Erro: ${error.response.data.error}`);
                setMessageType('error');
            } else {
                setMessage('Erro ao registrar usuário');
                setMessageType('error');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Registrar</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome de usuário"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
            />
            <button type="submit">Registrar</button>
            {message && <p className={`confirmation-message ${messageType}`}>{message}</p>}
            <p>
                Já tem uma conta? <Link to="/">Voltar</Link>
            </p>
        </form>
    );
};

export default Register;
