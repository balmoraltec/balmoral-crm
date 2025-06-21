import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Users, Briefcase, BarChartHorizontalBig, Settings, MailQuestion, Menu } from 'lucide-react'; // Added Menu
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useOutletContext } from 'react-router-dom';

const PartnerDashboardPage = () => {
  const { toast } = useToast();
  const context = useOutletContext();
  const userRole = context?.userRole;

  const handleFeatureClick = (featureName) => {
    toast({
      title: `🚧 ${featureName} em Desenvolvimento`,
      description: "Esta funcionalidade para parceiros ainda está sendo construída. Volte em breve! 🚀",
      duration: 3000,
    });
  };

  const quickActions = [
    { name: "Gerenciar Clientes", icon: Users, color: "text-sky-500", action: () => handleFeatureClick("Gerenciar Clientes") },
    { name: "Minhas Comissões", icon: Briefcase, color: "text-amber-500", action: () => handleFeatureClick("Minhas Comissões") },
    { name: "Relatórios", icon: BarChartHorizontalBig, color: "text-lime-500", action: () => handleFeatureClick("Relatórios") },
    { name: "Configurações da Conta", icon: Settings, color: "text-slate-500", action: () => handleFeatureClick("Configurações da Conta") },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-brand-dark-gray dark:text-brand-white mb-2">
          Painel do Colaborador/Parceiro
        </h1>
        <p className="text-lg text-brand-medium-gray dark:text-brand-light-gray mb-8">
          Bem-vindo! {userRole && `Você está logado como ${userRole}.`} Gerencie seus clientes, comissões e acesse ferramentas exclusivas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className="hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-brand-white dark:bg-brand-dark-gray/60 border-brand-light-gray dark:border-brand-medium-gray/30 transform hover:-translate-y-1"
              onClick={action.action}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-brand-dark-gray dark:text-brand-light-gray">{action.name}</CardTitle>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto text-brand-dark-orange dark:text-brand-gold">
                  Acessar {action.name.toLowerCase()}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-brand-white dark:bg-brand-dark-gray/60 border-brand-light-gray dark:border-brand-medium-gray/30">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-brand-dark-gray dark:text-brand-white flex items-center">
              <MailQuestion className="mr-3 h-7 w-7 text-brand-dark-orange dark:text-brand-gold" />
              Recursos e Suporte
            </CardTitle>
            <CardDescription className="text-brand-medium-gray dark:text-brand-light-gray">
              Materiais de apoio, treinamentos e contato com nosso time.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <img  alt="Ícone de documentos e ferramentas" class="mx-auto h-32 w-32 mb-4 opacity-50" src="https://images.unsplash.com/photo-1616861771863-2260f764382c" />
              <p className="text-brand-medium-gray dark:text-brand-light-gray">
                Em breve, aqui você encontrará materiais e links úteis.
              </p>
              <Button className="mt-4 bg-gradient-gray-dark-light text-brand-white hover:opacity-90" onClick={() => handleFeatureClick("Recursos e Suporte")}>
                Explorar Recursos
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PartnerDashboardPage;