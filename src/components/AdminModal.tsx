import React, { useState, useEffect } from 'react';
import {
  Lock,
  X,
  Upload,
  RotateCcw,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  Save,
  LogOut,
  Plus,
  Trash2,
  Crop,
  ListChecks,
  Edit3,
  ArrowUp,
  ArrowDown,
  Clock,
  HardDrive,
} from 'lucide-react';
import { ImageCropModal } from './ImageCropModal';
import { parseAspectRatio } from '../utils/cropImage';
import {
  useSiteStore,
  verifyAdminCredentials,
  setSessionAdmin,
  PHOTO_CATALOG,
  NoveltyOfferData,
  DEFAULT_NOVELTY_OFFER,
  DEFAULT_PHOTOS,
  DEFAULT_PRESTATION_CATEGORIES,
  PrestationItem,
} from '../utils/siteStore';

export const AdminModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'novelty' | 'prestations' | 'photos'>('novelty');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const {
    photos,
    novelty,
    prestations,
    isAdmin,
    updatePhoto,
    resetPhoto,
    resetAllPhotos,
    updateNovelty,
    resetNovelty,
    addPrestationItem,
    updatePrestationItem,
    deletePrestationItem,
    movePrestationItem,
    resetPrestations,
    logout,
  } = useSiteStore();

  // Local editable draft for novelty offer
  const [noveltyDraft, setNoveltyDraft] = useState<NoveltyOfferData>(novelty);

  // Prestations Manager state
  const [selectedPrestCategory, setSelectedPrestCategory] = useState<string>('head-spa');
  const [editingPrestationId, setEditingPrestationId] = useState<string | null>(null);
  const [isAddingPrestation, setIsAddingPrestation] = useState<boolean>(false);
  const [prestForm, setPrestForm] = useState<{
    name: string;
    duration: string;
    price: string;
    oldPrice: string;
    desc: string;
    subCategory: string;
    badge: string;
    notice: string;
    popular: boolean;
  }>({
    name: '',
    duration: '1h',
    price: '45 €',
    oldPrice: '',
    desc: '',
    subCategory: '',
    badge: '',
    notice: '',
    popular: false,
  });

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
      if (e?.detail?.category) {
        setSelectedPrestCategory(e.detail.category);
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
      setAuthError('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
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
    }, 4500);
  };

  // Helper to read raw file as data URL for interactive cropping
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Impossible de lire le fichier image sélectionné.'));
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
        targetTitle: 'Offre Exclusivité & Nouveauté',
        recommendedAspect: 4 / 5,
        recommendedAspectLabel: '4:5 Portrait / Évasif',
      });
      e.target.value = '';
    } catch {
      alert('Erreur lors de la lecture du fichier image. Veuillez réessayer.');
    }
  };

  // Generic photo upload handler for any catalog slot: triggers cropper modal first
  const handleSlotPhotoUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const catalogItem = PHOTO_CATALOG.find((p) => p.key === key);
    const aspect = parseAspectRatio(catalogItem?.aspect) || 4 / 3;

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
    } catch {
      alert('Erreur lors de la lecture du fichier image.');
    }
  };

  // Allows cropping the current novelty photo without uploading a new file
  const handleOpenCropForCurrentNovelty = () => {
    const currentSrc = noveltyDraft.photo || photos.exclusiveOffer || '/offre-evasion.jpg';
    setCropState({
      isOpen: true,
      imageSrc: currentSrc,
      targetKey: 'novelty',
      targetTitle: 'Offre Exclusivité & Nouveauté (Ajuster le cadrage)',
      recommendedAspect: 4 / 5,
      recommendedAspectLabel: '4:5 Portrait / Évasif',
    });
  };

  // Allows cropping an existing slot photo without uploading a new file
  const handleOpenCropForSlot = (item: (typeof PHOTO_CATALOG)[0]) => {
    const currentSrc = photos[item.key] || item.defaultSrc;
    const aspect = parseAspectRatio(item.aspect) || 4 / 3;
    setCropState({
      isOpen: true,
      imageSrc: currentSrc,
      targetKey: item.key,
      targetTitle: item.label,
      recommendedAspect: aspect,
      recommendedAspectLabel: item.aspect,
    });
  };

  // Validates and applies the cropped image to store & server disk
  const handleCropConfirm = async (croppedDataUrl: string) => {
    setCropState((prev) => ({ ...prev, isOpen: false }));
    if (cropState.targetKey === 'novelty') {
      const diskUrl = await updatePhoto('exclusiveOffer', croppedDataUrl);
      setNoveltyDraft((prev) => ({ ...prev, photo: diskUrl }));
      updateNovelty({ photo: diskUrl });
      showSuccess("Photo de l'offre recadrée et sauvegardée dans le dossier du site ! ✨");
    } else {
      const diskUrl = await updatePhoto(cropState.targetKey, croppedDataUrl);
      if (cropState.targetKey === 'exclusiveOffer') {
        updateNovelty({ photo: diskUrl });
        setNoveltyDraft((prev) => ({ ...prev, photo: diskUrl }));
      }
      showSuccess(`Photo recadrée et sauvegardée dans le dossier du site pour : ${cropState.targetTitle} ! ✨`);
    }
  };

  const handleCropCancel = () => {
    setCropState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSaveNovelty = () => {
    updateNovelty(noveltyDraft);
    showSuccess("L'Offre Exclusivité & Nouveauté a été sauvegardée dans le dossier du site ! ✨");
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
      showSuccess('Toutes les photos ont été rétablies à leur version initiale.');
    }
  };

  // ========================================================
  // PRESTATIONS CRUD HANDLERS
  // ========================================================
  const startAddNewPrestation = () => {
    setEditingPrestationId(null);
    setPrestForm({
      name: '',
      duration: '1h',
      price: '50 €',
      oldPrice: '',
      desc: '',
      subCategory: '',
      badge: '',
      notice: '',
      popular: false,
    });
    setIsAddingPrestation(true);
  };

  const startEditPrestation = (item: PrestationItem) => {
    setIsAddingPrestation(false);
    setEditingPrestationId(item.id);
    setPrestForm({
      name: item.name || '',
      duration: item.duration || '',
      price: item.price || '',
      oldPrice: item.oldPrice || '',
      desc: item.desc || '',
      subCategory: item.subCategory || '',
      badge: item.badge || '',
      notice: item.notice || '',
      popular: Boolean(item.popular),
    });
  };

  const cancelPrestationForm = () => {
    setIsAddingPrestation(false);
    setEditingPrestationId(null);
  };

  const handleSavePrestationForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prestForm.name.trim() || !prestForm.price.trim()) {
      alert('Veuillez renseigner au minimum le titre et le tarif de la prestation.');
      return;
    }

    const payload = {
      name: prestForm.name.trim(),
      duration: prestForm.duration.trim() || 'Sur RDV',
      price: prestForm.price.trim(),
      oldPrice: prestForm.oldPrice.trim() || undefined,
      desc: prestForm.desc.trim(),
      subCategory: prestForm.subCategory.trim() || undefined,
      badge: prestForm.badge.trim() || undefined,
      notice: prestForm.notice.trim() || undefined,
      popular: prestForm.popular,
    };

    if (isAddingPrestation) {
      addPrestationItem(selectedPrestCategory, payload);
      showSuccess(`Nouvelle prestation "${payload.name}" ajoutée et enregistrée dans le dossier du site ! ✨`);
      setIsAddingPrestation(false);
    } else if (editingPrestationId) {
      updatePrestationItem(selectedPrestCategory, editingPrestationId, payload);
      showSuccess(`Prestation "${payload.name}" modifiée et enregistrée dans le dossier du site ! ✨`);
      setEditingPrestationId(null);
    }
  };

  const handleDeletePrestation = (item: PrestationItem) => {
    if (window.confirm(`Voulez-vous vraiment supprimer la prestation "${item.name}" ?`)) {
      deletePrestationItem(selectedPrestCategory, item.id);
      showSuccess(`Prestation "${item.name}" supprimée et enregistrée.`);
      if (editingPrestationId === item.id) {
        setEditingPrestationId(null);
      }
    }
  };

  const handleResetCategoryPrestations = () => {
    const catLabel =
      DEFAULT_PRESTATION_CATEGORIES.find((c) => c.id === selectedPrestCategory)?.label ||
      selectedPrestCategory;
    if (
      window.confirm(
        `Voulez-vous rétablir les prestations par défaut pour la catégorie "${catLabel}" ?`
      )
    ) {
      resetPrestations(selectedPrestCategory);
      setIsAddingPrestation(false);
      setEditingPrestationId(null);
      showSuccess(`Catégorie "${catLabel}" rétablie à ses prestations d'origine.`);
    }
  };

  if (!isOpen) {
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

  const currentCategoryItems = prestations[selectedPrestCategory] || [];

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
              <p className="text-xs text-[#5A4E46] flex items-center gap-1.5">
                <span>Le Cocon Sensoriel by Chacha</span>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-semibold">
                    <HardDrive className="w-3 h-3" /> Sauvegarde directe dans le dossier du site
                  </span>
                )}
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
              UNAUTHENTICATED VIEW: LOGIN FORM (WITHOUT EXPOSED CREDENTIALS)
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
                  Connectez-vous pour gérer la carte des prestations, l'offre du moment et les photos du site.
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
                    Identifiant
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Votre identifiant"
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
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeTab === 'novelty'
                      ? 'bg-[#9E8256] text-white shadow-md'
                      : 'bg-[#F3ECE1] text-[#5A4E46] hover:bg-[#E8D8C8]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Exclusivité &amp; Nouveauté</span>
                </button>

                <button
                  onClick={() => setActiveTab('prestations')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeTab === 'prestations'
                      ? 'bg-[#9E8256] text-white shadow-md'
                      : 'bg-[#F3ECE1] text-[#5A4E46] hover:bg-[#E8D8C8]'
                  }`}
                >
                  <ListChecks className="w-4 h-4" />
                  <span>Carte des Prestations &amp; Tarifs</span>
                </button>

                <button
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeTab === 'photos'
                      ? 'bg-[#9E8256] text-white shadow-md'
                      : 'bg-[#F3ECE1] text-[#5A4E46] hover:bg-[#E8D8C8]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Photos du Site ({PHOTO_CATALOG.length})</span>
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
                          La photo recadrée est directement sauvegardée dans le dossier <code>/public/uploads/</code> du site.
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
                            Chemin du fichier dans le dossier du site :
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
                              placeholder="/uploads/..."
                              className="flex-1 px-3 py-1.5 rounded-xl border border-[#D5C4B0] bg-white text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updatePhoto('exclusiveOffer', DEFAULT_PHOTOS.exclusiveOffer);
                                setNoveltyDraft((prev) => ({ ...prev, photo: DEFAULT_PHOTOS.exclusiveOffer }));
                                updateNovelty({ photo: DEFAULT_PHOTOS.exclusiveOffer });
                                showSuccess('Photo rétablie à la version initiale.');
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

                    {/* Steps Editor */}
                    <div className="pt-2 border-t border-[#E8D8C8] space-y-3">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C2523]">
                        Les 3 Étapes du Soin Incluses :
                      </label>

                      {noveltyDraft.services.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#F4ECE0]/60 rounded-xl border border-[#E8D8C8] grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                        >
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
                  TAB 2: GESTION CARTE DES PRESTATIONS & TARIFS (ADD / EDIT / DELETE)
                  ======================================================== */}
              {activeTab === 'prestations' && (
                <div className="space-y-6">
                  
                  {/* Header & Category Selector */}
                  <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E8D8C8] shadow-sm space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-serif-title text-xl font-bold uppercase tracking-wide text-[#2C2523]">
                          Gestion de la Carte des Prestations
                        </h3>
                        <p className="text-xs text-[#5A4E46]">
                          Ajoutez, modifiez ou supprimez librement vos prestations et tarifs. Tout est sauvegardé dans le dossier du site.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={startAddNewPrestation}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] hover:from-[#8A6F44] hover:to-[#9E8256] text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Ajouter une prestation</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetCategoryPrestations}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-medium cursor-pointer"
                          title="Rétablir les prestations d'origine de cette catégorie"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Rétablir la catégorie</span>
                        </button>
                      </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8D8C8]">
                      {DEFAULT_PRESTATION_CATEGORIES.map((cat) => {
                        const count = (prestations[cat.id] || []).length;
                        const active = selectedPrestCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedPrestCategory(cat.id);
                              setIsAddingPrestation(false);
                              setEditingPrestationId(null);
                            }}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                              active
                                ? 'bg-[#2C2523] text-[#FAF6F0] shadow-sm'
                                : 'bg-[#F3ECE1] text-[#5A4E46] hover:bg-[#E8D8C8]'
                            }`}
                          >
                            <span>{cat.label}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                active ? 'bg-[#B5986B] text-white' : 'bg-[#E8D8C8] text-[#8A6F44]'
                              }`}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ADD OR EDIT FORM */}
                  {(isAddingPrestation || editingPrestationId) && (
                    <form
                      onSubmit={handleSavePrestationForm}
                      className="bg-[#FAF6F0] p-5 rounded-2xl border-2 border-[#9E8256] shadow-lg space-y-4 animate-fadeIn"
                    >
                      <div className="flex items-center justify-between border-b border-[#E8D8C8] pb-3">
                        <h4 className="font-serif-title text-lg font-bold uppercase text-[#2C2523] flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#9E8256]" />
                          <span>
                            {isAddingPrestation
                              ? `Nouvelle Prestation (${
                                  DEFAULT_PRESTATION_CATEGORIES.find((c) => c.id === selectedPrestCategory)?.label
                                })`
                              : 'Modifier la Prestation'}
                          </span>
                        </h4>
                        <button
                          type="button"
                          onClick={cancelPrestationForm}
                          className="text-xs text-[#5A4E46] hover:text-[#2C2523] underline cursor-pointer"
                        >
                          Annuler
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                        <div className="sm:col-span-6">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Nom de la prestation *
                          </label>
                          <input
                            type="text"
                            required
                            value={prestForm.name}
                            onChange={(e) => setPrestForm({ ...prestForm, name: e.target.value })}
                            placeholder="Ex: Rituel Voyage Sensoriel (1h)"
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs font-medium"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Durée *
                          </label>
                          <input
                            type="text"
                            required
                            value={prestForm.duration}
                            onChange={(e) => setPrestForm({ ...prestForm, duration: e.target.value })}
                            placeholder="Ex: 1h 15min"
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Tarif *
                          </label>
                          <input
                            type="text"
                            required
                            value={prestForm.price}
                            onChange={(e) => setPrestForm({ ...prestForm, price: e.target.value })}
                            placeholder="Ex: 80 € ou de 15 € à 25 €"
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs font-bold text-[#2C2523]"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Sous-catégorie (optionnel)
                          </label>
                          <input
                            type="text"
                            value={prestForm.subCategory}
                            onChange={(e) => setPrestForm({ ...prestForm, subCategory: e.target.value })}
                            placeholder="Ex: Head Spa Homme & Femme"
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Badge spécial (optionnel)
                          </label>
                          <input
                            type="text"
                            value={prestForm.badge}
                            onChange={(e) => setPrestForm({ ...prestForm, badge: e.target.value })}
                            placeholder="Ex: Coup de cœur, Nouveauté..."
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-4">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Ancien prix barré (optionnel)
                          </label>
                          <input
                            type="text"
                            value={prestForm.oldPrice}
                            onChange={(e) => setPrestForm({ ...prestForm, oldPrice: e.target.value })}
                            placeholder="Ex: 135 €"
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-12">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Description détaillée
                          </label>
                          <textarea
                            rows={3}
                            value={prestForm.desc}
                            onChange={(e) => setPrestForm({ ...prestForm, desc: e.target.value })}
                            placeholder="Détails du soin, étapes, recommandations..."
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-8">
                          <label className="block text-xs font-semibold text-[#5A4E46] mb-1">
                            Mention ou note importante (optionnel)
                          </label>
                          <input
                            type="text"
                            value={prestForm.notice}
                            onChange={(e) => setPrestForm({ ...prestForm, notice: e.target.value })}
                            placeholder="Ex: Réservé uniquement à la clientèle féminine"
                            className="w-full px-3 py-2 rounded-xl border border-[#D5C4B0] bg-white text-xs"
                          />
                        </div>

                        <div className="sm:col-span-4 flex items-end pb-1">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={prestForm.popular}
                              onChange={(e) => setPrestForm({ ...prestForm, popular: e.target.checked })}
                              className="w-4 h-4 rounded text-[#9E8256] focus:ring-[#9E8256]"
                            />
                            <span className="text-xs font-semibold text-[#2C2523]">
                              Mettre en valeur (encadré doré)
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8D8C8]">
                        <button
                          type="button"
                          onClick={cancelPrestationForm}
                          className="px-4 py-2 rounded-full bg-[#F3ECE1] hover:bg-[#E8D8C8] text-[#5A4E46] text-xs font-semibold cursor-pointer"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#9E8256] to-[#B5986B] text-white text-xs font-bold shadow-md cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Enregistrer la prestation</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* LIST OF PRESTATIONS IN SELECTED CATEGORY */}
                  <div className="space-y-3">
                    {currentCategoryItems.length === 0 ? (
                      <div className="text-center py-8 bg-[#FAF6F0] rounded-2xl border border-[#E8D8C8] text-xs text-[#5A4E46]">
                        Aucune prestation dans cette catégorie. Cliquez sur « Ajouter une prestation » pour commencer.
                      </div>
                    ) : (
                      currentCategoryItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl bg-[#FAF6F0] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            editingPrestationId === item.id
                              ? 'border-[#9E8256] ring-2 ring-[#9E8256]/30'
                              : item.popular
                              ? 'border-[#B5986B]'
                              : 'border-[#E8D8C8]'
                          }`}
                        >
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {item.subCategory && (
                                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9E8256]">
                                  {item.subCategory}
                                </span>
                              )}
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-full bg-[#E8D8C8] text-[#8A6F44] text-[10px] font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>

                            <div className="flex items-baseline gap-2 flex-wrap">
                              <h4 className="font-serif-title text-base font-bold text-[#2C2523]">
                                {item.name}
                              </h4>
                              <span className="text-xs text-[#9E8256] font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {item.duration}
                              </span>
                              <span className="font-serif-title text-lg font-bold text-[#2C2523] ml-auto sm:ml-2">
                                {item.price}
                              </span>
                            </div>

                            {item.desc && (
                              <p className="text-xs text-[#5A4E46] line-clamp-2">{item.desc}</p>
                            )}
                          </div>

                          {/* Item Actions: Move Up/Down, Edit, Delete */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => movePrestationItem(selectedPrestCategory, item.id, 'up')}
                              className="w-7 h-7 rounded-lg bg-[#F3ECE1] hover:bg-[#E8D8C8] disabled:opacity-30 flex items-center justify-center text-[#5A4E46] cursor-pointer"
                              title="Monter"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === currentCategoryItems.length - 1}
                              onClick={() => movePrestationItem(selectedPrestCategory, item.id, 'down')}
                              className="w-7 h-7 rounded-lg bg-[#F3ECE1] hover:bg-[#E8D8C8] disabled:opacity-30 flex items-center justify-center text-[#5A4E46] cursor-pointer"
                              title="Descendre"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => startEditPrestation(item)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F3ECE1] hover:bg-[#9E8256] hover:text-white text-[#2C2523] text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Modifier</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeletePrestation(item)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                              title="Supprimer cette prestation"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>
              )}

              {/* ========================================================
                  TAB 3: GESTION DE TOUTES LES PHOTOS DU SITE
                  ======================================================== */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8D8C8]">
                    <div>
                      <h3 className="font-serif-title text-xl font-bold uppercase tracking-wide text-[#2C2523]">
                        Gestionnaire Global des Photos
                      </h3>
                      <p className="text-xs text-[#5A4E46]">
                        Chaque photo importée et cadrée est enregistrée directement dans le dossier <code>/public/uploads/</code> du site.
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

        {/* Footer (without exposed username) */}
        <div className="px-6 py-3 border-t border-[#E8D8C8] bg-[#F4ECE0]/50 flex items-center justify-between text-xs text-[#5A4E46]">
          <span>Espace d'administration sécurisé • Le Cocon Sensoriel</span>
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
