import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/ApiService';
import Navbar from './Navbar';

function Colaboradores() {
    const [colaboradores, setColaboradores] = useState([]);

    useEffect(() => {
        // Buscar colaboradores da API
        ApiService.getColaboradores()
            .then((response) => {
                setColaboradores(response.data);
            })
            .catch((error) => console.error('Erro ao buscar colaboradores:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container my-3">
                <h2 className="text-center mb-4">Colaboradores</h2>
                <div className="mt-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {colaboradores.map((colaborador) => (
                        <div key={colaborador.id} className="col">
                            <div className="card shadow-lg rounded-3 border-light overflow-hidden">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{colaborador.nome}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{colaborador.email}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Colaboradores;
