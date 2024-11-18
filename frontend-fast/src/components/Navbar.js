import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary border-bottom mb-0" style={{ padding: '1rem' }}>
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="/" style={{ fontSize: '1.5rem' }}>
                    <img src="/fastsolucoes_logo.jpg" alt="FAST Logo" className="me-2" style={{ height: '40px' }} />
                    <span>FAST</span>
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/workshops">Workshops</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-5" to="/colaboradores">Colaboradores</Link>
                        </li>
                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-outline-light fs-5"
                                onClick={() => {
                                    localStorage.clear();
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
