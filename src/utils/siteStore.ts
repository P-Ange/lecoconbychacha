/**
 * Centralized Store for Site Customization:
 * - Dynamic photo management for the entire website
 * - Autonomous administration of the "Exclusivité & Nouveauté" section
 * - Client-side persistence via localStorage and IndexedDB fallback
 * - Event-based reactivity for instantaneous UI updates
 */
import { useEffect, useState } from 'react';
import {
  PrestationItem,
  DEFAULT_PRESTATIONS,
  DEFAULT_PRESTATION_CATEGORIES,
  PrestationCategory,
} from './prestationsData';

export type { PrestationItem, PrestationCategory };
export { DEFAULT_PRESTATIONS, DEFAULT_PRESTATION_CATEGORIES };

export interface NoveltyServiceStep {
  duration: string;
  title: string;
  desc: string;
}

export interface NoveltyOfferData {
  badge: string;
  intro: string;
  title: string;
  subtitle: string;
  quote: string;
  durationBadge: string;
  durationText: string;
  discountedPrice: number;
  originalPrice: number;
  genderNotice: string;
  photo: string;
  services: NoveltyServiceStep[];
}

export interface SitePhotoMeta {
  key: string;
  label: string;
  section: string;
  defaultSrc: string;
  aspect: string;
}

export const DEFAULT_PHOTOS: Record<string, string> = {
  hero: '/coiffure-espace.jpg',
  heroCardCoiffure: '/coiffure-station.jpg',
  heroCardHeadSpa: '/head-spa-basin.jpg',
  heroCardRituels: '/candles-rituels.jpg',
  exclusiveOffer: '/offre-evasion.jpg',
  headSpa: '/head-spa-eau.jpg',
  coiffure: '/coiffure-mariee.jpg',
  rituels: '/rituels-ambiance.jpg',
  holistic: '/holistic-massage.jpg',
  carteCadeau: '/carte-cadeau.jpg',
  parfums: '/parfums-chogan.jpg',
  portrait: '/portrait-chacha.jpg',
  galerie1: '/coiffure-espace.jpg',
  galerie2: '/head-spa-eau.jpg',
  galerie3: '/rituels-ambiance.jpg',
  galerie4: '/holistic-massage.jpg',
};

export const PHOTO_CATALOG: SitePhotoMeta[] = [
  {
    key: 'hero',
    label: "Photo Principale du Salon (Hero)",
    section: "Accueil (Haut de page)",
    defaultSrc: '/coiffure-espace.jpg',
    aspect: "16:10",
  },
  {
    key: 'heroCardCoiffure',
    label: "Carte Coiffure Privée (Accueil)",
    section: "Bandeau 3 univers",
    defaultSrc: '/coiffure-station.jpg',
    aspect: "Carré / Portrait",
  },
  {
    key: 'heroCardHeadSpa',
    label: "Carte Head Spa Japonais (Accueil)",
    section: "Bandeau 3 univers",
    defaultSrc: '/head-spa-basin.jpg',
    aspect: "Carré / Portrait",
  },
  {
    key: 'heroCardRituels',
    label: "Carte Rituels Bien-Être (Accueil)",
    section: "Bandeau 3 univers",
    defaultSrc: '/candles-rituels.jpg',
    aspect: "Carré / Portrait",
  },
  {
    key: 'exclusiveOffer',
    label: "Photo de l'Offre Exclusivité & Nouveauté",
    section: "Section Offre Exclusive",
    defaultSrc: '/offre-evasion.jpg',
    aspect: "Portrait / Évasif",
  },
  {
    key: 'headSpa',
    label: "Photo Head Spa Japonais (Prestations)",
    section: "Univers 1 : Head Spa",
    defaultSrc: '/head-spa-eau.jpg',
    aspect: "4:3 ou Carré",
  },
  {
    key: 'coiffure',
    label: "Photo Coiffure Privée (Prestations)",
    section: "Univers 2 : Coiffure Privée",
    defaultSrc: '/coiffure-mariee.jpg',
    aspect: "4:3 ou Carré",
  },
  {
    key: 'rituels',
    label: "Photo Rituels Bien-Être (Prestations)",
    section: "Univers 3 : Rituels",
    defaultSrc: '/rituels-ambiance.jpg',
    aspect: "4:3 ou Carré",
  },
  {
    key: 'holistic',
    label: "Photo Massages & Holistique (Prestations)",
    section: "Univers 4 : Massages",
    defaultSrc: '/holistic-massage.jpg',
    aspect: "4:3 ou Carré",
  },
  {
    key: 'portrait',
    label: "Portrait de Charlène (Chacha)",
    section: "À Propos de moi",
    defaultSrc: '/portrait-chacha.jpg',
    aspect: "Portrait vertical 3:4",
  },
  {
    key: 'carteCadeau',
    label: "Visuel Officiel Carte Cadeau",
    section: "Carte Cadeau",
    defaultSrc: '/carte-cadeau.jpg',
    aspect: "3:2 Horizontal",
  },
  {
    key: 'parfums',
    label: "Espace Parfums Chogan",
    section: "Expérience Parfumée",
    defaultSrc: '/parfums-chogan.jpg',
    aspect: "3:4 ou 4:5",
  },
  {
    key: 'galerie1',
    label: "Galerie 1 (Coiffure)",
    section: "Pied de page / Galerie",
    defaultSrc: '/coiffure-espace.jpg',
    aspect: "4:5",
  },
  {
    key: 'galerie2',
    label: "Galerie 2 (Head Spa)",
    section: "Pied de page / Galerie",
    defaultSrc: '/head-spa-eau.jpg',
    aspect: "4:5",
  },
  {
    key: 'galerie3',
    label: "Galerie 3 (Rituels Bougies)",
    section: "Pied de page / Galerie",
    defaultSrc: '/rituels-ambiance.jpg',
    aspect: "4:5",
  },
  {
    key: 'galerie4',
    label: "Galerie 4 (Protocole Holistique)",
    section: "Pied de page / Galerie",
    defaultSrc: '/holistic-massage.jpg',
    aspect: "4:5",
  },
];

export const DEFAULT_NOVELTY_OFFER: NoveltyOfferData = {
  badge: "✨ Exclusivité & Nouveauté ✨",
  intro: "VOUS AVEZ ADORÉ L'OFFRE DÉCOUVERTE… PROLONGEZ MAINTENANT L'ÉVASION AVEC UNE EXPÉRIENCE ENCORE PLUS LONGUE",
  title: "L'Offre Évasion Sensorielle",
  subtitle: "Un rituel global, de la pointe des pieds à la pointe des cheveux…",
  quote: "Une véritable parenthèse où le corps et l'esprit ralentissent, pour un lâcher-prise profond.",
  durationBadge: "Durée 2h+",
  durationText: "Un peu plus de 2h rien que pour vous ♡",
  discountedPrice: 119,
  originalPrice: 135,
  genderNotice: "Offre réservée à la clientèle féminine • Uniquement sur rendez-vous",
  photo: '/offre-evasion.jpg',
  services: [
    {
      duration: "30 MIN",
      title: "Modelage corps intuitif et enveloppant",
      desc: "Des gestes lents et réconfortants, pour une détente profonde et une sensation de bien-être global.",
    },
    {
      duration: "1 H",
      title: "Head Spa Japonais",
      desc: "Une expérience unique mêlant eau, soins du cuir chevelu, techniques relaxantes et stimulation des sens pour un lâcher-prise absolu.",
    },
    {
      duration: "INCLUS",
      title: "Séchage inclus",
      desc: "Pour repartir tout en douceur et parfaitement coiffée.",
    },
  ],
};

const STORAGE_KEYS = {
  PHOTOS: 'cocon_site_photos_v1',
  NOVELTY: 'cocon_site_novelty_v1',
  ADMIN_AUTH: 'cocon_admin_auth_v1',
  PRESTATIONS: 'cocon_site_prestations_v1',
};

const EVENT_NAME = 'cocon_store_updated';

/**
 * Reads customized photos from storage
 */
export function getStoredPhotos(): Record<string, string> {
  if (typeof window === 'undefined') return { ...DEFAULT_PHOTOS };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    if (!raw) return { ...DEFAULT_PHOTOS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PHOTOS, ...parsed };
  } catch {
    return { ...DEFAULT_PHOTOS };
  }
}

/**
 * Saves photo to localStorage AND writes the image file directly to server disk (/public/uploads/)
 */
export async function savePhoto(key: string, urlOrBase64: string): Promise<string> {
  if (typeof window === 'undefined') return urlOrBase64;

  // Immediate optimistic update
  const current = getStoredPhotos();
  current[key] = urlOrBase64;
  try {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.warn('Storage write notice:', err);
  }

  // Persist image file to server disk (/public/uploads/) & /public/data/site-data.json
  try {
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, imageData: urlOrBase64 }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.url) {
        const latest = getStoredPhotos();
        latest[key] = json.url;
        localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(latest));
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
        return json.url;
      }
    }
  } catch (err) {
    console.warn('Disk image persistence notice:', err);
  }

  return urlOrBase64;
}

/**
 * Resets a single photo to default both locally and on server disk
 */
export function resetPhoto(key: string): void {
  if (typeof window === 'undefined') return;
  const current = getStoredPhotos();
  if (DEFAULT_PHOTOS[key]) {
    current[key] = DEFAULT_PHOTOS[key];
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch {
      // fallback
    }
    fetch('/api/reset-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: 'photos', key }),
    }).catch(() => {});
  }
}

/**
 * Resets all photos to factory defaults both locally and on server disk
 */
export function resetAllPhotos(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.PHOTOS);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore
  }
  fetch('/api/reset-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section: 'photos' }),
  }).catch(() => {});
}

/**
 * Reads novelty offer data from storage
 */
export function getStoredNoveltyOffer(): NoveltyOfferData {
  if (typeof window === 'undefined') return { ...DEFAULT_NOVELTY_OFFER };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOVELTY);
    if (!raw) return { ...DEFAULT_NOVELTY_OFFER };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_NOVELTY_OFFER,
      ...parsed,
      services: Array.isArray(parsed.services) && parsed.services.length > 0
        ? parsed.services
        : DEFAULT_NOVELTY_OFFER.services,
    };
  } catch {
    return { ...DEFAULT_NOVELTY_OFFER };
  }
}

/**
 * Updates novelty offer data and persists to /public/data/site-data.json on disk
 */
export function saveNoveltyOffer(data: Partial<NoveltyOfferData>): void {
  if (typeof window === 'undefined') return;
  const current = getStoredNoveltyOffer();
  const updated: NoveltyOfferData = {
    ...current,
    ...data,
  };
  try {
    localStorage.setItem(STORAGE_KEYS.NOVELTY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.warn('Novelty storage write notice:', err);
  }

  fetch('/api/site-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ novelty: updated }),
  })
    .then((r) => r.json())
    .then((res) => {
      if (res?.data?.novelty?.photo && res.data.novelty.photo !== updated.photo) {
        const withDiskUrl = { ...updated, photo: res.data.novelty.photo };
        localStorage.setItem(STORAGE_KEYS.NOVELTY, JSON.stringify(withDiskUrl));
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
      }
    })
    .catch(() => {});
}

/**
 * Resets novelty offer to factory default both locally and on server disk
 */
export function resetNoveltyOffer(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.NOVELTY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // ignore
  }
  fetch('/api/reset-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section: 'novelty' }),
  }).catch(() => {});
}

/**
 * Deep clone helper for default prestations
 */
function cloneDefaultPrestations(): Record<string, PrestationItem[]> {
  return JSON.parse(JSON.stringify(DEFAULT_PRESTATIONS));
}

/**
 * Reads customized prestations catalog from storage
 */
export function getStoredPrestations(): Record<string, PrestationItem[]> {
  if (typeof window === 'undefined') return cloneDefaultPrestations();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRESTATIONS);
    if (!raw) return cloneDefaultPrestations();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return cloneDefaultPrestations();

    // Ensure every default category exists in the returned object
    const merged: Record<string, PrestationItem[]> = cloneDefaultPrestations();
    for (const key of Object.keys(parsed)) {
      if (Array.isArray(parsed[key])) {
        merged[key] = parsed[key];
      }
    }
    return merged;
  } catch {
    return cloneDefaultPrestations();
  }
}

/**
 * Saves entire prestations map to storage AND writes to /public/data/site-data.json on disk
 */
export function savePrestations(data: Record<string, PrestationItem[]>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PRESTATIONS, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch (err) {
    console.warn('Prestations storage write notice:', err);
  }

  fetch('/api/site-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prestations: data }),
  }).catch(() => {});
}

/**
 * Adds a new prestation item to a category
 */
export function addPrestationItem(categoryKey: string, item: Omit<PrestationItem, 'id'> & { id?: string }): PrestationItem {
  const all = getStoredPrestations();
  const list = all[categoryKey] ? [...all[categoryKey]] : [];
  const newItem: PrestationItem = {
    ...item,
    id: item.id || `prest-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
  list.unshift(newItem);
  all[categoryKey] = list;
  savePrestations(all);
  return newItem;
}

/**
 * Updates an existing prestation item in a category
 */
export function updatePrestationItem(categoryKey: string, itemId: string, updatedFields: Partial<PrestationItem>): void {
  const all = getStoredPrestations();
  const list = all[categoryKey] ? [...all[categoryKey]] : [];
  all[categoryKey] = list.map((item) => (item.id === itemId ? { ...item, ...updatedFields, id: itemId } : item));
  savePrestations(all);
}

/**
 * Deletes a prestation item from a category
 */
export function deletePrestationItem(categoryKey: string, itemId: string): void {
  const all = getStoredPrestations();
  const list = all[categoryKey] ? [...all[categoryKey]] : [];
  all[categoryKey] = list.filter((item) => item.id !== itemId);
  savePrestations(all);
}

/**
 * Reorders a prestation item up or down within its category
 */
export function movePrestationItem(categoryKey: string, itemId: string, direction: 'up' | 'down'): void {
  const all = getStoredPrestations();
  const list = all[categoryKey] ? [...all[categoryKey]] : [];
  const idx = list.findIndex((item) => item.id === itemId);
  if (idx === -1) return;
  const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= list.length) return;
  const temp = list[idx];
  list[idx] = list[targetIdx];
  list[targetIdx] = temp;
  all[categoryKey] = list;
  savePrestations(all);
}

/**
 * Resets all prestations or a single category to factory defaults both locally and on disk
 */
export function resetPrestations(categoryKey?: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (!categoryKey) {
      localStorage.removeItem(STORAGE_KEYS.PRESTATIONS);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
      fetch('/api/reset-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'prestations' }),
      }).catch(() => {});
    } else {
      const all = getStoredPrestations();
      const defaults = cloneDefaultPrestations();
      all[categoryKey] = defaults[categoryKey] || [];
      savePrestations(all);
    }
  } catch {
    // ignore
  }
}

/**
 * Hydrates client storage from server disk (/public/data/site-data.json) on initial load
 */
let hasFetchedFromDisk = false;
export async function syncFromDisk(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const res = await fetch('/api/site-data', { cache: 'no-store' });
    if (!res.ok) return;
    const diskData = await res.json();
    let changed = false;

    if (diskData.photos && Object.keys(diskData.photos).length > 0) {
      const mergedPhotos = { ...DEFAULT_PHOTOS, ...diskData.photos };
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(mergedPhotos));
      changed = true;
    }

    if (diskData.novelty && Object.keys(diskData.novelty).length > 0) {
      const mergedNovelty = { ...DEFAULT_NOVELTY_OFFER, ...diskData.novelty };
      localStorage.setItem(STORAGE_KEYS.NOVELTY, JSON.stringify(mergedNovelty));
      changed = true;
    }

    if (diskData.prestations && Object.keys(diskData.prestations).length > 0) {
      const mergedPrestations = { ...cloneDefaultPrestations(), ...diskData.prestations };
      localStorage.setItem(STORAGE_KEYS.PRESTATIONS, JSON.stringify(mergedPrestations));
      changed = true;
    }

    if (changed) {
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    }
  } catch {
    // fallback to localStorage if offline
  }
}

/**
 * Admin authentication helpers
 * Code: admin
 * Pass: chacha
 */
export function verifyAdminCredentials(user: string, pass: string): boolean {
  const cleanUser = (user || '').trim().toLowerCase();
  const cleanPass = (pass || '').trim().toLowerCase();
  return cleanUser === 'admin' && cleanPass === 'chacha';
}

export function isSessionAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return (
      sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true' ||
      localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true'
    );
  } catch {
    return false;
  }
}

export function setSessionAdmin(authenticated: boolean, remember: boolean = false): void {
  if (typeof window === 'undefined') return;
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    window.dispatchEvent(new CustomEvent('cocon_auth_changed'));
  } catch {
    // ignore
  }
}

/**
 * High-performance image file optimizer & compressor
 * Resizes images client-side to maximum 1600px width/height and compresses to WebP/JPEG,
 * ensuring fast loading times and preventing localStorage capacity overflows.
 */
export async function optimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Try WebP first for optimal compression, fallback to high-grade JPEG
        try {
          const webpData = canvas.toDataURL('image/webp', 0.85);
          if (webpData.startsWith('data:image/webp')) {
            resolve(webpData);
            return;
          }
        } catch {
          // ignore
        }
        const jpegData = canvas.toDataURL('image/jpeg', 0.86);
        resolve(jpegData);
      };
      img.onerror = () => reject(new Error("Impossible de lire l'image"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Erreur de chargement du fichier"));
    reader.readAsDataURL(file);
  });
}

/**
 * React hook to consume and reactively update site store
 */
export function useSiteStore() {
  const [photos, setPhotos] = useState<Record<string, string>>(getStoredPhotos);
  const [novelty, setNovelty] = useState<NoveltyOfferData>(getStoredNoveltyOffer);
  const [prestations, setPrestations] = useState<Record<string, PrestationItem[]>>(getStoredPrestations);
  const [isAdmin, setIsAdmin] = useState<boolean>(isSessionAdmin);

  useEffect(() => {
    if (!hasFetchedFromDisk) {
      hasFetchedFromDisk = true;
      syncFromDisk();
    }

    const handleUpdate = () => {
      setPhotos(getStoredPhotos());
      setNovelty(getStoredNoveltyOffer());
      setPrestations(getStoredPrestations());
    };

    const handleAuth = () => {
      setIsAdmin(isSessionAdmin());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('cocon_auth_changed', handleAuth);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('cocon_auth_changed', handleAuth);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    photos,
    novelty,
    prestations,
    isAdmin,
    updatePhoto: savePhoto,
    resetPhoto,
    resetAllPhotos,
    updateNovelty: saveNoveltyOffer,
    resetNovelty: resetNoveltyOffer,
    savePrestations,
    addPrestationItem,
    updatePrestationItem,
    deletePrestationItem,
    movePrestationItem,
    resetPrestations,
    syncFromDisk,
    logout: () => setSessionAdmin(false),
  };
}
