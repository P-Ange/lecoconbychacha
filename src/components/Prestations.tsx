import React from 'react';
import { Sparkles, Waves, Heart, Scissors, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../utils/salonData';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const Prestations: React.FC = () => {
  const { photos } = useSiteStore();
  return (
    <section id="prestations" className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Subtle organic decor */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-[#EFE6D8]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-[#C4A97D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
            <span className="text-[12px] uppercase tracking-[0.22em] text-[#9E8256] font-semibold border-b border-[#B5986B]/40 pb-1 inline-block">
              Quatre univers de bien-être
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.1em] text-[#2C2523] font-normal">
              Découvrez mon univers
            </h2>
            <div className="w-16 h-0.5 bg-[#B5986B] mx-auto my-3" />
            <p className="text-[15px] sm:text-[16px] text-[#5A4E46] leading-relaxed font-light">
              Bienvenue dans un espace privatif où la beauté rencontre le bien-être.<br />
              Au Cocon Sensoriel, chaque prestation est pensée comme une expérience unique, dans une atmosphère douce, chaleureuse et apaisante.<br />
              <strong className="text-[#2C2523] font-medium">Quatre univers, une même intention : prendre soin de vous, à votre rythme.</strong>
            </p>
          </div>
        </ScrollReveal>

        {/* The 4 Univers with melted gradient images */}
        <div className="space-y-16 sm:space-y-24">
          
          {/* ========================================================
              1. HEAD SPA JAPONAIS
              ======================================================== */}
          <ScrollReveal direction="up" delay={80} duration={850}>
            <div id="head-spa" className="bg-[#FAF6F0] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-[#E8D8C8] shadow-lg luxury-card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Photo with melted feathered edges */}
              <div className="lg:col-span-5 order-1 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square bg-[#EFE6D8]">
                  <img
                    src={photos.headSpa || '/head-spa-eau.jpg'}
                    alt="Head Spa Japonais avec arceau d'eau et ambiance relaxante"
                    className="w-full h-full object-cover image-melt-edges transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/salon/head-spa-basin.jpg';
                    }}
                  />
                  {/* Soft melt overlay into background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B5986B]/40 text-[11px] uppercase tracking-wider text-[#9E8256] font-semibold shadow-sm">
                    Expérience Sensorielle Unique
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-7 order-2 lg:order-2 space-y-5">
                <div className="flex items-center gap-3 text-[#9E8256]">
                  <div className="w-10 h-10 rounded-full bg-[#F3ECE1] border border-[#B5986B]/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                    Rituel Japonais d'Exception
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-semibold">
                    Head Spa Japonais
                  </h3>
                  <p className="font-cursive text-2xl sm:text-3xl text-[#9E8256] transform -rotate-1">
                    Une invitation au lâcher-prise…
                  </p>
                </div>

                <div className="space-y-3 text-[14px] sm:text-[15px] text-[#5A4E46] leading-relaxed font-light">
                  <p>
                    Bien plus qu'un simple soin capillaire, le Head Spa Japonais est une véritable expérience sensorielle alliant détente profonde, rituels du cuir chevelu et douceur de l'eau.
                  </p>
                  <p>
                    Laissez-vous envelopper par une atmosphère apaisante et profitez d'un moment suspendu, entièrement dédié à votre bien-être.
                  </p>
                </div>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Arceau d'eau chaude circulaire &amp; brumisation</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Massage crânien profond &amp; points shiatsu</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Purification &amp; soin complet du cuir chevelu</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Lâcher-prise émotionnel et physique total</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href={SALON_INFO.planityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] text-white text-[12px] uppercase tracking-[0.16em] font-semibold shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>DÉCOUVRIR &amp; RÉSERVER</span>
                    <span className="text-[14px]">&gt;</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>


          {/* ========================================================
              2. HOLISTIC HAIR GROW
              ======================================================== */}
          <ScrollReveal direction="up" delay={80} duration={850}>
            <div id="holistic" className="bg-[#FAF6F0] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-[#E8D8C8] shadow-lg luxury-card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Text */}
              <div className="lg:col-span-7 order-2 lg:order-1 space-y-5">
                <div className="flex items-center gap-3 text-[#9E8256]">
                  <div className="w-10 h-10 rounded-full bg-[#F3ECE1] border border-[#B5986B]/30 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                    Méthode Daphné Narcy
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-semibold">
                    Holistic Hair Grow
                  </h3>
                  <p className="font-cursive text-2xl sm:text-3xl text-[#9E8256] transform -rotate-1">
                    La vitalité du cuir chevelu rencontre la relaxation profonde…
                  </p>
                </div>

                <div className="space-y-3 text-[14px] sm:text-[15px] text-[#5A4E46] leading-relaxed font-light">
                  <p>
                    Découvrez un protocole crânien holistique exclusif, issu de la <strong>méthode Daphné Narcy</strong>, qui associe technicité, stimulation du cuir chevelu et bien-être.
                  </p>
                  <p>
                    Réalisé sur cheveux secs, ce rituel repose sur des manœuvres précises et profondes visant à stimuler la microcirculation, favoriser la mobilisation des tissus et accompagner le drainage du cuir chevelu.
                  </p>
                  <p>
                    Il contribue à créer un environnement propice au bien-être du cuir chevelu, tout en procurant une sensation de légèreté et de détente profonde.
                  </p>
                  <p className="italic text-[#2C2523] font-normal">
                    Une approche qui prend soin du cuir chevelu autant que de l'esprit, pour allier beauté capillaire et lâcher-prise.
                  </p>
                </div>

                {/* Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Réalisé sur cheveux secs</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Stimulation de la microcirculation</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Mobilisation &amp; drainage des tissus</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#2C2523]">
                    <CheckCircle2 className="w-4 h-4 text-[#9E8256] shrink-0" />
                    <span>Sensation immédiate de légèreté</span>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href={SALON_INFO.planityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] text-white text-[12px] uppercase tracking-[0.16em] font-semibold shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>RÉSERVER CE RITUEL</span>
                    <span className="text-[14px]">&gt;</span>
                  </a>
                </div>

              </div>

              {/* Photo with melted gradient */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square bg-[#EFE6D8]">
                  <img
                    src={photos.holistic || '/holistic-massage.jpg'}
                    alt="Protocole crânien holistique sur cheveux secs"
                    className="w-full h-full object-cover image-melt-edges transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Soft melt overlay into background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B5986B]/40 text-[11px] uppercase tracking-wider text-[#9E8256] font-semibold shadow-sm">
                    Méthode Holistique Daphné Narcy
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>


          {/* ========================================================
              3. MODELAGES & RITUELS SENSORIELS
              ======================================================== */}
          <ScrollReveal direction="up" delay={80} duration={850}>
            <div id="rituels" className="bg-[#FAF6F0] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-[#E8D8C8] shadow-lg luxury-card-hover">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Photo with melted gradient */}
              <div className="lg:col-span-5 order-1 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-square bg-[#EFE6D8]">
                  <img
                    src={photos.rituels || '/rituels-ambiance.jpg'}
                    alt="Ambiance tamisée bougies et rituels sensoriels"
                    className="w-full h-full object-cover image-melt-edges transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/salon/candles-rituels.jpg';
                    }}
                  />
                  {/* Soft melt overlay into background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B5986B]/40 text-[11px] uppercase tracking-wider text-[#9E8256] font-semibold shadow-sm">
                    Ambiance Intimiste aux Bougies
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-7 order-2 lg:order-2 space-y-5">
                <div className="flex items-center gap-3 text-[#9E8256]">
                  <div className="w-10 h-10 rounded-full bg-[#F3ECE1] border border-[#B5986B]/30 flex items-center justify-center">
                    <Waves className="w-5 h-5" />
                  </div>
                  <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                    Détente &amp; Relâchement
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-semibold">
                    Modelages &amp; Rituels Sensoriels
                  </h3>
                  <p className="font-cursive text-2xl sm:text-3xl text-[#9E8256] transform -rotate-1">
                    Une bulle de douceur pour le corps et l'esprit…
                  </p>
                </div>

                <div className="space-y-3 text-[14px] sm:text-[15px] text-[#5A4E46] leading-relaxed font-light">
                  <p>
                    Accordez-vous une parenthèse de relaxation grâce à des modelages bien-être et des rituels sensoriels pensés pour favoriser le relâchement des tensions et l'apaisement.
                  </p>
                  <p>
                    Des gestes enveloppants, une ambiance délicate et une attention particulière portée à votre confort, pour vous reconnecter à l'essentiel : <strong>vous-même</strong>.
                  </p>
                </div>

                {/* Mention Spéciale réservée aux femmes */}
                <div className="inline-flex items-center gap-3 p-3.5 rounded-2xl bg-[#F3ECE1] border border-[#B5986B]/40 text-[#2C2523]">
                  <div className="w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#9E8256] shrink-0">
                    <Heart className="w-4 h-4 fill-[#9E8256]/20" />
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-medium tracking-wide">
                    🌸 <strong>Modelages du corps exclusivement réservés aux femmes.</strong>
                  </span>
                </div>

                <div className="pt-3">
                  <a
                    href={SALON_INFO.planityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] text-white text-[12px] uppercase tracking-[0.16em] font-semibold shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>DÉCOUVRIR LES RITUELS</span>
                    <span className="text-[14px]">&gt;</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </ScrollReveal>


          {/* ========================================================
              4. COIFFURE PRIVÉE & MARIAGES
              ======================================================== */}
          <ScrollReveal direction="up" delay={80} duration={850}>
            <div id="coiffure" className="bg-[#FAF6F0] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-[#E8D8C8] shadow-lg luxury-card-hover">
            <div className="space-y-10">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Text */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3 text-[#9E8256]">
                    <div className="w-10 h-10 rounded-full bg-[#F3ECE1] border border-[#B5986B]/30 flex items-center justify-center">
                      <Scissors className="w-5 h-5" />
                    </div>
                    <span className="text-[12px] uppercase tracking-[0.2em] font-semibold">
                      Plus de 22 ans d'expérience
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif-title text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.1em] text-[#2C2523] font-semibold">
                      Coiffure Privée &amp; Mariages
                    </h3>
                    <p className="font-cursive text-2xl sm:text-3xl text-[#9E8256] transform -rotate-1">
                      La beauté de vos cheveux, en toute intimité…
                    </p>
                  </div>

                  <div className="space-y-3 text-[14px] sm:text-[15px] text-[#5A4E46] leading-relaxed font-light">
                    <p>
                      Redécouvrez le plaisir d'un rendez-vous coiffure dans un espace calme, privatif et chaleureux.
                      Ici, je prends le temps de vous écouter, de vous conseiller et de sublimer vos cheveux en respectant vos envies et votre personnalité.
                    </p>
                    <p className="font-medium text-[#2C2523]">
                      Un moment privilégié, loin de l'agitation des salons traditionnels.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F6EFE5] border-l-4 border-[#9E8256] space-y-2">
                    <h4 className="font-serif-title text-lg uppercase tracking-wider text-[#2C2523] font-semibold">
                      Votre beauté, votre style, votre moment…
                    </h4>
                    <p className="text-[13px] sm:text-[14px] text-[#5A4E46] leading-relaxed">
                      De la coiffure du quotidien aux coiffures événementielles, je vous accompagne également pour vos plus beaux moments : <strong>mariages, cérémonies et occasions particulières</strong>.<br />
                      Chignons élégants, attaches romantiques, coiffures sophistiquées ou naturelles… Un savoir-faire professionnel, une attention personnalisée et le plaisir de prendre soin de vous.
                    </p>
                  </div>

                  <div>
                    <a
                      href={SALON_INFO.planityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] text-white text-[12px] uppercase tracking-[0.16em] font-semibold shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <span>VOIR LES PRESTATIONS COIFFURE</span>
                      <span className="text-[14px]">&gt;</span>
                    </a>
                  </div>

                </div>

                {/* Visual with melted feathered edge */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#EFE6D8]">
                    <img
                      src={photos.hero || '/coiffure-espace.jpg'}
                      alt="Salon de coiffure privée cosy et élégant"
                      className="w-full h-full object-cover image-melt-edges transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B5986B]/40 text-[11px] uppercase tracking-wider text-[#9E8256] font-semibold shadow-sm">
                      Espace 100% Privatif
                    </div>
                  </div>
                </div>

              </div>

              {/* Encart Spécial: FORFAIT MARIÉE (3 étapes + photo coiffure-mariee) */}
              <ScrollReveal direction="up" delay={120} duration={800}>
                <div className="bg-[#EFE6D8]/60 rounded-3xl p-6 sm:p-8 border border-[#B5986B]/40 shadow-inner">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Photo mariée with melted edges */}
                    <div className="md:col-span-4">
                      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#FAF6F0] shadow-md">
                        <img
                          src={photos.coiffure || '/coiffure-mariee.jpg'}
                          alt="Forfait Coiffure Mariée & Événements"
                          className="w-full h-full object-cover image-melt-edges"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2523]/30 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-3 right-3 text-center bg-[#FAF6F0]/90 backdrop-blur-sm py-1 rounded-xl text-[10px] uppercase tracking-widest text-[#9E8256] font-semibold">
                          Sublimez Votre Jour J
                        </div>
                      </div>
                    </div>

                    {/* 3 Steps */}
                    <div className="md:col-span-8 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#9E8256] font-semibold">
                          Accompagnement Événementiel
                        </span>
                        <h4 className="font-serif-title text-2xl sm:text-3xl text-[#2C2523] uppercase tracking-wide font-semibold">
                          Le Forfait Mariée &amp; Cérémonies
                        </h4>
                        <p className="font-cursive text-xl sm:text-2xl text-[#9E8256]">
                          « Un moment unique mérite une attention unique. »
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
                          <div className="w-7 h-7 rounded-full bg-[#9E8256] text-white text-[12px] font-bold flex items-center justify-center mb-2">
                            1
                          </div>
                          <h5 className="font-semibold text-[13px] text-[#2C2523]">
                            Essai Personnalisé
                          </h5>
                          <p className="text-[12px] text-[#5A4E46] mt-1">
                            Test des coiffures et adaptation à votre morphologie et tenue.
                          </p>
                        </div>

                        <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
                          <div className="w-7 h-7 rounded-full bg-[#9E8256] text-white text-[12px] font-bold flex items-center justify-center mb-2">
                            2
                          </div>
                          <h5 className="font-semibold text-[13px] text-[#2C2523]">
                            Étude du Style
                          </h5>
                          <p className="text-[12px] text-[#5A4E46] mt-1">
                            Analyse des inspirations, accessoires, voiles et harmonie globale.
                          </p>
                        </div>

                        <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8D8C8] shadow-sm">
                          <div className="w-7 h-7 rounded-full bg-[#9E8256] text-white text-[12px] font-bold flex items-center justify-center mb-2">
                            3
                          </div>
                          <h5 className="font-semibold text-[13px] text-[#2C2523]">
                            Coiffure du Jour J
                          </h5>
                          <p className="text-[12px] text-[#5A4E46] mt-1">
                            Réalisation sereine et tenue impeccable pour toute votre journée.
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
