import React, { useState } from 'react';
import { Calendar, Sparkles, Clock, Search, Heart, User, Sparkle, AlertCircle, Phone } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';

export interface PrestationItem {
  name: string;
  duration: string;
  price: string;
  oldPrice?: string;
  desc: string;
  popular?: boolean;
  badge?: string;
  notice?: string;
  subCategory?: string;
}

export const Tarifs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'head-spa' | 'holistic' | 'femme' | 'mariee' | 'homme' | 'enfants' | 'echange'
  >('head-spa');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'head-spa', label: 'Head Spa Japonais' },
    { id: 'holistic', label: 'Modelages & Holistique' },
    { id: 'femme', label: 'Coiffure Femme' },
    { id: 'mariee', label: 'Mariage & Événements' },
    { id: 'homme', label: 'Homme' },
    { id: 'enfants', label: 'Enfants (0-14 ans)' },
    { id: 'echange', label: 'Échange & Conseils' },
  ];

  const pricingData: Record<string, PrestationItem[]> = {
    'head-spa': [
      {
        name: "L'Offre Évasion Sensorielle (Forfait Vedette)",
        duration: '2h 30min',
        price: '119 €',
        oldPrice: '135 €',
        desc: "Modelage corps relaxant et enveloppant 30 minutes + 1H de Head Spa Japonais (massage visage et cuir chevelu + shampoing + soin profond) + séchage des cheveux inclus. Prévoir environ 2h15. Un questionnaire vous sera envoyé par mail ou sur WhatsApp.",
        popular: true,
        badge: 'Offre du Moment',
        notice: 'Réservé à la clientèle féminine',
      },
      {
        name: 'Rituel Découverte Sensorielle (45 min)',
        duration: '1h 15min',
        price: '60 €',
        desc: "Analyse du cuir chevelu et des cheveux, shampoing, soin profond et modelage relaxant du cuir chevelu + massage du visage. Durée 45 minutes de soin, compter 30 minutes en plus pour votre rituel.",
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Rituel Voyage Sensoriel (1h)',
        duration: '1h 15min',
        price: '80 €',
        desc: "Analyse du cuir chevelu et des cheveux, massage du visage + shampoing, rituels de modelage et soin profond sous vapeur. Durée 1h de soin, compter 30 minutes de plus pour votre rituel.",
        popular: true,
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Essense Maternelle (1h15) — Rituel Maman & Bébé',
        duration: '2h 15min',
        price: '95 €',
        desc: "Un rituel de Head Spa Japonais pensé pour être vécu à deux avec son tout petit (recommandé jusqu'aux 4 mois de votre enfant). 1h15 de rituel en peau à peau ou proche de votre bébé pour renforcer votre lien et profiter d'un moment de détente profonde et de reconnexion avec vous-même. Prévoir 1h45 avec le temps d'installation. Je m'adapte au rythme de chaque enfant : tétée, biberons, change, câlins, je vous laisserai du temps pour chaque besoin. Prestations identiques au rituel voyage sensoriel.",
        badge: 'Maman & Bébé',
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Rituel Évasion Profonde : 1h Cuir Chevelu + 30 min Modelage Dos & Pieds',
        duration: '1h 45min',
        price: '110 €',
        desc: "Rituel complet d'1h sur le cuir chevelu avec 30 min de modelage du dos et des pieds pour une détente profonde. Analyse du cuir chevelu et des cheveux, massage du visage et du corps + shampoing, rituels de modelage et soin profond sous vapeur. Durée 1h30, compter 30 minutes de plus.",
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Rituel Sérénité Absolue (1h30) Cuir Chevelu',
        duration: '1h 45min',
        price: '120 €',
        desc: "Analyse du cuir chevelu et des cheveux, massage du visage + shampoing, rituels de modelage intensif et soin profond sous vapeur. Durée 1h30 de rituel cuir chevelu, compter 30 minutes de plus.",
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Rituel Prestige : 1h Massage Cuir Chevelu + 1h Modelage Sensoriel Corps',
        duration: '2h 15min',
        price: '140 €',
        desc: "1h de Head Spa dédié au cuir chevelu, suivi d'1h de modelage sensoriel corps. Analyse du cuir chevelu et des cheveux, massage du visage et du corps + shampoing, rituels de modelage et soin profond sous vapeur. Durée 2h, compter 30 minutes de plus que votre rituel.",
        popular: true,
        badge: 'Prestige Sensoriel',
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Séchage après Head Spa',
        duration: '30min',
        price: 'de 15 € à 30 €',
        desc: "Le séchage est en option pour les prestations Head Spa Japonais, merci de l'ajouter à votre réservation si besoin.",
        subCategory: 'Head Spa Japonais Homme & Femme',
      },
      {
        name: 'Head Spa Junior — Bulle de Détente (30 min)',
        duration: '30min',
        price: '30 €',
        desc: "Pour les enfants de 6 à 12 ans. Un rituel doux et relaxant sous l'arceau d'eau tiède.",
        subCategory: 'Head Spa Japonais JUNIOR (6 à 12 ans)',
      },
      {
        name: 'Head Spa Junior — Bulle de Bonheur (45 min)',
        duration: '45min',
        price: '45 €',
        desc: "Pour les enfants de 6 à 12 ans. Découverte sensorielle complète et soin apaisant du cuir chevelu.",
        subCategory: 'Head Spa Japonais JUNIOR (6 à 12 ans)',
      },
      {
        name: 'Séchage Head Spa Junior',
        duration: '30min',
        price: '10 €',
        desc: "Séchage doux des cheveux après le Head Spa pour les enfants de 6 à 12 ans.",
        subCategory: 'Head Spa Japonais JUNIOR (6 à 12 ans)',
      },
    ],

    holistic: [
      {
        name: 'Massage Holistic Hair Grow (1h) Méthode Daphnée NARCY',
        duration: '1h 30min',
        price: '95 €',
        desc: "Rituel de massage sur le cuir chevelu en position ventrale sur une table de massage. Protocole signature, rare et exclusif, stimulant la vitalité du cuir chevelu et relâchant les tensions profondes. Ce soin est interdit aux femmes enceintes et aux enfants de moins de 14 ans.",
        popular: true,
        badge: 'Méthode Daphnée Narcy',
        subCategory: 'Rituels Holistic',
      },
      {
        name: 'Massage Holistic Hair Grow (Daphnée NARCY) + Shampooing & Séchage (1h45)',
        duration: '1h 45min',
        price: '115 €',
        desc: "Protocole signature sur table de massage complété par un shampooing relaxant et un séchage naturel.",
        badge: 'Complet avec Séchage',
        subCategory: 'Rituels Holistic',
      },
      {
        name: 'Modelage Sensoriel Corps (1h)',
        duration: '1h 10min',
        price: '60 €',
        desc: "Un rituel enveloppant et profondément relaxant pour une détente globale du corps et de l'esprit. Réalisé avec des huiles précieuses dans une ambiance tamisée aux bougies.",
        popular: true,
        notice: 'Réservé uniquement à la clientèle féminine',
        subCategory: 'Modelages Corps Féminins',
      },
      {
        name: 'Modelage du Dos et Pieds (30 min)',
        duration: '40min',
        price: '30 €',
        desc: "Un rituel ciblé pour dénouer les tensions accumulées et relâcher profondément le dos et les pieds.",
        notice: 'Réservé uniquement à la clientèle féminine',
        subCategory: 'Modelages Corps Féminins',
      },
    ],

    femme: [
      {
        name: 'Shampoing + Coupe & Mise en Beauté (Cheveux Courts)',
        duration: '1h',
        price: '40 €',
        desc: "Shampoing + coupe + brushing ou séchage naturel. Longueurs aux oreilles.",
        subCategory: 'Shampoing + Coupe & Brushing',
      },
      {
        name: 'Shampoing + Coupe & Mise en Beauté Signature (Cheveux Mi-Longs)',
        duration: '1h',
        price: '44 €',
        desc: "Shampoing + coupe + brushing ou séchage naturel. Longueurs entre nuque et dessus des épaules.",
        popular: true,
        subCategory: 'Shampoing + Coupe & Brushing',
      },
      {
        name: 'Shampoing + Coupe & Mise en Beauté Signature (Cheveux Longs)',
        duration: '1h',
        price: '48 €',
        desc: "Shampoing + coupe + brushing ou séchage naturel. Longueurs à partir des épaules.",
        subCategory: 'Shampoing + Coupe & Brushing',
      },
      {
        name: 'Supplément Coupe Transformation / Relooking',
        duration: '30min',
        price: '15 €',
        desc: "Étude stylistique approfondie et transformation complète de votre coupe.",
        subCategory: 'Soins & Suppléments',
      },
      {
        name: 'Soin Profond Réparateur & Nutrition Intense',
        duration: '3min',
        price: '8 €',
        desc: "Masque réparateur ciblé apportant brillance, hydratation et douceur immédiate.",
        subCategory: 'Soins & Suppléments',
      },
      {
        name: 'Shampoing & Mise en Beauté — Cheveux Courts',
        duration: '30min',
        price: '22 €',
        desc: "Shampoing relaxant et coiffage soigné cheveux courts.",
        subCategory: 'Shampoing & Brushing',
      },
      {
        name: 'Shampoing & Mise en Beauté — Cheveux Mi-Longs',
        duration: '45min',
        price: '26 €',
        desc: "Shampoing relaxant et brushing élégant cheveux mi-longs.",
        subCategory: 'Shampoing & Brushing',
      },
      {
        name: 'Shampoing & Mise en Beauté — Cheveux Longs',
        duration: '1h',
        price: '30 €',
        desc: "Shampoing relaxant et brushing soigné cheveux longs.",
        subCategory: 'Shampoing & Brushing',
      },
    ],

    mariee: [
      {
        name: 'Forfait Coiffure Mariée (1 essai + Jour J)',
        duration: '2h',
        price: 'de 95 € à 110 €',
        desc: "1 essai personnalisé complet + réalisation de la coiffure d'exception le Jour J. (Cette prestation ne peut pas être réservée directement en ligne. Merci d'appeler le 06 71 87 14 00).",
        popular: true,
        badge: 'Réservation par téléphone',
        notice: 'Appelez le 06 71 87 14 00 pour convenir des dates',
        subCategory: 'Mariage & Cérémonie',
      },
      {
        name: 'Coiffure Événementielle < 30 min',
        duration: '30min',
        price: '40 €',
        desc: "Coiffures événementielles de 30 min max : nattes délicates, coiffures bohèmes, attaches cheveux courts ou mi-longs.",
        subCategory: 'Coiffure Événementielle',
      },
      {
        name: 'Coiffure Événementielle ~1h',
        duration: '1h',
        price: '65 €',
        desc: "Attache raffinée, chignon flou ou ondulations sophistiquées pour invitée d'honneur.",
        popular: true,
        subCategory: 'Coiffure Événementielle',
      },
      {
        name: 'Coiffure Événementielle 1h30',
        duration: '1h 30min',
        price: 'de 65 € à 75 €',
        desc: "Coiffure de plus de 1h30, cheveux très longs ou coiffures apprêtées de haute tenue.",
        subCategory: 'Coiffure Événementielle',
      },
      {
        name: 'Coiffure Fille (jusqu’à 10 ans)',
        duration: '30min',
        price: '20 €',
        desc: "Coiffure festive, tresses ou attaches pour cérémonies et cortèges.",
        subCategory: 'Demoiselles d’Honneur',
      },
      {
        name: 'Coiffure Fille (de 10 à 12 ans)',
        duration: '40min',
        price: '30 €',
        desc: "Mise en beauté et coiffure de fête pour jeunes filles.",
        subCategory: 'Demoiselles d’Honneur',
      },
    ],

    homme: [
      {
        name: 'Coupe Complète à la Tondeuse',
        duration: '15min',
        price: '11 €',
        desc: "Tonte uniforme sur l'ensemble de la chevelure et finitions soignées.",
      },
      {
        name: 'Coupe Dégradé Classique',
        duration: '30min',
        price: '17 €',
        desc: "Coupe aux ciseaux et tondeuse avec dégradé harmonieux.",
      },
      {
        name: 'Coupe Dégradée à Blanc, Américain ou Taper',
        duration: '45min',
        price: '20 €',
        desc: "Dégradé très soigné, fondu à blanc progressif ou taper tendance.",
        popular: true,
      },
      {
        name: 'Shampoing + Coupe Dégradé à Blanc, Américain ou Taper',
        duration: '50min',
        price: '23 €',
        desc: "Shampoing rafraîchissant suivi de votre coupe dégradé à blanc, américain ou taper.",
        popular: true,
        badge: 'Formule Complète',
      },
      {
        name: 'Shampoing Homme',
        duration: '5min',
        price: '3 €',
        desc: "Shampoing tonifiant avec massage rapide du cuir chevelu.",
      },
    ],

    enfants: [
      {
        name: 'Coupe Fille (0 à 3 ans)',
        duration: '30min',
        price: '12 €',
        desc: "Coupe tout en douceur et bienveillance pour les toutes petites.",
        subCategory: 'Filles (0 à 14 ans)',
      },
      {
        name: 'Coupe Fille (3 à 10 ans)',
        duration: '45min',
        price: 'de 15 € à 25 €',
        desc: "Le tarif est fixé en fonction de la longueur, de l'épaisseur et de la coupe demandée.",
        subCategory: 'Filles (0 à 14 ans)',
      },
      {
        name: 'Shampoing + Coupe + Coiffage Fille (3 à 10 ans)',
        duration: '45min',
        price: 'de 18 € à 28 €',
        desc: "Le tarif est fixé en fonction de la longueur, de l'épaisseur et de la coiffure demandée.",
        subCategory: 'Filles (0 à 14 ans)',
      },
      {
        name: 'Coupe + Coiffage Fille (de 10 à 14 ans)',
        duration: '45min',
        price: '25 €',
        desc: "Coupe moderne adaptée aux adolescentes et séchage soigné.",
        subCategory: 'Filles (0 à 14 ans)',
      },
      {
        name: 'Shampoing + Coupe + Coiffage Fille (de 10 à 14 ans)',
        duration: '45min',
        price: '30 €',
        desc: "Shampoing, coupe sur-mesure et coiffage / brushing soigné.",
        subCategory: 'Filles (0 à 14 ans)',
      },
      {
        name: 'Shampoing + Soin Fille (3 ans à 14 ans)',
        duration: '7min',
        price: '8 €',
        desc: "Shampoing adapté à l'âge de l'enfant et masque d'hydratation profonde.",
        subCategory: 'Filles (0 à 14 ans)',
      },
      {
        name: 'Coupe Garçons (0 à 3 ans)',
        duration: '30min',
        price: '12 €',
        desc: "Dégradé classique tout en douceur pour les tout-petits.",
        subCategory: 'Garçons (0 à 14 ans)',
      },
      {
        name: 'Coupe Garçons (3 à 10 ans) Dégradé Classique',
        duration: '30min',
        price: '14 €',
        desc: "Coupe soignée avec dégradé classique adapté.",
        subCategory: 'Garçons (0 à 14 ans)',
      },
      {
        name: 'Coupe Garçons (de 3 ans à 10 ans) Dégradé Américain ou Taper',
        duration: '40min',
        price: '16 €',
        desc: "Dégradé progressif avec plusieurs sabots, finition très nette.",
        subCategory: 'Garçons (0 à 14 ans)',
      },
      {
        name: 'Coupe Garçon (10 à 14 ans) Dégradé Classique',
        duration: '30min',
        price: '15 €',
        desc: "Coupe dégradée classique pour jeunes garçons.",
        subCategory: 'Garçons (0 à 14 ans)',
      },
      {
        name: 'Coupe Garçon (10 à 14 ans) Dégradé à Blanc, Taper ou Américain',
        duration: '45min',
        price: '17 €',
        desc: "Dégradé très fondu, américain ou taper moderne.",
        subCategory: 'Garçons (0 à 14 ans)',
      },
      {
        name: 'Shampoing Garçon',
        duration: '5min',
        price: '3 €',
        desc: "Shampoing rapide adapté.",
        subCategory: 'Garçons (0 à 14 ans)',
      },
    ],

    echange: [
      {
        name: 'Échange, Diagnostic, Carte Cadeau, Achat Produits sans Prestation',
        duration: '15min',
        price: 'Sur Rendez-vous',
        desc: "Le Cocon étant uniquement sur rendez-vous, si vous avez besoin d'échanger sur : des coiffures de mariage, des cartes cadeaux, acheter un produit, ou un diagnostic personnalisé. C'est cette prestation qu'il faut choisir pour que je puisse être disponible pour vous en toute intimité.",
        popular: true,
        badge: 'Créneau Dédié',
        notice: 'Sans frais • Uniquement sur rendez-vous',
      },
    ],
  };

  // Filter items by search query if present, otherwise active category
  const displayedItems = searchQuery.trim()
    ? Object.entries(pricingData).flatMap(([catKey, items]) =>
        items
          .filter(
            (i) =>
              i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              i.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (i.subCategory && i.subCategory.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((i) => ({ ...i, catKey }))
      )
    : pricingData[activeCategory];

  return (
    <section id="tarifs" className="py-20 bg-[#F3ECE1]/60 border-t border-[#E8D8C8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#9E8256] font-semibold">
              ✦ Carte des Soins &amp; Prestations ✦
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-normal">
              Tarifs &amp; Prestations
            </h2>
            <p className="text-[14px] text-[#5A4E46] font-light">
              Des rituels sur-mesure dans un cadre privatif à Dampierre-sur-Salon.
            </p>
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
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[12px] uppercase tracking-[0.14em] font-medium transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#9E8256] text-white shadow-md'
                      : 'bg-[#FAF6F0] text-[#2C2523]/80 hover:text-[#9E8256] border border-[#E8D8C8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {displayedItems.map((item, idx) => (
              <div
                key={idx}
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
