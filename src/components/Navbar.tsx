import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['accueil', 'prestations', 'tarifs', 'a-propos', 'avis', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ACCUEIL', href: '#accueil', id: 'accueil' },
    { name: 'PRESTATIONS', href: '#prestations', id: 'prestations' },
    { name: 'TARIFS', href: '#tarifs', id: 'tarifs' },
    { name: 'À PROPOS', href: '#a-propos', id: 'a-propos' },
    { name: 'AVIS', href: '#avis', id: 'avis' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-sm border-b border-[#E8D8C8]/70 py-3'
          : 'bg-[#FAF6F0]/85 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          
          {/* Logo & Identity matching exact mockup typography */}
          <a
            href="#accueil"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Accueil Le Cocon Sensoriel by Chacha"
          >
            {/* Lotus & Scissors Emblem */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#B5986B]/40 shrink-0 bg-[#F3ECE1] flex items-center justify-center shadow-sm">
              <img
                src="/assets/salon/logo-icon.jpg"
                alt="Logo Le Cocon Sensoriel"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.jpg';
                }}
              />
            </div>

            {/* Exact typography matching mockup header */}
            <div className="flex flex-col text-left">
              <span className="font-serif-title text-[15px] sm:text-[17px] tracking-[0.2em] uppercase text-[#2C2523] font-normal leading-tight">
                LE COCON SENSORIEL
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 my-0.5">
                <span className="w-5 h-[1px] bg-[#B5986B]/60 inline-block" />
                <span className="font-cursive text-[18px] sm:text-[20px] text-[#9E8256] leading-none px-0.5">
                  by Chacha
                </span>
                <span className="w-5 h-[1px] bg-[#B5986B]/60 inline-block" />
              </div>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-[#5A4E46]/85 font-medium">
                BEAUTÉ • BIEN-ÊTRE • ÉVEIL DES SENS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (exact links from mockup) */}
          <nav className="hidden xl:flex items-center gap-9" aria-label="Menu principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[12.5px] uppercase tracking-[0.18em] font-medium transition-all duration-200 py-1 relative ${
                    isActive
                      ? 'text-[#2C2523] font-semibold'
                      : 'text-[#2C2523]/75 hover:text-[#9E8256]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#2C2523]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Booking CTA Button (Desktop - exact pill styling from mockup) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={SALON_INFO.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[12px] uppercase tracking-[0.16em] font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {/* Calendar with grid dots matching mockup */}
              <div className="relative">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span>RÉSERVER</span>
              <span className="text-[13px] leading-none">&gt;</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2.5">
            <a
              href={SALON_INFO.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9E8256] text-white text-[11px] uppercase tracking-wider font-semibold shadow-sm sm:hidden"
              aria-label="Réserver sur Planity"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver</span>
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-xl text-[#2C2523] hover:text-[#9E8256] hover:bg-[#F3ECE1] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF6F0] border-b border-[#E8D8C8] px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <p className="text-[11px] uppercase tracking-widest text-[#9E8256] font-semibold text-center mb-3">
            ✦ BEAUTÉ • BIEN-ÊTRE • ÉVEIL DES SENS ✦
          </p>
          <div className="flex flex-col space-y-2 divide-y divide-[#E8D8C8]/50">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[13.5px] uppercase tracking-[0.16em] pt-2.5 flex items-center justify-between font-medium ${
                  activeSection === link.id ? 'text-[#9E8256] font-bold' : 'text-[#2C2523]'
                }`}
              >
                <span>{link.name}</span>
                <span className="text-[#B5986B]">&gt;</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E8D8C8]">
            <a
              href={SALON_INFO.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#9E8256] text-white text-[12px] uppercase tracking-widest font-semibold shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>RÉSERVER SUR PLANITY</span>
              <span>&gt;</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
