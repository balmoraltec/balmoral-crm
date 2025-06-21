import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Erro de Validação',
        description: 'As senhas não coincidem. Por favor, verifique e tente novamente.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, 
        }
      }
    });

    setIsLoading(false);

    if (signUpError) {
      toast({
        title: 'Ops! Algo deu errado...',
        description: signUpError.message || 'Não foi possível criar sua conta no momento. Tente novamente mais tarde.',
        variant: 'destructive',
      });
      return;
    }

    if (signUpData.user) {
      toast({
        title: '🎉 Cadastro Realizado com Sucesso!',
        description: 'Um e-mail de confirmação foi enviado para sua caixa de entrada. Por favor, verifique (e olhe o spam!) para ativar sua conta e começar a usar a Balmoral Soluções!',
        duration: 7000, 
      });
      navigate('/auth/login'); 
    } else if (!signUpData.session && !signUpData.user) {
       toast({
        title: '📧 Quase lá! Verifique seu Email',
        description: 'Um email de confirmação foi enviado (ou reenviado) para você. Por favor, verifique sua caixa de entrada e spam para continuar.',
        duration: 7000,
      });
      navigate('/auth/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName-register" className="text-brand-dark-gray dark:text-brand-light-gray">Nome Completo</Label>
        <Input
          id="fullName-register"
          type="text"
          placeholder="Seu nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="bg-brand-light-gray/50 dark:bg-brand-black/30 border-brand-medium-gray/50 focus:border-brand-gold focus:ring-brand-gold"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-register" className="text-brand-dark-gray dark:text-brand-light-gray">Email</Label>
        <Input
          id="email-register"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-brand-light-gray/50 dark:bg-brand-black/30 border-brand-medium-gray/50 focus:border-brand-gold focus:ring-brand-gold"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-register" className="text-brand-dark-gray dark:text-brand-light-gray">Senha</Label>
        <div className="relative">
          <Input
            id="password-register"
            type={showPassword ? 'text' : 'password'}
            placeholder="Crie uma senha forte"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-brand-light-gray/50 dark:bg-brand-black/30 border-brand-medium-gray/50 focus:border-brand-gold focus:ring-brand-gold"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-brand-medium-gray hover:text-brand-dark-orange"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword-register" className="text-brand-dark-gray dark:text-brand-light-gray">Confirmar Senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword-register"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Repita a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-brand-light-gray/50 dark:bg-brand-black/30 border-brand-medium-gray/50 focus:border-brand-gold focus:ring-brand-gold"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-brand-medium-gray hover:text-brand-dark-orange"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full bg-gradient-gold-to-orange text-brand-white hover:opacity-90 text-lg py-3" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Criar Conta'}
      </Button>
       <p className="text-xs text-center text-brand-medium-gray dark:text-brand-light-gray px-2">
        Ao se cadastrar, você concorda com nossos <a href="/termos" onClick={(e) => { e.preventDefault(); toast({title: "🚧 Página em Desenvolvimento", description: "A página de Termos de Serviço será implementada em breve! 🚀"}); }} className="underline hover:text-brand-dark-orange">Termos de Serviço</a> e <a href="/privacidade" onClick={(e) => { e.preventDefault(); toast({title: "🚧 Página em Desenvolvimento", description: "A página de Política de Privacidade será implementada em breve! 🚀"});}} className="underline hover:text-brand-dark-orange">Política de Privacidade</a>.
      </p>
    </form>
  );
};

export default RegisterForm;