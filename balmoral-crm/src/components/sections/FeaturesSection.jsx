import React from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { Zap, ShieldCheck, BarChart3, Users2, BrainCircuit, Briefcase } from 'lucide-react';

const featuresData = [
  {
    icon: Zap,
    title: "Análise Estratégica Rápida",
    description: "Receba propostas e soluções personalizadas em tempo recorde com nossa análise inteligente.",
    color: "bg-gradient-to-br from-brand-dark-orange to-brand-burnt-orange",
    ariaLabel: "Saiba mais sobre Análise Rápida"
  },
  {
    icon: ShieldCheck,
    title: "Segurança Premium",
    description: "Seus dados empresariais são protegidos com criptografia de ponta e protocolos de segurança rigorosos.",
    color: "bg-gradient-to-br from-brand-medium-gray to-brand-dark-gray",
    ariaLabel: "Saiba mais sobre Segurança Premium"
  },
  {
    icon: BarChart3,
    title: "Condições Vantajosas",
    description: "Compare e escolha as melhores taxas e condições de crédito e serviços de diversos parceiros.",
    color: "bg-gradient-to-br from-brand-gold to-brand-dark-gold",
    ariaLabel: "Saiba mais sobre Condições Vantajosas"
  },
  {
    icon: Users2,
    title: "Suporte Especializado",
    description: "Nossos consultores experientes estão prontos para auxiliar sua empresa em cada etapa do processo.",
    color: "bg-gradient-to-br from-brand-burnt-orange to-orange-700",
    ariaLabel: "Saiba mais sobre Suporte Especializado"
  },
  {
    icon: BrainCircuit,
    title: "Inteligência de Negócios",
    description: "Utilizamos IA para otimizar suas chances de aprovação e encontrar as soluções financeiras mais adequadas.",
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
    ariaLabel: "Saiba mais sobre Inteligência de Negócios"
  },
  {
    icon: Briefcase,
    title: "Foco no Seu Sucesso",
    description: "Soluções financeiras e de gestão pensadas exclusivamente para as necessidades do seu negócio.",
    color: "bg-gradient-to-br from-brand-dark-gold to-yellow-600",
    ariaLabel: "Saiba mais sobre Foco no Seu Sucesso"
  }
];

const FeaturesSection = ({ companyName }) => {
  const handleFeatureClick = (featureTitle) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: `A funcionalidade "${featureTitle}" para ${companyName} ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀`,
      duration: 3000,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="solucoes" className="py-20 bg-brand-white dark:bg-brand-light-gray/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark-gray dark:text-brand-white mb-6">
            Por que escolher a <span className="text-gradient-gold">{companyName}</span>?
          </h2>
          <p className="text-xl text-brand-medium-gray dark:text-brand-light-gray/80 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma plataforma robusta, segura e eficiente, projetada para simplificar sua jornada de crédito e gestão empresarial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gradient-to-br from-brand-light-gray/30 to-brand-white dark:from-brand-dark-gray/20 dark:to-brand-light-gray/10 rounded-2xl p-8 shadow-xl card-hover cursor-pointer flex flex-col group"
              onClick={() => handleFeatureClick(feature.title)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleFeatureClick(feature.title)}
              aria-label={feature.ariaLabel}
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark-gray dark:text-brand-white mb-4">{feature.title}</h3>
              <p className="text-brand-medium-gray dark:text-brand-light-gray/70 leading-relaxed flex-grow">{feature.description}</p>
              <div className="mt-6">
                <span className="text-sm font-semibold text-brand-dark-orange dark:text-brand-gold group-hover:underline">
                  Saiba Mais &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;