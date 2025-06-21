import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { DollarSign, FileText, MessageSquare, Settings, BarChart2, Menu } from 'lucide-react'; // Added Menu
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useOutletContext } from 'react-router-dom'; // To potentially access userRole if needed directly

const ClientDashboardPage = () => {
  const { toast } = useToast();
  const context = useOutletContext(); // Access context if DashboardLayout provides it
  const userRole = context?.userRole;


  const handleFeatureClick = (featureName) => {
    toast({
      title: `🚧 ${featureName} em Desenvolvimento`,
      description: "Esta funcionalidade ainda está sendo construída. Volte em breve! 🚀",
      duration: 3000,
    });
  };

  const quickActions = [
    { name: "Nova Solicitação", icon: DollarSign, color: "text-green-500", action: () => handleFeatureClick("Nova Solicitação") },
    { name: "Meus Documentos", icon: FileText, color: "text-blue-500", action: () => handleFeatureClick("Meus Documentos") },
    { name: "Mensagens", icon: MessageSquare, color: "text-purple-500", action: () => handleFeatureClick("Mensagens") },
    { name: "Configurações", icon: Settings, color: "text-gray-500", action: () => handleFeatureClick("Configurações") },
  ];

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-brand-dark-gray dark:text-brand-white mb-2">
          Painel do Cliente
        </h1>
        <p className="text-lg text-brand-medium-gray dark:text-brand-light-gray mb-8">
          Bem-vindo de volta! {userRole && `Você está logado como ${userRole}.`} Gerencie suas solicitações e informações aqui.
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
              <BarChart2 className="mr-3 h-7 w-7 text-brand-dark-orange dark:text-brand-gold" />
              Visão Geral das Solicitações
            </CardTitle>
            <CardDescription className="text-brand-medium-gray dark:text-brand-light-gray">
              Acompanhe o status das suas solicitações de crédito.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[200px] flex items-center justify-center">
            <div className="text-center">
              <img  alt="Gráfico de pizza ilustrativo" class="mx-auto h-32 w-32 mb-4 opacity-50" src="https://images.unsplash.com/photo-1676589626779-833b56c83780" />
              <p className="text-brand-medium-gray dark:text-brand-light-gray">
                Nenhuma solicitação ativa no momento.
              </p>
              <Button className="mt-4 bg-gradient-gold-to-orange text-brand-white hover:opacity-90" onClick={() => handleFeatureClick("Nova Solicitação")}>
                Iniciar Nova Solicitação
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ClientDashboardPage;