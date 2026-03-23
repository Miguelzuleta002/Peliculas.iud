import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminTipos = () => {
    const [tipos, setTipos] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTipos = async () => {
        try { const { data } = await api.get('/tipos'); setTipos(data); }
        catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => { fetchTipos(); }, []);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await api.put(`/tipos/${editId}`, formData);
            else await api.post('/tipos', formData);
            setFormData({ nombre: '', descripcion: '' }); setEditId(null); fetchTipos();
        } catch (error) { alert('Error guardando tipo'); }
    };

    const handleEdit = (t) => { setFormData({ nombre: t.nombre, descripcion: t.descripcion }); setEditId(t._id); };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar definitivamente este tipo?')) {
            await api.delete(`/tipos/${id}`); fetchTipos();
        }
    };

    return (
        <div>
            <div className="crud-header"><h2>Gestión de Tipos de Multimedia</h2></div>
            <form className="crud-form" onSubmit={handleSubmit}>
                <h3>{editId ? 'Editar Tipo' : 'Nuevo Tipo'}</h3>
                <div className="form-group" style={{ marginTop: '15px' }}>
                    <label>Nombre (Ej: Serie, Película, Documental)</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="form-control" required />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} className="form-control" rows="2"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}><Plus size={18} /> {editId ? 'Actualizar' : 'Agregar'}</button>
                {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setFormData({ nombre: '', descripcion: '' }); }} style={{ marginLeft: '10px', marginTop: '10px' }}>Cancelar</button>}
            </form>

            <div className="crud-table-container">
                {loading ? <p>Cargando...</p> : (
                    <table className="crud-table">
                        <thead><tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
                        <tbody>
                            {tipos.map((t) => (
                                <tr key={t._id}>
                                    <td>{t.nombre}</td><td>{t.descripcion}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-icon edit" onClick={() => handleEdit(t)}><Edit2 size={18} /></button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(t._id)}><Trash2 size={18} /></button>
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
export default AdminTipos;
