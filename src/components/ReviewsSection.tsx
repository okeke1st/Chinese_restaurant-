import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, ExternalLink, Filter } from 'lucide-react';
import { REVIEWS_DATA, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');

  const reviewTags = [
    'All Highlights',
    'Fak special fried rice',
    'Courteous service',
    'Sizzling beef',
    'Steamed dumplings',
    'Steamed fish',
  ];

  const filteredReviews = REVIEWS_DATA.filter((rev) => {
    const matchRating = selectedRating === 'all' || rev.rating === selectedRating;
    const matchTag =
      selectedTag === 'all' ||
      selectedTag === 'All Highlights' ||
      (rev.dishMentions && rev.dishMentions.some((d) => d.toLowerCase().includes(selectedTag.toLowerCase())));
    return matchRating && matchTag;
  });

  return (
    <section id="reviews" className="py-16 md:py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Google Profile Feed &amp; Testimonials</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            What Festac Diners Say
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Authentic customer testimonials from our Google Maps profile (4.4★ Rating from 380+ patrons). Praised for courteous hospitality, rich wok seasonings, and festive weekend banquet energy.
          </p>
        </div>

        {/* Google Score Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl bg-zinc-900/80 border border-white/10 mb-12 shadow-xl">
          
          {/* Big Score Box */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="font-display text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                {RESTAURANT_INFO.rating}
              </span>
              <div className="space-y-1">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'fill-current text-amber-400/60'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-400 block">out of 5 stars</span>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-300 font-medium">
              Based on {RESTAURANT_INFO.totalReviews}+ verified Google Maps diners in Lagos
            </p>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              <span>View live Google Maps listing</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Rating Distribution Breakdown */}
          <div className="lg:col-span-5 space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-zinc-400 font-medium">5 stars</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '72%' }} />
              </div>
              <span className="w-8 text-right text-zinc-400 font-mono">72%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-zinc-400 font-medium">4 stars</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400/80 rounded-full" style={{ width: '18%' }} />
              </div>
              <span className="w-8 text-right text-zinc-400 font-mono">18%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-zinc-400 font-medium">3 stars</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-600 rounded-full" style={{ width: '6%' }} />
              </div>
              <span className="w-8 text-right text-zinc-400 font-mono">6%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-zinc-400 font-medium">2 stars</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-600 rounded-full" style={{ width: '3%' }} />
              </div>
              <span className="w-8 text-right text-zinc-400 font-mono">3%</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="w-12 text-zinc-400 font-medium">1 star</span>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-600 rounded-full" style={{ width: '1%' }} />
              </div>
              <span className="w-8 text-right text-zinc-400 font-mono">1%</span>
            </div>
          </div>

          {/* Key Sentiment Summary */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-zinc-300 block uppercase tracking-wider">
              Verified Dining Consensus
            </span>
            <div className="space-y-1.5 text-xs text-zinc-400 leading-relaxed">
              <p>• Staff provides notably courteous, polite table care.</p>
              <p>• Fak special fried rice &amp; sizzling beef are top cited dishes.</p>
              <p>• Lively &amp; vibrant on weekends with festive family crowds.</p>
            </div>
          </div>

        </div>

        {/* Filter tags bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {reviewTags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#B91C1C] text-white shadow-sm font-semibold'
                    : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow`}
                    >
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-white">{rev.author}</span>
                        {rev.verified && (
                          <span title="Verified Google Reviewer">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400">{rev.relativeTime}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{rev.text}"
                </p>

                {/* Dish mentions */}
                {rev.dishMentions && rev.dishMentions.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-red-300/80">
                    <span className="text-zinc-400">Mentioned:</span>
                    {rev.dishMentions.map((d, i) => (
                      <span key={i} className="font-medium text-zinc-200">
                        {d}{i < rev.dishMentions!.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Helpful count */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3 text-zinc-400" />
                  <span>{rev.helpfulCount || 5} people found helpful</span>
                </div>
                <span className="text-zinc-400">via Google Reviews</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
