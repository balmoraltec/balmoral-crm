import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Home, User, Briefcase, BarChart2, Settings, LogOut, ChevronLeft, ChevronRight, LayoutDashboard, Users as UsersIcon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarLink = ({ to, icon: Icon, children, currentPath, setIsSidebarOpen }) => {
  const isActive = currentPath === to || (to !== "/dashboard" && currentPath.startsWith(to));
  return (
    <Link
      to={to}
      onClick={() => {
        if (window.innerWidth < 768) { 
            setIsSidebarOpen(false);
        }
      }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-gradient-gold-to-orange text-brand-white shadow-md' 
                    : 'text-brand-medium-gray hover:bg-brand-light-gray/50 dark:text-brand-light-gray dark:hover:bg-brand-dark-gray/30 hover:text-brand-dark-orange dark:hover:text-brand-gold'
                  }`}
    >
      <Icon className={`h-5 w-5 ${isActive ? 'text-brand-white' : 'text-brand-dark-orange dark:text-brand-gold'}`} />
      <span className="font-medium">{children}</span>
    </Link>
  );
};


const DashboardLayout = ({ children, userRole }) => {
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate(); 
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth >= 768); 
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/bdacf6172b89ad8ebbc131d9d8620fd4.jpg";


  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Erro ao Sair", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Logout realizado!", description: "Você foi desconectado." });
      navigate('/'); 
    }
  };
  
  const commonLinks = [
    { to: `/dashboard/${userRole}`, icon: LayoutDashboard, label: "Visão Geral" },
    { to: `/dashboard/${userRole}/perfil`, icon: User, label: "Meu Perfil" },
    { to: `/dashboard/${userRole}/configuracoes`, icon: Settings, label: "Configurações" },
  ];

  const clientLinks = [
    ...commonLinks,
    { to: "/dashboard/cliente/solicitacoes", icon: Briefcase, label: "Minhas Solicitações" },
    { to: "/dashboard/cliente/documentos", icon: BarChart2, label: "Documentos" },
  ];

  const partnerLinks = [
    ...commonLinks,
    { to: "/dashboard/parceiro/clientes", icon: UsersIcon, label: "Gerenciar Clientes" },
    { to: "/dashboard/parceiro/comissoes", icon: Briefcase, label: "Comissões" },
    { to: "/dashboard/parceiro/relatorios", icon: BarChart2, label: "Relatórios" },
  ];
  
  const navLinks = userRole === 'client' ? clientLinks : (userRole === 'partner' ? partnerLinks : commonLinks);

  const sidebarVariants = {
    open: { width: "280px", x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { width: "80px", x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    mobileClosed: { x: "-100%", transition: { type: "tween", ease: "easeInOut", duration: 0.3 } },
    mobileOpen: { x: 0, width: "280px", transition: { type: "tween", ease: "easeInOut", duration: 0.3 } },
  };
  
  const contentVariants = {
    open: { marginLeft: "280px", width: "calc(100% - 280px)", transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { marginLeft: "80px", width: "calc(100% - 80px)", transition: { type: "spring", stiffness: 300, damping: 30 } },
    mobile: { marginLeft: "0px", width: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const getSidebarAnimState = () => {
    if (window.innerWidth < 768) {
      return isSidebarOpen ? "mobileOpen" : "mobileClosed";
    }
    return isSidebarOpen ? "open" : "closed";
  }

  const getContentAnimState = () => {
    if (window.innerWidth < 768) {
      return "mobile";
    }
    return isSidebarOpen ? "open" : "closed";
  }


  return (
    <div className="flex h-screen bg-transparent relative overflow-hidden">
      <motion.aside
        variants={sidebarVariants}
        initial={false}
        animate={getSidebarAnimState()}
        className={`fixed top-0 left-0 h-full bg-brand-white/80 dark:bg-brand-dark-gray/80 backdrop-blur-md shadow-lg z-40 flex flex-col
                    ${window.innerWidth < 768 && !isSidebarOpen ? 'hidden' : 'flex'}`}
      >
        <div className={`flex items-center ${isSidebarOpen || window.innerWidth >= 768 && isSidebarOpen ? 'justify-between' : 'justify-center'} p-4 h-20 border-b border-brand-light-gray/50 dark:border-brand-medium-gray/30`}>
          {(isSidebarOpen || (window.innerWidth >= 768 && isSidebarOpen)) && (
            <Link to="/" className="flex items-center space-x-2" onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}>
              <img src={logoUrl} alt="Balmoral Logo" className="h-12 w-auto" /> {/* Aumentado para h-12 */}
              <span className="font-bold text-xl text-brand-dark-gray dark:text-brand-white">Balmoral</span>
            </Link>
          )}
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-brand-medium-gray hover:text-brand-dark-orange md:hidden"
           >
            {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </Button>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navLinks.map(link => (
            <SidebarLink 
              key={link.to} 
              to={link.to} 
              icon={link.icon} 
              currentPath={location.pathname}
              setIsSidebarOpen={setIsSidebarOpen}
            >
              {(isSidebarOpen || (window.innerWidth >= 768 && isSidebarOpen)) ? link.label : ''}
            </SidebarLink>
          ))}
        </nav>

        <div className={`p-4 border-t border-brand-light-gray/50 dark:border-brand-medium-gray/30 ${!(isSidebarOpen || (window.innerWidth >= 768 && isSidebarOpen)) && 'flex justify-center'}`}>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-brand-medium-gray hover:bg-red-500/10 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            {(isSidebarOpen || (window.innerWidth >= 768 && isSidebarOpen)) && <span className="font-medium">Sair</span>}
          </Button>
        </div>
      </motion.aside>
      
      <div className="md:hidden fixed top-4 right-4 z-50">
         <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="bg-brand-white/80 dark:bg-brand-dark-gray/80 backdrop-blur-sm"
           >
            {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
      </div>


      <motion.main 
        variants={contentVariants}
        initial={false}
        animate={getContentAnimState()}
        className="flex-1 overflow-y-auto p-6 md:p-8 bg-transparent"
      >
        {children ? React.cloneElement(children, { userRole }) : <Outlet context={{ userRole }} />}
      </motion.main>
    </div>
  );
};

export default DashboardLayout;