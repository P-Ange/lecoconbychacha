import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Unlock,
  X,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Check,
  AlertCircle,
  Eye,
  Sparkles,
  Layers,
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Crop,
} from 'lucide-react';
import { ImageCropModal } from './ImageCropModal';
import { parseAspectRatio } from '../utils/cropImage';
import {
  useSiteStore,
  verifyAdminCredentials,
  setSessionAdmin,
  isSessionAdmin,
  optimizeImageFile,
  PHOTO_CATALOG,
  NoveltyOfferData,
  DEFAULT_NOVELTY_OFFER,
  DEFAULT_PHOTOS,
} from '../utils/siteStore';

export const AdminModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'novelty' | 'photos'>('novelty');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const {
    photos,
    novelty,
    isAdmin,
    updatePhoto,
    resetPhoto,
    resetAllPhotos,
    updateNovelty,
    resetNovelty,
    logout,
  } = useSiteStore();

  // Local editable draft for novelty offer
  const [noveltyDraft, setNoveltyDraft] = useState<NoveltyOfferData>(novelty);
  const [selectedPhotoKey, setSelectedPhotoKey] = useState<string>('exclusiveOffer');

  // Cropper Modal state
  const [cropState, setCropState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    targetKey: string;
    targetTitle: string;
    recommendedAspect?: number;
    recommendedAspectLabel?: string;
  }>({
    isOpen: false,
    imageSrc: '',
    targetKey: '',
    targetTitle: '',
    recommendedAspect: 4 / 3,
    recommendedAspectLabel: '4:3',
  });

  // Sync draft when store changes
  useEffect(() => {
    setNoveltyDraft(novelty);
  }, [novelty]);

  // Listen to open_admin_modal custom event
  useEffect(() => {
    const handleOpen = (e: any) => {
      setIsOpen(true);
      if (e?.detail?.tab) {
        setActiveTab(e.detail.tab);
      }
    };

    window.addEventListener('open_admin_modal', handleOpen);

    // Also support #admin in URL
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('open_admin_modal', handleOpen);
    };
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInput = username || (formData.get('username') as string) || '';
    const passInput = password || (formData.get('password') as string) || '';

    if (verifyAdminCredentials(userInput, passInput)) {
      setSessionAdmin(true, rememberMe);
      setAuthError('');
      setUsername('');
      setPassword('');
      showSuccess("Connexion réussie. Bienvenue dans votre espace d'administration ! ✨");
    } else {
      setAuthError("Code ou mot de passe incorrect. (Indice : code: admin / pass: chacha)");
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const showSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 4000);
  };

  // Helper to read raw file as data URL for interactive cropping
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Impossible de lire le fichier image sélectionné."));
      reader.readAsDataURL(file);
    });
  };

  // Novelty photo upload handler: triggers cropper modal first
  const handleNoveltyPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setCropState({
        isOpen: true,
        imageSrc: dataUrl,
        targetKey: 'novelty',
        targetTitle: "Offre Exclusivité & Nouveauté",
        recommendedAspect: 4 / 5,
        recommendedAspectLabel: "4:5 Portrait / Évasif",
      });
      // Reset input value so re-selecting same image fires onChange
      e.target.value = '';
    } catch (err) {
      alert("Erreur lors de la lecture du fichier image. Veuillez réessayer.");
    }
  };

  // Generic photo upload handler for any catalog slot: triggers cropper modal first
  const handleSlotPhotoUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const catalogItem = PHOTO_CATALOG.find((p) => p.key === key);
    const aspect = parseAspectRatio(catalogItem?.aspect) || (4 / 3);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setCropState({
        isOpen: true,
        imageSrc: dataUrl,
        targetKey: key,
        targetTitle: catalogItem?.label || key,
        recommendedAspect: aspect,
        recommendedAspectLabel: catalogItem?.aspect || '4:3',
      });
      e.target.value = '';
    } catch (err) {
      alert("Erreur lors de la lecture du fichier image.");
    }
  };

  // Allows cropping the current novelty photo without uploading a new file
  const handleOpenCropForCurrentNovelty = () => {
    const currentSrc = noveltyDraft.photo || photos.exclusiveOffer || '/offre-evasion.jpg';
    setCropState({
      isOpen: true,
      imageSrc: currentSrc,
      targetKey: 'novelty',
      targetTitle: "Offre Exclusivité & Nouveauté (Ajuster le cadrage)",
      recommendedAspect: 4 / 5,
      recommendedAspectLabel: "4:5 Portrait / Évasif",
    });
  };

  // Allows cropping an existing slot photo without uploading a new file
  const handleOpenCropForSlot = (item: (typeof PHOTO_CATALOG)[0]) => {
    const currentSrc = photos[item.key] || item.defaultSrc;
    const aspect = parseAspectRatio(item.aspect) || (4 / 3);
    setCropState({
      isOpen: true,
      imageSrc: currentSrc,
      targetKey: item.key,
      targetTitle: item.label,
      recommendedAspect: aspect,
      recommendedAspectLabel: item.aspect,
    });
  };

  // Validates and applies the cropped image to store
  const handleCropConfirm = (croppedDataUrl: string) => {
    if (cropState.targetKey === 'novelty') {
      setNoveltyDraft((prev) => ({ ...prev, photo: croppedDataUrl }));
      updateNovelty({ photo: croppedDataUrl });
      updatePhoto('exclusiveOffer', croppedDataUrl);
      showSuccess("Photo de l'offre recadrée et enregistrée avec succès ! ✨");
    } else {
      updatePhoto(cropState.targetKey, croppedDataUrl);
      if (cropState.targetKey === 'exclusiveOffer') {
        updateNovelty({ photo: croppedDataUrl });
        setNoveltyDraft((prev) => ({ ...prev, photo: croppedDataUrl }));
      }
      showSuccess(`Photo recadrée et mise à jour pour : ${cropState.targetTitle} ! ✨`);
    }
    setCropState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCropCancel = () => {
    setCropState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSaveNovelty = () => {
    updateNovelty(noveltyDraft);
    showSuccess("L'Offre Exclusivité & Nouveauté a été enregistrée avec succès ! ✨");
  };

  const handleResetNovelty = () => {
    if (window.confirm("Voulez-vous réinitialiser l'offre à son contenu initial ?")) {
      resetNovelty();
      setNoveltyDraft(DEFAULT_NOVELTY_OFFER);
      showSuccess("Offre réinitialisée au contenu d'origine.");
    }
  };

  const handleResetAllPhotos = () => {
    if (window.confirm("Êtes-vous sûr(e) de vouloir rétablir toutes les photos d'origine du site ?")) {
      resetAllPhotos();
      showSuccess("Toutes les photos ont été rétablies à leur version initiale.");
    }
  };

  if (!isOpen) {
    // Show a small discreet floating icon if admin is active
    if (isAdmin) {
      return (
        <div className="fixed bottom-5 left-5 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2C2523] text-[#EFE6D8] border border-[#B5986B]/60 shadow-xl hover:bg-[#9E8256] hover:text-white transition-all text-xs font-semibold cursor-pointer transform hover:scale-105"
            title="Espace administration actif - Cliquer pour ouvrir"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B5986B]" />
            <span>Admin Cocon</span>
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF6F0] rounded-[2rem] border-2 border-[#B5986B]/50 shadow-2xl flex flex-col overflow-hidden text-[#2C2523]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8D8C8] flex items-center justify-between bg-[#F4ECE0]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#B5986B]/40 flex items-center justify-center text-[#9E8256] shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-title text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#2C2523]">
                Espace Administration Privé
              </h2>
              <p className="text-xs text-[#5A4E46]">
                Le Cocon Sensoriel by Chacha • Gestion autonome des photos &amp; offres
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-medium transition-colors cursor-pointer"
                title="Se déconnecter"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-[#FAF6F0] hover:bg-[#E8D8C8] border border-[#E8D8C8] flex items-center justify-center text-[#5A4E46] transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Message */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-medium animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* ========================================================
              UNAUTHENTICATED VIEW: LOGIN FORM
              ======================================================== */}
          {!isAdmin ? (
            <div className="max-w-md mx-auto py-8 space-y-6">
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F3ECE1] border-2 border-[#B5986B]/40 flex items-center justify-center text-[#9E8256] shadow-sm">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="font-serif-title text-2xl font-bold uppercase tracking-wider text-[#2C2523]">
                  Accès Réservé
                </h3>
                <p className="text-sm text-[#5A4E46]">
                  Connectez-vous pour mettre à jour les photos du site et l'offre d'exception à tout moment.
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 bg-[#FAF6F0] p-6 rounded-2xl border border-[#E8D8C8] shadow-sm">
                
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5A4E46] mb-1.5">
                    Identifiant / Code
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    autoFocus
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C4B0] bg-white text-[#2C2523] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E8256]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#5A4E46] mb-1.5">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D5C4B0] bg-white text-[#2C2523] text-sm focus:outline-none focus:ring-2 focus:ring-[#9E8256]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#9E8256] focus:ring-[#9E8256] border-[#D5C4B0]"
                  />
                  <label htmlFor="remember" className="text-xs text-[#5A4E46] cursor-pointer">
                    Mémoriser la connexion sur cet appareil
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] hover:from-[#8A6F44] hover:to-[#A38659] text-white text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all duration-300 mt-2 cursor-pointer"
                >
                  SE CONNECTER &gt;
                </button>
              </form>

              <div className="text-center text-xs text-[#5A4E46]/80 space-y-1">
                <p>Identifiants d'accès convenus :</p>
                <p className="font-mono text-[#9E8256]">Code : <strong>admin</strong> • Mot de passe : <strong>chacha</strong></p>
              </div>

            </div>
          ) : (
            /* ========================================================
               AUTHENTICATED VIEW: ADMIN DASHBOARD
               ======================================================== */
            <div className="space-y-6">
              
              {/* Tabs Switcher */}
              <div className="flex flex-wrap gap-2 border-b border-[#E8D8C8] pb-4">
                <button
                  onClick={() => setActiveTab('novelty')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeTab === 'novelty'
                      ? 'bg-[#9E8256] text-white shadow-md'
                      : 'bg-[#F3ECE1] text-[#5A4E46] hover:bg-[#E8D8C8]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Exclusivité &amp; Nouveauté</span>
                </button>

                <button
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeTab === 'photos'
                      ? 'bg-[#9E8256] text-white shadow-md'
                      : 'bg-[#F3ECE1] text-[#5A4E46] hover:bg-[#E8D8C8]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Toutes les Photos du Site ({PHOTO_CATALOG.length})</span>
                </button>
              </div>

              {/* ========================================================
                  TAB 1: GESTION EXCLUSIVITÉ & NOUVEAUTÉ
                  ======================================================== */}
              {activeTab === 'novelty' && (
                <div className="space-y-6">
                  
                  <div className="bg-[#FAF6F0] p-4 sm:p-6 rounded-2xl border border-[#E8D8C8] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif-title text-xl font-bold uppercase tracking-wide text-[#2C2523]">
                          Photo de l'Offre Exclusivité &amp; Nouveauté
                        </h3>
                        <p className="text-xs text-[#5A4E46]">
                          Vous pouvez changer cette photo en toute autonomie à tout moment.
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8D8C8] text-[#9E8256]">
                        Photo Actuelle
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      
                      {/* Photo Thumbnail */}
                      <div className="sm:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden border border-[#B5986B]/40 bg-[#EFE6D8] shadow-md relative">
                        <img
                          src={noveltyDraft.photo || photos.exclusiveOffer || '/offre-evasion.jpg'}
                          alt="Aperçu offre"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Photo Actions */}
                      <div className="sm:col-span-8 space-y-3">
                        <label className="block">
                          <span className="text-xs font-semibold text-[#5A4E46] block mb-1">
                            Importer une nouvelle photo (cadrage interactif automatique) :
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleNoveltyPhotoUpload}
                            className="block w-full text-xs text-[#5A4E46] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#9E8256] file:text-white hover:file:bg-[#8A6F44] file:cursor-pointer"
                          />
                        </label>

                        {/* Interactive Framing trigger for current photo */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleOpenCropForCurrentNovelty}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#E8D8C8] text-[#9E8256] border border-[#B5986B]/60 text-xs font-semibold cursor-pointer shadow-sm transition-all"
                            title="Recadrer et ajuster le zoom de la photo actuelle"
                          >
                            <Crop className="w-3.5 h-3.5 text-[#9E8256]" />
                            <span>Cadrer / Ajuster l'image actuelle</span>
                          </button>
                        </div>

                        <div className="pt-1">
                          <span className="text-xs font-semibold text-[#5A4E46] block mb-1">
                            Ou renseigner un lien direct d'image (URL) :
                          </span>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={noveltyDraft.photo}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNoveltyDraft((prev) => ({ ...prev, photo: val }));
                                updateNovelty({ photo: val });
                                updatePhoto('exclusiveOffer', val);
                              }}
                              placeholder="https://..."
                              className="flex-1 px-3 py-1.5 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updatePhoto('exclusiveOffer', DEFAULT_PHOTOS.exclusiveOffer);
                                setNoveltyDraft((prev) => ({ ...prev, photo: DEFAULT_PHOTOS.exclusiveOffer }));
                                updateNovelty({ photo: DEFAULT_PHOTOS.exclusiveOffer });
                                showSuccess("Photo rétablie à la version initiale.");
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-medium cursor-pointer"
                              title="Rétablir la photo d'origine"
                            >
                              Réinitialiser
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Text & Offer Fields */}
                  <div className="bg-[#FAF6F0] p-4 sm:p-6 rounded-2xl border border-[#E8D8C8] shadow-sm space-y-4">
                    <h3 className="font-serif-title text-xl font-bold uppercase tracking-wide text-[#2C2523]">
                      Contenu &amp; Tarifs de l'Offre
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div>
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Titre de l'Offre
                        </label>
                        <input
                          type="text"
                          value={noveltyDraft.title}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Badge d'annonce
                        </label>
                        <input
                          type="text"
                          value={noveltyDraft.badge}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, badge: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Sous-titre cursif
                        </label>
                        <input
                          type="text"
                          value={noveltyDraft.subtitle}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Texte durée (ex: "Un peu plus de 2h rien que pour vous ♡")
                        </label>
                        <input
                          type="text"
                          value={noveltyDraft.durationText}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, durationText: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Prix Remisé (€)
                        </label>
                        <input
                          type="number"
                          value={noveltyDraft.discountedPrice}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, discountedPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Prix d'origine sans remise (€)
                        </label>
                        <input
                          type="number"
                          value={noveltyDraft.originalPrice}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, originalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Phrase d'introduction supérieure
                        </label>
                        <textarea
                          rows={2}
                          value={noveltyDraft.intro}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, intro: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                          Citation d'ambiance
                        </label>
                        <input
                          type="text"
                          value={noveltyDraft.quote}
                          onChange={(e) => setNoveltyDraft({ ...noveltyDraft, quote: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                        />
                      </div>

                    </div>

                    {/* Étapes du soin */}
                    <div className="pt-2 border-t border-[#E8D8C8] space-y-3">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C2523]">
                        Les 3 Étapes du Soin Incluses :
                      </label>
                      
                      {noveltyDraft.services.map((step, idx) => (
                        <div key={idx} className="p-3 bg-[#F4ECE0]/60 rounded-xl border border-[#E8D8C8] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              value={step.duration}
                              onChange={(e) => {
                                const newServices = [...noveltyDraft.services];
                                newServices[idx].duration = e.target.value;
                                setNoveltyDraft({ ...noveltyDraft, services: newServices });
                              }}
                              placeholder="30 MIN"
                              className="w-full px-2 py-1.5 rounded-lg border border-[#D5C4B0] bg-white text-xs font-bold text-[#9E8256]"
                            />
                          </div>
                          <div className="sm:col-span-4">
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => {
                                const newServices = [...noveltyDraft.services];
                                newServices[idx].title = e.target.value;
                                setNoveltyDraft({ ...noveltyDraft, services: newServices });
                              }}
                              placeholder="Titre de l'étape"
                              className="w-full px-2 py-1.5 rounded-lg border border-[#D5C4B0] bg-white text-xs font-semibold"
                            />
                          </div>
                          <div className="sm:col-span-6">
                            <input
                              type="text"
                              value={step.desc}
                              onChange={(e) => {
                                const newServices = [...noveltyDraft.services];
                                newServices[idx].desc = e.target.value;
                                setNoveltyDraft({ ...noveltyDraft, services: newServices });
                              }}
                              placeholder="Description"
                              className="w-full px-2 py-1.5 rounded-lg border border-[#D5C4B0] bg-white text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8D8C8]">
                      <button
                        type="button"
                        onClick={handleResetNovelty}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-medium cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Rétablir l'offre par défaut</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveNovelty}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] hover:from-[#8A6F44] hover:to-[#A38659] text-white text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Enregistrer les modifications</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* ========================================================
                  TAB 2: GESTION DE TOUTES LES PHOTOS DU SITE
                  ======================================================== */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8D8C8]">
                    <div>
                      <h3 className="font-serif-title text-xl font-bold uppercase tracking-wide text-[#2C2523]">
                        Gestionnaire Global des Photos
                      </h3>
                      <p className="text-xs text-[#5A4E46]">
                        Personnalisez n'importe quelle photo du site sans modifier une seule ligne de code.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetAllPhotos}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rétablir toutes les photos d'origine</span>
                    </button>
                  </div>

                  {/* Photos Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {PHOTO_CATALOG.map((item) => {
                      const currentSrc = photos[item.key] || item.defaultSrc;
                      const isCustom = currentSrc !== item.defaultSrc;

                      return (
                        <div
                          key={item.key}
                          className={`bg-[#FAF6F0] rounded-2xl p-4 border transition-all shadow-sm ${
                            isCustom ? 'border-[#9E8256] ring-1 ring-[#9E8256]/30' : 'border-[#E8D8C8]'
                          }`}
                        >
                          <div className="flex gap-4">
                            
                            {/* Miniature */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#D5C4B0] bg-[#EFE6D8] shrink-0 relative group">
                              <img
                                src={currentSrc}
                                alt={item.label}
                                className="w-full h-full object-cover"
                              />
                              {isCustom && (
                                <div className="absolute top-1 right-1 bg-[#9E8256] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow">
                                  Modifiée
                                </div>
                              )}
                            </div>

                            {/* Details & Actions */}
                            <div className="flex-1 space-y-2 min-w-0">
                              <div>
                                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9E8256] block">
                                  {item.section}
                                </span>
                                <h4 className="font-serif-title text-sm sm:text-base font-bold text-[#2C2523] truncate">
                                  {item.label}
                                </h4>
                                <span className="text-[10px] text-[#5A4E46]/80 block">
                                  Format : {item.aspect}
                                </span>
                              </div>

                              {/* Upload & Crop Buttons */}
                              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9E8256] hover:bg-[#8A6F44] text-white text-[11px] font-semibold cursor-pointer shadow-sm transition-colors">
                                  <Upload className="w-3 h-3" />
                                  <span>Changer &amp; Cadrer</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleSlotPhotoUpload(item.key, e)}
                                    className="hidden"
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() => handleOpenCropForSlot(item)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#E8D8C8] text-[#5A4E46] border border-[#D5C4B0] text-[11px] font-semibold cursor-pointer transition-colors shadow-2xs"
                                  title="Ajuster le cadrage, zoom et orientation de cette photo"
                                >
                                  <Crop className="w-3 h-3 text-[#9E8256]" />
                                  <span>Cadrer</span>
                                </button>

                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      resetPhoto(item.key);
                                      showSuccess(`Photo ${item.label} réinitialisée.`);
                                    }}
                                    className="inline-flex items-center gap-1 text-[11px] text-[#5A4E46] hover:text-[#2C2523] underline cursor-pointer"
                                  >
                                    <RotateCcw className="w-2.5 h-2.5" />
                                    <span>Rétablir</span>
                                  </button>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E8D8C8] bg-[#F4ECE0]/50 flex items-center justify-between text-xs text-[#5A4E46]">
          <span>Espace protégé • Identifiant : <strong>admin</strong></span>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-1.5 rounded-full bg-[#E8D8C8] hover:bg-[#D5C4B0] text-[#2C2523] font-medium transition-colors cursor-pointer"
          >
            Fermer le panneau
          </button>
        </div>

      </div>

      {/* Interactive Image Cropper Modal */}
      <ImageCropModal
        isOpen={cropState.isOpen}
        imageSrc={cropState.imageSrc}
        targetTitle={cropState.targetTitle}
        recommendedAspect={cropState.recommendedAspect}
        recommendedAspectLabel={cropState.recommendedAspectLabel}
        onConfirm={handleCropConfirm}
        onCancel={handleCropCancel}
      />

    </div>
  );
};
