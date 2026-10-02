import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Leaf, 
  Plus, 
  Check, 
  Sparkles, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Utensils, 
  AlertCircle,
  MessageCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { CategoryType, MenuItem } from '../types/restaurant';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Record<string, number>;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'All Dishes' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'noodles_rice', label: 'Noodles & Rice' },
  { id: 'chefs_specials', label: "Chef's Special Mains" },
  { id: 'seafood', label: 'Seafood' },
  { id: 'beverages', label: 'Beverages' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  cartItemIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegetarianOnly, setFilterVegetarianOnly] = useState(false);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterChefsSpecialOnly, setFilterChefsSpecialOnly] = useState(false);
  
  // Track expanded menu items (supports multiple open cards)
  const [expandedItemIds, setExpandedItemIds] = useState<Record<string, boolean>>({});

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItemIds((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Compute category counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: 0,
      appetizers: 0,
      noodles_rice: 0,
      chefs_specials: 0,
      seafood: 0,
      beverages: 0,
    };

    MENU_ITEMS.forEach((item) => {
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.detailedDescription && item.detailedDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (item.chineseName && item.chineseName.includes(searchQuery));
      const matchVeg = !filterVegetarianOnly || item.isVegetarian;
      const matchSpicy = !filterSpicyOnly || (item.spicyLevel && item.spicyLevel > 0);
      const matchChef = !filterChefsSpecialOnly || item.isChefsSpecial;

      if (matchSearch && matchVeg && matchSpicy && matchChef) {
        counts.all += 1;
        counts[item.category] += 1;
      }
    });

    return counts;
  }, [searchQuery, filterVegetarianOnly, filterSpicyOnly, filterChefsSpecialOnly]);

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.detailedDescription && item.detailedDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (item.chineseName && item.chineseName.includes(searchQuery));
      const matchVeg = !filterVegetarianOnly || item.isVegetarian;
      const matchSpicy = !filterSpicyOnly || (item.spicyLevel && item.spicyLevel > 0);
      const matchChef = !filterChefsSpecialOnly || item.isChefsSpecial;
      return matchCategory && matchSearch && matchVeg && matchSpicy && matchChef;
    });
  }, [activeCategory, searchQuery, filterVegetarianOnly, filterSpicyOnly, filterChefsSpecialOnly]);

  const hasActiveDietaryFilters = filterVegetarianOnly || filterSpicyOnly || filterChefsSpecialOnly;

  const clearAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setFilterVegetarianOnly(false);
    setFilterSpicyOnly(false);
    setFilterChefsSpecialOnly(false);
  };

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  const isAllExpanded = useMemo(() => {
    if (filteredItems.length === 0) return false;
    return filteredItems.every((item) => expandedItemIds[item.id]);
  }, [filteredItems, expandedItemIds]);

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedItemIds({});
    } else {
      const allExpanded: Record<string, boolean> = {};
      filteredItems.forEach((item) => {
        allExpanded[item.id] = true;
      });
      setExpandedItemIds(allExpanded);
    }
  };

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Interactive Menu &amp; Kitchen Specialties</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Authentic Chinese Menu &amp; Categories
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Filter through traditional wok specialties, handcrafted dim sum, fresh seafood, and refreshing beverages. Portions are generous sharing sizes; daily pricing and availability are confirmed directly upon order via WhatsApp or at table service. Click any dish card to inspect its ingredients and culinary craft.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Row 1: Search + Dietary Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search dishes or ingredients (e.g. prawns, ginger, noodles, tofu)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Preference Filter Buttons (Vegetarian, Spicy, Chef's Special) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 lg:pb-0 no-scrollbar touch-pan-x">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden sm:inline mr-1">
                Dietary:
              </span>

              {/* Vegetarian Filter */}
              <button
                onClick={() => setFilterVegetarianOnly(!filterVegetarianOnly)}
                aria-pressed={filterVegetarianOnly}
                className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  filterVegetarianOnly
                    ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500 shadow-sm shadow-emerald-950/40'
                    : 'bg-zinc-900/90 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Leaf className={`w-3.5 h-3.5 ${filterVegetarianOnly ? 'text-emerald-400 fill-emerald-400/30' : 'text-zinc-500'}`} />
                <span>Vegetarian</span>
                {filterVegetarianOnly && <Check className="w-3.5 h-3.5 ml-0.5 text-emerald-400" />}
              </button>

              {/* Spicy Filter */}
              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                aria-pressed={filterSpicyOnly}
                className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  filterSpicyOnly
                    ? 'bg-amber-950/80 text-amber-200 border-amber-500 shadow-sm shadow-amber-950/40'
                    : 'bg-zinc-900/90 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${filterSpicyOnly ? 'text-amber-400 fill-amber-400/30' : 'text-zinc-500'}`} />
                <span>Spicy Heat</span>
                {filterSpicyOnly && <Check className="w-3.5 h-3.5 ml-0.5 text-amber-400" />}
              </button>

              {/* Chef's Special Filter */}
              <button
                onClick={() => setFilterChefsSpecialOnly(!filterChefsSpecialOnly)}
                aria-pressed={filterChefsSpecialOnly}
                className={`min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  filterChefsSpecialOnly
                    ? 'bg-red-950/80 text-red-200 border-red-500 shadow-sm shadow-red-950/40'
                    : 'bg-zinc-900/90 text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${filterChefsSpecialOnly ? 'text-red-400' : 'text-zinc-500'}`} />
                <span>Chef's Signature</span>
                {filterChefsSpecialOnly && <Check className="w-3.5 h-3.5 ml-0.5 text-red-400" />}
              </button>

              {/* Reset if active */}
              {(hasActiveDietaryFilters || searchQuery || activeCategory !== 'all') && (
                <button
                  onClick={clearAllFilters}
                  className="min-h-[42px] px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 underline underline-offset-4 whitespace-nowrap"
                >
                  Reset
                </button>
              )}
            </div>

          </div>

          {/* Row 2: Category Tabs Bar (Interactive segmented control) */}
          <div className="p-1.5 bg-zinc-900/95 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar shadow-inner">
            <div className="flex items-center gap-1.5 min-w-max">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id];

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`min-h-[44px] px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 active:scale-95 ${
                      isActive
                        ? 'bg-[#B91C1C] text-white shadow-md shadow-red-950/60'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-mono tabular-nums ${
                        isActive ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Filter Summary & Expand-All Toggle Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400 mb-6 pb-3 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Showing <strong className="text-white font-semibold">{filteredItems.length}</strong> dish{filteredItems.length === 1 ? '' : 'es'}
            </span>
            {activeCategory !== 'all' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-300">Category: {CATEGORIES.find(c => c.id === activeCategory)?.label}</span>
              </>
            )}
            {filterVegetarianOnly && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">Vegetarian Only</span>
              </>
            )}
            {filterSpicyOnly && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-medium">Spicy Heat Only</span>
              </>
            )}
            {filterChefsSpecialOnly && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-red-400 font-medium">Chef's Signature</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-zinc-500 hidden md:inline">
              Tap any dish to reveal ingredients &amp; craft
            </span>
            {filteredItems.length > 0 && (
              <button
                onClick={toggleExpandAll}
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                aria-label={isAllExpanded ? "Collapse all dish details" : "Expand all dish details"}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isAllExpanded ? 'Collapse All' : 'Expand All Details'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-white/10 bg-zinc-950 p-6">
            <Leaf className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-white mb-1">
              No dishes match your active filter
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-4">
              Try switching category or toggling off the dietary restrictions to view other delicious authentic Chinese specialties.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#B91C1C] hover:bg-[#991B1B] rounded-xl transition-colors shadow"
            >
              Reset all menu filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredItems.map((item) => {
              const countInCart = cartItemIds[item.id] || 0;
              const isExpanded = !!expandedItemIds[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItemExpansion(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItemExpansion(item.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-controls={`menu-details-${item.id}`}
                  className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isExpanded
                      ? 'bg-zinc-900 border border-red-500/40 shadow-xl shadow-red-950/20 ring-1 ring-red-500/20'
                      : 'bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-white/20 hover:shadow-lg'
                  }`}
                >
                  <div>
                    {/* Item Image if present */}
                    {item.image && (
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-zinc-950 border border-white/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          {item.isChefsSpecial && (
                            <div className="px-2 py-0.5 rounded bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
                              Chef's Special
                            </div>
                          )}
                          {item.isVegetarian && (
                            <div className="px-2 py-0.5 rounded bg-emerald-700/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm flex items-center gap-1">
                              <Leaf className="w-2.5 h-2.5 fill-current" />
                              <span>Vegetarian</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Metadata Header: Clean unboxed text */}
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                      <div className="flex items-center gap-2">
                        {item.chineseName && (
                          <span className="font-chinese text-red-300 text-xs tracking-wider">
                            {item.chineseName}
                          </span>
                        )}
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span className="truncate">{item.portion}</span>
                      </div>

                      {/* Dietary / Spice Level Icons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {item.isVegetarian && !item.image && (
                          <span className="text-emerald-400 flex items-center gap-0.5 text-[11px] font-medium" title="Vegetarian">
                            <Leaf className="w-3.5 h-3.5" />
                          </span>
                        )}

                        {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
                          <div className="flex items-center gap-0.5 text-amber-400" title={`Spicy heat level: ${item.spicyLevel}/3`}>
                            {Array.from({ length: item.spicyLevel }).map((_, i) => (
                              <Flame key={i} className="w-3 h-3 fill-current text-amber-500" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Item Name */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors text-balance">
                        {item.name}
                      </h3>
                      
                      {/* Expansion Indicator Chevron */}
                      <div 
                        className={`p-1 rounded-lg transition-transform duration-200 shrink-0 ${
                          isExpanded ? 'text-red-400 rotate-180 bg-red-950/40' : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className={`mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {item.description}
                    </p>

                    {/* Tags clean text */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                        {item.tags.map((t, idx) => (
                          <React.Fragment key={idx}>
                            <span>{t}</span>
                            {idx < item.tags!.length - 1 && <span aria-hidden="true" className="text-zinc-700">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div
                        id={`menu-details-${item.id}`}
                        className="mt-4 pt-4 border-t border-white/10 space-y-3.5 text-left animate-in fade-in slide-in-from-top-2 duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Detailed Culinary Preparation */}
                        {item.detailedDescription && (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-300 uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-red-400 shrink-0" />
                              <span>Culinary Craft &amp; Wok Technique</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/70 p-3 rounded-xl border border-white/5">
                              {item.detailedDescription}
                            </p>
                          </div>
                        )}

                        {/* Ingredients Breakdown */}
                        {item.ingredients && item.ingredients.length > 0 && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-1.5 font-semibold text-zinc-300 uppercase tracking-wider">
                                <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>Fresh Ingredients ({item.ingredients.length})</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.ingredients.map((ingredient, iIdx) => (
                                <span
                                  key={iIdx}
                                  className="inline-flex items-center px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/10 text-[11px] text-zinc-300 font-medium hover:border-red-500/30 transition-colors"
                                >
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Allergens & Dietary Information */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                            <div className="flex items-center gap-1 text-zinc-400 font-medium">
                              <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>Allergens:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.allergens.map((allergen, aIdx) => (
                                <span
                                  key={aIdx}
                                  className="px-2 py-0.5 rounded-md bg-amber-950/40 border border-amber-800/30 text-amber-300 text-[10px] font-medium"
                                >
                                  {allergen}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Chef's Serving Suggestion */}
                        {item.servingSuggestion && (
                          <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
                            <strong className="text-zinc-200 block mb-0.5 font-medium">
                              Chef's Serving Recommendation:
                            </strong>
                            {item.servingSuggestion}
                          </div>
                        )}

                        {/* Direct WhatsApp Dish Inquiry Link */}
                        <div className="pt-1 flex items-center justify-between text-[11px]">
                          <a
                            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello Shaolin Kungfu, I have a question about the ${item.name} (${item.portion}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Ask Chef about this dish</span>
                          </a>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleItemExpansion(item.id);
                            }}
                            className="text-zinc-500 hover:text-zinc-300 inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Close details</span>
                            <ChevronUp className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Exact Tabular Price + Add to Order action */}
                  <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-medium">
                        Portion &amp; Pricing
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-red-300">
                        {item.price ? formatNaira(item.price) : 'Inquire on WhatsApp'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Tap to Toggle details button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemExpansion(item.id);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          isExpanded
                            ? 'bg-zinc-800 text-white border-white/20'
                            : 'bg-zinc-950 text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
                        }`}
                        title={isExpanded ? "Collapse details" : "Expand details & ingredients"}
                        aria-label={isExpanded ? `Hide ingredients for ${item.name}` : `View ingredients for ${item.name}`}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-red-400" />
                        ) : (
                          <Utensils className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>

                      {/* Add to Order Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(item);
                        }}
                        className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all active:scale-95 ${
                          countInCart > 0
                            ? 'bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/35'
                            : 'bg-[#B91C1C] hover:bg-[#991B1B] text-white shadow-md shadow-red-950/50'
                        }`}
                      >
                        {countInCart > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Added ({countInCart})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Dietary Inquiry Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
            <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-800/40 flex items-center justify-center shrink-0 text-red-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-white block">Custom Dietary Preferences or Special Halal / Vegetarian Inquiries?</span>
              Our Festac wok kitchen customizes any dish upon request—adjusting spice level, cooking with vegetarian oils, or preparing banquet portions.
            </div>
          </div>
          <a
            href={`https://wa.me/2348146288999?text=${encodeURIComponent('Hello Shaolin Kungfu Chinese Restaurant, I have a special vegetarian/dietary inquiry for your chef.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 rounded-xl whitespace-nowrap transition-colors"
          >
            Direct Kitchen WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
