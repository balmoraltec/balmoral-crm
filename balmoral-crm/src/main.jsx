import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import RoleSelectionPage from '@/pages/RoleSelectionPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ClientDashboardPage from '@/pages/dashboard/ClientDashboardPage';
import PartnerDashboardPage from '@/pages/dashboard/PartnerDashboardPage';
import TrophyRegistrationPage from '@/pages/TrophyRegistrationPage'; 
import ConsultationBookingPage from '@/pages/ConsultationBookingPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Toaster } from '@/components/ui/toaster';
import '@/index.css';
import { supabase } from '@/lib/supabaseClient'; 

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Toaster />
      <Header companyName="Balmoral Solução Empresarial" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer companyName="Balmoral Solução Empresarial" />
    </div>
  );
};

const DashboardRouteWrapper = () => {
  const [userRole, setUserRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        if (profile) {
          setUserRole(profile.role);
        }
      }
      setLoading(false);
    };
    fetchRole();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-dark-orange"></div><p className="ml-3 text-brand-dark-gray dark:text-brand-light-gray">Carregando...</p></div>;
  }
  
  return <DashboardLayout userRole={userRole}><Outlet context={{ userRole }} /></DashboardLayout>;
};


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          }
        ]
      },
      {
        path: "/selecionar-perfil",
        element: <ProtectedRoute><RoleSelectionPage /></ProtectedRoute> 
      },
      {
        path: "/inscreva-se-trofeu", 
        element: <TrophyRegistrationPage />
      },
      {
        path: "/agendar-consultoria",
        element: <ConsultationBookingPage />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardRouteWrapper /></ProtectedRoute>,
    children: [
      {
        index: true, 
        element: <DashboardPage />, 
      },
      {
        path: "cliente",
        element: <ProtectedRoute requiredRole="client"><ClientDashboardPage /></ProtectedRoute>,
      },
      {
        path: "parceiro",
        element: <ProtectedRoute requiredRole="partner"><PartnerDashboardPage /></ProtectedRoute>,
      },
    ]
  },
  {
    path: "/app-legacy", 
    element: <App /> 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);