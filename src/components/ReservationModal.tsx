import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '4',
    seatingArea: 'main_hall',
    specialRequests: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setStep('confirmed');
  };

  const handleWhatsAppForward = () => {
    const areaMap = {
      main_hall: 'Main Banquet Dining Hall (Turntable Tables)',
      quiet_booth: 'Quiet Dining Booth (Quiet weekend setting)',
      vip_banquet: 'Private VIP Banquet Suite',
    };

    const message = `*TABLE RESERVATION INQUIRY*\n` +
      `*Restaurant:* Shaolin Kungfu Chinese Restaurant (Festac)\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Date:* ${formData.date}\n` +
      `*Time:* ${formData.time}\n` +
      `*Guests:* ${formData.guests} Persons\n` +
      `*Seating Preference:* ${areaMap[formData.seatingArea as keyof typeof areaMap]}\n` +
      (formData.specialRequests ? `*Special Request:* ${formData.specialRequests}\n` : '') +
      `\nPlease confirm our table reservation. Thank you!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleResetAndClose}
    >
      <div
        className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/40 text-red-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Reserve a Dining Table
              </h2>
              <span className="text-xs text-zinc-400">
                Shaolin Kungfu · Festac Town, Lagos
              </span>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adebayo Williams"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0803 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {/* Date, Time & Guests */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-2.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Time *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-2.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                  <option value="18:30">06:30 PM (Dinner)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="20:00">08:00 PM (Dinner)</option>
                  <option value="21:00">09:00 PM (Late Dinner)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Party Size *
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-2.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="6">6 Persons (Round Table)</option>
                  <option value="8">8 Persons (Large Banquet)</option>
                  <option value="10">10+ Persons (VIP Group)</option>
                </select>
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    formData.seatingArea === 'main_hall'
                      ? 'bg-red-950/40 border-red-500 text-white'
                      : 'bg-zinc-900 border-white/10 text-zinc-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="seating"
                    value="main_hall"
                    checked={formData.seatingArea === 'main_hall'}
                    onChange={() => setFormData({ ...formData, seatingArea: 'main_hall' })}
                    className="hidden"
                  />
                  <span className="font-semibold block text-white mb-0.5">Main Banquet</span>
                  <span className="text-[11px] text-zinc-400">Lively &amp; festive turntable tables</span>
                </label>

                <label
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    formData.seatingArea === 'quiet_booth'
                      ? 'bg-red-950/40 border-red-500 text-white'
                      : 'bg-zinc-900 border-white/10 text-zinc-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="seating"
                    value="quiet_booth"
                    checked={formData.seatingArea === 'quiet_booth'}
                    onChange={() => setFormData({ ...formData, seatingArea: 'quiet_booth' })}
                    className="hidden"
                  />
                  <span className="font-semibold block text-white mb-0.5">Quiet Booth</span>
                  <span className="text-[11px] text-zinc-400">Cozy for date nights &amp; quiet chats</span>
                </label>

                <label
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    formData.seatingArea === 'vip_banquet'
                      ? 'bg-red-950/40 border-red-500 text-white'
                      : 'bg-zinc-900 border-white/10 text-zinc-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="seating"
                    value="vip_banquet"
                    checked={formData.seatingArea === 'vip_banquet'}
                    onChange={() => setFormData({ ...formData, seatingArea: 'vip_banquet' })}
                    className="hidden"
                  />
                  <span className="font-semibold block text-white mb-0.5">VIP Room</span>
                  <span className="text-[11px] text-zinc-400">Private banquet suite for gatherings</span>
                </label>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Special Occasion or Dietary Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, high chair required, non-spicy for kids"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white font-semibold text-sm shadow-lg shadow-red-950/50 transition-all active:scale-98"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Table Reserved Successfully!
              </h3>
              <p className="text-xs text-zinc-300 mt-2 max-w-sm mx-auto">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your table for{' '}
                <strong className="text-white">{formData.guests} guests</strong> has been slated for{' '}
                <strong className="text-white">{formData.date} at {formData.time}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-zinc-400">
                <span>Location:</span>
                <span className="text-zinc-200">782 Festac Access Rd, Lagos</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Phone:</span>
                <span className="text-zinc-200">{formData.phone}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Seating:</span>
                <span className="text-zinc-200 capitalize">{formData.seatingArea.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppForward}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Confirmation Copy to WhatsApp</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
