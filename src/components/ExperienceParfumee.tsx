import React from 'react';
import { Sparkles, ShoppingBag, ExternalLink, Feather, Heart, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const ExperienceParfumee: React.FC = () => {
  const { photos } = useSiteStore();
  const currentPhoto = photos.parfums || '/parfums-chogan.jpg';

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE0] to-[#FAF6F0] relative overflow-hidden">
      
      {/* Decorative subtle aura in the background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#B5986B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E8D8C8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main luxury card with soft drop-shadow and refined bronze border */}
        <div className="bg-[#FAF6F0] rounded-[2.5rem] border border-[#E8D8C8] shadow-2xl p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column - Cleanly framed without encroachment */}
            <div className="lg:col-span-5 flex justify-center">
              <ScrollReveal direction="up" delay={50} duration={850} className="w-full max-w-md lg:max-w-none">
                <div className="relative group">
                  
                  {/* Soft background halo */}
                  <div className="absolute inset-0 bg-[#B5986B]/20 rounded-3xl blur-xl transform scale-95" />

                  {/* Frame */}
                  <div className="relative rounded-3xl overflow-hidden border-2 border-[#B5986B]/40 shadow-xl bg-[#EFE6D8] aspect-[4/5]">
                    <img
                      src={currentPhoto}
                      alt="L'expérience parfumée Chogan au Cocon Sensoriel"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/salon/parfums-chogan.jpg';
                      }}
                    />

                    {/* Gentle gradient melt on bottom edge */}
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2C2523]/70 via-[#2C2523]/20 to-transparent pointer-events-none" />

                    {/* Refined label inside the photo */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <span className="inline-block bg-[#FAF6F0]/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#B5986B]/40 text-[11px] uppercase tracking-[0.2em] text-[#9E8256] font-semibold shadow-md">
                        Haute Parfumerie &amp; Soins
                      </span>
                    </div>
                  </div>

                  {/* Discreet floating decor badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B5986B]/50 shadow-md flex items-center justify-center text-[#9E8256]">
                    <Feather className="w-5 h-5" />
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Content Column - Ample spacing, clean typography */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal direction="up" delay={150} duration={850} className="space-y-6">
                
                {/* Header Badge & Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#9E8256]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold">
                      Sillage &amp; Délicatesse
                    </span>
                  </div>

                  <h2 className="font-serif-title text-3xl sm:text-4xl text-[#2C2523] uppercase tracking-[0.08em] font-normal leading-tight">
                    L'Expérience Sensorielle se prolonge…
                  </h2>

                  <p className="font-cursive text-2xl sm:text-3xl text-[#9E8256]">
                    Parce qu'au cocon, chaque détail compte. ♡
                  </p>
                </div>

                {/* Editorial text */}
                <div className="space-y-4 text-[14.5px] sm:text-[15.5px] text-[#5A4E46] leading-relaxed font-light">
                  <p>
                    À la fin de votre prestation de coiffure, de Head Spa ou de rituel bien-être, si vous le désirez, laissez-vous envelopper d’une délicate note parfumée choisie selon vos envies du moment.
                  </p>
                  
                  {/* Warm highlighted quote box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#F6EFE5] border-l-4 border-[#9E8256] shadow-sm">
                    <p className="text-[15px] sm:text-[16px] text-[#2C2523] font-medium italic">
                      « Une touche de parfum offerte, simplement pour prolonger l’éveil des sens et repartir le cœur léger. ♡ »
                    </p>
                  </div>
                </div>

                {/* Online boutique box - elegant and clear without any forbidden code */}
                <div className="bg-[#FAF6F0] rounded-2xl p-5 sm:p-6 border border-[#B5986B]/40 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] uppercase tracking-wider text-[#2C2523] font-semibold">
                      Envie de retrouver votre fragrance préférée ?
                    </span>
                    <span className="text-[10.5px] font-semibold text-[#9E8256] bg-[#F3ECE1] px-3 py-1 rounded-full uppercase tracking-wider">
                      Boutique Officielle
                    </span>
                  </div>

                  <p className="text-[13px] sm:text-[13.5px] text-[#5A4E46] leading-relaxed">
                    Découvrez toute la collection d’extraits de parfum, de soins pour le corps et d’essences bienfaisantes disponibles en commande directe.
                  </p>

                  <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={SALON_INFO.choganShopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] hover:from-[#8A6F44] hover:to-[#A38659] text-white text-[11.5px] sm:text-[12px] uppercase tracking-[0.16em] font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0" />
                      <span>ACCÉDER À LA BOUTIQUE OFFICIELLE</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#E8D8C8] text-[11px] text-[#5A4E46]/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9E8256]" />
                    <span>Lien partenaire certifié • Commande et livraison sécurisées à domicile</span>
                  </div>
                </div>

              </ScrollReveal>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
