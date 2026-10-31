import React from 'react';
import { Scissors, Sparkles, Waves, Calendar, Heart, Leaf, Gem } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const Hero: React.FC = () => {
  const { photos } = useSiteStore();
  return (
    <section id="accueil" className="relative pt-24 sm:pt-28 pb-0 overflow-hidden bg-[#FAF6F0]">
      
      {/* Hero Top Portion: Left Typography + Right Seamless Melted Salon Interior */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-4 lg:pb-8 relative">
        
        {/* Soft decorative blurred pampas & glow elements in background */}
        <div className="absolute -top-10 -left-12 w-80 h-80 bg-[#E8D8C8]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#C4A97D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FAF6F0]/80 rounded-full blur-2xl pointer-events-none z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[460px] lg:min-h-[500px]">
          
          {/* Left Column: Exact Typography from the Mockup */}
          <div className="lg:col-span-5 space-y-5 text-left z-20 py-4">
            <ScrollReveal direction="up" delay={50} duration={800}>
              <div className="space-y-0.5">
                <h1 className="font-serif-title text-3xl sm:text-4xl md:text-[44px] lg:text-[46px] leading-[1.12] tracking-[0.1em] text-[#2C2523] uppercase font-normal">
                  BIEN PLUS QU'UN <br />
                  RENDEZ-VOUS,
                </h1>
                
                <div className="py-0.5">
                  <span className="font-cursive text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] text-[#9E8256] block transform -rotate-1 leading-tight">
                    une parenthèse sensorielle
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-serif-title text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] tracking-[0.14em] text-[#2C2523] uppercase font-normal">
                    RIEN QU'À VOUS.
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl text-[#2C2523] select-none font-light">
                    ♡
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Sub-paragraph matching mockup */}
            <ScrollReveal direction="up" delay={200} duration={800}>
              <p className="text-[13.5px] sm:text-[15px] text-[#5A4E46] leading-relaxed max-w-md font-light">
                Coiffure privée, Head Spa Japonais et rituels bien-être, dans un espace intimiste et élégant, dédié à votre lâcher-prise.
              </p>
            </ScrollReveal>

            {/* Single Action Button matching mockup: DÉCOUVRIR L'UNIVERS > */}
            <ScrollReveal direction="up" delay={350} duration={800}>
              <div className="pt-2">
                <a
                  href="#prestations"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[12px] uppercase tracking-[0.18em] font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>DÉCOUVRIR L'UNIVERS</span>
                  <span className="text-[13px] leading-none">&gt;</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Salon Photo with Melted Feathered Gradient (fondue dégradée) */}
          <div className="lg:col-span-7 relative z-10">
            <ScrollReveal direction="up" delay={250} duration={900}>
              <div className="relative mx-auto w-full aspect-[16/10] overflow-hidden rounded-[2.5rem]">
                
                {/* Main photo with feathered mask on edges */}
                <img
                  src={photos.hero || '/coiffure-espace.jpg'}
                  alt="Espace Coiffure Privée Le Cocon Sensoriel by Chacha"
                  className="w-full h-full object-cover object-center image-melt-hero transform hover:scale-102 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/salon/coiffure-espace.jpg';
                  }}
                />

                {/* Seamless lateral gradient blend into cream background */}
                <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/60 to-transparent pointer-events-none" />
                
                {/* Top and bottom subtle melting fades */}
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FAF6F0]/60 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/40 to-transparent pointer-events-none" />

                {/* Warm foreground candle and dried floral bokeh melting into the scene */}
                <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-gradient-to-tl from-[#FFD8A8]/60 via-[#F3ECE1]/70 to-transparent rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -top-10 right-10 w-40 h-40 bg-gradient-to-b from-[#FAF6F0]/80 to-transparent rounded-full blur-xl pointer-events-none" />

                {/* Ambient warmth */}
                <div className="absolute inset-0 bg-amber-500/5 mix-blend-color pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>

      {/* Sinuous Organic Curved Wave Separator */}
      <div className="relative w-full overflow-hidden leading-none z-10 -mb-1">
        <svg
          viewBox="0 0 1440 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 lg:h-24 object-fill block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,52 C260,18 480,82 780,48 C1080,14 1280,68 1440,38 L1440,85 L0,85 Z"
            fill="#EFE6D8"
          />
        </svg>
      </div>

      {/* 3 Featured Horizontal Cards on Champagne Background (#EFE6D8) with Staggered ScrollReveal */}
      <div className="bg-[#EFE6D8] pt-4 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1480px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            
            {/* ========================================================
                CARD 1: COIFFURE PRIVÉE (Delay 0ms)
                ======================================================== */}
            <ScrollReveal direction="up" delay={0} duration={750} className="h-full">
              <div className="bg-[#FAF6F0] rounded-[2rem] p-4 sm:p-5 shadow-lg border border-[#E8D8C8] flex flex-col sm:flex-row items-center gap-4 sm:gap-5 luxury-card-hover group relative overflow-hidden h-full">
                
                {/* Subtle background botanical watermark */}
                <div className="absolute right-0 top-0 bottom-0 w-28 opacity-[0.06] pointer-events-none flex items-center justify-center">
                  <Scissors className="w-40 h-40 text-[#9E8256]" />
                </div>

                {/* Left: Photo with Melted Gradient on right side */}
                <div className="w-full sm:w-[46%] h-56 sm:h-full min-h-[220px] rounded-2xl overflow-hidden shrink-0 bg-[#F3ECE1] relative">
                  <img
                    src={photos.heroCardCoiffure || '/coiffure-station.jpg'}
                    alt="Coiffure Privée"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 image-melt-card-horizontal"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/salon/coiffure-station.jpg';
                    }}
                  />
                  <div className="hidden sm:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent via-[#FAF6F0]/60 to-[#FAF6F0] pointer-events-none" />
                  <div className="sm:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
                </div>

                {/* Right: Content centered */}
                <div className="w-full sm:w-[54%] flex flex-col items-center text-center justify-between py-1 space-y-3 z-10">
                  <div className="w-12 h-12 rounded-full border border-[#9E8256]/60 flex items-center justify-center text-[#9E8256] bg-[#FAF6F0]/80">
                    <Scissors className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif-title text-[20px] sm:text-[22px] uppercase tracking-[0.14em] text-[#2C2523] font-normal leading-tight">
                    COIFFURE<br />PRIVÉE
                  </h3>

                  <p className="text-[12px] sm:text-[12.5px] text-[#5A4E46] leading-relaxed font-light">
                    Des prestations sur-mesure dans un cadre intimiste, pour sublimer vos cheveux en toute sérénité.
                  </p>

                  <div className="w-full pt-1">
                    <a
                      href="#coiffure"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[10.5px] uppercase tracking-[0.14em] font-semibold transition-all duration-300 w-full shadow-sm"
                    >
                      <span>VOIR LES PRESTATIONS</span>
                      <span className="text-[12px]">&gt;</span>
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>


            {/* ========================================================
                CARD 2: HEAD SPA JAPONAIS (Delay 150ms)
                ======================================================== */}
            <ScrollReveal direction="up" delay={150} duration={750} className="h-full">
              <div className="bg-[#FAF6F0] rounded-[2rem] p-4 sm:p-5 shadow-lg border border-[#E8D8C8] flex flex-col sm:flex-row items-center gap-4 sm:gap-5 luxury-card-hover group relative overflow-hidden h-full">
                
                {/* Subtle background botanical watermark */}
                <div className="absolute right-0 top-0 bottom-0 w-28 opacity-[0.06] pointer-events-none flex items-center justify-center">
                  <Sparkles className="w-40 h-40 text-[#9E8256]" />
                </div>

                {/* Left: Photo with Melted Gradient on right side */}
                <div className="w-full sm:w-[46%] h-56 sm:h-full min-h-[220px] rounded-2xl overflow-hidden shrink-0 bg-[#F3ECE1] relative">
                  <img
                    src={photos.heroCardHeadSpa || '/head-spa-basin.jpg'}
                    alt="Head Spa Japonais"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 image-melt-card-horizontal"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/salon/head-spa-basin.jpg';
                    }}
                  />
                  <div className="hidden sm:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent via-[#FAF6F0]/60 to-[#FAF6F0] pointer-events-none" />
                  <div className="sm:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
                </div>

                {/* Right: Content centered */}
                <div className="w-full sm:w-[54%] flex flex-col items-center text-center justify-between py-1 space-y-3 z-10">
                  <div className="w-12 h-12 rounded-full border border-[#9E8256]/60 flex items-center justify-center text-[#9E8256] bg-[#FAF6F0]/80">
                    <Sparkles className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif-title text-[20px] sm:text-[22px] uppercase tracking-[0.14em] text-[#2C2523] font-normal leading-tight">
                    HEAD SPA<br />JAPONAIS
                  </h3>

                  <p className="text-[12px] sm:text-[12.5px] text-[#5A4E46] leading-relaxed font-light">
                    Une expérience unique qui allie soin, relaxation et éveil des sens, pour un lâcher-prise total.
                  </p>

                  <div className="w-full pt-1">
                    <a
                      href="#head-spa"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[10.5px] uppercase tracking-[0.14em] font-semibold transition-all duration-300 w-full shadow-sm"
                    >
                      <span>DÉCOUVRIR LE HEAD SPA</span>
                      <span className="text-[12px]">&gt;</span>
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>


            {/* ========================================================
                CARD 3: RITUELS BIEN-ÊTRE (Delay 300ms)
                ======================================================== */}
            <ScrollReveal direction="up" delay={300} duration={750} className="h-full">
              <div className="bg-[#FAF6F0] rounded-[2rem] p-4 sm:p-5 shadow-lg border border-[#E8D8C8] flex flex-col sm:flex-row items-center gap-4 sm:gap-5 luxury-card-hover group relative overflow-hidden h-full">
                
                {/* Subtle background botanical watermark */}
                <div className="absolute right-0 top-0 bottom-0 w-28 opacity-[0.06] pointer-events-none flex items-center justify-center">
                  <Waves className="w-40 h-40 text-[#9E8256]" />
                </div>

                {/* Left: Photo with Melted Gradient on right side */}
                <div className="w-full sm:w-[46%] h-56 sm:h-full min-h-[220px] rounded-2xl overflow-hidden shrink-0 bg-[#F3ECE1] relative">
                  <img
                    src={photos.heroCardRituels || '/candles-rituels.jpg'}
                    alt="Rituels Bien-Être"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 image-melt-card-horizontal"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/salon/candles-rituels.jpg';
                    }}
                  />
                  <div className="hidden sm:block absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent via-[#FAF6F0]/60 to-[#FAF6F0] pointer-events-none" />
                  <div className="sm:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
                </div>

                {/* Right: Content centered */}
                <div className="w-full sm:w-[54%] flex flex-col items-center text-center justify-between py-1 space-y-3 z-10">
                  <div className="w-12 h-12 rounded-full border border-[#9E8256]/60 flex items-center justify-center text-[#9E8256] bg-[#FAF6F0]/80">
                    <Waves className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif-title text-[20px] sm:text-[22px] uppercase tracking-[0.14em] text-[#2C2523] font-normal leading-tight">
                    RITUELS<br />BIEN-ÊTRE
                  </h3>

                  <p className="text-[12px] sm:text-[12.5px] text-[#5A4E46] leading-relaxed font-light">
                    Des modelages et soins sensoriels pour vous offrir un moment de douceur, de détente et de reconnexion à vous-même.
                  </p>

                  <div className="w-full pt-1">
                    <a
                      href="#rituels"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[10.5px] uppercase tracking-[0.14em] font-semibold transition-all duration-300 w-full shadow-sm"
                    >
                      <span>DÉCOUVRIR LES RITUELS</span>
                      <span className="text-[12px]">&gt;</span>
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>

      {/* Bandeau de Réassurance */}
      <ScrollReveal direction="up" delay={100} duration={700}>
        <div className="bg-[#FAF6F0] border-t border-b border-[#E8D8C8] py-5 sm:py-6">
          <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[#E8D8C8]">
              
              {/* 1. ESPACE PRIVATIF */}
              <div className="flex items-center justify-center gap-3 px-3 py-2 sm:py-0">
                <Sparkles className="w-5 h-5 text-[#2C2523] stroke-[1.2]" />
                <span className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] text-[#2C2523] font-medium text-center">
                  ESPACE PRIVATIF
                </span>
              </div>

              {/* 2. UNIQUEMENT SUR RENDEZ-VOUS */}
              <div className="flex items-center justify-center gap-3 px-3 py-2 sm:py-0">
                <Calendar className="w-5 h-5 text-[#2C2523] stroke-[1.2]" />
                <span className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] text-[#2C2523] font-medium text-center">
                  UNIQUEMENT SUR RENDEZ-VOUS
                </span>
              </div>

              {/* 3. MOMENT SUSPENDU */}
              <div className="flex items-center justify-center gap-3 px-3 py-2 sm:py-0">
                <Heart className="w-5 h-5 text-[#2C2523] stroke-[1.2]" />
                <span className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] text-[#2C2523] font-medium text-center">
                  MOMENT SUSPENDU
                </span>
              </div>

              {/* 4. PRODUITS NATURELS */}
              <div className="flex items-center justify-center gap-3 px-3 py-2 sm:py-0">
                <Leaf className="w-5 h-5 text-[#2C2523] stroke-[1.2]" />
                <span className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] text-[#2C2523] font-medium text-center">
                  PRODUITS NATURELS
                </span>
              </div>

              {/* 5. UNE BULLE DE DOUCEUR */}
              <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-3 px-3 py-2 sm:py-0">
                <Gem className="w-5 h-5 text-[#2C2523] stroke-[1.2]" />
                <span className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] text-[#2C2523] font-medium text-center">
                  UNE BULLE DE DOUCEUR
                </span>
              </div>

            </div>
          </div>
        </div>
      </ScrollReveal>

    </section>
  );
};
