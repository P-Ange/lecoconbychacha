import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(PUBLIC_DIR, 'uploads');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-data.json');

// Ensure directories exist on disk
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface PersistedSiteData {
  photos?: Record<string, string>;
  novelty?: any;
  prestations?: Record<string, any[]>;
  updatedAt?: string;
}

function readSiteDataFromDisk(): PersistedSiteData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading site-data.json:', err);
  }
  return {};
}

function writeSiteDataToDisk(data: PersistedSiteData): void {
  try {
    const existing = readSiteDataFromDisk();
    const merged: PersistedSiteData = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(merged, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing site-data.json:', err);
  }
}

/**
 * If an image string is a base64 Data URL, writes it as a physical file in /public/uploads/
 * and returns its public path (e.g. "/uploads/exclusiveOffer-1730380000.webp").
 */
function saveBase64ImageToDisk(slotKey: string, dataUrl: string): string {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }

  const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return dataUrl;
  }

  let ext = matches[1].toLowerCase();
  if (ext === 'jpeg') ext = 'jpg';
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  const safeKey = slotKey.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safeKey}-${Date.now()}.${ext}`;
  const filePath = path.join(UPLOADS_DIR, filename);

  fs.writeFileSync(filePath, buffer);
  return `/uploads/${filename}`;
}

async function startServer() {
  const app = express();

  // Increase payload limit to 50MB for high-res cropped images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Serve uploaded files and data directory statically with no-cache headers for instant updates
  app.use(
    '/uploads',
    express.static(UPLOADS_DIR, {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      },
    })
  );

  // ============================================================================
  // API ROUTES FOR REAL DISK PERSISTENCE
  // ============================================================================

  // GET /api/site-data : Read saved photos, novelty offer, and prestations from disk
  app.get('/api/site-data', (_req, res) => {
    const data = readSiteDataFromDisk();
    res.setHeader('Cache-Control', 'no-store');
    res.json(data);
  });

  // POST /api/upload-image : Save uploaded/cropped image directly into /public/uploads/
  app.post('/api/upload-image', (req, res) => {
    try {
      const { key, imageData } = req.body;
      if (!key || !imageData) {
        res.status(400).json({ error: 'Paramètres key et imageData requis' });
        return;
      }

      const savedUrl = saveBase64ImageToDisk(key, imageData);
      const current = readSiteDataFromDisk();
      const photos = { ...(current.photos || {}), [key]: savedUrl };

      // If updating exclusiveOffer or novelty, also sync novelty.photo on disk
      const novelty = current.novelty ? { ...current.novelty } : undefined;
      if ((key === 'exclusiveOffer' || key === 'novelty') && novelty) {
        novelty.photo = savedUrl;
      }

      writeSiteDataToDisk({
        photos,
        ...(novelty ? { novelty } : {}),
      });

      res.json({
        success: true,
        url: savedUrl,
        photos,
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ error: err?.message || 'Erreur écriture fichier' });
    }
  });

  // POST /api/site-data : Save photos, novelty, or prestations to /public/data/site-data.json
  app.post('/api/site-data', (req, res) => {
    try {
      const { photos, novelty, prestations } = req.body;
      const current = readSiteDataFromDisk();

      const updated: PersistedSiteData = { ...current };

      if (photos !== undefined) {
        // Convert any remaining base64 images to files on disk automatically
        const processedPhotos: Record<string, string> = {};
        for (const [k, v] of Object.entries(photos as Record<string, string>)) {
          processedPhotos[k] = v && v.startsWith('data:image/') ? saveBase64ImageToDisk(k, v) : v;
        }
        updated.photos = processedPhotos;
      }

      if (novelty !== undefined) {
        const processedNovelty = { ...novelty };
        if (processedNovelty.photo && processedNovelty.photo.startsWith('data:image/')) {
          processedNovelty.photo = saveBase64ImageToDisk('exclusiveOffer', processedNovelty.photo);
        }
        updated.novelty = processedNovelty;
      }

      if (prestations !== undefined) {
        updated.prestations = prestations;
      }

      writeSiteDataToDisk(updated);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      console.error('Save site-data error:', err);
      res.status(500).json({ error: err?.message || 'Erreur sauvegarde disque' });
    }
  });

  // POST /api/reset-data : Reset specific section on disk
  app.post('/api/reset-data', (req, res) => {
    try {
      const { section, key } = req.body;
      const current = readSiteDataFromDisk();

      if (section === 'photos') {
        if (key && current.photos) {
          delete current.photos[key];
        } else {
          delete current.photos;
        }
      } else if (section === 'novelty') {
        delete current.novelty;
      } else if (section === 'prestations') {
        if (key && current.prestations) {
          delete current.prestations[key];
        } else {
          delete current.prestations;
        }
      } else if (section === 'all') {
        delete current.photos;
        delete current.novelty;
        delete current.prestations;
      }

      fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2), 'utf-8');
      res.json({ success: true, data: current });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Erreur réinitialisation disque' });
    }
  });

  // ============================================================================
  // VITE MIDDLEWARE OR PRODUCTION STATIC ASSETS
  // ============================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} with real disk persistence in /public/uploads & /public/data`);
  });
}

startServer();
