import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Sparkles } from 'lucide-react';

const CtaSection = ({ companyName }) => {
  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: `A funcionalidade "${feature}" para ${companyName} ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀`,
      duration: 3000,
    });
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-brand-dark-gray via-brand-black to-brand-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-75"></div>
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center text-brand-white max-w-4xl mx-auto"
        >
          <motion.div 
            className="inline-flex items-center justify-center p-3 bg-brand-gold/20 rounded-full mb-6"
            initial={{ scale:0 }}
            animate={{ scale:1 }}
            transition={{ delay: 0.2, duration: 0.5, type:"spring", stiffness:100}}
          >
            <Sparkles className="w-8 h-8 text-brand-gold" />
          </motion.div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-8 leading-tight">
            Pronto para <span className="text-gradient-gold">Elevar</span> o Futuro Financeiro da sua Empresa com a {companyName}?
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
            Junte-se a centenas de empresas que já otimizaram suas finanças e acesso a capital com a {companyName}. Dê o próximo passo rumo ao crescimento estratégico e sustentável.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Button 
              onClick={() => handleFeatureClick('Começar Agora')}
              size="lg" 
              className="bg-gradient-gold-to-orange text-brand-white hover:opacity-90 text-lg font-semibold px-10 py-7 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={() => handleFeatureClick('Agendar Consultoria')}
              variant="outline" 
              size="lg"
              className="border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black text-lg font-semibold px-10 py-7 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Agendar Consultoria
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;