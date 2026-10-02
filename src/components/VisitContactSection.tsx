import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Phone, MessageCircle, Copy, Check, ExternalLink, Calendar, Compass } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface VisitContactProps {
  onOpenReservation: () => void;
}

export const VisitContactSection: React.FC<VisitContactProps> = ({
  onOpenReservation,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="visit" className="py-16 md:py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Visit Us &amp; GPS Directions</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Find Us in Festac Town, Lagos
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Conveniently situated along Festac Access Road in Amuwo Odofin. Easily accessible from Apple Junction and Mile 2 with secure parking for diners.
          </p>
        </div>

        {/* Contact and Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & GPS Launchers */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800/40 text-red-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Restaurant Address
                    </span>
                    <p className="text-base font-medium text-white leading-snug">
                      {RESTAURANT_INFO.address}
                    </p>
                    <span className="text-xs text-zinc-400 mt-1 block">
                      Amuwo Odofin LGA, Lagos State
                    </span>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-white/10 shrink-0"
                  title="Copy full address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Primary GPS Navigation Launcher */}
              <div className="pt-2">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl shadow-lg shadow-red-950/50 transition-all active:scale-98"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Launch GPS Directions (Google Maps)</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-800 border border-white/10 text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Operating Hours
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open Daily (11 AM – 11 PM)
                    </span>
                  </div>

                  <div className="space-y-1.5 mt-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-zinc-200">
                      <span>Monday – Sunday</span>
                      <span className="font-mono text-white">{RESTAURANT_INFO.hours.weekdays}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-3 pt-3 border-t border-white/5">
                    {RESTAURANT_INFO.hours.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* WhatsApp Link */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Shaolin Kungfu Chinese Restaurant Festac, I would like to make an inquiry or order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-emerald-500/40 flex items-center gap-3 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/60 transition-colors">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-medium">
                    WhatsApp Chat
                  </span>
                  <span className="text-xs font-semibold text-white group-hover:text-emerald-300">
                    {RESTAURANT_INFO.phoneDisplay}
                  </span>
                </div>
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-red-500/40 flex items-center gap-3 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400 group-hover:bg-red-900/60 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 block font-medium">
                    Phone Inquiries
                  </span>
                  <span className="text-xs font-semibold text-white group-hover:text-red-300">
                    Call Directly
                  </span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Visual Interactive Map Card */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
              
              {/* Interactive Map Visual with real business map capture */}
              <div className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
                <img
                  src="/src/assets/images/google_map_shaolin_festac.png"
                  alt="Shaolin Kungfu Chinese Restaurant Google Maps location on Festac Access Road"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Marker Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="animate-bounce">
                    <div className="w-12 h-12 rounded-full bg-[#B91C1C] text-white flex items-center justify-center shadow-2xl border-2 border-white">
                      <MapPin className="w-6 h-6 fill-current" />
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-1 bg-zinc-950/95 border border-white/20 rounded-md text-center shadow-lg">
                    <span className="text-xs font-bold text-white block">
                      Shaolin Kungfu Festac
                    </span>
                    <span className="text-[10px] text-red-400">782 Festac Access Rd</span>
                  </div>
                </div>

                {/* Compass touch */}
                <div className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-950/80 border border-white/10 text-zinc-300 flex items-center gap-1.5 text-xs backdrop-blur-sm">
                  <Compass className="w-4 h-4 text-red-400" />
                  <span>Google Maps Verified</span>
                </div>

                {/* Overlaid GPS Launch Trigger */}
                <div className="absolute bottom-4 left-4 right-4">
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 hover:border-white/40 shadow-xl transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5 text-red-400" />
                    <span>Open in Google Maps App (Turn-by-Turn GPS)</span>
                  </a>
                </div>
              </div>

              {/* Map Footer Info */}
              <div className="p-5 bg-zinc-950 flex items-center justify-between gap-4 text-xs text-zinc-400 border-t border-white/5">
                <div>
                  <strong className="text-zinc-200 block">Nearby Landmarks</strong>
                  Close to Amuwo Odofin Estate gate &amp; Apple Junction bypass
                </div>
                <button
                  onClick={onOpenReservation}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg whitespace-nowrap transition-colors"
                >
                  Book Ahead
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
