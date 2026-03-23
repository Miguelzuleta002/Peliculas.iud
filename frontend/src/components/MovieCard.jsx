import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ media }) => {
    const navigate = useNavigate();
    return (
        <div className="movie-card" onClick={() => navigate(`/pelicula/${media._id}`)}>
            <div className="movie-poster">
                <img src={media.imagenPortada || 'https://via.placeholder.com/300x450?text=No+Image'} alt={media.titulo} />
                <div className="movie-overlay">
                    <button className="btn btn-primary btn-play" onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/pelicula/${media._id}`);
                    }}>▶ Ver Detalles</button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{media.titulo}</h3>
                <div className="movie-meta">
                    <span className="movie-year">{media.anoEstreno}</span>
                    <span className="movie-badge">{media.tipo?.nombre || 'Película'}</span>
                </div>
                <p className="movie-genre">{media.genero?.nombre}</p>
            </div>
        </div>
    );
};

export default MovieCard;
