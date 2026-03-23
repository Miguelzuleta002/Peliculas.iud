import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import './Home.css';

const Home = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cuando el componente carga, pedimos las películas al Backend
        const fetchPeliculas = async () => {
            try {
                const respuesta = await api.get('/medias');
                setPeliculas(respuesta.data); // Asumimos que es un array de objetos Media
            } catch (error) {
                console.error('Error cargando las películas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPeliculas();
    }, []);

    return (
        <div className="home-container">
            {/* Sección Hero (Película Destacada simulada) */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <h1>Encuentra las mejores películas y series</h1>
                    <p>Disfruta del catálogo de la Digital play sin costo y en alta calidad, directamente desde el navegador.</p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Ver Novedades</button>
                        <button className="btn btn-secondary">Explorar Catálogo</button>
                    </div>
                </div>
            </section>

            {/* Sección del Catálogo (Grid de Películas) */}
            <section className="catalog container">
                <div className="catalog-header">
                    <h2>Agregadas Recientemente</h2>
                </div>

                {loading ? (
                    <div className="loading-spinner">Cargando catálogo...</div>
                ) : peliculas.length > 0 ? (
                    <div className="movies-grid">
                        {peliculas.map((pelicula) => (
                            <MovieCard key={pelicula._id} media={pelicula} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Aún no hay películas en la base de datos.</p>
                        <p>Ve a la sección de Administración para agregar la primera.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
