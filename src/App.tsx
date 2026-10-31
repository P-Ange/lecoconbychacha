/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Prestations } from './components/Prestations';
import { OffreDuMoment } from './components/OffreDuMoment';
import { Tarifs } from './components/Tarifs';
import { CarteCadeau } from './components/CarteCadeau';
import { ExperienceParfumee } from './components/ExperienceParfumee';
import { APropos } from './components/APropos';
import { Avis } from './components/Avis';
import { GalerieEtFooter } from './components/GalerieEtFooter';
import { FloatingBookingButton } from './components/FloatingBookingButton';
import { AdminModal } from './components/AdminModal';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2C2523] flex flex-col font-sans selection:bg-[#B5986B]/30 selection:text-[#2C2523] antialiased">
      {/* Sticky Glassmorphic Navigation Header (matching mockup navbar) */}
      <Navbar />

      <main className="flex-grow">
        {/* Section 1: Hero Banner, Organic Waves, 3 Horizontal Cards & Bandeau de Réassurance */}
        <Hero />

        {/* Section 2: Les Prestations (4 Univers + Forfait Mariée) */}
        <Prestations />

        {/* Section 3: Offre du Moment (Évasion Sensorielle) */}
        <OffreDuMoment />

        {/* Section 4: Tarifs & Menu des Soins */}
        <Tarifs />

        {/* Section 5: Carte Cadeau (avec visuel officiel demandé) */}
        <CarteCadeau />

        {/* Section 6: L'Expérience Parfumée (Chogan) */}
        <ExperienceParfumee />

        {/* Section 7: À Propos de Charlène ("Un peu de moi… 🤍") */}
        <APropos />

        {/* Section 8: Avis Clientes */}
        <Avis />
      </main>

      {/* Section 9: Mini-Galerie d'Ambiance & Footer complet */}
      <GalerieEtFooter />

      {/* Mobile Floating Booking CTA */}
      <FloatingBookingButton />

      {/* Autonomous Administration Modal for Photos & Novelty Offer */}
      <AdminModal />
    </div>
  );
}
