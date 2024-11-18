import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        axios.post('http://localhost:5192/api/auth/register', formData)
            .then(() => {
                setSuccessMessage('Usuário registrado com sucesso!');
                setFormData({ username: '', email: '', password: '' });

                // Redireciona para a tela de login após 2 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch(() => {
                setErrorMessage('Erro ao registrar usuário. Verifique os dados!');
            });
    };

    return (
        <div className="d-flex min-vh-100">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-primary text-white p-5">
                <div className="text-center">
                    <img src="/fastsolucoes_logo.jpg" alt="Logo" className="mb-4" style={{ maxWidth: '200px' }} />
                    <h2>Bem-vindo à nossa plataforma!</h2>
                    <p>Cadastre-se para visualizar e administrar os workshops disponíveis e ajudar a sua equipe.</p>
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
                    <h3 className="text-center mb-4">Cadastre-se</h3>
                    {errorMessage && (
                        <div className="alert alert-danger text-center" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    {successMessage && (
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Seu usuário"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Seu e-mail"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="No mínimo 7 caracteres"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Cadastrar
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <p>Já tem uma conta? <a href="/login" className="btn btn-link">Faça Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
