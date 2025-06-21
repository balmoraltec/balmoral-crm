import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (loginError) {
      toast({
        title: 'Erro no Login',
        description: loginError.message || 'Não foi possível fazer login. Verifique suas credenciais.',
        variant: 'destructive',
      });
    } else if (loginData.user) {
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', loginData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { 
        toast({
          title: 'Erro ao buscar perfil',
          description: 'Não foi possível verificar seu perfil. Tente novamente.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      if (profileData && profileData.role) {
        toast({
          title: 'Login Bem-Sucedido!',
          description: `Redirecionando para o painel de ${profileData.role === 'client' ? 'cliente' : 'colaborador'}...`,
        });
        if (profileData.role === 'client') {
          navigate('/dashboard/cliente');
        } else if (profileData.role === 'partner') {
          navigate('/dashboard/parceiro');
        } else {
          navigate('/dashboard'); 
        }
      } else {
        toast({
          title: 'Perfil não definido',
          description: 'Por favor, selecione seu tipo de perfil para continuar.',
        });
        navigate('/selecionar-perfil');
      }
    }
  };
  
  const handleForgotPassword = () => {
     toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "A recuperação de senha ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email-login" className="text-brand-dark-gray dark:text-brand-light-gray">Email</Label>
        <Input
          id="email-login"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-brand-light-gray/50 dark:bg-brand-black/30 border-brand-medium-gray/50 focus:border-brand-gold focus:ring-brand-gold"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-login" className="text-brand-dark-gray dark:text-brand-light-gray">Senha</Label>
        <div className="relative">
          <Input
            id="password-login"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
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
      <Button type="submit" className="w-full bg-gradient-gold-to-orange text-brand-white hover:opacity-90 text-lg py-3" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Entrar'}
      </Button>
      <div className="text-center">
        <Button type="button" variant="link" onClick={handleForgotPassword} className="text-sm text-brand-dark-orange dark:text-brand-gold hover:underline">
          Esqueceu sua senha?
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;