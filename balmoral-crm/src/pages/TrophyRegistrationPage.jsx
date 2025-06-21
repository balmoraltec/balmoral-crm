import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { Send, Loader2, User, Mail, Phone } from 'lucide-react';

const TrophyRegistrationPage = () => {
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
      .from('trophy_registrations')
      .insert([{ full_name: fullName, whatsapp, email }]);

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Erro na Inscrição',
        description: error.message || 'Não foi possível registrar sua inscrição. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: '🎉 Inscrição Realizada com Sucesso!',
        description: 'Obrigado por se inscrever no Programa Troféu Balmoral Estrela Mental Doctors Brasil! Entraremos em contato em breve.',
        duration: 7000,
      });
      setFullName('');
      setWhatsapp('');
      setEmail('');
    }
  };

  const videoUrl = "https://www.youtube.com/embed/NGX5nmdruZ0";
  const trophyLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/b8ff92edd032fcafb4aa7e3b9ec6281f.png";

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
            <img  
              src={trophyLogoUrl} 
              alt="Logo Troféu Balmoral Estrela Mental Doctors Brasil" 
              className="mx-auto h-32 sm:h-40 md:h-48 w-auto mb-6" 
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-gold-to-orange mb-3 sm:mb-4">
              Programa Troféu Balmoral Estrela Mental Doctors Brasil
            </h1>
            <p className="text-base sm:text-lg text-brand-dark-gray dark:text-brand-light-gray leading-relaxed">
              Reconhecendo a excelência e inovação na saúde mental. Junte-se a nós nesta jornada de transformação e destaque.
              Inscreva-se abaixo e faça parte deste movimento inspirador!
            </p>
          </div>

          <div className="mb-8 md:mb-10 aspect-video">
             <iframe 
                className="w-full h-full rounded-lg shadow-lg border-2 sm:border-4 border-brand-gold/50"
                src={videoUrl}
                title="Vídeo de Apresentação - Troféu Balmoral"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-brand-dark-gray dark:text-brand-white mb-6 md:mb-8 text-center">
            Formulário de Inscrição
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 max-w-lg mx-auto">
            <div className="relative">
              <Label htmlFor="fullName-trophy" className="text-sm sm:text-base text-brand-dark-gray dark:text-brand-light-gray mb-1 block">Nome Completo</Label>
              <div className="flex items-center">
                <User className="absolute left-3 top-1/2 transform -translate-y-px h-4 w-4 sm:h-5 sm:w-5 text-brand-medium-gray" />
                <Input
                  id="fullName-trophy"
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
              <Label htmlFor="whatsapp-trophy" className="text-sm sm:text-base text-brand-dark-gray dark:text-brand-light-gray mb-1 block">WhatsApp (com DDD)</Label>
              <div className="flex items-center">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-px h-4 w-4 sm:h-5 sm:w-5 text-brand-medium-gray" />
                <Input
                  id="whatsapp-trophy"
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
              <Label htmlFor="email-trophy" className="text-sm sm:text-base text-brand-dark-gray dark:text-brand-light-gray mb-1 block">E-mail</Label>
              <div className="flex items-center">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-px h-4 w-4 sm:h-5 sm:w-5 text-brand-medium-gray" />
                <Input
                  id="email-trophy"
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
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Enviar Inscrição</>}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default TrophyRegistrationPage;