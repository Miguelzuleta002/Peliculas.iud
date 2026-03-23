import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminProductoras = () => {
    const [productoras, setProductoras] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', slogan: '', descripcion: '', estado: 'Activo' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProductoras = async () => {
        try { const { data } = await api.get('/productoras'); setProductoras(data); }
        catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => { fetchProductoras(); }, []);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await api.put(`/productoras/${editId}`, formData);
            else await api.post('/productoras', formData);
            setFormData({ nombre: '', slogan: '', descripcion: '', estado: 'Activo' }); setEditId(null); fetchProductoras();
        } catch (error) { alert('Error guardando productora'); }
    };

    const handleEdit = (p) => { setFormData({ nombre: p.nombre, slogan: p.slogan, descripcion: p.descripcion, estado: p.estado }); setEditId(p._id); };

    const handleDelete = async (id) => {
        if (window.confirm('¿Inactivar Productora?')) {
            await api.delete(`/productoras/${id}`); fetchProductoras();
        }
    };

    return (
        <div>
            <div className="crud-header"><h2>Gestión de Productoras</h2></div>
            <form className="crud-form" onSubmit={handleSubmit}>
                <h3>{editId ? 'Editar Productora' : 'Nueva Productora'}</h3>
                <div className="form-group" style={{ marginTop: '15px' }}>
                    <label>Nombre de la Productora</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Slogan</label>
                    <input type="text" name="slogan" value={formData.slogan} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="form-control" rows="2" required></textarea>
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
                {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setFormData({ nombre: '', slogan: '', descripcion: '', estado: 'Activo' }); }} style={{ marginLeft: '10px', marginTop: '10px' }}>Cancelar</button>}
            </form>

            <div className="crud-table-container">
                {loading ? <p>Cargando...</p> : (
                    <table className="crud-table">
                        <thead><tr><th>Nombre</th><th>Slogan</th><th>Estado</th><th>Acciones</th></tr></thead>
                        <tbody>
                            {productoras.map((p) => (
                                <tr key={p._id}>
                                    <td>{p.nombre}</td><td>{p.slogan}</td>
                                    <td><span className="movie-badge" style={{ backgroundColor: p.estado === 'Activo' ? 'rgba(0,230,118,0.2)' : 'rgba(255,51,102,0.2)', color: p.estado === 'Activo' ? 'var(--primary)' : 'var(--danger)' }}>{p.estado}</span></td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-icon edit" onClick={() => handleEdit(p)}><Edit2 size={18} /></button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(p._id)}><Trash2 size={18} /></button>
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
export default AdminProductoras;
