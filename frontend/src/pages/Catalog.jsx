import React, { useState, useEffect } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import './Home.css'; // Reutilizamos los estilos de grilla

const Catalog = ({ title, filterType }) => {
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedias = async () => {
            try {
                const respuesta = await api.get('/medias');
                // Filtramos por el nombre del Tipo que nos pasan por prop (Película o Serie)
                const filtradas = respuesta.data.filter(
                    m => m.tipo?.nombre?.toLowerCase() === filterType.toLowerCase()
                );
                setMedias(filtradas);
            } catch (error) {
                console.error('Error fetching catalog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedias();
    }, [filterType]);

    return (
        <div style={{ marginTop: '100px', minHeight: '60vh' }}>
            <div className="container" style={{ padding: '20px 5% 80px' }}>
                <div className="catalog-header" style={{ marginBottom: '40px' }}>
                    <h2 className="section-title">{title}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Explora la colección completa de {title.toLowerCase()} disponibles en nuestra plataforma.
                    </p>
                </div>

                {loading ? (
                    <div className="loading-spinner">Cargando catálogo...</div>
                ) : medias.length === 0 ? (
                    <div className="empty-state">
                        Actualmente no hay producciones de esta categoría en la base de datos.
                    </div>
                ) : (
                    <div className="movies-grid">
                        {medias.map((media) => (
                            <MovieCard key={media._id} media={media} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalog;
