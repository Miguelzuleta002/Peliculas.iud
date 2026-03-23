import React from 'react';
import { Link } from 'react-router-dom';
import { Film, User, Search } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar glass-effect">
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <Film size={28} color="var(--primary)" />
                    <span> Digital <span className="highlight">Play</span></span>
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/peliculas" className="nav-link">Películas</Link>
                    <Link to="/series" className="nav-link">Series</Link>
                </div>

                <div className="navbar-actions">
                    <button className="icon-btn" title="Buscar">
                        <Search size={20} />
                    </button>
                    <Link to="/admin" className="btn btn-primary btn-sm">
                        <User size={18} />
                        Administrar
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
