import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import StatsSection from '@/components/sections/StatsSection';
/* CtaSection import and usage removed */
/* TestimonialsSection import and usage removed */

const HomePage = () => {
  const companyName = "Balmoral Solução Empresarial";

  return (
    <div className="flex flex-col min-h-screen bg-brand-white dark:bg-brand-black">
      <HeroSection 
        titlePart1="Conectamos Soluções de Crédito e Alta Performance"
        titlePart2="com oportunidades para sua Empresa."
        subtitle={`Na ${companyName}, transformamos desafios financeiros em crescimento estratégico e sustentável. Descubra um universo de possibilidades com nossa plataforma inteligente e consultoria especializada.`}
        primaryActionText="Descubra Nossas Soluções"
        primaryActionLink="/#solucoes"
        secondaryActionText="Agende uma Consultoria"
        secondaryActionLink="/agendar-consultoria"
        imageUrl="https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/474bb375b11a20e82075892ef7071ccd.jpg"
        imageAlt="Globo terrestre estilizado com elementos gráficos financeiros e de conexão, representando a Balmoral Soluções Empresariais conectando oportunidades globais."
      />
      <FeaturesSection companyName={companyName} />
      <BenefitsSection companyName={companyName} />
      <ProcessSection />
      <StatsSection />
      {/* TestimonialsSection removed */}
      {/* CtaSection removed */}
    </div>
  );
};

export default HomePage;