import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Admin } from './pages/Admin';
import { ChatWidget } from './components/features/ChatWidget';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CreateServiceRequest } from './pages/CreateServiceRequest';
import { Dashboard } from './pages/Dashboard';
import { Diagnostic } from './pages/Diagnostic';
import { GuideArticle } from './pages/GuideArticle';
import { Guides } from './pages/Guides';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { ManagedService } from './pages/ManagedService';
import { NotFound } from './pages/NotFound';
import { Privacy } from './pages/Privacy';
import { ProfessionalProfilePage } from './pages/ProfessionalProfilePage';
import { Register } from './pages/Register';
import { SearchProfessionals } from './pages/SearchProfessionals';
import { ServiceRequestDetail } from './pages/ServiceRequestDetail';

// Ao trocar de página, volta ao topo (links com #âncora, como o sumário dos guias, seguem funcionando).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/buscar" element={<SearchProfessionals />} />
          <Route path="/servico-gerenciado" element={<ManagedService />} />
          <Route path="/diagnostico-seguranca-silos" element={<Diagnostic />} />
          <Route path="/blog" element={<Guides />} />
          <Route path="/blog/:slug" element={<GuideArticle />} />
          <Route path="/privacidade" element={<Privacy />} />
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
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
