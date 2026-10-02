import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, Gift, QrCode, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { LOYALTY_PROGRAM_CONFIG, RESTAURANT_INFO } from '../data/restaurantData';
import { CustomerLoyaltyCard } from '../types/restaurant';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClaimCode?: string;
}

const STORAGE_LOYALTY_KEY = 'shaolin_kungfu_loyalty_data';

const DEFAULT_LOYALTY_CARD: CustomerLoyaltyCard = {
  customerPhone: '0814 628 8999',
  customerName: 'Festac Patron',
  currentStamps: 4, // 4 stamps by default for immediate exciting interaction
  totalStampsEarned: 12,
  stampsGoal: 8,
  unlockedRewards: ['reward-3'],
  receiptHistory: [
    { receiptCode: 'FSTC-9821', orderAmount: 28500, stampsAdded: 1, date: '12 Sep 2026' },
    { receiptCode: 'FSTC-9904', orderAmount: 42000, stampsAdded: 1, date: '19 Sep 2026' },
    { receiptCode: 'WA-7741', orderAmount: 31000, stampsAdded: 1, date: '24 Sep 2026' },
    { receiptCode: 'FSTC-1002', orderAmount: 38000, stampsAdded: 1, date: '28 Sep 2026' },
  ],
};

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  initialClaimCode,
}) => {
  const [loyaltyData, setLoyaltyData] = useState<CustomerLoyaltyCard>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LOYALTY_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_LOYALTY_CARD;
    } catch {
      return DEFAULT_LOYALTY_CARD;
    }
  });

  const [receiptCodeInput, setReceiptCodeInput] = useState(initialClaimCode || '');
  const [claimFeedback, setClaimFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [redeemedReward, setRedeemedReward] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'card' | 'how_it_works' | 'history'>('card');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LOYALTY_KEY, JSON.stringify(loyaltyData));
    } catch {
      // ignore
    }
  }, [loyaltyData]);

  if (!isOpen) return null;

  const handleClaimStamp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = receiptCodeInput.trim().toUpperCase();

    if (!code) {
      setClaimFeedback({ type: 'error', message: 'Please enter a valid receipt stamp code.' });
      return;
    }

    if (loyaltyData.receiptHistory.some((r) => r.receiptCode.toUpperCase() === code)) {
      setClaimFeedback({ type: 'error', message: 'This receipt code has already been credited to your pass.' });
      return;
    }

    const nextStamps = loyaltyData.currentStamps + 1;
    const newUnlocked = [...loyaltyData.unlockedRewards];

    if (nextStamps >= 3 && !newUnlocked.includes('reward-3')) newUnlocked.push('reward-3');
    if (nextStamps >= 5 && !newUnlocked.includes('reward-5')) newUnlocked.push('reward-5');
    if (nextStamps >= 8 && !newUnlocked.includes('reward-8')) newUnlocked.push('reward-8');

    const updatedCard: CustomerLoyaltyCard = {
      ...loyaltyData,
      currentStamps: nextStamps > 8 ? 8 : nextStamps,
      totalStampsEarned: loyaltyData.totalStampsEarned + 1,
      unlockedRewards: newUnlocked,
      receiptHistory: [
        {
          receiptCode: code,
          orderAmount: 26500,
          stampsAdded: 1,
          date: 'Just Now',
        },
        ...loyaltyData.receiptHistory,
      ],
    };

    setLoyaltyData(updatedCard);
    setReceiptCodeInput('');
    setClaimFeedback({
      type: 'success',
      message: `Stamp added successfully! You now have ${updatedCard.currentStamps} of 8 stamps.`,
    });
  };

  const handleRedeemReward = (rewardId: string, rewardTitle: string) => {
    setRedeemedReward(rewardTitle);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B91C1C] flex items-center justify-center text-white shadow-md shadow-red-950/60">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                  {LOYALTY_PROGRAM_CONFIG.name}
                </h2>
                <span className="font-chinese text-xs text-red-400">
                  {LOYALTY_PROGRAM_CONFIG.chineseName}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Collect stamps on dining visits and orders for complimentary authentic dishes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Close loyalty pass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-zinc-900/20 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'card'
                ? 'border-red-500 text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Digital Stamp Card
          </button>
          <button
            onClick={() => setActiveTab('how_it_works')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'how_it_works'
                ? 'border-red-500 text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            How to Earn &amp; QR Scan
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'history'
                ? 'border-red-500 text-white bg-zinc-900/40'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Stamp History
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {activeTab === 'card' && (
            <>
              {/* Digital Stamp Card Graphical Board */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-red-950/80 via-zinc-900 to-black border border-red-500/30 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 block">
                      OFFICIAL MEMBER PASS · FESTAC
                    </span>
                    <span className="font-display text-lg font-bold text-white">
                      {loyaltyData.customerName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block font-mono">
                      Pass ID: SF-{loyaltyData.customerPhone.slice(-4)}
                    </span>
                    <span className="text-xs font-semibold text-amber-400">
                      {loyaltyData.currentStamps} / 8 Stamps Collected
                    </span>
                  </div>
                </div>

                {/* 8-Stamp Grid */}
                <div className="grid grid-cols-4 gap-3 sm:gap-4 my-6">
                  {Array.from({ length: 8 }).map((_, index) => {
                    const stampNum = index + 1;
                    const isStamped = stampNum <= loyaltyData.currentStamps;
                    const isMilestone = stampNum === 3 || stampNum === 5 || stampNum === 8;

                    return (
                      <div
                        key={index}
                        className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border transition-all duration-300 ${
                          isStamped
                            ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-950/80 scale-[1.02]'
                            : 'bg-zinc-900/80 border-dashed border-white/20 text-zinc-500'
                        }`}
                      >
                        {isStamped ? (
                          <>
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-chinese text-sm font-bold shadow-inner">
                              龙
                            </div>
                            <span className="text-[10px] font-bold mt-1 tracking-wider uppercase">
                              Stamp {stampNum}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="font-mono text-sm font-semibold">{stampNum}</span>
                            {isMilestone && (
                              <Gift className="w-3.5 h-3.5 text-amber-400 mt-1" />
                            )}
                          </>
                        )}

                        {/* Milestone indicator */}
                        {isMilestone && !isStamped && (
                          <div className="absolute -top-1.5 -right-1.5 px-1 bg-amber-500 text-black text-[9px] font-bold rounded">
                            Gift
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
                  <span>1 Stamp per dining meal or order</span>
                  <span className="text-zinc-300">
                    {8 - loyaltyData.currentStamps > 0
                      ? `${8 - loyaltyData.currentStamps} more stamps to Chef's Grand Banquet Reward`
                      : 'Card Complete! Ready for Grand Reward'}
                  </span>
                </div>
              </div>

              {/* Enter Receipt Stamp Code Simulation Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-3">
                <div className="flex items-start gap-2.5">
                  <QrCode className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                      Claim Stamp with Receipt or WhatsApp Code
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Enter the 8-digit verification code printed on your receipt or received via WhatsApp. Try demo codes: <code className="text-red-300 bg-zinc-800 px-1 py-0.5 rounded">FESTAC-889</code> or <code className="text-red-300 bg-zinc-800 px-1 py-0.5 rounded">WA-DELIVERY-20K</code>.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleClaimStamp} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. FESTAC-889)"
                    value={receiptCodeInput}
                    onChange={(e) => setReceiptCodeInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl transition-all whitespace-nowrap active:scale-95"
                  >
                    Add Stamp
                  </button>
                </form>

                {claimFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      claimFeedback.type === 'success'
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                        : 'bg-red-950/60 border border-red-500/40 text-red-300'
                    }`}
                  >
                    {claimFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>{claimFeedback.message}</span>
                  </div>
                )}
              </div>

              {/* Milestone Rewards Unlocked */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  Milestone Rewards Available
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {LOYALTY_PROGRAM_CONFIG.rewards.map((reward) => {
                    const isUnlocked = loyaltyData.currentStamps >= reward.stampsRequired;

                    return (
                      <div
                        key={reward.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                          isUnlocked
                            ? 'bg-zinc-900/90 border-emerald-500/40 shadow-sm'
                            : 'bg-zinc-950/60 border-white/5 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-semibold text-amber-400">{reward.stampsRequired} Stamps</span>
                            <span className="text-zinc-400">{reward.rewardValue}</span>
                          </div>
                          <h4 className="font-display text-xs font-bold text-white leading-snug">
                            {reward.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                            {reward.description}
                          </p>
                        </div>

                        <div>
                          {isUnlocked ? (
                            <button
                              onClick={() => handleRedeemReward(reward.id, reward.title)}
                              className="w-full py-2 px-3 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Ticket className="w-3.5 h-3.5" />
                              <span>Redeem at Table</span>
                            </button>
                          ) : (
                            <div className="text-[11px] text-zinc-400 text-center py-1.5 bg-zinc-900 rounded-lg font-medium">
                              Need {reward.stampsRequired - loyaltyData.currentStamps} more stamps
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Redeemed Reward Modal Confirmation */}
              {redeemedReward && (
                <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="block text-emerald-200">Reward Voucher Activated:</strong>
                      <span>{redeemedReward} — Voucher token: <code className="font-mono bg-black/40 px-1 py-0.5 rounded text-emerald-300">SK-FESTAC-{Math.floor(1000 + Math.random() * 9000)}</code></span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      window.open(
                        `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Hello Shaolin Kungfu, I would like to redeem my loyalty reward: ${redeemedReward}`
                        )}`,
                        '_blank'
                      );
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold whitespace-nowrap"
                  >
                    Claim via WhatsApp
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'how_it_works' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display text-base font-bold text-white">
                  How the Shaolin Kungfu Digital Stamp Program Works
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Our digital loyalty pass is designed to reward frequent Chinese cuisine lovers in Festac and Lagos mainland without cumbersome plastic cards.
                </p>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="text-xs font-semibold text-white">Dine or Place Order</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Enjoy authentic Chinese dining at 782 Festac Access Rd or place an order via our WhatsApp service.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="text-xs font-semibold text-white">Receive Receipt Code / Stamp</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Every bill has a printed receipt code or instant WhatsApp verification to credit your Dragon Stamp.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="text-xs font-semibold text-white">Redeem Free Delicacies</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Unlock free teas at 3 stamps, handcrafted dumplings at 5 stamps, and Chef's banquet sharing feast at 8 stamps!
                  </p>
                </div>
              </div>

              {/* Implementation Architecture Overview */}
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Technical &amp; Operational Integration Flow</span>
                </div>
                <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                  <p>
                    <strong className="text-white">1. POS &amp; Physical Receipts:</strong> At the restaurant checkout, the thermal printer generates a verified short-code (e.g. <code className="text-red-300">FSTC-9821</code>) mapped to qualifying dining visits.
                  </p>
                  <p>
                    <strong className="text-white">2. WhatsApp Order Integration:</strong> When orders close in WhatsApp, the customer receives an automated text: <em className="text-zinc-200">"Thank you for dining with Shaolin Kungfu! Tap to claim your loyalty stamp: shaolin.restaurant/#loyalty?claim=WA-CODE"</em>.
                  </p>
                  <p>
                    <strong className="text-white">3. Redemption Verification:</strong> Waiters in Festac verify redeemed vouchers against the POS terminal, deducting the complimentary dishes directly from the guest bill.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Recent Stamp Credits</span>
                <span className="font-mono">Total Earned: {loyaltyData.totalStampsEarned} Stamps</span>
              </div>

              <div className="space-y-2">
                {loyaltyData.receiptHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-white">{item.receiptCode}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                          +1 Stamp
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        Festac Dining / Takeaway Order
                      </span>
                    </div>
                    <span className="text-zinc-400 font-mono text-[11px]">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 bg-zinc-900/40 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            Shaolin Kungfu Chinese Restaurant · Festac Town, Lagos
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            Close Card
          </button>
        </div>

      </div>
    </div>
  );
};
