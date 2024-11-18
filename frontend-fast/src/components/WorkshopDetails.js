import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiService } from '../services/ApiService';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function WorkshopDetails() {
    const { id } = useParams();
    const [workshop, setWorkshop] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Buscar detalhes do workshop por ID
        ApiService.getWorkshopById(id)
            .then((response) => {
                setWorkshop(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erro ao buscar detalhes do workshop:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!workshop) {
        return <div>Workshop não encontrado.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <h2>{workshop.nome}</h2>
                <h6 className="text-muted">
                    {new Date(workshop.Data).toLocaleDateString()}
                </h6>
                <p><strong>Descrição:</strong> {workshop.descricao}</p>

                <h5 className="mt-4">Participantes</h5>
                <ul>
                    {workshop.participantes && workshop.participantes.length > 0 ? (
                        workshop.participantes.map((colaborador) => (
                            <li key={colaborador.id}>
                                <strong>{colaborador.nome}</strong> - {colaborador.email}
                            </li>
                        ))
                    ) : (
                        <p>Não há participantes cadastrados ainda.</p>
                    )}
                </ul>

                <Link to="/workshops" className="btn btn-secondary">Voltar para a lista</Link>
            </div>
        </div>
    );
}

export default WorkshopDetails;
