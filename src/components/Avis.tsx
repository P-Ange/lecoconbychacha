import React from 'react';
import { Star, Heart, Sparkles, Quote } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';

export const Avis: React.FC = () => {
  const reviews = [
    {
      author: 'Émilie B.',
      service: 'Head Spa Japonais & Modelage',
      rating: 5,
      date: 'Il y a 2 semaines',
      comment:
        "Une parenthèse hors du temps ! Charlène est d'une douceur et d'une bienveillance incroyables. Le rituel Head Spa avec l'eau tiède et le massage crânien est une merveille absolue, je n'avais jamais ressenti une telle détente. Merci Chacha pour cette bulle magique !",
    },
    {
      author: 'Laura M.',
      service: 'Coiffure Privée & Soin',
      rating: 5,
      date: 'Il y a 1 mois',
      comment:
        "Le cadre privatif change absolument tout : aucun bruit, pas de va-et-vient, juste un moment rien que pour soi. Charlène prend vraiment le temps d'écouter et de conseiller avec une grande expertise. Mes cheveux n'ont jamais été aussi beaux.",
    },
    {
      author: 'Sophie D.',
      service: 'Offre Évasion Sensorielle',
      rating: 5,
      date: 'Il y a 3 semaines',
      comment:
        "J'ai testé l'Offre Évasion (massage corps + Head Spa) et c'était tout simplement divin. L'ambiance tamisée aux bougies, les parfums subtils, la délicatesse des gestes... On repart ressourcée avec une vraie sensation de légèreté.",
    },
    {
      author: 'Marine T.',
      service: 'Forfait Mariée',
      rating: 5,
      date: 'Il y a 2 mois',
      comment:
        "Charlène s'est occupée de ma coiffure de mariée. Dès le premier essai, elle a su comprendre exactement ce que je souhaitais. Le Jour J, la coiffure a tenu jusqu'au bout de la nuit tout en restant naturelle et élégante. Une professionnelle d'exception !",
    },
  ];

  return (
    <section id="avis" className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Subtle decorative glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#E8D8C8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F3ECE1] border border-[#B5986B]/40 text-[#9E8256] text-[11px] uppercase tracking-[0.2em] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Témoignages &amp; Douceur</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-normal">
              Ce que disent mes clientes
            </h2>

            <div className="flex items-center justify-center gap-1 pt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#9E8256] fill-[#9E8256]" />
              ))}
              <span className="text-[13px] font-semibold text-[#2C2523] ml-2">5,0 / 5</span>
              <span className="text-[12px] text-[#5A4E46]/80 ml-1">sur Planity</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 120} duration={800} className="h-full">
              <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-7 border border-[#E8D8C8] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#9E8256] fill-[#9E8256]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#5A4E46]/70 italic">{rev.date}</span>
                  </div>

                  <p className="text-[13.5px] sm:text-[14px] text-[#5A4E46] leading-relaxed italic font-light">
                    « {rev.comment} »
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8D8C8]/60 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif-title text-base font-semibold text-[#2C2523]">
                      {rev.author}
                    </h3>
                    <span className="text-[11px] text-[#9E8256] uppercase tracking-wider block">
                      {rev.service}
                    </span>
                  </div>
                  <Heart className="w-4 h-4 text-[#B5986B] fill-[#B5986B]/20" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Planity link reminder */}
        <ScrollReveal direction="up" delay={200} duration={800}>
          <div className="text-center pt-10">
            <a
              href={SALON_INFO.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[#9E8256] hover:text-[#8A6F44] font-semibold border-b border-[#9E8256]/50 pb-0.5"
            >
              <span>Lire tous les avis sur la page Planity</span>
              <span className="text-[14px]">&gt;</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
