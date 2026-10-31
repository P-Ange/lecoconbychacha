import React from 'react';
import { MapPin, Phone, Calendar, Instagram, Facebook, Clock, Sparkles, Heart, ShoppingBag, ExternalLink } from 'lucide-react';
import { SALON_INFO, formatTelLink } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const GalerieEtFooter: React.FC = () => {
  const { photos } = useSiteStore();

  const galleryItems = [
    {
      src: photos.galerie1 || photos.hero || '/coiffure-espace.jpg',
      alt: "Miroir rond rétroéclairé et poste de coiffure privée",
      title: "Espace Coiffure Privée",
      subtitle: "Un cadre apaisant et feutré"
    },
    {
      src: photos.galerie2 || photos.headSpa || '/head-spa-eau.jpg',
      alt: "Bassin japonais avec arceau d'eau chaude et lumière relaxante",
      title: "Head Spa Japonais",
      subtitle: "Douceur de l'eau & lâcher-prise"
    },
    {
      src: photos.galerie3 || photos.rituels || '/rituels-ambiance.jpg',
      alt: "Ambiance bougies, diffuseur et rituels sensoriels",
      title: "Rituels Sensoriels",
      subtitle: "Atmosphère chaleureuse et bienfaisante"
    },
    {
      src: photos.galerie4 || photos.holistic || '/holistic-massage.jpg',
      alt: "Protocole crânien holistique réalisé par Charlène",
      title: "Holistic Hair Grow",
      subtitle: "Technicité & bien-être crânien"
    }
  ];

  return (
    <footer id="contact" className="bg-[#FAF6F0] pt-16 border-t border-[#E8D8C8]">
      
      {/* Mini-Galerie Immersive 4 Photos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E8256] font-semibold">
              ✦ Immersion Sensorielle ✦
            </span>
            <h3 className="font-serif-title text-2xl sm:text-3xl uppercase tracking-wider text-[#2C2523] font-normal">
              L'Atmosphère du Cocon
            </h3>
            <p className="text-[13px] text-[#5A4E46]">
              Chaque recoin a été imaginé pour vous offrir un havre de calme et de beauté.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 100} duration={800}>
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#EFE6D8] border border-[#E8D8C8] shadow-md group luxury-card-hover"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/salon/coiffure-espace.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C2523]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-serif-title text-base sm:text-lg font-semibold tracking-wide leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/80 font-light mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="bg-[#F3ECE1] border-t border-[#E8D8C8] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Colonne 1: Identité */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#B5986B]/40 shadow-sm shrink-0 bg-[#FAF6F0]">
                  <img
                    src="/logo.jpg"
                    alt="Logo Le Cocon Sensoriel"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/salon/logo-icon.jpg';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-serif-title text-lg uppercase tracking-[0.14em] text-[#2C2523] font-semibold">
                    Le Cocon Sensoriel
                  </h4>
                  <p className="font-cursive text-xl text-[#9E8256] leading-none">
                    by Chacha
                  </p>
                </div>
              </div>

              <p className="text-[13px] sm:text-[14px] text-[#5A4E46] leading-relaxed max-w-md font-light">
                Espace privatif dédié à la beauté et au bien-être à Dampierre-sur-Salon.
                Un lieu d'exception pensé avec le cœur, pour ralentir et vous reconnecter à vous-même.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF6F0] border border-[#B5986B]/30 text-[11px] uppercase tracking-wider text-[#9E8256] font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Uniquement sur rendez-vous</span>
              </div>
            </div>

            {/* Colonne 2: Coordonnées & Planity */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif-title text-lg uppercase tracking-[0.12em] text-[#2C2523] font-semibold">
                Coordonnées &amp; Réservation
              </h4>

              <div className="space-y-3 text-[13px] sm:text-[14px] text-[#5A4E46]">
                
                {/* Adresse */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9E8256] shrink-0 mt-1" />
                  <div>
                    <strong className="text-[#2C2523] font-medium">Adresse :</strong><br />
                    <span>{SALON_INFO.address}</span>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#9E8256] shrink-0" />
                  <div>
                    <strong className="text-[#2C2523] font-medium">Téléphone : </strong>
                    <a
                      href={`tel:${formatTelLink(SALON_INFO.phoneDisplay)}`}
                      className="hover:text-[#9E8256] hover:underline font-semibold text-[#2C2523]"
                    >
                      {SALON_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Réservation 24h/24 */}
                <div className="pt-2">
                  <a
                    href={SALON_INFO.planityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[12px] uppercase tracking-widest font-semibold shadow-sm transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Réserver sur Planity (24h/24)</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Colonne 3: Réseaux Sociaux & Partenaire */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif-title text-lg uppercase tracking-[0.12em] text-[#2C2523] font-semibold">
                Suivez mon univers
              </h4>

              <p className="text-[13px] text-[#5A4E46]">
                Retrouvez les coulisses, inspirations et actualités sur les réseaux :
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B5986B]/40 flex items-center justify-center text-[#9E8256] hover:bg-[#9E8256] hover:text-white transition-all shadow-sm"
                  aria-label="Instagram Le Cocon Sensoriel"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href={SALON_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B5986B]/40 flex items-center justify-center text-[#9E8256] hover:bg-[#9E8256] hover:text-white transition-all shadow-sm"
                  aria-label="Facebook Le Cocon Sensoriel"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>

              {/* Chogan Boutique Direct Link */}
              <div className="pt-2">
                <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#E8D8C8] space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#9E8256] uppercase tracking-wider">Boutique Chogan</span>
                    <span className="text-[10px] bg-[#F3ECE1] text-[#9E8256] px-2 py-0.5 rounded-full font-medium">Partenaire Officiel</span>
                  </div>
                  <p className="text-[11.5px] text-[#5A4E46] leading-tight">
                    Parfums &amp; soins sensoriels en ligne.
                  </p>
                  <a
                    href={SALON_INFO.choganShopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 rounded-xl bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[11px] uppercase tracking-wider font-semibold shadow-sm transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Visiter la boutique</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="mt-12 pt-6 border-t border-[#E8D8C8] flex flex-col sm:flex-row items-center justify-between text-[12px] text-[#5A4E46]/80 gap-3">
            <p>
              © {new Date().getFullYear()} Le Cocon Sensoriel by Chacha. Tous droits réservés.
            </p>
            <p className="flex items-center gap-1">
              <span>Créé avec amour &amp; bienveillance</span>
              <Heart className="w-3.5 h-3.5 text-[#9E8256] fill-[#9E8256]" />
              <span>à Dampierre-sur-Salon</span>
            </p>
            <div>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open_admin_modal'))}
                className="inline-flex items-center gap-1.5 text-[11px] text-[#9E8256] hover:text-[#2C2523] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#FAF6F0]/80 cursor-pointer"
                title="Accès réservé à l'administratrice pour modifier les photos et les offres"
              >
                <span>Accès Espace Privé</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
