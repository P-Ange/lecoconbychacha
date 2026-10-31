import React, { useState } from 'react';
import { Calendar, Sparkles, Clock, Search, Sparkle, Phone, Edit3 } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import {
  useSiteStore,
  DEFAULT_PRESTATION_CATEGORIES,
  PrestationItem,
} from '../utils/siteStore';

export const Tarifs: React.FC = () => {
  const { prestations, isAdmin } = useSiteStore();
  const [activeCategory, setActiveCategory] = useState<string>('head-spa');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = DEFAULT_PRESTATION_CATEGORIES;

  // Filter items by search query if present, otherwise active category
  const displayedItems: (PrestationItem & { catKey?: string })[] = searchQuery.trim()
    ? Object.entries(prestations).flatMap(([catKey, items]) =>
        (items || [])
          .filter(
            (i) =>
              i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              i.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (i.subCategory && i.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((i) => ({ ...i, catKey }))
      )
    : prestations[activeCategory] || [];

  return (
    <section id="tarifs" className="py-20 bg-[#F3ECE1]/60 border-t border-[#E8D8C8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 relative">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#9E8256] font-semibold">
              ✦ Carte des Soins &amp; Prestations ✦
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-normal">
              Tarifs &amp; Prestations
            </h2>
            <p className="text-[14px] text-[#5A4E46] font-light">
              Des rituels sur-mesure dans un cadre privatif à Dampierre-sur-Salon.
            </p>

            {/* Quick admin button to edit prestations directly */}
            {isAdmin && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent('open_admin_modal', {
                        detail: { tab: 'prestations', category: activeCategory },
                      })
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Gérer la Carte des Prestations (Ajouter / Modifier / Supprimer)</span>
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Search Bar */}
        <ScrollReveal direction="up" delay={80} duration={800}>
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="w-4 h-4 text-[#9E8256] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un soin, une coupe, un forfait..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#FAF6F0] border border-[#E8D8C8] text-xs text-[#2C2523] placeholder-[#5A4E46]/60 shadow-xs focus:outline-hidden focus:border-[#9E8256] focus:ring-1 focus:ring-[#9E8256]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5A4E46] hover:text-[#2C2523] cursor-pointer"
              >
                Effacer
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Category Tabs (hidden during search) */}
        {!searchQuery && (
          <ScrollReveal direction="up" delay={100} duration={800}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
              {categories.map((cat) => {
                const count = (prestations[cat.id] || []).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[12px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat.id
                        ? 'bg-[#9E8256] text-white shadow-md'
                        : 'bg-[#FAF6F0] text-[#2C2523]/80 hover:text-[#9E8256] border border-[#E8D8C8]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        activeCategory === cat.id
                          ? 'bg-white/20 text-white'
                          : 'bg-[#EFE6D8] text-[#8A6F44]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* Notice for specific categories */}
        {activeCategory === 'head-spa' && !searchQuery && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF6F0] border border-[#B5986B]/30 text-xs text-[#5A4E46] flex items-start gap-2.5 max-w-3xl mx-auto shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#9E8256] shrink-0 mt-0.5" />
            <p>
              <strong>Head Spa Japonais :</strong> Massage du cuir chevelu, des épaules et du visage avec huiles naturelles &amp; accessoires + shampoing et soin profond. <em>Le séchage est en option pour les prestations Head Spa Japonais, pensez à l'ajouter à votre créneau si besoin. Venir démaquillée !</em>
            </p>
          </div>
        )}

        {activeCategory === 'holistic' && !searchQuery && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF6F0] border border-[#B5986B]/30 text-xs text-[#5A4E46] flex items-start gap-2.5 max-w-3xl mx-auto shadow-2xs">
            <Sparkle className="w-4 h-4 text-[#9E8256] shrink-0 mt-0.5" />
            <p>
              <strong>Méthode Daphnée Narcy :</strong> Rituel de massage sur le cuir chevelu en position ventrale sur une table de massage. <em>Ce soin est contre-indiqué aux femmes enceintes et aux enfants de moins de 14 ans. Les modelages sensoriels corps sont réservés à la clientèle féminine.</em>
            </p>
          </div>
        )}

        {/* Pricing List */}
        <ScrollReveal direction="up" delay={150} duration={850}>
          {displayedItems.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF6F0] rounded-2xl border border-[#E8D8C8] text-[#5A4E46] text-sm mb-12">
              Aucune prestation ne correspond à votre recherche.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
              {displayedItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className={`bg-[#FAF6F0] rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md ${
                    item.popular
                      ? 'border-[#9E8256] ring-1 ring-[#9E8256]/30 bg-gradient-to-br from-[#FAF6F0] to-[#F5ECE0]'
                      : 'border-[#E8D8C8]'
                  }`}
                >
                  <div className="space-y-2">
                    
                    {/* Category / Badge Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 justify-between">
                      {item.subCategory && (
                        <span className="text-[10px] uppercase tracking-wider text-[#9E8256] font-semibold">
                          {item.subCategory}
                        </span>
                      )}
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E8D8C8] text-[#8A6F44] text-[10px] font-bold tracking-wide">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div>
                        <h3 className="font-serif-title text-base sm:text-lg text-[#2C2523] font-semibold leading-snug">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#9E8256] font-medium mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.duration}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif-title text-xl sm:text-2xl font-bold text-[#2C2523] block whitespace-nowrap">
                          {item.price}
                        </span>
                        {item.oldPrice && (
                          <span className="text-[11px] line-through text-[#5A4E46]/60 block">
                            {item.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[12.5px] text-[#5A4E46] leading-relaxed pt-2 border-t border-[#E8D8C8]/60">
                      {item.desc}
                    </p>

                    {item.notice && (
                      <div className="text-[11px] text-[#8A6F44] italic bg-[#EFE6D8]/60 px-2.5 py-1 rounded-lg">
                        ✦ {item.notice}
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 mt-3.5 flex items-center justify-between border-t border-[#E8D8C8]/50">
                    <span className="text-[10.5px] text-[#9E8256] font-medium italic">
                      {item.name.toLowerCase().includes('mariée')
                        ? 'Réservation par téléphone'
                        : 'Uniquement sur rendez-vous'}
                    </span>

                    {item.name.toLowerCase().includes('mariée') ? (
                      <a
                        href="tel:+33671871400"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#E8D8C8] text-[11px] uppercase tracking-wider text-[#9E8256] font-bold border border-[#B5986B]/40 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>06 71 87 14 00</span>
                      </a>
                    ) : (
                      <a
                        href={SALON_INFO.planityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#9E8256] hover:text-white text-[11px] uppercase tracking-wider text-[#9E8256] font-bold border border-[#B5986B]/40 transition-colors"
                      >
                        <span>Choisir sur Planity</span>
                        <span>&gt;</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>

        {/* Global Planity Link */}
        <ScrollReveal direction="up" delay={200} duration={800}>
          <div className="text-center bg-[#FAF6F0] rounded-2xl p-6 border border-[#E8D8C8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-serif-title text-lg text-[#2C2523] font-semibold">
                Consultez l'ensemble des créneaux en direct sur Planity
              </h4>
              <p className="text-[12px] text-[#5A4E46]">
                Réservation sécurisée 24h/24, espace privatif garanti à Dampierre-sur-Salon.
              </p>
            </div>

            <a
              href={SALON_INFO.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] hover:from-[#8A6F44] hover:to-[#9E8256] text-white text-[12px] uppercase tracking-widest font-semibold shadow-md transition-all shrink-0 transform hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre Rendez-vous sur Planity</span>
              <span>&gt;</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
