import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { LoyaltySection } from './components/LoyaltySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { VisitContactSection } from './components/VisitContactSection';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { ReservationModal } from './components/ReservationModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { CartItem, MenuItem } from './types/restaurant';
import { RESTAURANT_INFO } from './data/restaurantData';
import { MessageCircle, Calendar, ShoppingBag, Check, Award } from 'lucide-react';

const CART_STORAGE_KEY = 'shaolin_kungfu_cart_items';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore storage error
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to order bag`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectWhatsAppOrder = () => {
    if (cartItems.length > 0) {
      setIsCartOpen(true);
    } else {
      window.open(
        `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
          'Hello Shaolin Kungfu Chinese Restaurant (Festac), I would like to place an order.'
        )}`,
        '_blank'
      );
    }
  };

  // Map of cart counts by item id
  const cartItemIds = cartItems.reduce<Record<string, number>>((acc, ci) => {
    acc[ci.item.id] = ci.quantity;
    return acc;
  }, {});

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-[#F3F3F4] font-body flex flex-col selection:bg-[#B91C1C] selection:text-white pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/20 text-white text-xs font-semibold shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenWhatsApp={handleDirectWhatsAppOrder}
        />

        {/* 2. About Us */}
        <AboutSection />

        {/* 3. Interactive Menu & Pricing Showcase */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* 4. Customer Loyalty Program Section */}
        <LoyaltySection
          onOpenLoyaltyModal={() => setIsLoyaltyModalOpen(true)}
        />

        {/* 5. Gallery */}
        <GallerySection />

        {/* 6. User Reviews */}
        <ReviewsSection />

        {/* 7. Visit & Contact + Navigation */}
        <VisitContactSection
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenLoyaltyModal={() => {
          setIsCartOpen(false);
          setIsLoyaltyModalOpen(true);
        }}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <LoyaltyModal
        isOpen={isLoyaltyModalOpen}
        onClose={() => setIsLoyaltyModalOpen(false)}
      />

      {/* Mobile Sticky Quick Action Bar (Respects 15% sticky cap rule) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2 bg-[#0D0D0E]/95 backdrop-blur-md border-t border-white/10 flex items-center gap-2 shadow-2xl">
        <button
          onClick={handleDirectWhatsAppOrder}
          className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#B91C1C] text-white text-xs font-semibold shadow-sm active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span className="truncate">Order WhatsApp</span>
        </button>

        <button
          onClick={() => setIsLoyaltyModalOpen(true)}
          className="min-h-[44px] px-3 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1 shrink-0 active:scale-95"
          title="Dragon Stamp Pass"
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span className="hidden xs:inline">Pass</span>
        </button>

        <button
          onClick={() => setIsReservationOpen(true)}
          className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-800 text-zinc-200 border border-white/10 text-xs font-semibold active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 text-red-400 shrink-0" />
          <span className="truncate">Book Table</span>
        </button>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="min-h-[44px] min-w-[44px] p-2 bg-zinc-900 border border-white/20 rounded-xl text-white relative active:scale-95 flex items-center justify-center shrink-0"
            aria-label="View Order Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black">
              {totalCartCount}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
