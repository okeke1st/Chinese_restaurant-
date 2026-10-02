import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag, Award } from 'lucide-react';
import { CartItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenLoyaltyModal: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenLoyaltyModal,
}) => {
  const [orderType, setOrderType] = useState<'takeaway' | 'dine_in' | 'delivery'>('takeaway');
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    let message = `*NEW ORDER INQUIRY - SHAOLIN KUNGFU CHINESE RESTAURANT (FESTAC)*\n\n`;
    message += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (customerName.trim()) message += `*Customer:* ${customerName.trim()}\n`;
    if (orderType === 'delivery' && deliveryAddress.trim()) {
      message += `*Delivery Address:* ${deliveryAddress.trim()}\n`;
    }
    message += `\n*ITEMS REQUESTED:*\n`;

    cartItems.forEach((ci, idx) => {
      const priceStr = ci.item.price ? ` (₦${(ci.item.price * ci.quantity).toLocaleString('en-NG')})` : '';
      message += `${idx + 1}. ${ci.item.name} (${ci.item.portion}) x ${ci.quantity}${priceStr}\n`;
    });

    if (notes.trim()) {
      message += `\n*Special Instructions:* ${notes.trim()}\n`;
    }
    message += `\nHello Shaolin Kungfu! Please confirm current daily pricing, preparation time, and order confirmation. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B91C1C] flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white">
                Your WhatsApp Order List
              </h2>
              <span className="text-[11px] text-zinc-400">
                {cartItems.length} dish{cartItems.length === 1 ? '' : 'es'} selected ({totalItemsCount} items)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
              <p className="text-sm text-zinc-300 font-medium">
                Your order bag is currently empty.
              </p>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Select your favorite authentic Chinese dishes from the menu to send an instant order directly via WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#B91C1C] rounded-lg"
              >
                Browse Menu Dishes
              </button>
            </div>
          ) : (
            <>
              {/* Stamp progress callout */}
              <div
                onClick={onOpenLoyaltyModal}
                className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-200 text-xs cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 shrink-0 text-amber-400" />
                  <div>
                    <span className="font-semibold block text-white">
                      Shaolin Dragon Stamp Pass
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Earn stamps on each order for complimentary banquet dishes
                    </span>
                  </div>
                </div>
                <span className="text-[10px] underline text-amber-400 whitespace-nowrap">
                  View Pass
                </span>
              </div>

              {/* Itemized List */}
              <div className="space-y-3">
                {cartItems.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-xs sm:text-sm font-semibold text-white">
                          {ci.item.name}
                        </h3>
                      </div>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        {ci.item.portion} · {ci.item.price ? `₦${ci.item.price.toLocaleString('en-NG')} each` : 'Price confirmed upon order'}
                      </span>
                      <span className="font-mono text-xs font-semibold text-red-300 mt-1 block">
                        Qty: {ci.quantity} {ci.item.price ? `· ₦${(ci.item.price * ci.quantity).toLocaleString('en-NG')}` : ''}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-1 bg-zinc-950 border border-white/10 rounded-lg p-1 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(ci.item.id, -1)}
                        className="p-1.5 hover:text-white text-zinc-400 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-semibold text-white">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(ci.item.id, 1)}
                        className="p-1.5 hover:text-white text-zinc-400 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(ci.item.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-400 ml-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                  Dining Preference
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['takeaway', 'dine_in', 'delivery'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setOrderType(type)}
                      className={`min-h-[40px] py-2 text-xs font-medium rounded-lg border transition-all capitalize ${
                        orderType === type
                          ? 'bg-[#B91C1C] text-white border-transparent shadow'
                          : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {type === 'dine_in' ? 'Dine In' : type}
                    </button>
                  ))}
                </div>

                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />

                  {orderType === 'delivery' && (
                    <textarea
                      placeholder="Delivery address in Festac Town / Amuwo Odofin..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                    />
                  )}

                  <input
                    type="text"
                    placeholder="Kitchen instructions (e.g. Mild spice, extra chili sauce)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer: WhatsApp CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-white/10 bg-zinc-900/60 space-y-3">
            <div className="p-3 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-300">
              <span className="font-semibold text-white block mb-0.5">Direct Pricing Confirmation</span>
              Dishes are freshly prepared to order. Our team confirms exact daily pricing and prep time directly on WhatsApp.
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              className="min-h-[48px] w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-950/50 transition-all active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>Send WhatsApp Order &amp; Price Inquiry</span>
            </button>

            <p className="text-[11px] text-zinc-400 text-center">
              Sends selected dishes directly to Shaolin Kungfu ({RESTAURANT_INFO.phoneDisplay}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
