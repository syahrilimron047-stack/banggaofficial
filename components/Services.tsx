import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'rec',
    title: 'Recording',
    description: 'Perekaman vokal dan instrumen dengan equipment standar industri untuk hasil yang jernih dan berkarakter.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    price: 'Mulai Rp 150k/shift'
  },
  {
    id: 'mix',
    title: 'Mixing',
    description: 'Menyeimbangkan setiap track audio Anda agar terdengar kohesif, powerful, dan siap bersaing di platform digital.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    price: 'Mulai Rp 300k/track'
  },
  {
    id: 'master',
    title: 'Mastering',
    description: 'Sentuhan akhir untuk memastikan audio Anda terdengar konsisten dan optimal di Spotify, YouTube, dan radio.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    price: 'Mulai Rp 200k/lagu'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Layanan Kami</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400">Kualitas profesional untuk musisi independen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group p-8 bg-[#222] rounded-2xl border border-white/5 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/10">
              <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform border border-white/10 group-hover:border-brand-accent">
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-brand-accent font-medium text-sm">{service.price}</span>
                <button className="text-white text-sm hover:text-brand-primary transition-colors">Book Now &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;