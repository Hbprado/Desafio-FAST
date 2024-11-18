import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5192/api/auth/login', {
                username,
                password
            });

            const token = response.data.token;
            localStorage.setItem('token', token); // Armazena o token JWT no localStorage

            navigate('/'); // Redireciona para o painel após login bem-sucedido
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Erro ao fazer login');
        }
    };

    return (
        <div className="d-flex min-vh-100">

            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-primary text-white p-5">
                <div className="text-center">
                    <img src="/fastsolucoes_logo.jpg" alt="Logo" className="mb-4" style={{ maxWidth: '200px' }} />
                    <h2>Bem-vindo de volta!</h2>
                    <p>Faça login para acessar sua conta e visualize todos os workshops e conteúdos disponíveis.</p>
                </div>
            </div>


            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-light">
                <div
                    className="container bg-white rounded shadow p-4"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <h3 className="text-center mb-4">Login</h3>
                    {errorMessage && (
                        <div className="alert alert-danger text-center" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nome de Usuário</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Seu usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Entrar
                        </button>
                    </form>

                    <div className="mt-3 text-center">
                        <p className="mb-0">Não tem uma conta?</p>
                        <a href="/register" className="text-primary">Cadastrar-se</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
