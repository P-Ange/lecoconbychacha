import { createClient } from '@supabase/supabase-js';

/**
 * Configuration Supabase pour la persistance en production (Netlify)
 * Project Ref: uqgglneglrycmbywsepq
 * Publishable Key: sb_publishable_cTHbDKIoqosXiJfPsCPxaw_E6czYamF
 */
export const SUPABASE_PROJECT_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://uqgglneglrycmbywsepq.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ2dsbmVnbHJ5Y21ieXdzZXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NjIxMzUsImV4cCI6MjEwOTAzODEzNX0.Dz_rb0n7dbP8F2pFIbl32OSEuflbPQPeV2o_933Pn14';

export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_cTHbDKIoqosXiJfPsCPxaw_E6czYamF';

export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

/**
 * Convertit une chaîne base64 Data URL en objet Blob prêt pour l'envoi dans Supabase Storage
 */
export function dataUrlToBlob(dataUrl: string): { blob: Blob; ext: string; mimeType: string } {
  const matches = dataUrl.match(/^data:(image\/([a-zA-Z0-9+.-]+));base64,(.+)$/);
  if (!matches || matches.length !== 4) {
    throw new Error('Format Data URL invalide');
  }

  const mimeType = matches[1];
  let ext = matches[2].toLowerCase();
  if (ext === 'jpeg') ext = 'jpg';

  const base64Data = matches[3];
  const byteCharacters = atob(base64Data);
  const buffer = new ArrayBuffer(byteCharacters.length);
  const byteArray = new Uint8Array(buffer);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  const blob = new Blob([buffer], { type: mimeType });
  return { blob, ext, mimeType };
}
