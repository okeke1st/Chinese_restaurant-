import React from 'react';
import { HeartHandshake, Flame, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Brand Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>About Shaolin Kungfu Chinese Restaurant</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Honoring Authentic Chinese Culinary Heritage in Festac Town
            </h2>

            <p className="text-zinc-300 text-base leading-relaxed">
              Situated on Festac Access Road, <strong className="text-white font-semibold">Shaolin Kungfu Chinese Restaurant</strong> is dedicated to delivering genuine culinary traditions with uncompromising flavor integrity. Unlike generic alternatives, our kitchen is anchored in time-tested techniques—from high-flame wok toss that imparts genuine <em className="text-red-300 not-italic font-medium">wok hei</em> (breath of the wok) to artisanal slow-braising in fragrant star anise and dark soy.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              We take deep pride in our courteous, warm customer service. Whether you are gathering for a family celebration, an executive dinner, or an intimate weekend dinner, our service staff ensures every guest feels welcome and attentively cared for.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                <div className="flex items-center gap-2.5 text-red-400 font-semibold text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Uncompromised Authenticity</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Genuine Chinese spices, hand-pulled noodles, hand-pleated dumplings, and sizzling cast iron hot plates prepared fresh upon order.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5 space-y-2">
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Courteous &amp; Attentive Service</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Regularly highlighted across hundreds of Google Maps reviews for polite, responsive, and welcoming Nigerian hospitality.
                </p>
              </div>
            </div>

            {/* Atmosphere note from customer reviews */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-zinc-300 text-xs leading-relaxed flex items-start gap-3">
              <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-200 block mb-0.5">Dining Atmosphere &amp; Weekend Vibe</strong>
                Weekends at Shaolin Kungfu are festive and lively! The main dining room often fills with joyful family chatter and sizzling banquet platters. For quieter conversations, comfortable private dining booths and early reservation slots are readily accommodated.
              </div>
            </div>

          </div>

          {/* Right Column: Visual Feature Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
              <img
                src="/src/assets/images/dinesurf_restaurant_1.png"
                alt="Shaolin Kungfu Chinese Restaurant Festac dining room"
                className="w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-zinc-950/95 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-chinese text-xs text-red-400">传承正宗中餐</span>
                    <h3 className="font-display text-lg font-bold text-white">The Shaolin Standard</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded">
                    Est. in Festac
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fresh daily wok preparations &amp; genuine traditional recipes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Large sharing banquet portions designed for 2–4 people</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom spice levels tailored to your palate (Mild to Szechuan Heat)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Central Festac location with guarded parking along Access Road</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
