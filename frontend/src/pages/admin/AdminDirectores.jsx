import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminDirectores = () => {
    const [directores, setDirectores] = useState([]);
    const [formData, setFormData] = useState({ nombres: '', estado: 'Activo' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDirectores = async () => {
        try {
            const { data } = await api.get('/directores');
            setDirectores(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDirectores(); }, []);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await api.put(`/directores/${editId}`, formData);
            else await api.post('/directores', formData);
            setFormData({ nombres: '', estado: 'Activo' }); setEditId(null); fetchDirectores();
        } catch (error) { alert('Error guardando director'); }
    };

    const handleEdit = (dir) => { setFormData({ nombres: dir.nombres, estado: dir.estado }); setEditId(dir._id); };

    const handleDelete = async (id) => {
        if (window.confirm('¿Inactivar Director?')) {
            await api.delete(`/directores/${id}`); fetchDirectores();
        }
    };

    return (
        <div>
            <div className="crud-header"><h2>Gestión de Directores</h2></div>
            <form className="crud-form" onSubmit={handleSubmit}>
                <h3>{editId ? 'Editar Director' : 'Nuevo Director'}</h3>
                <div className="form-group" style={{ marginTop: '15px' }}>
                    <label>Nombres Completos</label>
                    <input type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} className="form-control" required />
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
                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}><Plus size={18} /> {editId ? 'Actualizar' : 'Agregar'}</button>
                {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setFormData({ nombres: '', estado: 'Activo' }); }} style={{ marginLeft: '10px', marginTop: '10px' }}>Cancelar</button>}
            </form>

            <div className="crud-table-container">
                {loading ? <p>Cargando...</p> : (
                    <table className="crud-table">
                        <thead><tr><th>Nombres</th><th>Estado</th><th>Acciones</th></tr></thead>
                        <tbody>
                            {directores.map((d) => (
                                <tr key={d._id}>
                                    <td>{d.nombres}</td>
                                    <td><span className="movie-badge" style={{ backgroundColor: d.estado === 'Activo' ? 'rgba(0,230,118,0.2)' : 'rgba(255,51,102,0.2)', color: d.estado === 'Activo' ? 'var(--primary)' : 'var(--danger)' }}>{d.estado}</span></td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-icon edit" onClick={() => handleEdit(d)}><Edit2 size={18} /></button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(d._id)}><Trash2 size={18} /></button>
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
export default AdminDirectores;
