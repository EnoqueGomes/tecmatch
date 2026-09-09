import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CreateServiceRequest } from './pages/CreateServiceRequest';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { ProfessionalProfilePage } from './pages/ProfessionalProfilePage';
import { Register } from './pages/Register';
import { SearchProfessionals } from './pages/SearchProfessionals';
import { ServiceRequestDetail } from './pages/ServiceRequestDetail';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/buscar" element={<SearchProfessionals />} />
          <Route path="/profissionais/:id" element={<ProfessionalProfilePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos/novo"
            element={
              <ProtectedRoute>
                <CreateServiceRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos/:id"
            element={
              <ProtectedRoute>
                <ServiceRequestDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
