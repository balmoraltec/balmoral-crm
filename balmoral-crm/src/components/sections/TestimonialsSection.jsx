import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = ({ companyName }) => {
  const testimonials = [
  {
    name: "Marcos Oliveira",
    title: "Diretor, Alpha Indústria",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    quote: `A ${companyName} foi fundamental para reestruturarmos nosso financeiro. O processo de obtenção de crédito foi surpreendentemente ágil e as condições, imbatíveis. Recomendo!`,
    rating: 5,
  },
  {
    name: "Beatriz Santos",
    title: "Gerente de Compras, Beta Comércio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    quote: `Plataforma excelente e um atendimento que realmente entende as necessidades da empresa. A ${companyName} nos ajudou a otimizar nosso fluxo de caixa. Indico de olhos fechados!`,
    rating: 5,
  },
  {
    name: "Ricardo Almeida",
    title: "Sócio-fundador, Gamma Serviços",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    quote: `Com a ${companyName}, conseguimos o capital necessário para expandir nossas operações. Todo o processo foi transparente e muito profissional. Parceria de sucesso!`,
    rating: 4,
  },
];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="depoimentos" className="py-20 bg-brand-white dark:bg-brand-light-gray/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-brand-dark-gray dark:text-brand-white mb-6">
            O que Nossos Clientes <span className="text-gradient-orange">Dizem</span>
          </h2>
          <p className="text-xl text-brand-medium-gray dark:text-brand-light-gray/80 max-w-3xl mx-auto leading-relaxed">
            Empresas de todos os portes confiam na {companyName} para impulsionar seu crescimento. Veja algumas histórias de sucesso.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-brand-light-gray/30 to-brand-white dark:from-brand-dark-gray/20 dark:to-brand-light-gray/10 rounded-2xl overflow-hidden border border-brand-gold/20 dark:border-brand-dark-orange/20">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <Quote className="w-10 h-10 text-brand-dark-orange dark:text-brand-gold mb-6 opacity-50" />
                  <p className="text-brand-medium-gray dark:text-brand-light-gray/80 italic leading-relaxed mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-auto">
                    <div className="flex items-center mb-3">
                      <Avatar className="h-14 w-14 mr-4 border-2 border-brand-dark-orange dark:border-brand-gold shadow-md">
                        <AvatarImage src={testimonial.image} alt={`Foto de ${testimonial.name}`} />
                        <AvatarFallback className="bg-brand-dark-orange text-brand-white dark:bg-brand-gold dark:text-brand-black font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-lg text-brand-dark-gray dark:text-brand-white">{testimonial.name}</p>
                        <p className="text-sm text-brand-dark-orange dark:text-brand-gold font-medium">{testimonial.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-brand-medium-gray/50 dark:text-brand-light-gray/30'
                          }`}
                        />
                      ))}
                       <span className="ml-2 text-sm text-brand-medium-gray dark:text-brand-light-gray/70">({testimonial.rating}.0 de 5 estrelas)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;