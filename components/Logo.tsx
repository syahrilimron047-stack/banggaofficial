import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative text-brand-accent">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current" xmlns="http://www.w3.org/2000/svg">
          {/* Abstract Roots Intertwining to form a vague 'B' shape */}
          <path d="M50 95C50 95 45 80 30 70C15 60 10 40 20 25C25 18 35 15 45 20C40 25 35 35 40 45C45 55 55 50 60 40C65 30 60 15 50 10C65 10 80 20 85 40C90 60 70 70 60 75C55 77.5 52 85 50 95Z" fillOpacity="0.8" />
          <path d="M50 95C52 85 55 80 65 75C75 70 85 60 80 40C78 30 70 25 60 28C65 22 70 15 60 10C55 8 45 8 40 12C30 20 25 40 35 55C40 62 48 65 50 70C52 75 50 95 50 95Z" className="text-brand-primary" fill="currentColor" />
          {/* Small root tendrils */}
          <path d="M30 70C25 75 15 78 5 75" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M65 75C75 80 85 82 95 78" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M40 45C30 45 20 50 15 60" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl tracking-wider text-brand-accent leading-none">
            BANGGA
          </span>
          <span className="font-sans text-[0.6rem] tracking-[0.3em] text-gray-400 uppercase">
            Official Studio
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;