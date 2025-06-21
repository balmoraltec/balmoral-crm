import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Erro ao buscar sessão:", sessionError);
        toast({ title: "Erro de Sessão", description: sessionError.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      
      setSession(currentSession);

      if (currentSession?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('role, full_name')
          .eq('id', currentSession.user.id)
          .single();

        if (profileError) {
          console.error("Erro ao buscar perfil do usuário:", profileError);
          if (profileError.code === 'PGRST116') { // "No rows found"
             // This case is handled by redirecting to role selection if role is missing
          } else {
            toast({ title: "Erro de Perfil", description: "Não foi possível carregar os dados do seu perfil.", variant: "destructive" });
          }
        }
        setUserProfile(profile);
      }
      setLoading(false);
    };

    fetchSessionAndProfile();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (event === "SIGNED_OUT") {
        setUserProfile(null);
        setLoading(false);
      } else if (event === "SIGNED_IN" && newSession?.user) {
         fetchSessionAndProfile(); // Re-fetch profile on sign-in
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-256px)]">
        <Loader2 className="h-16 w-16 animate-spin text-brand-dark-orange" />
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (!userProfile?.role && location.pathname !== '/selecionar-perfil') {
     // If user is logged in but has no role, and is not already on role selection page
    return <Navigate to="/selecionar-perfil" state={{ from: location }} replace />;
  }
  
  if (requiredRole && userProfile?.role !== requiredRole) {
    toast({
      title: "Acesso Negado",
      description: "Você não tem permissão para acessar esta página.",
      variant: "destructive",
    });
    // Redirect to a generic dashboard or home page if role mismatch
    // Or, if they have a role, redirect to their own dashboard
    if (userProfile?.role === 'client') return <Navigate to="/dashboard/cliente" replace />;
    if (userProfile?.role === 'partner') return <Navigate to="/dashboard/parceiro" replace />;
    return <Navigate to="/" replace />; // Fallback to home
  }

  return children;
};

export default ProtectedRoute;