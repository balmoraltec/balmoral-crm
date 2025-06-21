import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-brand-dark-gray dark:text-brand-white mb-2">Crie sua Conta</h1>
      <p className="text-center text-brand-medium-gray dark:text-brand-light-gray mb-8">É rápido e fácil. Comece agora mesmo!</p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;