import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Building2, Banknote, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BenefitsSection = ({ companyName }) => {
  const benefitsData = {
    empresa: {
      title: "Vantagens Exclusivas para sua Empresa",
      icon: Building2,
      imageAlt: "Mão interagindo com interface gráfica futurista exibindo dados e gráficos de crescimento, simbolizando benefícios empresariais.",
      list: [
        "Acesso simplificado a uma vasta rede de instituições financeiras e investidores com uma única solicitação.",
        "Processo de análise de crédito e busca por soluções até 75% mais ágil que os métodos convencionais.",
        "Comparação transparente das melhores taxas, prazos e condições do mercado para crédito e investimentos.",
        "Acompanhamento digital e em tempo real de todas as etapas da sua solicitação.",
        "Consultoria empresarial e financeira especializada para guiar sua empresa ao sucesso.",
        "Plataforma com segurança de nível bancário para proteger suas informações confidenciais."
      ]
    },
    parceiro: {
      title: "Oportunidades Ampliadas para Parceiros",
      icon: Banknote,
      imageAlt: "Mão interagindo com interface gráfica futurista exibindo dados e gráficos de crescimento, simbolizando benefícios para parceiros.",
      list: [
        "Acesso a um portfólio diversificado e qualificado de empresas buscando soluções financeiras.",
        "Redução significativa de custos operacionais na prospecção e análise de novos clientes e projetos.",
        "Ferramentas avançadas de análise de risco e scoring de crédito potencializadas por Inteligência Artificial.",
        "Processo 100% digitalizado, eliminando burocracia e agilizando o fechamento de negócios.",
        "Dashboard intuitivo para gestão completa de propostas, leads e performance de sua carteira.",
        "Expansão da sua capilaridade e alcance no mercado de crédito PME e corporativo."
      ]
    }
  };

  const [activeTab, setActiveTab] = useState('empresa');
  const currentBenefit = benefitsData[activeTab];

  return (
    <section id="beneficios" className="py-20 bg-gradient-to-br from-brand-light-gray/50 via-brand-white to-brand-gold/10 dark:from-brand-black dark:via-brand-light-gray/5 dark:to-brand-dark-gold/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark-gray dark:text-brand-white mb-6">
            Benefícios que <span className="text-gradient-orange">Impulsionam</span> Resultados
          </h2>
          <p className="text-xl text-brand-medium-gray dark:text-brand-light-gray/80 max-w-3xl mx-auto leading-relaxed">
            Descubra como a {companyName} transforma a experiência de crédito e gestão, oferecendo vantagens exclusivas para empresas e parceiros.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="bg-brand-white dark:bg-brand-dark-gray/30 rounded-full p-1.5 shadow-xl flex space-x-1">
            <Button
              onClick={() => setActiveTab('empresa')}
              variant={activeTab === 'empresa' ? 'default' : 'ghost'}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 text-base md:px-8 ${
                activeTab === 'empresa'
                  ? 'bg-gradient-gold-to-orange text-brand-white shadow-lg'
                  : 'text-brand-medium-gray dark:text-brand-light-gray hover:bg-brand-light-gray/50 dark:hover:bg-brand-dark-gray/50 hover:text-brand-dark-gray dark:hover:text-brand-white'
              }`}
              aria-pressed={activeTab === 'empresa'}
            >
              <Building2 className="mr-2 h-5 w-5" /> Para Empresas
            </Button>
            <Button
              onClick={() => setActiveTab('parceiro')}
              variant={activeTab === 'parceiro' ? 'default' : 'ghost'}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 text-base md:px-8 ${
                activeTab === 'parceiro'
                  ? 'bg-gradient-gold-to-orange text-brand-white shadow-lg'
                  : 'text-brand-medium-gray dark:text-brand-light-gray hover:bg-brand-light-gray/50 dark:hover:bg-brand-dark-gray/50 hover:text-brand-dark-gray dark:hover:text-brand-white'
              }`}
              aria-pressed={activeTab === 'parceiro'}
            >
              <Banknote className="mr-2 h-5 w-5" /> Para Parceiros
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid md:grid-cols-2 gap-12 items-center bg-brand-white dark:bg-brand-light-gray/10 p-8 md:p-12 rounded-3xl shadow-2xl border border-brand-gold/20 dark:border-brand-dark-orange/20"
          >
            <div className="order-2 md:order-1">
              <motion.h3 
                className="text-3xl lg:text-4xl font-bold text-brand-dark-gray dark:text-brand-white mb-8 flex items-center"
                initial={{ opacity:0, x: -20}}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <currentBenefit.icon className="w-10 h-10 mr-3 text-transparent bg-clip-text bg-gradient-gold-to-orange" />
                {currentBenefit.title}
              </motion.h3>
              <ul className="space-y-4">
                {currentBenefit.list.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-brand-dark-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-brand-medium-gray dark:text-brand-light-gray/80 text-lg leading-relaxed">{benefit}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div 
              className="relative order-1 md:order-2 aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut"}}
            >
              <img 
                className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-brand-gold/50" 
                alt={currentBenefit.imageAlt}
               src="https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/505821eb132cfca93efa3eb8af516ed4.jpg" />
              <div className="absolute -bottom-6 -right-6 p-4 bg-gradient-to-tr from-brand-gold to-brand-dark-orange text-white rounded-xl shadow-xl text-sm flex items-center">
                {activeTab === 'empresa' ? <TrendingUp className="w-8 h-8 mr-2" /> : <Zap className="w-8 h-8 mr-2" />}
                <div className="font-semibold">
                  {activeTab === 'empresa' ? 'Crescimento Acelerado' : 'Eficiência Máxima'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BenefitsSection;