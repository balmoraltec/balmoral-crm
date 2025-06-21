import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Send, Loader2, User, Mail, Phone, MessageSquare as MessageSquareText } from 'lucide-react';

const ConsultationBookingPage = () => {
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName || !whatsapp || !email) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Por favor, preencha todos os campos do formulário.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('consultation_requests')
      .insert([{ full_name: fullName, whatsapp, email }]);

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Erro na Solicitação',
        description: error.message || 'Não foi possível enviar sua solicitação. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '✨ Solicitação Enviada com Sucesso!',
        description: 'Obrigado por seu interesse! Nossa equipe entrará em contato em breve para agendar sua consultoria estratégica.',
        duration: 7000,
      });
      setFullName('');
      setWhatsapp('');
      setEmail('');
    }
  };

  const imageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/3326e667df57ae89bacb926ab445ee01.png";

  return (
    <div className="min-h-[calc(100vh-theme(spacing.72))] py-12 md:py-20 bg-gradient-to-br from-brand-light-gray via-brand-white to-brand-light-gold dark:from-brand-dark-gray dark:via-brand-black dark:to-brand-dark-gold">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto bg-brand-white dark:bg-brand-dark-gray/80 shadow-2xl rounded-xl overflow-hidden p-6 sm:p-8 md:p-12 backdrop-blur-sm">
          <div className="text-center mb-8 md:mb-10">
            <MessageSquareText className="mx-auto h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-transparent bg-clip-text bg-gradient-gold-to-orange mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold-to-orange mb-3 sm:mb-4">
              Agende sua Consultoria Estratégica
            </h1>
            <p className="text-base sm:text-lg text-brand-dark-gray dark:text-brand-light-gray leading-relaxed max-w-2xl mx-auto">
              Descubra como a Balmoral Solução Empresarial pode impulsionar seus resultados. Preencha o formulário abaixo e nossa equipe de especialistas entrará em contato para um diagnóstico personalizado.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="aspect-square md:aspect-auto md:h-full"
            >
              <img  
                src={imageUrl} 
                alt="Consultoria Estratégica Balmoral - Equipe discutindo soluções" 
                className="w-full h-full object-cover rounded-lg shadow-lg border-2 sm:border-4 border-brand-gold/50" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-dark-gray dark:text-brand-white mb-6 text-center md:text-left">
                Seus Dados para Contato
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="relative">
                  <Label htmlFor="fullName-consultation" className="text-sm sm:text-base text-brand-dark-gray dark:text-brand-light-gray mb-1 block">Nome Completo</Label>
                  <div className="flex items-center">
                    <User className="absolute left-3 top-1/2 transform -translate-y-px h-4 w-4 sm:h-5 sm:w-5 text-brand-medium-gray" />
                    <Input
                      id="fullName-consultation"
                      type="text"
                      placeholder="Seu nome completo aqui"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="whatsapp-consultation" className="text-sm sm:text-base text-brand-dark-gray dark:text-brand-light-gray mb-1 block">WhatsApp (com DDD)</Label>
                  <div className="flex items-center">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-px h-4 w-4 sm:h-5 sm:w-5 text-brand-medium-gray" />
                    <Input
                      id="whatsapp-consultation"
                      type="tel"
                      placeholder="(XX) XXXXX-XXXX"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Label htmlFor="email-consultation" className="text-sm sm:text-base text-brand-dark-gray dark:text-brand-light-gray mb-1 block">E-mail</Label>
                  <div className="flex items-center">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-px h-4 w-4 sm:h-5 sm:w-5 text-brand-medium-gray" />
                    <Input
                      id="email-consultation"
                      type="email"
                      placeholder="seu.melhor@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-gold-to-orange text-brand-white hover:opacity-95 text-base sm:text-lg py-3 sm:py-3.5 shadow-lg transform hover:scale-105 transition-transform duration-150" 
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Enviar Solicitação</>}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultationBookingPage;