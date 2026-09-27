import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  ChevronDown,
  X,
  Sparkles,
  Camera,
  FolderOpen
} from 'lucide-react';

interface ImageUploadDropdownProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

// Curated banking & executive images with reliable high-res URLs
const CURATED_IMAGES = [
  {
    id: 'vault-1',
    title: 'Bank Vault Door & Steel Locking Bars',
    category: 'Vault Security',
    url: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'banking-tech',
    title: 'Modern Digital Financial Infrastructure',
    category: 'Fintech & Systems',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'architecture-1',
    title: 'Central Banking Tower & Institutional Pillars',
    category: 'Heritage & Governance',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'counter-service',
    title: 'Customer Service & Professional Branch Hall',
    category: 'Branch Operations',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'currency-counting',
    title: 'Currency Settlement & Forensic Ledger Audit',
    category: 'Cash & Audit',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'executive-strategy',
    title: 'Strategic Meeting & Executive Leadership',
    category: 'Leadership',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ethiopia-heritage',
    title: 'Archaeological Monolith & Ancient Heritage',
    category: 'Aksum Heritage',
    url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'degree-scan',
    title: 'University Degree & Academic Diploma',
    category: 'Credentials',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'appointment-letter',
    title: 'Official Executive Appointment Letter',
    category: 'Letters & Appointments',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'audit-attestation',
    title: 'Zero-Discrepancy Audit Seal & Attestation',
    category: 'Audit Certificates',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cert-excellence',
    title: 'Professional AI & Banking Certification',
    category: 'Credentials',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'portrait-exec-1',
    title: 'Corporate Officer Profile (High-Res)',
    category: 'Profile Portraits',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  }
];

export const ImageUploadDropdown: React.FC<ImageUploadDropdownProps> = ({
  value,
  onChange,
  label = 'Card & Quote Image',
  placeholder = 'Select from dropdown or upload image...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [customUrl, setCustomUrl] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    // Limit to 4MB
    if (file.size > 4 * 1024 * 1024) {
      setUploadError('Image file must be under 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
        setUploadError(null);
        setIsOpen(false);
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    onChange(customUrl.trim());
    setCustomUrl('');
    setIsOpen(false);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      {/* Main Trigger Field with Dropdown Indicator */}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer hover:border-emerald-600 transition shadow-sm"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {value ? (
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <img
                  src={value}
                  alt="Selected preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80';
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 dark:bg-slate-800 text-slate-400">
                <ImageIcon className="w-5 h-5" />
              </div>
            )}
            <div className="text-left overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {value ? 'Image Selected (Click to change)' : placeholder}
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {value ? value.slice(0, 48) + '...' : 'Upload file, pick preset, or paste URL'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-2 text-slate-400">
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-emerald-600' : ''
              }`}
            />
          </div>
        </div>

        {/* Dropdown Menu / Modal Container */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 z-50 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dropdown Image Selector & Uploader</span>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Selector Tabs */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Curated Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Local File</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'url'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Web URL</span>
              </button>
            </div>

            {/* Tab 1: Presets Gallery */}
            {activeTab === 'presets' && (
              <div className="space-y-2">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select a certified high-resolution banking, vault, or heritage visual:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                  {CURATED_IMAGES.map((img) => {
                    const isSelected = value === img.url;
                    return (
                      <div
                        key={img.id}
                        onClick={() => {
                          onChange(img.url);
                          setIsOpen(false);
                        }}
                        className={`group relative rounded-xl overflow-hidden aspect-video border cursor-pointer transition ${
                          isSelected
                            ? 'border-emerald-600 ring-2 ring-emerald-500'
                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5">
                          <span className="text-[9px] font-bold text-white leading-tight truncate">
                            {img.title}
                          </span>
                          <span className="text-[8px] text-emerald-300 font-semibold">
                            {img.category}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Upload Local File */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-600 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center cursor-pointer text-center group transition"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Click to browse files or drag image here
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Supports PNG, JPG, or WebP up to 4MB (stored locally)
                  </span>
                </div>

                {uploadError && (
                  <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                    {uploadError}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Custom Web URL */}
            {activeTab === 'url' && (
              <form onSubmit={handleApplyUrl} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Direct Image URL (HTTPS)
                  </label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition"
                  >
                    Apply Image
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
