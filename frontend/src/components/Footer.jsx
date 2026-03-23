import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Film } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content container">
                
                {/* Sección de Marca y Descripción */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <Film size={28} color="var(--primary)" />
                        <span>Digital <span className="highlight">Play</span></span>
                    </Link>
                    <p className="footer-description">
                        Plataforma oficial de entretenimiento de la Institución Universitaria Digital de Antioquia. 
                        Disfruta del mejor catálogo de películas y series sin interrupciones.
                    </p>
                </div>

                {/* Enlaces Rápidos */}
                <div className="footer-links">
                    <h3>Explorar</h3>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/">Películas</Link></li>
                        <li><Link to="/">Series</Link></li>
                        <li><Link to="/admin">Acceso Directivos</Link></li>
                    </ul>
                </div>

                {/* Ayuda y Soporte */}
                <div className="footer-support">
                    <h3>Soporte</h3>
                    <ul>
                        <li><a href="#">Centro de Ayuda</a></li>
                        <li><a href="#">Términos de Servicio</a></li>
                        <li><a href="#">Políticas de Privacidad</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div className="footer-social">
                    <h3>Conéctate</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook"><Facebook size={20} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter"><Twitter size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram"><Instagram size={20} /></a>
                        <a href="mailto:soporte@iudigital.edu.co" title="Correo"><Mail size={20} /></a>
                    </div>
                </div>

            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Institución Universitaria Digital de Antioquia. Todos los derechos reservados.</p>
                <p className="footer-credits">Desarrollado para el Proyecto Integrador</p>
            </div>
        </footer>
    );
};

export default Footer;
