import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import './AuthForm.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.apiUrl}/auth/login`, { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);
            setMessage('Login bem-sucedido!');
        } catch (error) {
            setMessage('Erro ao fazer login');
            console.error('Erro ao fazer login:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
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
                <div className="auth-buttons">
                    <button type="submit">Login</button>
                    <p>
                        Não tem uma conta? <Link to="/register" className="register-link">Registre-se</Link>
                    </p>
                </div>
                {message && <p className="confirmation-message">{message}</p>}
            </form>
        </div>
    );
};

export default Login;
