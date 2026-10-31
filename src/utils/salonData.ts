/**
 * Salon configuration constants and helper logic
 */

export const SALON_INFO = {
  name: "Le Cocon Sensoriel",
  by: "by Chacha",
  tagline: "Beauté • Bien-Être • Éveil des Sens",
  phoneDisplay: "06 71 87 14 00",
  phoneRaw: "+33671871400",
  address: "10 rue Carnot, 70180 Dampierre-sur-Salon",
  city: "Dampierre-sur-Salon",
  postalCode: "70180",
  planityUrl: "https://www.planity.com/le-cocon-sensoriel-by-chacha-70180-dampierre-sur-salon",
  instagramUrl: "https://www.instagram.com/lecoconsensoriel_bychacha?obrf=bDUyNnA5dHM1eTly",
  facebookUrl: "https://www.facebook.com/share/1DBMTdemxx/",
  choganShopUrl: "https://www.chogangroupspa.com/referral/CHA3321CA/FR",
  specialOffer: {
    title: "L'Offre Évasion Sensorielle",
    duration: "Un peu plus de 2h rien que pour vous ♡",
    originalPrice: 135,
    discountedPrice: 119,
    genderNotice: "Offre réservée à la clientèle féminine • Uniquement sur rendez-vous",
    services: [
      {
        duration: "30 MIN",
        title: "Modelage corps intuitif et enveloppant",
        desc: "Des gestes lents et réconfortants, pour une détente profonde et une sensation de bien-être global."
      },
      {
        duration: "1 H",
        title: "Head Spa Japonais",
        desc: "Une expérience unique mêlant eau, soins du cuir chevelu, techniques relaxantes et stimulation des sens pour un lâcher-prise absolu."
      },
      {
        duration: "INCLUS",
        title: "Séchage inclus",
        desc: "Pour repartir tout en douceur."
      }
    ]
  }
};

/**
 * Calculates discount amount and percentage
 */
export function calculateDiscount(original: number, current: number) {
  if (original <= 0 || current <= 0 || current >= original) {
    return { savings: 0, percent: 0 };
  }
  const savings = original - current;
  const percent = Math.round((savings / original) * 100);
  return { savings, percent };
}

/**
 * Normalizes phone numbers for tel: links
 */
export function formatTelLink(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '');
  if (cleaned.startsWith('0')) {
    return `+33${cleaned.slice(1)}`;
  }
  return cleaned;
}

/**
 * Builds tracking/booking URL
 */
export function getBookingUrl(source?: string): string {
  if (!source) return SALON_INFO.planityUrl;
  return `${SALON_INFO.planityUrl}?utm_source=website&utm_medium=button&utm_campaign=${encodeURIComponent(source)}`;
}
