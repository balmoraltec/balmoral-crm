import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserRoleAndRedirect = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        toast({ title: "Não autenticado", description: "Redirecionando para login.", variant: "destructive" });
        navigate('/auth/login', { replace: true });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { 
        console.error("Erro ao buscar perfil:", profileError);
        toast({ title: "Erro ao buscar perfil", description: "Não foi possível verificar seu perfil. Tente novamente ou contate o suporte.", variant: "destructive" });
        navigate('/auth/login', { replace: true }); 
        return;
      }
      
      if (!profile || !profile.role) {
        toast({ title: "Perfil não encontrado", description: "Por favor, selecione seu perfil para continuar.", variant: "destructive" });
        navigate('/selecionar-perfil', { replace: true });
        return;
      }

      if (profile.role === 'client') {
        navigate('/dashboard/cliente', { replace: true });
      } else if (profile.role === 'partner') {
        navigate('/dashboard/parceiro', { replace: true });
      } else if (profile.role === 'admin') {
        toast({ title: "Dashboard Admin", description: "Dashboard de admin em construção!", });
        navigate('/', { replace: true }); 
      } else {
        toast({ title: "Perfil inválido", description: "Seu perfil não é reconhecido. Por favor, selecione um perfil.", variant: "destructive" });
        navigate('/selecionar-perfil', { replace: true });
      }
      setLoading(false); 
    };

    fetchUserRoleAndRedirect();
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] py-12 bg-transparent">
        <Loader2 className="h-16 w-16 animate-spin text-brand-dark-orange" />
        <p className="mt-4 text-lg text-brand-dark-gray dark:text-brand-light-gray">Carregando seu dashboard...</p>
      </div>
    );
  }

  return null; 
};

export default DashboardPage;