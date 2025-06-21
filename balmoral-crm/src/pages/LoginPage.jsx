import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-brand-dark-gray dark:text-brand-white mb-2">Bem-vindo de Volta!</h1>
      <p className="text-center text-brand-medium-gray dark:text-brand-light-gray mb-8">Acesse sua conta para continuar.</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;