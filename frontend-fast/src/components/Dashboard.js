import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import Navbar from './Navbar';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Dashboard = () => {
    const navigate = useNavigate();
    const [workshopStats, setWorkshopStats] = useState([]);
    const [colaboradorStats, setColaboradorStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token não encontrado');
                    navigate('/login');
                    return;
                }

                // Realiza a requisição à API
                const response = await axios.get('http://localhost:5192/api/estatisticas', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });


                // Atualize os estados com os dados da API, usando as propriedades corretas
                setWorkshopStats(response.data.workshopStats || []);
                setColaboradorStats(response.data.colaboradorParticipacao || []);

            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error);
            }
        };

        fetchStats();
    }, [navigate]);

    // Preparando os dados para o gráfico de barras
    const barData = {
        labels: colaboradorStats.length > 0 ? colaboradorStats.map(c => c.nome) : [],
        datasets: [
            {
                label: 'Quantidade de Workshops Participados',
                data: colaboradorStats.length > 0 ? colaboradorStats.map(c => c.participacoes) : [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Preparando os dados para o gráfico de pizza
    const pieData = {
        labels: workshopStats.length > 0 ? workshopStats.map(w => w.nome) : [],
        datasets: [
            {
                label: 'Participação por Workshop',
                data: workshopStats.length > 0 ? workshopStats.map(w => w.participantes) : [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h4 className="mb-4">Bem-vindo(a)</h4>
                <p className="text-muted">Gerencie seus workshops com facilidade.</p>

                <div className="row">
                    {/* Card para Gráfico de Participação dos Colaboradores */}
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-header">
                                Gráfico de Participação dos Colaboradores
                            </div>
                            <div className="card-body">
                                <Bar data={barData} options={{ responsive: true, plugins: { title: { display: true, text: 'Participação por Colaborador' } } }} />
                            </div>
                        </div>
                    </div>

                    {/* Card para Gráfico de Participação por Workshop */}
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-header">
                                Gráfico de Participação por Workshop
                            </div>
                            <div className="card-body">
                                <Pie data={pieData} options={{ responsive: true, plugins: { title: { display: true, text: 'Participação por Workshop' } } }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container text-center">
                    <span className="text-muted">FAST Solucões © 2024</span>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
