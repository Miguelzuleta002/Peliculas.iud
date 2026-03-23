import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../../services/api';

const AdminMedias = () => {
    const [medias, setMedias] = useState([]);
    const [loading, setLoading] = useState(true);

    // Referencias para los selects
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const initialState = {
        serial: '', titulo: '', sinopsis: '', urlPelicula: '', imagenPortada: '', anoEstreno: '',
        genero: '', director: '', productora: '', tipo: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const [resMedias, resGen, resDir, resProd, resTipos] = await Promise.all([
                api.get('/medias'), api.get('/generos'), api.get('/directores'), api.get('/productoras'), api.get('/tipos')
            ]);
            setMedias(resMedias.data);
            // Filtramos para que al crear/editar, solo se ofrezcan entidades "Activas"
            setGeneros(resGen.data.filter(g => g.estado === 'Activo'));
            setDirectores(resDir.data.filter(d => d.estado === 'Activo'));
            setProductoras(resProd.data.filter(p => p.estado === 'Activo'));
            setTipos(resTipos.data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await api.put(`/medias/${editId}`, formData);
            else await api.post('/medias', formData);
            setFormData(initialState); setEditId(null); fetchData();
            alert('Guardado exitoso');
        } catch (error) {
            alert('Error guardando la información. ' + (error.response?.data?.mensaje || ''));
        }
    };

    const handleEdit = (m) => {
        setFormData({
            serial: m.serial, titulo: m.titulo, sinopsis: m.sinopsis, urlPelicula: m.urlPelicula,
            imagenPortada: m.imagenPortada, anoEstreno: m.anoEstreno,
            genero: m.genero?._id || '', director: m.director?._id || '', productora: m.productora?._id || '', tipo: m.tipo?._id || ''
        });
        setEditId(m._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar de forma permanente esta película?')) {
            await api.delete(`/medias/${id}`); fetchData();
        }
    };

    return (
        <div>
            <div className="crud-header"><h2>Gestión de Películas y Series (Media)</h2></div>
            <form className="crud-form" onSubmit={handleSubmit}>
                <h3>{editId ? 'Editar Producción' : 'Nueva Producción'}</h3>

                <div className="form-row" style={{ marginTop: '15px' }}>
                    <div className="form-group">
                        <label>Serial Único</label>
                        <input type="text" name="serial" value={formData.serial} onChange={handleInputChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" name="titulo" value={formData.titulo} onChange={handleInputChange} className="form-control" required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Sinopsis</label>
                    <textarea name="sinopsis" value={formData.sinopsis} onChange={handleInputChange} className="form-control" rows="2" required></textarea>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>URL Video</label>
                        <input type="text" name="urlPelicula" value={formData.urlPelicula} onChange={handleInputChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Imagen Portada (URL)</label>
                        <input type="text" name="imagenPortada" value={formData.imagenPortada} onChange={handleInputChange} className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label>Año</label>
                        <input type="number" name="anoEstreno" value={formData.anoEstreno} onChange={handleInputChange} className="form-control" required />
                    </div>
                </div>

                <div className="form-row" style={{ marginTop: '10px' }}>
                    <div className="form-group">
                        <label>Género Principal</label>
                        <select name="genero" value={formData.genero} onChange={handleInputChange} className="form-control" required>
                            <option value="">Seleccione...</option>
                            {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Director</label>
                        <select name="director" value={formData.director} onChange={handleInputChange} className="form-control" required>
                            <option value="">Seleccione...</option>
                            {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Productora</label>
                        <select name="productora" value={formData.productora} onChange={handleInputChange} className="form-control" required>
                            <option value="">Seleccione...</option>
                            {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tipo (Formato)</label>
                        <select name="tipo" value={formData.tipo} onChange={handleInputChange} className="form-control" required>
                            <option value="">Seleccione...</option>
                            {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}><Plus size={18} /> {editId ? 'Actualizar Producción' : 'Registrar Producción'}</button>
                {editId && <button type="button" className="btn btn-secondary" onClick={() => { setEditId(null); setFormData(initialState); }} style={{ marginLeft: '10px', marginTop: '10px' }}>Cancelar</button>}
            </form>

            <div className="crud-table-container">
                {loading ? <p>Cargando catálogo...</p> : (
                    <table className="crud-table">
                        <thead><tr><th>Serial</th><th>Título</th><th>Año</th><th>Tipo</th><th>Acciones</th></tr></thead>
                        <tbody>
                            {medias.map((m) => (
                                <tr key={m._id}>
                                    <td>{m.serial}</td><td>{m.titulo}</td><td>{m.anoEstreno}</td>
                                    <td>{m.tipo?.nombre}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-icon edit" onClick={() => handleEdit(m)}><Edit2 size={18} /></button>
                                            <button className="btn-icon delete" onClick={() => handleDelete(m._id)}><Trash2 size={18} /></button>
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
export default AdminMedias;
