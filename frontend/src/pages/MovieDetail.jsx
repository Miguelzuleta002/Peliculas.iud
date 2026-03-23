import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, Calendar, Film, Video, Users } from 'lucide-react';
import api from '../services/api';
import './MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMediaContent = async () => {
            try {
                const respuesta = await api.get(`/medias/${id}`);
                setMedia(respuesta.data);
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMediaContent();
    }, [id]);

    if (loading) return <div className="movie-detail-container container"><div className="loading-spinner" style={{ marginTop: '100px' }}>Cargando detalles...</div></div>;
    if (!media) return <div className="movie-detail-container container"><div className="empty-state" style={{ marginTop: '100px' }}>No se encontró la película en la base de datos.</div></div>;

    return (
        <div className="movie-detail-container">
            {/* Background Banner con desenfoque */}
            <div
                className="movie-backdrop"
                style={{ backgroundImage: `url(${media.imagenPortada})` }}
            >
                <div className="backdrop-overlay"></div>
            </div>

            <div className="movie-content container">
                <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Volver
                </button>

                <div className="movie-grid">
                    <div className="movie-poster-large">
                        <img src={media.imagenPortada} alt={media.titulo} />
                    </div>

                    <div className="movie-info-large">
                        <div className="movie-title-area">
                            <span className="movie-badge">{media.tipo?.nombre}</span>
                            <h1>{media.titulo}</h1>
                            <div className="movie-metadata-row">
                                <span className="meta-item"><Calendar size={16} /> {media.anoEstreno}</span>
                                <span className="meta-item"><Film size={16} /> {media.genero?.nombre}</span>
                                <span className="meta-item"><Users size={16} /> Dirigida por: {media.director?.nombres}</span>
                                <span className="meta-item"><Video size={16} /> Productora: {media.productora?.nombre}</span>
                            </div>
                        </div>

                        <div className="movie-synopsis">
                            <h3>Sinopsis</h3>
                            <p>{media.sinopsis}</p>
                        </div>

                        <div className="movie-actions">
                            <a href={media.urlPelicula} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
                                <Play fill="black" size={20} /> Reproducir Ahora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
