import React, { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import {
  Crop as CropIcon,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Check,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { getCroppedImg } from '../utils/cropImage';

export interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  targetTitle: string;
  recommendedAspect?: number;
  recommendedAspectLabel?: string;
  onConfirm: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

interface AspectOption {
  label: string;
  value: number | undefined;
  desc: string;
}

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  targetTitle,
  recommendedAspect = 4 / 3,
  recommendedAspectLabel = '4:3',
  onConfirm,
  onCancel,
}) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [aspect, setAspect] = useState<number | undefined>(recommendedAspect);
  const [selectedAspectKey, setSelectedAspectKey] = useState<string>('recommended');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Aspect ratio presets
  const aspectOptions: { key: string; label: string; value: number | undefined; tag: string }[] = [
    {
      key: 'recommended',
      label: `Recommandé (${recommendedAspectLabel})`,
      value: recommendedAspect,
      tag: 'Optimisé',
    },
    { key: '16_9', label: '16:9', value: 16 / 9, tag: 'Bannière' },
    { key: '4_3', label: '4:3', value: 4 / 3, tag: 'Prestation' },
    { key: '1_1', label: '1:1', value: 1, tag: 'Carré' },
    { key: '3_4', label: '3:4', value: 3 / 4, tag: 'Portrait' },
    { key: '4_5', label: '4:5', value: 4 / 5, tag: 'Galerie' },
    { key: 'free', label: 'Libre', value: undefined, tag: 'Manuel' },
  ];

  const handleSelectAspect = (key: string, value: number | undefined) => {
    setSelectedAspectKey(key);
    setAspect(value);
  };

  const onCropComplete = useCallback((_croppedArea: Area, currentCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(currentCroppedAreaPixels);
  }, []);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(recommendedAspect);
    setSelectedAspectKey('recommended');
  };

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedUrl = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onConfirm(croppedUrl);
    } catch (err) {
      console.error('Erreur lors du recadrage:', err);
      alert("Une erreur est survenue lors de l'application du cadrage. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[95vh] bg-[#FAF6F0] rounded-[2rem] border-2 border-[#B5986B]/60 shadow-2xl flex flex-col overflow-hidden text-[#2C2523]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8D8C8] flex items-center justify-between bg-[#F4ECE0]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B5986B]/50 flex items-center justify-center text-[#9E8256] shadow-sm">
              <CropIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-title text-xl font-bold uppercase tracking-wide text-[#2C2523]">
                  Cadrer &amp; Ajuster l'image
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EFE6D8] border border-[#B5986B]/40 text-[10px] font-semibold text-[#8A6F44]">
                  <Sparkles className="w-3 h-3 text-[#B5986B]" /> Studio
                </span>
              </div>
              <p className="text-xs text-[#5A4E46] truncate max-w-[280px] sm:max-w-md">
                {targetTitle || 'Ajustez la zone visible et le zoom'}
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#E8D8C8] border border-[#E8D8C8] flex items-center justify-center text-[#5A4E46] transition-colors cursor-pointer"
            aria-label="Fermer le recadrage"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper Viewport Area */}
        <div className="relative w-full bg-[#1F1918] h-[340px] sm:h-[400px] overflow-hidden select-none">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={true}
            cropShape="rect"
            style={{
              containerStyle: {
                backgroundColor: '#1E1917',
              },
              cropAreaStyle: {
                border: '2px solid rgba(181, 152, 107, 0.9)',
                boxShadow: '0 0 0 9999em rgba(20, 16, 15, 0.65)',
              },
            }}
          />

          {/* Quick helper tag on top of cropper */}
          <div className="absolute top-3 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-[#FAF6F0]/90 border border-white/10">
            <Maximize2 className="w-3 h-3 text-[#B5986B]" />
            <span>Glissez pour déplacer • Pincez ou zoomez pour cadrer</span>
          </div>

          {/* Pixel dimension readout */}
          {croppedAreaPixels && (
            <div className="absolute bottom-3 right-3 pointer-events-none z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-[#EFE6D8] border border-white/10">
              {Math.round(croppedAreaPixels.width)} × {Math.round(croppedAreaPixels.height)} px
            </div>
          )}
        </div>

        {/* Controls Container */}
        <div className="p-4 sm:p-5 space-y-4 bg-[#FAF6F0] overflow-y-auto max-h-[35vh]">
          
          {/* 1. Proportions / Formats */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5A4E46]">
                Format &amp; Proportions
              </span>
              <span className="text-[11px] text-[#8A6F44] font-medium">
                {aspectOptions.find((o) => o.key === selectedAspectKey)?.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {aspectOptions.map((opt) => {
                const isSelected = selectedAspectKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectAspect(opt.key, opt.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#2C2523] text-[#FAF6F0] border-[#2C2523] shadow-md shadow-[#2C2523]/10 font-semibold'
                        : 'bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] border-[#E8D8C8]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded ${
                        isSelected ? 'bg-[#B5986B] text-white' : 'bg-[#E8D8C8] text-[#8A6F44]'
                      }`}
                    >
                      {opt.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Zoom, Rotation & Actions */}
          <div className="pt-2 border-t border-[#E8D8C8] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center">
            
            {/* Zoom Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#5A4E46]">
                <span className="font-semibold flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-[#B5986B]" /> Zoom
                </span>
                <span className="font-mono text-[#8A6F44] font-medium">
                  {zoom.toFixed(1)}×
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(1)))}
                  className="w-7 h-7 rounded-lg bg-[#F3ECE1] hover:bg-[#E8D8C8] flex items-center justify-center text-[#5A4E46] transition-colors cursor-pointer border border-[#E8D8C8]"
                  title="Dézoomer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-[#9E8256] h-1.5 bg-[#E8D8C8] rounded-lg cursor-pointer"
                  aria-label="Contrôle du zoom"
                />
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(1)))}
                  className="w-7 h-7 rounded-lg bg-[#F3ECE1] hover:bg-[#E8D8C8] flex items-center justify-center text-[#5A4E46] transition-colors cursor-pointer border border-[#E8D8C8]"
                  title="Zoomer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rotation & Reset */}
            <div className="flex items-center justify-end gap-2 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={handleRotate}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-medium border border-[#E8D8C8] transition-colors cursor-pointer"
                title="Pivoter de 90° vers la droite"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#9E8256]" />
                <span>Tourner 90°</span>
                {rotation !== 0 && (
                  <span className="text-[10px] text-[#B5986B] font-bold">({rotation}°)</span>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-medium border border-[#E8D8C8] transition-colors cursor-pointer"
                title="Réinitialiser le cadrage"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser</span>
              </button>
            </div>

          </div>

        </div>

        {/* Footer actions */}
        <div className="px-5 py-3.5 bg-[#F4ECE0]/80 border-t border-[#E8D8C8] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="px-4 py-2.5 rounded-xl border border-[#D5C5B5] bg-white/70 hover:bg-white text-[#5A4E46] text-xs font-medium transition-all cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9E8256] via-[#B5986B] to-[#8A6F44] hover:from-[#8A6F44] hover:to-[#9E8256] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#9E8256]/25 transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Traitement du cadrage...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Valider et appliquer le cadrage ✨</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
