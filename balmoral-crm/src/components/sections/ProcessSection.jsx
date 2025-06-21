import React from 'react';
import { motion } from 'framer-motion';
import { FileText, BarChartBig, Users2, CheckCircle2, ArrowRight, CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const processSteps = [
  { 
    icon: FileText, 
    title: "1. Diagnóstico Inicial", 
    description: "Preencha um formulário detalhado sobre sua empresa e suas necessidades. 100% digital e seguro.",
    gradient: "from-brand-gold to-brand-dark-gold"
  },
  { 
    icon: BarChartBig, 
    title: "2. Análise Estratégica", 
    description: "Nossa IA e consultores analisam seu perfil e cruzam com as melhores soluções e parceiros.",
    gradient: "from-brand-dark-orange to-brand-burnt-orange"
  },
  { 
    icon: Users2, 
    title: "3. Propostas Personalizadas", 
    description: "Receba propostas customizadas e compare as condições mais vantajosas para sua empresa.",
    gradient: "from-brand-medium-gray to-brand-dark-gray"
  },
  { 
    icon: CheckCircle2, 
    title: "4. Implementação e Sucesso", 
    description: "Escolha a melhor oferta e conte com nosso suporte para implementar a solução e alcançar seus objetivos.",
    gradient: "from-green-500 to-green-700"
  }
];

const ProcessSection = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8,
        delay: i * 0.15
      }
    })
  };

  return (
    <section id="como-funciona" className="py-20 bg-brand-light-gray dark:bg-brand-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark-gray dark:text-brand-white mb-6">
            Descomplicamos as Soluções para <span className="text-gradient-gold">Sua Empresa</span>
          </h2>
          <p className="text-xl text-brand-medium-gray dark:text-brand-light-gray/80 max-w-3xl mx-auto leading-relaxed">
            Nosso processo é simples, transparente e projetado para economizar seu tempo, conectando sua empresa às soluções ideais em apenas 4 etapas.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/30 dark:via-brand-dark-orange/30 to-transparent -translate-y-1/2 -z-10"
             style={{
              maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
             }}
          >
            <motion.div 
              className="h-full bg-brand-dark-orange dark:bg-brand-gold rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "circOut" }}
              viewport={{ once: true }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                className="bg-brand-white dark:bg-brand-light-gray/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center relative border border-brand-gold/10 dark:border-brand-dark-orange/10"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark-gray dark:text-brand-white mb-3">{step.title}</h3>
                <p className="text-brand-medium-gray dark:text-brand-light-gray/70 leading-relaxed flex-grow">{step.description}</p>
                {index < processSteps.length -1 && (
                   <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                     <ArrowRight className="w-6 h-6 text-brand-medium-gray/50 dark:text-brand-light-gray/30 rotate-90" />
                   </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="bg-gradient-gold-to-orange hover:opacity-90 text-brand-white text-lg px-10 py-7 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Link to="/agendar-consultoria">
              <CalendarClock className="mr-3 w-6 h-6" />
              Agendar Consultoria Estratégica
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;