import React from 'react';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-dark to-[#0f0f0f]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roots_pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 C 10 10, 30 30, 40 20" stroke="#d4a373" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roots_pattern)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <div className="mb-8 animate-fade-in-down">
            <Logo className="w-32 h-32 md:w-48 md:h-48 text-brand-accent" showText={false} />
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-primary to-brand-leaf mb-6">
          BANGGA OFFICIAL
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Tempat di mana karya tumbuh dari akar yang kuat. <br/>
          <span className="text-brand-accent">Professional Home Recording, Mixing & Mastering.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#services" className="px-8 py-4 bg-brand-primary hover:bg-opacity-90 text-white rounded-full font-semibold transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 transform hover:-translate-y-1">
            Lihat Layanan
          </a>
          <a href="#studio-ai" className="px-8 py-4 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark rounded-full font-semibold transition-all">
            Coba Studio AI
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;