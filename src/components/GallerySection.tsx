import React, { useState } from 'react';
import { Maximize2, X, Plus, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { GALLERY_PHOTOS, RESTAURANT_INFO } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [photos, setPhotos] = useState(GALLERY_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_PHOTOS[0] | null>(null);

  const handleCustomPhotoAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        if (url) {
          const newPhoto = {
            id: `custom-${Date.now()}`,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            category: 'Listing Upload',
            url,
            description: 'Custom photo directly uploaded from restaurant map listing.',
          };
          setPhotos([newPhoto, ...photos]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Visual Showcase &amp; Ambience</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Signature Dishes &amp; Dining Hall
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
              Authentic cuisine and cultural dining presence reflecting Shaolin Kungfu’s Festac Google Maps profile—from sizzling wok preparations to family banquet tables.
            </p>
          </div>

          {/* Actions: Google Maps Link & Upload Listing Photo */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-md transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Business Map Photos</span>
            </a>

            <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all active:scale-95">
              <Plus className="w-4 h-4 text-red-400" />
              <span>Add Listing Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomPhotoAdd}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/25 cursor-pointer transition-all duration-300 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-medium text-red-400 block mb-1">
                    {photo.category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white drop-shadow">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-1 drop-shadow">
                    {photo.description}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-zinc-900 w-full overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-1">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  {selectedPhoto.description}
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/QXnX35A2QYEVUM949?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg whitespace-nowrap"
              >
                <span>View Google Maps Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
