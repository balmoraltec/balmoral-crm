import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Banknote, DollarSign, CheckCircle } from 'lucide-react';

const statsData = [
  { icon: Building2, label: "Empresas Atendidas", value: "1.200+", color: "text-brand-dark-orange", bgColor: "bg-brand-dark-orange/10" },
  { icon: Banknote, label: "Parceiros Estratégicos", value: "30+", color: "text-brand-gold", bgColor: "bg-brand-gold/10" },
  { icon: DollarSign, label: "Capital Facilitado", value: "R$ 1.5Bi", color: "text-brand-dark-gray dark:text-brand-light-gray", bgColor: "bg-brand-medium-gray/10 dark:bg-brand-light-gray/10" },
  { icon: CheckCircle, label: "Taxa de Sucesso", value: "92%", color: "text-green-600", bgColor: "bg-green-600/10" }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-brand-white dark:bg-brand-light-gray/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-brand-light-gray/50 dark:bg-brand-dark-gray/10 shadow-lg card-hover"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-brand-dark-gray dark:text-brand-white mb-2">{stat.value}</div>
              <div className="text-brand-medium-gray dark:text-brand-light-gray/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;