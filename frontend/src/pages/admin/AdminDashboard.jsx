import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Film, Users, Video, Tags, Clapperboard } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-layout container">
            <aside className="admin-sidebar glass-effect">
                <div className="sidebar-header">
                    <LayoutDashboard size={24} color="var(--primary)" />
                    <h2>Panel Admin</h2>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/admin/medias" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                        <Film size={20} /> Películas / Medias
                    </NavLink>
                    <NavLink to="/admin/generos" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                        <Tags size={20} /> Géneros
                    </NavLink>
                    <NavLink to="/admin/directores" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                        <Users size={20} /> Directores
                    </NavLink>
                    <NavLink to="/admin/productoras" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                        <Video size={20} /> Productoras
                    </NavLink>
                    <NavLink to="/admin/tipos" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
                        <Clapperboard size={20} /> Tipos
                    </NavLink>
                </nav>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
