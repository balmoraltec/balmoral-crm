import React from 'react';
import { Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = ({ companyName }) => {

  const handleSocialClick = (platformUrl, platformName) => {
    if (platformUrl) {
      window.open(platformUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: `🚧 ${platformName}`,
        description: `Link para ${platformName} de ${companyName} ainda não configurado.`,
        duration: 3000,
      });
    }
  };
  
  const handleLinkClick = (linkName) => {
     toast({
      title: "🚧 Página em desenvolvimento",
      description: `A página "${linkName}" para ${companyName} ainda não foi implementada. Você pode solicitar no próximo prompt! 🚀`,
      duration: 3000,
    });
  }

  const footerLinks = [
    {
      title: "Soluções",
      links: [
        { label: "Para Empresas", action: () => handleLinkClick("Soluções para Empresas") },
        { label: "Para Bancos", action: () => handleLinkClick("Soluções para Bancos") },
        { label: "API Integração", action: () => handleLinkClick("API Integração") },
        { label: "Consultoria Financeira", action: () => handleLinkClick("Consultoria Financeira") }
      ]
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre Nós", href: "/#sobre" },
        { label: "Carreiras", action: () => handleLinkClick("Carreiras") },
        { label: "Imprensa", action: () => handleLinkClick("Imprensa") },
        { label: "Termos de Uso", action: () => handleLinkClick("Termos de Uso") },
        { label: "Política de Privacidade", action: () => handleLinkClick("Política de Privacidade") }
      ]
    },
     {
      title: "Recursos",
      links: [
        { label: "Blog", action: () => handleLinkClick("Blog") },
        { label: "FAQs", action: () => handleLinkClick("FAQs") },
        { label: "Suporte", action: () => handleLinkClick("Suporte") },
        { label: "Glossário Financeiro", action: () => handleLinkClick("Glossário") }
      ]
    }
  ];

  const socialMedia = [
    { icon: Linkedin, label: "LinkedIn", action: () => handleSocialClick("https://br.linkedin.com/company/balmoral-solu%C3%A7%C3%A3o-empresarial", "LinkedIn") },
    { icon: Instagram, label: "Instagram", action: () => handleSocialClick("https://www.instagram.com/balmoralsolucaoempresarial/", "Instagram") }
  ];
  
  const logoFooterUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/74d44c45-92db-4dc5-afbf-4f74502d621e/bdacf6172b89ad8ebbc131d9d8620fd4.jpg";


  return (
    <footer id="contato" className="bg-brand-dark-gray text-brand-light-gray dark:bg-brand-black dark:text-brand-medium-gray py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 xl:gap-16">
          <div className="lg:col-span-4 md:col-span-1">
            <a href="/" className="flex items-center space-x-3 mb-6 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-brand-dark-gray dark:focus:ring-offset-brand-black focus:ring-brand-dark-orange rounded-lg w-fit" aria-label={`Página inicial da ${companyName}`}>
               <img src={logoFooterUrl} alt={`Logo ${companyName}`} className="h-10 sm:h-12 w-auto" />
            </a>
            <p className="text-brand-medium-gray dark:text-brand-light-gray mb-6 leading-relaxed text-sm sm:text-base">
              Conectando empresas a oportunidades de crédito com inteligência e agilidade. Simplificamos o complexo, impulsionamos o seu crescimento.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialMedia.map(social => (
                <button 
                  key={social.label}
                  onClick={social.action}
                  aria-label={`Visite nosso ${social.label}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-brand-medium-gray/30 dark:bg-brand-light-gray/30 rounded-full flex items-center justify-center text-brand-white hover:bg-brand-dark-orange dark:hover:bg-brand-gold hover:text-brand-white dark:hover:text-brand-black transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark-gray dark:focus:ring-offset-brand-black focus:ring-brand-dark-orange"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ))}
            </div>
          </div>

          {footerLinks.map(section => (
            <div key={section.title} className="lg:col-span-2 md:col-span-1">
              <span className="text-base sm:text-lg font-semibold text-brand-white dark:text-brand-gold mb-4 sm:mb-6 block">{section.title}</span>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map(link => (
                  <li key={link.label}>
                    {link.href ? (
                       <a href={link.href} className="text-sm sm:text-base text-brand-light-gray dark:text-brand-medium-gray hover:text-brand-white dark:hover:text-brand-gold hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-brand-dark-gray dark:focus:ring-offset-brand-black focus:ring-brand-dark-orange rounded-sm">
                        {link.label}
                       </a>
                    ) : (
                      <button onClick={link.action} className="text-sm sm:text-base text-brand-light-gray dark:text-brand-medium-gray hover:text-brand-white dark:hover:text-brand-gold hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-brand-dark-gray dark:focus:ring-offset-brand-black focus:ring-brand-dark-orange rounded-sm text-left">
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="lg:col-span-4 md:col-span-2">
            <span className="text-base sm:text-lg font-semibold text-brand-white dark:text-brand-gold mb-4 sm:mb-6 block">Fale Conosco</span>
            <address className="not-italic space-y-3 sm:space-y-4 text-sm sm:text-base">
              <a href="tel:+5511970935551" className="flex items-center space-x-2 sm:space-x-3 text-brand-light-gray dark:text-brand-medium-gray hover:text-brand-white dark:hover:text-brand-gold transition-colors group focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-brand-dark-gray dark:focus:ring-offset-brand-black focus:ring-brand-dark-orange rounded-sm">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark-orange dark:text-brand-gold group-hover:opacity-80 transition-colors" />
                <span>(11) 97093-5551</span>
              </a>
              <a href={`mailto:contato@${companyName.toLowerCase().replace(/\s/g, '')}.com.br`} className="flex items-center space-x-2 sm:space-x-3 text-brand-light-gray dark:text-brand-medium-gray hover:text-brand-white dark:hover:text-brand-gold transition-colors group focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-brand-dark-gray dark:focus:ring-offset-brand-black focus:ring-brand-dark-orange rounded-sm">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark-orange dark:text-brand-gold group-hover:opacity-80 transition-colors" />
                <span>contato@{companyName.toLowerCase().replace(/\s/g, '')}.com.br</span>
              </a>
              <div className="flex items-start space-x-2 sm:space-x-3 text-brand-light-gray dark:text-brand-medium-gray">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-dark-orange dark:text-brand-gold mt-0.5 sm:mt-1 flex-shrink-0" />
                <span>Rua Regente Feijó<br />Piracicaba - São Paulo</span>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-brand-medium-gray/50 dark:border-brand-dark-gray/50 mt-10 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-xs sm:text-sm text-brand-medium-gray dark:text-brand-light-gray/70">
            © {new Date().getFullYear()} {companyName} Ltda. Todos os direitos reservados. CNPJ: 36.923.299/0001-01.
          </p>
          <p className="text-xs text-brand-medium-gray/80 dark:text-brand-light-gray/50 mt-1 sm:mt-2">
            A {companyName} é uma plataforma de intermediação de crédito e não uma instituição financeira. Atuamos como correspondente bancário seguindo as diretrizes do Banco Central do Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;