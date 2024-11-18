import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/ApiService';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Workshops() {
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        // Buscar workshops da API
        ApiService.getWorkshops()
            .then((response) => {
                setWorkshops(response.data);
            })
            .catch((error) => console.error('Erro ao buscar workshops:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="mt-4 min-vh-100 d-flex flex-column bg-light">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-center">Workshops Disponíveis</h2>
                        <Link to="/add-workshop" className="btn btn-primary">
                            Cadastrar Novo Workshop
                        </Link>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {workshops.map((workshop) => (
                            <div key={workshop.id} className="col">
                                <div className="card shadow-sm h-100 d-flex flex-column">
                                    <div className="card-body shadow-lg rounded-3 border-light overflow-hidden d-flex flex-column">
                                        <h5 className="card-title text-primary">{workshop.nome}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {new Date(workshop.Data).toLocaleDateString()}
                                        </h6>
                                        <p className="card-text" style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            <strong>Descrição:</strong> {workshop.descricao || 'Descrição não disponível'}
                                        </p>
                                        <div className="mt-auto">
                                            <Link to={`/workshops/${workshop.id}`} className="btn btn-primary w-100">
                                                Ver detalhes
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workshops;
