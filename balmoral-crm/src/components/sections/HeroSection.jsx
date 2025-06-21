import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';

const HeroSection = ({ companyName }) => {
  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: `A funcionalidade "${feature}" para ${companyName} ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀`,
      duration: 3000,
    });
  };

  return (
    <section id="inicio" className="relative pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden bg-brand-light-gray dark:bg-brand-black">
      <div className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(var(--color-gold) 0.5px, transparent 0.5px), radial-gradient(var(--color-dark-orange) 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px, 30px 30px',
          backgroundPosition: '0 0, 15px 15px',
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-1.5 mb-6 bg-brand-gold/20 dark:bg-brand-gold/10 text-brand-dark-gold dark:text-brand-gold rounded-full text-sm font-semibold shadow-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
            >
              <Star className="w-4 h-4 mr-2 text-brand-dark-gold dark:text-brand-gold" />
              Sua ponte para o sucesso empresarial
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-brand-dark-gray dark:text-brand-white mb-6 leading-tight">
              Conectamos <span className="text-gradient-gold">Soluções de Crédito</span> e <span className="text-gradient-orange">Alta Performance</span> com oportunidades para sua Empresa.
            </h1>
            <p className="text-xl text-brand-medium-gray dark:text-brand-light-gray/80 mb-10 leading-relaxed">
              A {companyName} oferece a plataforma mais completa para intermediação de crédito e soluções empresariais. 
              Simplifique o acesso ao capital e encontre as melhores condições do mercado de forma rápida e segura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={() => handleFeatureClick('Solicitar Solução')}
                size="lg" 
                className="bg-gradient-gold-to-orange hover:opacity-90 text-brand-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Solicitar Solução Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => handleFeatureClick('Sou um Parceiro')}
                variant="outline" 
                size="lg"
                className="border-2 border-brand-dark-orange text-brand-dark-orange hover:bg-brand-dark-orange hover:text-brand-white dark:border-brand-gold dark:text-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-black text-lg px-8 py-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Sou um Parceiro
              </Button>
            </div>
             <div className="flex items-center text-sm text-brand-medium-gray dark:text-brand-light-gray/70">
              <ShieldCheck className="w-5 h-5 mr-2 text-green-500" />
              Plataforma segura e dados protegidos.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] group">
              <img 
                className="w-full h-full object-cover rounded-2xl shadow-2xl animate-float group-hover:scale-105 transition-transform duration-500 border-4 border-brand-gold/30 dark:border-brand-dark-orange/30" 
                alt="Globo terrestre digital com gráficos financeiros, notas de dólar e elementos de análise de dados, simbolizando soluções de crédito e alta performance global."
               src="https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/474bb375b11a20e82075892ef7071ccd.jpg" />
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-brand-gold to-brand-dark-orange rounded-full flex items-center justify-center animate-pulse-slow shadow-xl">
                <Star className="w-12 h-12 text-white" />
              </div>
               <div className="absolute -bottom-5 -left-5 p-4 bg-brand-white/80 dark:bg-brand-dark-gray/80 backdrop-blur-md rounded-xl shadow-xl text-sm text-brand-dark-gray dark:text-brand-light-gray">
                <p className="font-semibold text-gradient-gold">Conexões Estratégicas</p>
                <p>Encontre a solução ideal.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;