import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import StudioAI from './components/StudioAI';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <Logo className="w-10 h-10" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-300 hover:text-brand-accent font-medium text-sm tracking-wide transition-colors">LAYANAN</a>
            <a href="#studio-ai" className="text-gray-300 hover:text-brand-accent font-medium text-sm tracking-wide transition-colors">STUDIO AI</a>
            <a href="#contact" className="text-gray-300 hover:text-brand-accent font-medium text-sm tracking-wide transition-colors">KONTAK</a>
            <button className="px-5 py-2 border border-brand-accent/50 text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all text-sm font-semibold">
              Booking Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-t border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-brand-accent py-2">LAYANAN</a>
            <a href="#studio-ai" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-brand-accent py-2">STUDIO AI</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-brand-accent py-2">KONTAK</a>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <Hero />
        <Services />
        <StudioAI />

        {/* Contact/Footer Section */}
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Logo className="w-16 h-16 mx-auto mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
                Siap Melahirkan <span className="text-brand-accent">Karya Besar</span>?
              </h2>
              <p className="text-gray-400 mb-10 max-w-xl mx-auto">
                Mari diskusikan visimu bersama BanggaOfficial. Dari akar hingga menjadi pohon yang menjulang.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left max-w-2xl mx-auto bg-[#111] p-8 rounded-2xl border border-white/5">
                <div>
                  <h4 className="text-brand-accent font-bold mb-2 uppercase text-xs tracking-wider">Lokasi</h4>
                  <p className="text-white">Jl. Musik Indonesia No. 1<br/>Jakarta Selatan, Indonesia</p>
                </div>
                <div>
                   <h4 className="text-brand-accent font-bold mb-2 uppercase text-xs tracking-wider">Kontak</h4>
                  <p className="text-white">WhatsApp: +62 812-3456-7890<br/>Email: studio@banggaofficial.com</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 border-t border-white/5 pt-8">
                &copy; {new Date().getFullYear()} BanggaOfficial Home Recording. All Rights Reserved.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;