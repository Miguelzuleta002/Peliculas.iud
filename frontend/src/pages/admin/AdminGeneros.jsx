import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminGeneros = () => {
    const [generos, setGeneros] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '', estado: 'Activo' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchGeneros = async () => {
        try {
            const { data } = await api.get('/generos');
            setGeneros(data);
        } catch (error) {
            console.error('Error fetching generos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGeneros();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/generos/${editId}`, formData);
            } else {
                await api.post('/generos', formData);
            }
            setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
            setEditId(null);
            fetchGeneros();
        } catch (error) {
            console.error('Error saving genero:', error);
            alert('Error guardando los datos');
        }
    };

    const handleEdit = (genero) => {
        setFormData({ nombre: genero.nombre, descripcion: genero.descripcion, estado: genero.estado });
        setEditId(genero._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Cambiar estado a Inactivo / Eliminar este género?')) {
            try {
                await api.delete(`/generos/${id}`);
                fetchGeneros();
            } catch (error) {
                console.error('Error deleting genero:', error);
            }
        }
    };

    return (
        <div>
            <div className="crud-header">
                <h2>Gestión de Géneros</h2>
            </div>

            <form className="crud-form" onSubmit={handleSubmit}>
                <h3>{editId ? 'Editar Género' : 'Nuevo Género'}</h3>
                <div className="form-group" style={{ marginTop: '15px' }}>
                    <label>Nombre del Género</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="form-control" rows="3" required></textarea>
                </div>
                {editId && (
                    <div className="form-group">
                        <label>Estado</label>
                        <select name="estado" value={formData.estado} onChange={handleInputChange} className="form-control">
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                )}
                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
                    <Plus size={18} /> {editId ? 'Actualizar Género' : 'Agregar Género'}
                </button>
                {editId && (
                    <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setFormData({ nombre: '', descripcion: '', estado: 'Activo' }); }} style={{ marginLeft: '10px', marginTop: '10px' }}>
                        Cancelar
                    </button>
                )}
            </form>

            <div className="crud-table-container">
                {loading ? <p>Cargando géneros...</p> : (
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generos.map((g) => (
                                <tr key={g._id}>
                                    <td>{g.nombre}</td>
                                    <td>{g.descripcion}</td>
                                    <td><span className={`movie-badge ${g.estado === 'Activo' ? '' : 'inactive'}`} style={{ backgroundColor: g.estado === 'Activo' ? 'rgba(0,230,118,0.2)' : 'rgba(255,51,102,0.2)', color: g.estado === 'Activo' ? 'var(--primary)' : 'var(--danger)' }}>{g.estado}</span></td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-icon edit" onClick={() => handleEdit(g)} title="Editar"><Edit2 size={18} /></button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(g._id)} title="Borrar (Soft Delete)"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminGeneros;
