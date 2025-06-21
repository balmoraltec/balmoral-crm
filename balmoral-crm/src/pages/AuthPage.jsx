import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialTab = location.pathname.includes('/auth/register') ? "register" : "login";

  const handleTabChange = (value) => {
    navigate(`/auth/${value}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-256px)] py-12 bg-gradient-to-br from-brand-light-gray via-brand-white to-brand-light-gray dark:from-brand-dark-gray dark:via-brand-black dark:to-brand-dark-gray">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-brand-white dark:bg-brand-dark-gray/50 shadow-2xl rounded-xl border border-brand-light-gray dark:border-brand-medium-gray/30"
      >
        <Tabs defaultValue={initialTab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 bg-brand-light-gray dark:bg-brand-dark-gray/80 p-1 rounded-lg">
            <TabsTrigger 
              value="login" 
              className="py-3 text-sm font-semibold data-[state=active]:bg-gradient-gold-to-orange data-[state=active]:text-brand-white data-[state=active]:shadow-md rounded-md transition-all"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="py-3 text-sm font-semibold data-[state=active]:bg-gradient-gold-to-orange data-[state=active]:text-brand-white data-[state=active]:shadow-md rounded-md transition-all"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
             <Outlet />
          </TabsContent>
          <TabsContent value="register" className="mt-6">
            <Outlet />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AuthPage;