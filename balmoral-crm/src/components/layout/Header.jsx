import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Menu, X, LogIn, Award, CalendarClock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const Header = ({ companyName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/bdacf6172b89ad8ebbc131d9d8620fd4.jpg";

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao Sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logout realizado!",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Início", type: "link" },
    { href: "/#solucoes", label: "Soluções", type: "anchor" },
    { href: "/#beneficios", label: "Benefícios", type: "anchor" },
    { href: "/#como-funciona", label: "Como Funciona", type: "anchor" },
    { href: "/agendar-consultoria", label: "Agendar Consultoria", type: "link" },
    { href: "/#contato", label: "Contato", type: "anchor" },
  ];
  
  const renderNavLink = (link, isMobile = false) => {
    const baseClasses = "px-2 lg:px-3 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold";
    const mobileClasses = isMobile 
      ? `block text-base text-brand-dark-gray dark:text-brand-light-gray hover:text-brand-gold dark:hover:text-brand-gold hover:bg-brand-light-gray/50 dark:hover:bg-brand-dark-gray/30 w-full text-left`
      : `text-brand-dark-gray dark:text-brand-light-gray hover:text-brand-gold dark:hover:text-brand-gold hover:bg-brand-light-gray/20 dark:hover:bg-brand-dark-gray/20 text-gradient-gold text-sm lg:text-base`;
      
    const className = `${baseClasses} ${mobileClasses}`;

    const handleClick = () => {
      if (isMobile) setIsMenuOpen(false);
      if (link.type === 'anchor' && window.location.pathname !== '/') {
        navigate(link.href.replace('#', '/#'));
      } else if (link.type === 'anchor') {
        const elementId = link.href.startsWith('/#') ? link.href.substring(2) : link.href.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    if (link.type === "link") {
      return (
        <Link key={link.label} to={link.href} className={className} onClick={() => { if (isMobile) setIsMenuOpen(false); }}>
          {link.label}
        </Link>
      );
    }
    // Anchor links
    return (
      <a key={link.label} href={link.href} className={className} onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}>
        {link.label}
      </a>
    );
  };


  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-white/95 dark:bg-brand-light-gray/95 backdrop-blur-lg shadow-md' : 'bg-brand-white/80 dark:bg-brand-light-gray/80 backdrop-blur-md'
      } border-b border-brand-light-gray dark:border-brand-dark-gray`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28 lg:h-32 xl:h-36">
          <motion.a 
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark-orange rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            aria-label={`Página inicial da ${companyName}`}
          >
            <img src={logoUrl} alt={`Logo ${companyName}`} className="h-20 sm:h-24 md:h-28 w-auto" />
          </motion.a>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map(link => renderNavLink(link))}
            {session ? (
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="border-brand-dark-orange text-brand-dark-orange hover:bg-brand-dark-orange hover:text-brand-white dark:border-brand-gold dark:text-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-black ml-2 text-sm lg:text-base px-3 py-1.5 lg:px-4 lg:py-2"
                aria-label="Sair da plataforma"
              >
                <LogIn className="mr-1.5 h-3.5 w-3.5 lg:mr-2 lg:h-4 lg:w-4" /> Sair
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/inscreva-se-trofeu')} 
                className="bg-gradient-gold-to-orange hover:opacity-90 text-brand-white ml-2 px-3 py-1.5 lg:px-4 lg:py-2 text-xs sm:text-sm lg:text-base whitespace-normal sm:whitespace-nowrap text-center leading-tight"
                aria-label="Inscreva-se para o Troféu Balmoral Doctors Brasil"
              >
                <Award className="mr-1.5 h-3.5 w-3.5 lg:mr-2 lg:h-4 lg:w-4 xl:h-5 xl:w-5 inline-block" /> 
                <span className="inline-block align-middle">Inscreva-se para o Troféu Balmoral Doctors Brasil</span>
              </Button>
            )}
          </nav>

          <button 
            className="lg:hidden p-2 rounded-md text-brand-dark-gray dark:text-brand-medium-gray hover:bg-brand-light-gray/70 dark:hover:bg-brand-dark-gray/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-dark-orange"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="w-7 h-7 sm:w-8 sm:h-8" /> : <Menu className="w-7 h-7 sm:w-8 sm:h-8" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              id="mobile-menu"
              className="lg:hidden pb-4 border-t border-brand-light-gray dark:border-brand-dark-gray"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col space-y-2 pt-4">
                {navLinks.map(link => renderNavLink(link, true))}
                <div className="flex flex-col space-y-3 pt-3 mt-2 border-t border-brand-light-gray/50 dark:border-brand-dark-gray/30">
                  {session ? (
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      className="w-full justify-center border-brand-dark-orange text-brand-dark-orange hover:bg-brand-dark-orange hover:text-brand-white dark:border-brand-gold dark:text-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-black"
                      aria-label="Sair da plataforma"
                    >
                      <LogIn className="mr-2 h-4 w-4" /> Sair
                    </Button>
                  ) : (
                     <Button 
                      onClick={() => { navigate('/inscreva-se-trofeu'); setIsMenuOpen(false); }} 
                      className="w-full justify-center bg-gradient-gold-to-orange hover:opacity-90 text-brand-white px-4 py-2 text-sm"
                      aria-label="Inscreva-se para o Troféu Balmoral Doctors Brasil"
                    >
                      <Award className="mr-2 h-4 w-4" /> Inscreva-se para o Troféu Balmoral Doctors Brasil
                    </Button>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;