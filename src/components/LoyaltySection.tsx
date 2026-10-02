import React from 'react';
import { Award, Gift, QrCode, MessageCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { LOYALTY_PROGRAM_CONFIG } from '../data/restaurantData';

interface LoyaltySectionProps {
  onOpenLoyaltyModal: () => void;
}

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({
  onOpenLoyaltyModal,
}) => {
  return (
    <section id="loyalty" className="py-12 sm:py-16 md:py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-red-950/70 via-zinc-950 to-black border border-red-500/30 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
          {/* Subtle dragon seal watermark / ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-red-400" />
                <span>Customer Loyalty Program · Festac</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Shaolin Dragon Stamp Pass <span className="font-chinese text-red-400 text-xl sm:text-2xl font-normal block sm:inline ml-0 sm:ml-2">少林功夫龙印卡</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Earn authentic digital stamps with every qualifying dining meal or order. Scan your receipt code in the restaurant or earn automatically when ordering via WhatsApp.
              </p>

              {/* Milestone previews */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">3 Stamps</span>
                  <p className="text-xs font-semibold text-white">Free Artisanal Tea Pot</p>
                  <span className="text-[10px] text-zinc-400">Jasmine Dragon Pearl or Wanglaoji</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">5 Stamps</span>
                  <p className="text-xs font-semibold text-white">Free Steamed Dumplings</p>
                  <span className="text-[10px] text-zinc-400">8 pcs Jiaozi or Golden Spring Rolls</span>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-red-500/40 bg-red-950/30">
                  <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">8 Stamps</span>
                  <p className="text-xs font-semibold text-white">Chef's Banquet Feast</p>
                  <span className="text-[10px] text-zinc-400">Complimentary Special Fried Rice Platter</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onOpenLoyaltyModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-950/60 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open My Digital Stamp Card</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenLoyaltyModal}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-xs sm:text-sm font-medium transition-colors"
                >
                  <QrCode className="w-4 h-4 text-red-400" />
                  <span>How to Scan Receipt QR</span>
                </button>
              </div>

            </div>

            {/* Right Graphical Stamp Card Preview */}
            <div className="lg:col-span-5">
              <div
                onClick={onOpenLoyaltyModal}
                className="p-6 rounded-2xl bg-zinc-900/90 border border-white/15 shadow-xl hover:border-red-500/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                      SF
                    </div>
                    <span className="font-display text-sm font-bold text-white">
                      Dragon Stamp Card
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                    4/8 Stamps Active
                  </span>
                </div>

                {/* Stamp visual matrix */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className="aspect-square rounded-xl bg-red-600 text-white border border-red-400 flex flex-col items-center justify-center shadow-md"
                    >
                      <span className="font-chinese text-xs">龙</span>
                      <span className="text-[9px] font-bold uppercase mt-0.5">#{s}</span>
                    </div>
                  ))}
                  {[5, 6, 7, 8].map((s) => (
                    <div
                      key={s}
                      className="aspect-square rounded-xl bg-zinc-950 border border-dashed border-white/20 flex flex-col items-center justify-center text-zinc-500"
                    >
                      <span className="text-xs font-mono">{s}</span>
                      {s === 5 || s === 8 ? (
                        <Gift className="w-3 h-3 text-amber-400 mt-0.5" />
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 group-hover:text-white transition-colors">
                    Tap to view digital wallet &rarr;
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold">
                    1 stamp away from Free Dumplings!
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
