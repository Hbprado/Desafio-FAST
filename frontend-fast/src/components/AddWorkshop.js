import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AddWorkshop = () => {
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        data: '',
        participantes: '',
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

        // Recupera o token do localStorage
        const token = localStorage.getItem('token');

        // Se não houver token, redireciona para a página de login
        if (!token) {
            navigate('/login');
            return;
        }

        // Adiciona o token no cabeçalho da requisição
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Prepara os dados do formulário, incluindo os participantes
        const workshopData = {
            nome: formData.nome,
            descricao: formData.descricao,
            data: formData.data,
            participantes: formData.participantes.split(',').map((email) => ({ Email: email.trim() })) // E-mails como objetos com a chave "Email"
        };


        // Faz a requisição para adicionar um novo workshop
        axios.post('http://localhost:5192/api/workshops', workshopData, { headers })
            .then(() => {
                setSuccessMessage('Workshop adicionado com sucesso!');
                setFormData({ nome: '', descricao: '', data: '', participantes: '' });

                // Redireciona para a lista de workshops após 2 segundos
                setTimeout(() => {
                    navigate('/workshops');
                }, 2000);
            })
            .catch((error) => {
                setErrorMessage(error.response?.data?.message || 'Erro ao adicionar o workshop. Verifique os dados!');
            });
    };

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <div className="container bg-white rounded shadow p-4" style={{ maxWidth: '600px', width: '100%' }}>
                    <h3 className="text-center mb-4">Adicionar Novo Workshop</h3>
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
                            <label htmlFor="nome" className="form-label">Nome do Workshop</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                placeholder="Digite o nome do workshop"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                id="descricao"
                                name="descricao"
                                placeholder="Descrição do workshop"
                                value={formData.descricao}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="data" className="form-label">Data do Workshop</label>
                            <input
                                type="date"
                                className="form-control"
                                id="data"
                                name="data"
                                value={formData.data}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="participantes" className="form-label">Participantes (Emails)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="participantes"
                                name="participantes"
                                placeholder="Digite os e-mails dos participantes, separados por vírgula"
                                value={formData.participantes}
                                onChange={handleChange}
                            />
                            <small className="form-text text-muted">
                                Insira os e-mails dos participantes separados por vírgula.
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Adicionar Workshop
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddWorkshop;
