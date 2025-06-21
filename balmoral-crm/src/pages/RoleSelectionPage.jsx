import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelection = async (role) => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      toast({
        title: "Erro de Autenticação",
        description: "Você precisa estar logado para selecionar um perfil. Redirecionando para login...",
        variant: "destructive",
      });
      navigate('/auth/login');
      return;
    }

    const user = session.user;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({ role: role, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;

      if (data) {
        toast({
          title: "Perfil Selecionado!",
          description: `Você selecionou o perfil: ${role === 'client' ? 'Cliente' : 'Colaborador/Parceiro'}.`,
        });
        // TODO: Redirect to dashboard or appropriate page based on role
        navigate('/'); 
        toast({
          title: "🚧 Redirecionamento Pendente",
          description: "Em breve você será redirecionado para o painel apropriado! 🚀",
          duration: 4000,
        });
      } else {
         toast({
          title: "Erro ao Salvar Perfil",
          description: "Não foi possível salvar seu perfil. O usuário pode não existir na tabela de perfis.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Erro ao atualizar perfil do usuário:", error);
      toast({
        title: "Erro ao Salvar Perfil",
        description: error.message || "Ocorreu um erro inesperado ao salvar seu perfil.",
        variant: "destructive",
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-256px)] py-12 bg-gradient-to-br from-brand-light-gray via-brand-white to-brand-light-gray dark:from-brand-dark-gray dark:via-brand-black dark:to-brand-dark-gray">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8"
      >
        <h1 className="text-4xl font-bold text-center text-brand-dark-gray dark:text-brand-white mb-4">
          Como você usará a Balmoral?
        </h1>
        <p className="text-xl text-center text-brand-medium-gray dark:text-brand-light-gray mb-12">
          Selecione o perfil que melhor descreve você.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-brand-white dark:bg-brand-dark-gray/60 border-brand-gold/50 dark:border-brand-gold/30 transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-gold-to-orange p-6">
                <div className="flex items-center space-x-4">
                  <Users className="h-10 w-10 text-brand-white" />
                  <div>
                    <CardTitle className="text-2xl font-bold text-brand-white">Sou Cliente</CardTitle>
                    <CardDescription className="text-brand-white/90">Buscando soluções de crédito para minha empresa.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-brand-dark-gray dark:text-brand-light-gray">
                <ul className="space-y-2 list-disc list-inside mb-6">
                  <li>Acesso simplificado a diversas opções de crédito.</li>
                  <li>Consultoria especializada para encontrar as melhores taxas.</li>
                  <li>Plataforma segura e intuitiva.</li>
                </ul>
              </CardContent>
              <CardFooter className="p-6 bg-brand-light-gray/50 dark:bg-brand-black/20">
                <Button 
                  onClick={() => handleRoleSelection('client')} 
                  className="w-full bg-gradient-gold-to-orange text-brand-white hover:opacity-90 text-lg py-3"
                >
                  Selecionar Cliente <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-brand-white dark:bg-brand-dark-gray/60 border-brand-dark-orange/50 dark:border-brand-dark-orange/30 transform hover:-translate-y-1">
              <CardHeader className="bg-gradient-gray-dark-light p-6">
                 <div className="flex items-center space-x-4">
                  <Briefcase className="h-10 w-10 text-brand-white" />
                  <div>
                    <CardTitle className="text-2xl font-bold text-brand-white">Sou Colaborador/Parceiro</CardTitle>
                    <CardDescription className="text-brand-white/90">Quero oferecer soluções financeiras aos meus clientes.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-brand-dark-gray dark:text-brand-light-gray">
                <ul className="space-y-2 list-disc list-inside mb-6">
                  <li>Expanda seu portfólio de serviços.</li>
                  <li>Ferramentas para gestão e acompanhamento de clientes.</li>
                  <li>Comissões atrativas e transparentes.</li>
                </ul>
              </CardContent>
              <CardFooter className="p-6 bg-brand-light-gray/50 dark:bg-brand-black/20">
                <Button 
                  onClick={() => handleRoleSelection('partner')} 
                  variant="secondary"
                  className="w-full bg-brand-dark-gray text-brand-white hover:bg-brand-medium-gray dark:bg-brand-medium-gray dark:hover:bg-brand-light-gray dark:text-brand-black text-lg py-3"
                >
                  Selecionar Parceiro <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelectionPage;