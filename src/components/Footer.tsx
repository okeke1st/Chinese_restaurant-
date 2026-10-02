import React from 'react';
import { Utensils, MessageCircle, Navigation, MapPin, Phone, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#B91C1C] flex items-center justify-center text-white">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display text-lg font-bold text-white block">
                  Shaolin Kungfu
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">
                  Chinese Restaurant · Festac
                </span>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              Authentic Chinese recipes, courteous customer service, and generous banquet sharing platters in Festac Town, Lagos.
            </p>

            <div className="flex items-center gap-1.5 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-semibold text-white">4.4 / 5.0</span>
              <span className="text-zinc-400">on Google Maps (380+ reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-white block">
              Quick Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Menu &amp; Traditional Specialties
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Festac Kitchen
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Dishes &amp; Dining Hall Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Verified Google Customer Reviews
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">
                  Visit &amp; GPS Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-white block">
              Festac Dining Location
            </span>
            <div className="space-y-2 leading-relaxed">
              <p className="text-zinc-300">
                782, Festac Access Road, Amuwo Odofin, Festac 102102, Lagos, Nigeria
              </p>
              <p className="text-zinc-400">
                Operating Daily: <strong className="text-zinc-200">11:00 AM – 11:00 PM</strong>
              </p>
              <p className="text-zinc-400 text-[11px]">
                Mainland Lagos · Near Apple Junction &amp; Amuwo Odofin
              </p>
            </div>
          </div>

          {/* Direct Actions */}
          <div className="space-y-3">
            <span className="font-display text-xs font-bold uppercase tracking-wider text-white block">
              Direct Orders &amp; GPS
            </span>
            <div className="space-y-2.5">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-red-400" />
                <span>Launch GPS on Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Shaolin Kungfu Chinese Restaurant, I would like to place an order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Order via WhatsApp Direct</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Shaolin Kungfu Chinese Restaurant (Festac). All rights reserved.
          </div>
          <div className="font-chinese text-zinc-400 tracking-wider">
            少林功夫中餐厅 · 真实传统中餐 · 尼日利亚拉各斯
          </div>
        </div>

      </div>
    </footer>
  );
};
