import React from 'react';
import { Clock, Sparkles, Heart, Waves, Wind, Calendar, Check, Edit3 } from 'lucide-react';
import { SALON_INFO, calculateDiscount, getBookingUrl } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const OffreDuMoment: React.FC = () => {
  const { novelty, photos, isAdmin } = useSiteStore();
  const photoSrc = novelty.photo || photos.exclusiveOffer || '/offre-evasion.jpg';
  const { savings } = calculateDiscount(novelty.originalPrice, novelty.discountedPrice);

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Heart className="w-5 h-5 fill-[#9E8256]/20" />;
      case 1:
        return <Waves className="w-5 h-5" />;
      default:
        return <Wind className="w-5 h-5" />;
    }
  };

  return (
    <section id="offre" className="py-20 bg-gradient-to-b from-[#FAF6F0] via-[#F3ECE1] to-[#FAF6F0] relative overflow-hidden">
      
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B5986B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sur-titre d'annonce */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8D8C8] text-[#9E8256] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] shadow-sm">
              {novelty.badge || "✨ Exclusivité & Nouveauté ✨"}
            </span>
            <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-[#5A4E46] font-medium leading-relaxed">
              {novelty.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Luxury Card with Golden Border and Melted Visual */}
        <ScrollReveal direction="up" delay={150} duration={850}>
          <div className="bg-[#FAF6F0] rounded-[2.5rem] border-2 border-[#B5986B]/40 shadow-2xl overflow-hidden luxury-card-hover relative">
            
            {/* Quick admin edit shortcut when logged in */}
            {isAdmin && (
              <div className="absolute top-4 right-4 z-30">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open_admin_modal', { detail: { tab: 'novelty' } }))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[11px] font-semibold shadow-md transition-all cursor-pointer"
                  title="Modifier la photo et le texte de cette offre"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modifier la photo &amp; l'offre</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Visual Column with melted gradient */}
              <div className="lg:col-span-5 relative bg-[#EFE6D8] min-h-[380px] lg:min-h-full overflow-hidden">
                <img
                  src={photoSrc}
                  alt={novelty.title}
                  className="w-full h-full object-cover object-center image-melt-card-horizontal"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/salon/offre-evasion.jpg';
                  }}
                />
                {/* Soft melt overlay into right content area */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent via-[#FAF6F0]/70 to-[#FAF6F0] pointer-events-none" />
                <div className="lg:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
                
                {/* Floating duration badge */}
                <div className="absolute top-5 left-5 bg-[#FAF6F0]/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#B5986B]/50 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#9E8256]" />
                    <span className="text-[12px] uppercase tracking-wider text-[#2C2523] font-semibold">
                      {novelty.durationBadge || "Durée 2h+"}
                    </span>
                  </div>
                </div>

                {/* Savings pill badge */}
                {savings > 0 && (
                  <div className="absolute bottom-5 right-5 bg-gradient-to-r from-[#9E8256] to-[#B5986B] text-white px-4 py-2 rounded-2xl shadow-lg border border-white/30 text-center">
                    <span className="text-[10px] uppercase tracking-widest block font-medium">Économisez</span>
                    <span className="text-[16px] font-bold leading-none">{savings} €</span>
                  </div>
                )}
              </div>

              {/* Details Column */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
                
                <div className="space-y-4">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="font-serif-title text-3xl sm:text-4xl text-[#2C2523] uppercase tracking-[0.08em] font-bold">
                      {novelty.title}
                    </h3>
                    <p className="font-cursive text-2xl sm:text-3xl text-[#9E8256]">
                      {novelty.subtitle}
                    </p>
                  </div>

                  {/* Accroche */}
                  {novelty.quote && (
                    <p className="text-[14px] sm:text-[15px] text-[#5A4E46] leading-relaxed italic font-light border-l-2 border-[#B5986B] pl-4">
                      {novelty.quote}
                    </p>
                  )}

                  {/* Steps Details */}
                  <div className="space-y-3.5 pt-2">
                    {novelty.services.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F6EFE5] border border-[#E8D8C8]">
                        <div className="w-11 h-11 rounded-full bg-[#FAF6F0] border border-[#B5986B]/40 flex items-center justify-center text-[#9E8256] shrink-0 shadow-sm mt-0.5">
                          {getStepIcon(idx)}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-[12px] font-bold text-[#9E8256] uppercase tracking-wider">{step.duration}</span>
                            <h4 className="font-serif-title text-base sm:text-lg text-[#2C2523] font-semibold">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-[13px] text-[#5A4E46] mt-0.5 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Badge Durée */}
                  <div className="pt-2 text-center sm:text-left">
                    <span className="inline-flex items-center gap-2 font-cursive text-2xl sm:text-3xl text-[#9E8256]">
                      {novelty.durationText}
                    </span>
                  </div>

                </div>

                {/* Pricing & Booking Action */}
                <div className="pt-6 border-t border-[#E8D8C8] space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif-title text-4xl sm:text-5xl font-bold text-[#2C2523]">
                          {novelty.discountedPrice} €
                        </span>
                        {novelty.originalPrice > novelty.discountedPrice && (
                          <span className="text-xl sm:text-2xl text-[#5A4E46]/60 line-through font-light">
                            {novelty.originalPrice} €
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] uppercase tracking-wider text-[#9E8256] font-semibold mt-1">
                        Tarif Privilège découverte
                      </p>
                    </div>

                    <a
                      href={getBookingUrl('offre_evasion_sensorielle')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] hover:from-[#8A6F44] hover:to-[#A38659] text-white text-[13px] uppercase tracking-[0.16em] font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>RÉSERVER CE RITUEL</span>
                      <span className="text-sm">&gt;</span>
                    </a>
                  </div>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#5A4E46] font-medium">
                      {novelty.genderNotice}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
