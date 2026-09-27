import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  Upload,
  Link as LinkIcon,
  RefreshCw,
  Check,
  X,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FlipHorizontal,
  Video,
  VideoOff,
  Sparkles,
  Sliders,
  Move,
  CheckCircle2,
  AlertCircle,
  Eye,
  ShieldCheck,
  FileImage,
} from 'lucide-react';

interface ProfileImageDropdownProps {
  currentImageUrl: string;
  onUpdateImage: (newUrl: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AVATARS = [
  {
    name: 'Executive Banker',
    title: 'Formal Branch Head Style',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Corporate Formal',
    title: 'Senior Operations Attire',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Executive Studio',
    title: 'Professional Headshot',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Institutional Leader',
    title: 'Advisory & Governance',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
];

const MONOGRAM_PALETTES = [
  { name: 'Siinqee Emerald', bg: '#0d7668', fg: '#ffffff' },
  { name: 'Imperial Gold', bg: '#b45309', fg: '#ffffff' },
  { name: 'Obsidian Slate', bg: '#1e293b', fg: '#ffffff' },
  { name: 'National Navy', bg: '#1e3a8a', fg: '#ffffff' },
  { name: 'Banker Burgundy', bg: '#881337', fg: '#ffffff' },
];

export const ProfileImageDropdown: React.FC<ProfileImageDropdownProps> = ({
  currentImageUrl,
  onUpdateImage,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'url' | 'presets'>('upload');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Editor Transform State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [frameShape, setFrameShape] = useState<'circle' | 'square'>('square');
  const [optimizedStats, setOptimizedStats] = useState<{ sizeKb: number; width: number; height: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [countdown, setCountdown] = useState<number | null>(null);

  // Drag & Drop
  const [fileDragOver, setFileDragOver] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with current image
  useEffect(() => {
    if (isOpen) {
      setSourceImage(currentImageUrl);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setRotation(0);
      setIsFlipped(false);
      setUrlError(null);
    } else {
      stopCamera();
    }
  }, [isOpen, currentImageUrl]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Listen for Clipboard Paste (Ctrl+V / Cmd+V)
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  loadNewSource(event.target.result as string);
                }
              };
              reader.readAsDataURL(blob);
              e.preventDefault();
              break;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadNewSource = (dataUrl: string) => {
    setSourceImage(dataUrl);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
    setIsFlipped(false);
    stopCamera();
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, GIF, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        loadNewSource(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setFileDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Camera Management
  const startCamera = async (facing: 'user' | 'environment' = facingMode) => {
    setCameraError(null);
    stopCamera();
    try {
      const constraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      setFacingMode(facing);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please enable camera access in your browser settings.'
          : 'Unable to access camera device. Please use file upload or choose a preset.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setCountdown(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Center crop square from video
    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;

    // Mirror if front camera
    if (facingMode === 'user') {
      ctx.translate(size, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    loadNewSource(dataUrl);
  };

  const handleStartCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          capturePhoto();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  // URL import
  const handleLoadUrl = () => {
    if (!customUrlInput.trim()) return;
    setUrlLoading(true);
    setUrlError(null);

    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setUrlLoading(false);
      loadNewSource(customUrlInput.trim());
      setCustomUrlInput('');
    };
    img.onerror = () => {
      setUrlLoading(false);
      setUrlError('Could not load image from this URL. Please verify the link or try another.');
    };
    img.src = customUrlInput.trim();
  };

  // Generate Monogram Avatar
  const handleSelectMonogram = (palette: (typeof MONOGRAM_PALETTES)[0]) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 600);
    gradient.addColorStop(0, palette.bg);
    gradient.addColorStop(1, '#052e27');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 600);

    // Decorative outer ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 16;
    ctx.strokeRect(40, 40, 520, 520);

    // Monogram text "EG"
    ctx.fillStyle = palette.fg;
    ctx.font = 'bold 220px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('EG', 300, 290);

    // Subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '600 32px Inter, system-ui, sans-serif';
    ctx.fillText('ERMIAS GETACHEW', 300, 430);

    ctx.font = '500 22px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.fillText('SIINQEE BANK S.C.', 300, 470);

    const dataUrl = canvas.toDataURL('image/png');
    loadNewSource(dataUrl);
  };

  // Render & Optimize Final Canvas Output
  const generateFinalOptimizedImage = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (!sourceImage) {
        resolve(currentImageUrl);
        return;
      }

      const img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const targetSize = 600;
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(sourceImage);
          return;
        }

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, targetSize, targetSize);

        ctx.save();
        // Move to center of output canvas
        ctx.translate(targetSize / 2, targetSize / 2);
        // Apply transformations
        ctx.rotate((rotation * Math.PI) / 180);
        if (isFlipped) {
          ctx.scale(-1, 1);
        }
        ctx.scale(zoom, zoom);
        // Apply user pan
        ctx.translate(pan.x, pan.y);

        // Draw image centered
        const aspect = img.width / img.height;
        let drawW = targetSize;
        let drawH = targetSize;
        if (aspect > 1) {
          drawW = targetSize * aspect;
        } else {
          drawH = targetSize / aspect;
        }

        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();

        // High quality compressed output (standard JPEG with 0.88 quality is ~60-80KB, perfect for localStorage)
        const finalUrl = canvas.toDataURL('image/jpeg', 0.88);
        const approxSizeKb = Math.round((finalUrl.length * 3) / 4 / 1024);
        setOptimizedStats({ sizeKb: approxSizeKb, width: targetSize, height: targetSize });
        resolve(finalUrl);
      };
      img.onerror = () => {
        resolve(sourceImage);
      };
      img.src = sourceImage;
    });
  }, [sourceImage, zoom, pan, rotation, isFlipped, currentImageUrl]);

  // Update stats whenever transform changes
  useEffect(() => {
    if (sourceImage) {
      generateFinalOptimizedImage();
    }
  }, [sourceImage, zoom, pan, rotation, isFlipped, generateFinalOptimizedImage]);

  // Mouse / Touch Dragging for Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleApply = async () => {
    const finalImage = await generateFinalOptimizedImage();
    onUpdateImage(finalImage);
    stopCamera();
    onClose();
  };

  const handleResetTransform = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
    setIsFlipped(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="profileImageModalBackdrop"
          key="profile-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-3 sm:p-5 overflow-y-auto"
          onClick={() => {
            stopCamera();
            onClose();
          }}
        >
          <motion.div
            id="profileImageModalContainer"
            key="profile-modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col my-auto transition-all"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Profile Portrait Studio</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Interactive
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust position, crop, snap live webcam, or choose certified presets
              </p>
            </div>
          </div>
          <button
            id="btnCloseProfileModal"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Interactive Viewport & Crop Frame */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-emerald-600" />
                <span>Framing & Positioning (Drag image to reposition)</span>
              </span>

              {/* Frame Shape Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFrameShape('square')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    frameShape === 'square'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Dossier Card
                </button>
                <button
                  type="button"
                  onClick={() => setFrameShape('circle')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    frameShape === 'circle'
                      ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Circular Badge
                </button>
              </div>
            </div>

            {/* Viewport Canvas Frame */}
            <div
              ref={editorContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className={`relative w-full aspect-square max-w-[320px] mx-auto overflow-hidden bg-slate-950 border-4 border-emerald-600/40 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-all ${
                frameShape === 'circle' ? 'rounded-full' : 'rounded-3xl'
              }`}
            >
              {sourceImage ? (
                <img
                  src={sourceImage}
                  alt="Editor Viewport"
                  draggable={false}
                  className="max-w-none pointer-events-none transition-transform duration-75"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg) scaleX(${isFlipped ? -1 : 1})`,
                    transformOrigin: 'center center',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://ui-avatars.com/api/?name=Ermias+Getachew&background=0d7668&color=ffffff&size=512';
                  }}
                />
              ) : (
                <div className="text-center p-6 text-slate-400 text-xs">
                  No image selected
                </div>
              )}

              {/* Centering Crosshair Guides Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-white/20">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/15 -translate-x-1/2"></div>
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/15 -translate-y-1/2"></div>
              </div>

              {/* Floating Institution Ribbon */}
              <div className="absolute bottom-2 inset-x-3 pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/85 text-emerald-400 backdrop-blur-md border border-white/10 shadow flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Siinqee Bank Grade IX</span>
                </span>
              </div>
            </div>

            {/* Transform Controls Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
              {/* Zoom Slider */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.1).toFixed(1))))}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="range"
                    min="0.6"
                    max="3.0"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 w-10 text-right">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.1).toFixed(1))))}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Rotate, Flip, and Center Actions */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold flex items-center gap-1.5 transition"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rotate 90°</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsFlipped((f) => !f)}
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold flex items-center gap-1.5 transition"
                  >
                    <FlipHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Flip</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetTransform}
                    className="px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition"
                  >
                    Reset Framing
                  </button>
                </div>

                {/* Storage & Resolution Indicator */}
                {optimizedStats && (
                  <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
                    {optimizedStats.width}×{optimizedStats.height} px • ~{optimizedStats.sizeKb} KB
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Source Selection Tabs */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setActiveTab('upload');
                }}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('camera');
                  startCamera('user');
                }}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'camera'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Webcam</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setActiveTab('url');
                }}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'url'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Link URL</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setActiveTab('presets');
                }}
                className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
            </div>

            {/* TAB 1: File Upload & Drag/Drop + Clipboard */}
            {activeTab === 'upload' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setFileDragOver(true);
                  }}
                  onDragLeave={() => setFileDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 rounded-2xl border-2 border-dashed text-center cursor-pointer transition ${
                    fileDragOver
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40'
                      : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-950/20'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2.5">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Click to choose photo or drag & drop
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports PNG, JPG, WEBP, GIF, SVG • Or press{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">
                      Ctrl+V
                    </kbd>{' '}
                    to paste image
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Auto-optimized for offline browser storage</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Live Webcam Photo Capture */}
            {activeTab === 'camera' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {cameraError ? (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <VideoOff className="w-4 h-4" />
                      <span>Camera Access Unavailable</span>
                    </div>
                    <p>{cameraError}</p>
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                    >
                      Retry Camera
                    </button>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-700 aspect-video max-w-sm mx-auto flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${facingMode === 'user' ? '-scale-x-100' : ''}`}
                    />

                    {/* Circular Face Guide */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full border-2 border-dashed border-emerald-400/80"></div>
                    </div>

                    {/* Countdown Overlay */}
                    {countdown !== null && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-5xl font-black animate-pulse">
                        {countdown}
                      </div>
                    )}

                    {/* Live Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      <span>Live Stream</span>
                    </div>

                    {/* Flip Camera Button */}
                    <button
                      type="button"
                      onClick={() => startCamera(facingMode === 'user' ? 'environment' : 'user')}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur text-xs"
                      title="Switch Camera"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {cameraActive && !cameraError && (
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Take Instant Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStartCountdown}
                      disabled={countdown !== null}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <span>3s Timer Snap</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Direct URL Link */}
            {activeTab === 'url' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Direct Image URL (HTTPS)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customUrlInput}
                      onChange={(e) => {
                        setCustomUrlInput(e.target.value);
                        setUrlError(null);
                      }}
                      placeholder="https://images.unsplash.com/... or https://example.com/photo.jpg"
                      className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleLoadUrl}
                      disabled={urlLoading || !customUrlInput.trim()}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1"
                    >
                      {urlLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      <span>Load</span>
                    </button>
                  </div>
                  {urlError && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{urlError}</span>
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Paste any public image link from Unsplash, LinkedIn, Google Photos, or corporate directory.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4: Presets & Monogram Generator */}
            {activeTab === 'presets' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Executive Banker Presets */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Executive Banker Presets
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_AVATARS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => loadNewSource(preset.url)}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-950/30 flex items-center gap-2.5 text-left transition group"
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {preset.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {preset.title}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monogram / Signature Initial Avatars */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                    <span>Generate Certified Monogram (EG)</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-mono">600×600 PNG</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MONOGRAM_PALETTES.map((pal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectMonogram(pal)}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 bg-slate-50/50 dark:bg-slate-950/30 flex items-center gap-2 text-left transition"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-sm flex-shrink-0"
                          style={{ backgroundColor: pal.bg }}
                        >
                          EG
                        </div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {pal.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              const defaultUrl =
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
              loadNewSource(defaultUrl);
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Standard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
            >
              Cancel
            </button>

            <button
              id="btnConfirmSavePortrait"
              type="button"
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply Photo</span>
            </button>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
