import React, { useRef, useState, useEffect } from 'react';
import { MessageCircle, Calendar, Star, MapPin, Clock, Camera, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenWhatsApp: () => void;
}

const DEFAULT_HERO_IMAGE = '/src/assets/images/shaolin_kungfu_storefront_sign.jpg';
const STORAGE_KEY = 'shaolin_kungfu_custom_hero_image';

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onOpenWhatsApp,
}) => {
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [isCustomUploaded, setIsCustomUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom image from localStorage if previously uploaded
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHeroImage(saved);
        setIsCustomUploaded(true);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setHeroImage(result);
          setIsCustomUploaded(true);
          try {
            localStorage.setItem(STORAGE_KEY, result);
          } catch {
            // storage limit handling
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setHeroImage(DEFAULT_HERO_IMAGE);
    setIsCustomUploaded(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-950/20 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Subtle Metadata Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-400 mb-4">
          <span className="text-red-400 font-semibold uppercase tracking-wider">Festac Town, Lagos</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Authentic Chinese Dining</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <div className="inline-flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold text-zinc-200">4.4 Google Rating</span>
            <span className="text-zinc-400">(380+ reviews)</span>
          </div>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="text-zinc-300">Festac Access Road · Mainland Lagos</span>
        </div>

        {/* Catchy Headline */}
        <div className="max-w-4xl mb-8">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.12]">
            Shaolin Kungfu Chinese Restaurant – Authentic Chinese Cuisine &amp; Exceptional Flavors in Festac, Lagos.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            Savor centuries-old wok craft, steaming handcrafted dim sum, sizzling hot plates, and banquet sharing feasts at Festac’s revered Chinese dining institution. Renowned for courteous service, genuine flavors, and vibrant cultural hospitality.
          </p>
        </div>

        {/* Primary Action Zone */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-lg shadow-red-950/50 hover:shadow-red-900/50 transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Order via WhatsApp</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-white/30 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-red-400" />
            <span>Table Booking</span>
          </button>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <span>Explore Menu &amp; Specialties</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Primary Visual Focus: Hero Image Showcase with Custom Upload Provision */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
          {/* Main Hero Graphic */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900">
            <img
              src={heroImage}
              alt="Shaolin Kungfu Chinese Restaurant Festac interior and authentic culinary dishes"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Scrim gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* In-Hero Caption & Trust Highlights */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
              <div>
                <span className="font-chinese text-sm tracking-wider text-red-300 block mb-1">
                  少林功夫中餐厅 · 真实风味
                </span>
                <p className="font-display text-lg sm:text-2xl font-bold text-white drop-shadow-md">
                  {isCustomUploaded ? 'Featured Photo: Authentic Restaurant Showcase' : 'Shaolin Kungfu Chinese Restaurant · Festac Branch'}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-300 mt-1 font-medium drop-shadow">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    782 Festac Access Rd, Lagos
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Open Daily 11:00 AM – 11:00 PM
                  </span>
                </div>
              </div>

              {/* Developer Custom Photo Upload Utility Button */}
              <div className="pointer-events-auto flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload the exact photo sent by developer/client for the hero graphic"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-black/75 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 hover:border-white/40 rounded-lg shadow-lg transition-all active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5 text-red-400" />
                  <span>{isCustomUploaded ? 'Change Hero Photo' : 'Upload Custom Hero Photo'}</span>
                </button>

                {isCustomUploaded && (
                  <button
                    onClick={handleResetImage}
                    title="Reset to default authentic dining photo"
                    className="p-2 text-xs bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white backdrop-blur-md border border-white/20 rounded-lg transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {RESTAURANT_INFO.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/10 transition-colors"
            >
              <h2 className="text-sm font-semibold text-white mb-1">{item.title}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
