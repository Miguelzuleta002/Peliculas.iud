import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MovieDetail from './pages/MovieDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMedias from './pages/admin/AdminMedias';
import AdminGeneros from './pages/admin/AdminGeneros';
import AdminDirectores from './pages/admin/AdminDirectores';
import AdminProductoras from './pages/admin/AdminProductoras';
import AdminTipos from './pages/admin/AdminTipos';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="main-content" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peliculas" element={<Catalog title="Películas" filterType="Película" />} />
            <Route path="/series" element={<Catalog title="Series" filterType="Serie" />} />
            <Route path="/pelicula/:id" element={<MovieDetail />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminMedias />} />
              <Route path="medias" element={<AdminMedias />} />
              <Route path="generos" element={<AdminGeneros />} />
              <Route path="directores" element={<AdminDirectores />} />
              <Route path="productoras" element={<AdminProductoras />} />
              <Route path="tipos" element={<AdminTipos />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
