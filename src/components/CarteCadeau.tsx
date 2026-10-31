import React, { useState } from 'react';
import { Gift, Sparkles, Mail, Store, Heart, CheckCircle2, ZoomIn, X, ExternalLink } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const CarteCadeau: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { photos } = useSiteStore();
  const voucherSrc = photos.carteCadeau || '/carte-cadeau.jpg';

  return (
    <section id="carte-cadeau" className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Decorative ambient elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#E8D8C8]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C4A97D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-[#FAF6F0] rounded-[2.5rem] border border-[#E8D8C8] p-6 sm:p-10 lg:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text & Offers */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="up" delay={50} duration={800} className="space-y-6">
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#9E8256] font-semibold border-b border-[#B5986B]/30 pb-1">
                  <Gift className="w-4 h-4" />
                  Le Cadeau Idéal
                </span>
                <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.08em] text-[#2C2523] font-semibold">
                  Offrez une parenthèse de bien-être ✨
                </h2>
              </div>

              {/* Emotional introduction */}
              <div className="space-y-3 text-[15px] sm:text-[16px] text-[#5A4E46] leading-relaxed font-light">
                <p className="italic text-lg text-[#2C2523] font-normal border-l-2 border-[#9E8256] pl-4">
                  « Parce que les plus beaux cadeaux ne sont pas toujours ceux que l'on déballe, mais ceux que l'on ressent… »
                </p>
                <p>
                  Au Cocon Sensoriel by Chacha, offre à ceux que tu aimes un moment privilégié, une véritable invitation à ralentir et à prendre soin de soi.
                </p>
              </div>

              {/* Tagline prestations */}
              <div className="py-1">
                <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.16em] text-[#9E8256] font-semibold bg-[#F3ECE1] py-2 px-4 rounded-xl inline-block border border-[#B5986B]/30">
                  Head Spa japonais • Massages bien-être • Rituels sensoriels • Coiffure privée
                </p>
              </div>

              {/* Deux façons de faire plaisir */}
              <div className="bg-[#F8F4ED] rounded-2xl p-5 border border-[#E8D8C8] space-y-4">
                <div className="flex items-center gap-2 text-[#2C2523] font-semibold text-[15px]">
                  <span className="text-xl">🎁</span>
                  <span>Deux façons de faire plaisir :</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Way 1: Salon */}
                  <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-[#9E8256] font-medium text-[13px]">
                      <Store className="w-4 h-4" />
                      <span>Au salon</span>
                    </div>
                    <p className="text-[13px] text-[#5A4E46] leading-relaxed">
                      Une jolie carte cadeau à offrir, présentée dans son écrin délicat et son emballage soigné au salon.
                    </p>
                  </div>

                  {/* Way 2: En ligne Planity */}
                  <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8D8C8] space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-[#9E8256] font-medium text-[13px]">
                      <Mail className="w-4 h-4" />
                      <span>En ligne 24h/24 &amp; 7j/7</span>
                    </div>
                    <p className="text-[13px] text-[#5A4E46] leading-relaxed">
                      Disponible sur Planity, reçue immédiatement par e-mail et prête à imprimer chez vous.
                    </p>
                  </div>

                </div>

                <p className="font-cursive text-xl sm:text-2xl text-[#9E8256] text-center pt-1">
                  Un cadeau unique, pour un instant rien qu'à soi.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href={SALON_INFO.planityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#9E8256] via-[#B5986B] to-[#9E8256] text-white text-[13px] uppercase tracking-[0.16em] font-semibold shadow-md hover:shadow-xl hover:from-[#8A6F44] hover:to-[#A38659] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Gift className="w-4 h-4 text-white" />
                  <span>OFFRIR UNE CARTE CADEAU</span>
                  <span className="text-[14px]">&gt;</span>
                </a>
              </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Exact Voucher Visual Provided by User */}
            <div className="lg:col-span-6">
              <ScrollReveal direction="up" delay={180} duration={850}>
                <div className="relative group">
                  
                  {/* Backlit gold aura */}
                  <div className="absolute inset-0 bg-[#B5986B]/20 rounded-3xl blur-xl transform scale-95" />

                  {/* Voucher Card Container */}
                  <div
                    onClick={() => setModalOpen(true)}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B5986B]/50 bg-[#FAF6F0] aspect-[3/2] cursor-pointer transform group-hover:scale-102 transition-all duration-500"
                    title="Cliquer pour agrandir le visuel de la carte cadeau"
                  >
                    <img
                      src={voucherSrc}
                      alt="Visuel officiel de la Carte Cadeau Le Cocon Sensoriel by Chacha"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/salon/carte-cadeau.jpg';
                      }}
                    />

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-[#FAF6F0]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#B5986B] text-[12px] uppercase tracking-wider font-semibold text-[#2C2523] flex items-center gap-2 shadow-lg">
                        <ZoomIn className="w-4 h-4 text-[#9E8256]" />
                        <span>Agrandir le visuel</span>
                      </div>
                    </div>

                    {/* Discreet bottom badge */}
                    <div className="absolute bottom-3 left-3 right-3 text-center bg-[#FAF6F0]/90 backdrop-blur-sm py-1.5 px-3 rounded-xl border border-[#B5986B]/30 flex items-center justify-between text-[11px] text-[#5A4E46]">
                      <span className="font-semibold text-[#9E8256] uppercase tracking-wider">
                        ✨ Carte Cadeau Officielle
                      </span>
                      <span className="italic">
                        Valable sur toutes les prestations
                      </span>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for full inspection */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Agrandissement de la carte cadeau"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF6F0] rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-[#B5986B] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E8D8C8]">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#9E8256]" />
                <h3 className="font-serif-title text-xl text-[#2C2523] uppercase tracking-wide font-semibold">
                  Carte Cadeau • Le Cocon Sensoriel by Chacha
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="p-2 rounded-full hover:bg-[#F3ECE1] text-[#2C2523] transition-colors focus:outline-none"
                aria-label="Fermer la vue agrandie"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#E8D8C8] shadow-inner bg-[#F3ECE1]">
              <img
                src={voucherSrc}
                alt="Carte Cadeau - Le Cocon Sensoriel by Chacha"
                className="w-full h-auto object-contain max-h-[75vh]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-[12px] text-[#5A4E46] text-center sm:text-left">
                Offrez un voyage sensoriel personnalisé : Head Spa, Rituels bien-être ou Coiffure privée.
              </p>
              <a
                href={SALON_INFO.planityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9E8256] text-white text-[12px] uppercase tracking-widest font-semibold hover:bg-[#8A6F44] transition-colors shrink-0 shadow-sm"
              >
                <span>Commander sur Planity</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
