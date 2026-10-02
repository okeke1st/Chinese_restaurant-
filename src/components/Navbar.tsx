import React, { useState } from 'react';
import { Utensils, MessageCircle, Calendar, ShoppingBag, Menu as MenuIcon, X, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenLoyaltyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenLoyaltyModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu & Prices', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Dragon Stamps', href: '#loyalty' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews (4.4★)', href: '#reviews' },
    { label: 'Visit & GPS', href: '#visit' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0D0D0E]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <a href="#" className="group flex items-center gap-2.5 text-left">
              <div className="w-10 h-10 rounded-lg bg-[#B91C1C] flex items-center justify-center text-white shadow-md shadow-red-950/40 group-hover:bg-[#991B1B] transition-colors shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors block truncate">
                  Shaolin Kungfu
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 font-medium block truncate">
                  Chinese Restaurant · Festac
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-red-600/80 decoration-2 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions + Loyalty & Cart Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Loyalty Stamp Card Button */}
            <button
              onClick={onOpenLoyaltyModal}
              title="View your Dragon Stamp loyalty card"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 rounded-lg transition-all whitespace-nowrap active:scale-95"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Stamp Pass</span>
            </button>

            {/* Table Booking */}
            <button
              onClick={onOpenReservation}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 rounded-lg transition-all whitespace-nowrap active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              <span>Table Booking</span>
            </button>

            {/* Order via WhatsApp */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Shaolin Kungfu Chinese Restaurant (Festac), I would like to place an order / make an inquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-lg shadow-sm shadow-red-950/40 transition-all whitespace-nowrap active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="hidden sm:inline">Order via WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="relative p-2.5 text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 rounded-lg hover:border-white/20 transition-all active:scale-95 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B91C1C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0D0D0E]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-zinc-400 hover:text-white xl:hidden rounded-lg hover:bg-zinc-800/50 shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 py-4 px-2 space-y-2 bg-[#0D0D0E]/98 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoyaltyModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 rounded-lg"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Open Dragon Stamp Pass</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-800 border border-white/10 rounded-lg"
              >
                <Calendar className="w-4 h-4 text-red-400" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
