import type { Area } from 'react-easy-crop';

/**
 * Calculates the bounding box size of an image rotated by given degrees
 */
export function calculateRotatedBox(width: number, height: number, degrees: number): { width: number; height: number } {
  const rad = (Math.abs(degrees) * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  return {
    width: Math.round(Math.abs(width * cos) + Math.abs(height * sin)),
    height: Math.round(Math.abs(width * sin) + Math.abs(height * cos)),
  };
}

/**
 * Parses aspect ratio description into a numeric value
 */
export function parseAspectRatio(aspectStr?: string): number | undefined {
  if (!aspectStr) return undefined;
  const s = aspectStr.toLowerCase();

  if (s.includes('16:9') || s.includes('16/9')) return 16 / 9;
  if (s.includes('16:10') || s.includes('16/10')) return 16 / 10;
  if (s.includes('4:3') || s.includes('4/3')) return 4 / 3;
  if (s.includes('3:2') || s.includes('3/2')) return 3 / 2;
  if (s.includes('3:4') || s.includes('3/4')) return 3 / 4;
  if (s.includes('4:5') || s.includes('4/5')) return 4 / 5;
  if (s.includes('carré') || s.includes('1:1')) return 1;
  if (s.includes('évasif') || s.includes('portrait')) return 4 / 5;

  return 4 / 3;
}

/**
 * Loads an image by source URL or base64 data string
 */
export function createImgElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(new Error(`Impossible de charger l'image pour le recadrage: ${error}`));
    img.src = url;
  });
}

/**
 * Crops and rotates an image source using pixel coordinates and returns an optimized WebP/JPEG data URL
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation: number = 0,
  maxDimension: number = 1600
): Promise<string> {
  const image = await createImgElement(imageSrc);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable');
  }

  // If rotated, draw onto intermediate canvas first
  const normalizedRotation = ((rotation % 360) + 360) % 360;

  let sourceCanvas: HTMLCanvasElement | HTMLImageElement = image;

  if (normalizedRotation !== 0) {
    const { width: bBoxW, height: bBoxH } = calculateRotatedBox(image.naturalWidth || image.width, image.naturalHeight || image.height, normalizedRotation);
    const rotCanvas = document.createElement('canvas');
    rotCanvas.width = bBoxW;
    rotCanvas.height = bBoxH;
    const rotCtx = rotCanvas.getContext('2d');
    if (!rotCtx) throw new Error('Rotation canvas context unavailable');

    rotCtx.translate(bBoxW / 2, bBoxH / 2);
    rotCtx.rotate((normalizedRotation * Math.PI) / 180);
    rotCtx.translate(-(image.naturalWidth || image.width) / 2, -(image.naturalHeight || image.height) / 2);
    rotCtx.drawImage(image, 0, 0);

    sourceCanvas = rotCanvas;
  }

  // Calculate target dimensions respecting max bounds
  let targetW = Math.max(1, Math.round(pixelCrop.width));
  let targetH = Math.max(1, Math.round(pixelCrop.height));

  if (targetW > maxDimension || targetH > maxDimension) {
    if (targetW > targetH) {
      targetH = Math.round((targetH * maxDimension) / targetW);
      targetW = maxDimension;
    } else {
      targetW = Math.round((targetW * maxDimension) / targetH);
      targetH = maxDimension;
    }
  }

  canvas.width = targetW;
  canvas.height = targetH;

  // Smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    sourceCanvas,
    Math.round(pixelCrop.x),
    Math.round(pixelCrop.y),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height),
    0,
    0,
    targetW,
    targetH
  );

  // Export to WebP with fallback to high-quality JPEG
  try {
    const webpUrl = canvas.toDataURL('image/webp', 0.88);
    if (webpUrl.startsWith('data:image/webp')) {
      return webpUrl;
    }
  } catch {
    // Fallback if browser doesn't support webp export
  }

  return canvas.toDataURL('image/jpeg', 0.88);
}
