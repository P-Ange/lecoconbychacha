import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';

export const FloatingBookingButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling past the initial hero
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside className="fixed bottom-5 right-4 z-40 sm:hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
      <a
        href={SALON_INFO.planityUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#9E8256] via-[#B5986B] to-[#9E8256] text-white text-[11px] uppercase tracking-wider font-bold shadow-2xl border border-white/40 transform active:scale-95 transition-transform"
        aria-label="Réserver un rendez-vous sur Planity"
      >
        <Calendar className="w-3.5 h-3.5 text-white" />
        <span>Réserver</span>
      </a>
    </aside>
  );
};
