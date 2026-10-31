import React from 'react';
import { Heart, Sparkles, Smile } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useSiteStore } from '../utils/siteStore';

export const APropos: React.FC = () => {
  const { photos } = useSiteStore();
  const portraitSrc = photos.portrait || '/portrait-chacha.jpg';

  return (
    <section id="a-propos" className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Soft decorative background circles */}
      <div className="absolute top-20 -right-20 w-80 h-80 bg-[#E8D8C8]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-[#C4A97D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-[#FAF6F0] rounded-[2.5rem] border border-[#E8D8C8] p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Portrait Column: Organic Arched Frame with Melted Gradient */}
            <div className="lg:col-span-5 flex justify-center">
              <ScrollReveal direction="up" delay={50} duration={850} className="w-full flex justify-center">
                <div className="relative w-full max-w-sm">
                  
                  {/* Back golden shadow glow */}
                  <div className="absolute inset-0 bg-[#B5986B]/20 rounded-t-[10rem] rounded-b-3xl blur-2xl transform scale-95" />

                  {/* Arched image container with soft bottom melt */}
                  <div className="relative rounded-t-[10rem] rounded-b-3xl overflow-hidden border border-[#B5986B]/40 shadow-2xl bg-[#F3ECE1] aspect-[3/4]">
                    <img
                      src={portraitSrc}
                      alt="Charlène - Chacha créatrice du Cocon Sensoriel"
                      className="w-full h-full object-cover object-top image-melt-arch transform hover:scale-103 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/salon/portrait-chacha.jpg';
                      }}
                    />
                    {/* Subtle warm gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/80 to-transparent pointer-events-none" />
                    
                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-[#FAF6F0]/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#B5986B]/40 text-center shadow-md">
                      <p className="font-serif-title text-base text-[#2C2523] uppercase tracking-wider font-semibold">
                        Charlène
                      </p>
                      <p className="font-cursive text-xl text-[#9E8256] leading-none">
                        Chacha
                      </p>
                    </div>
                  </div>

                  {/* Floating floral heart badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#B5986B]/50 shadow-md flex items-center justify-center text-[#9E8256]">
                    <Heart className="w-6 h-6 fill-[#9E8256]/20" />
                  </div>

                </div>
              </ScrollReveal>
            </div>

            {/* Editorial Biography Column */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" delay={150} duration={850} className="space-y-6">
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[#9E8256] font-semibold border-b border-[#B5986B]/30 pb-1">
                  <Sparkles className="w-4 h-4" />
                  Rencontre &amp; Confidences
                </span>
                
                <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.08em] text-[#2C2523] font-semibold flex items-baseline gap-2">
                  <span>Un peu de moi…</span>
                  <span className="text-2xl sm:text-3xl select-none">🤍</span>
                </h2>
              </div>

              {/* Exact Text from User Request */}
              <div className="space-y-4 text-[14px] sm:text-[15px] text-[#5A4E46] leading-relaxed font-light">
                <p className="text-base sm:text-lg text-[#2C2523] font-medium leading-relaxed">
                  Moi, c’est <strong>Charlène</strong>, mais beaucoup me connaissent sous le petit nom de <strong>Chacha</strong> !
                </p>

                <p>
                  Passionnée par la coiffure depuis plus de 22 ans, j’ai toujours aimé le contact humain, les échanges, les sourires et surtout le plaisir de prendre soin des autres.
                </p>

                <p>
                  Souriante, naturelle, attentionnée et un brin perfectionniste (j’avoue !), j’aime les choses simples, les petits détails qui font la différence et les moments de partage.
                </p>

                <p>
                  Avec les années, j’ai ressenti l’envie d’aller plus loin dans ma passion, de ne plus seulement prendre soin de votre beauté, mais aussi de votre bien-être.
                </p>

                <p className="p-4 rounded-2xl bg-[#F6EFE5] border-l-4 border-[#9E8256] text-[#2C2523] italic">
                  C’est ainsi qu’est né <strong>Le Cocon Sensoriel by Chacha</strong>, un lieu imaginé avec le cœur, à mon image : chaleureux, intimiste, élégant et rempli de douceur.
                </p>

                <p>
                  À travers la coiffure privée, le Head Spa Japonais et les rituels sensoriels, mon souhait est de vous offrir une expérience personnalisée, loin du stress et de l'agitation du quotidien.
                </p>

                <p className="font-medium text-[#2C2523]">
                  Ici, pas de précipitation, pas de jugement… Juste vous, moi, et un moment rien qu’à vous.
                </p>

                <p>
                  J’aime vous accueillir avec le sourire, prendre le temps de vous écouter, vous faire rire parfois, et surtout vous voir repartir détendus, ressourcés et avec cette petite étincelle dans les yeux.
                </p>

                <p className="font-medium text-[#2C2523]">
                  Bienvenue dans mon petit univers, où chaque détail est pensé pour que vous vous sentiez bien.
                </p>

                <p className="italic text-[#9E8256] font-medium pt-2">
                  Au plaisir de prendre soin de vous,
                </p>
              </div>

              {/* Signature */}
              <div className="pt-2">
                <span className="font-cursive text-4xl sm:text-5xl text-[#9E8256] tracking-wide inline-block transform -rotate-2">
                  Chacha 🤍
                </span>
              </div>

            </ScrollReveal>
          </div>

        </div>
      </div>

    </div>
  </section>
);
};
