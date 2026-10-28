/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SearchBar } from './SearchBar';
import { CategoryChips } from './CategoryChips';
import { Sparkles, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (query: string) => void;
  onSearchClear: () => void;
  isLoading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
  isLoading = false,
}) => {
  return (
    <section className="relative pt-10 pb-16 overflow-hidden border-b border-stone-200 bg-[#FAF8F5]">
      {/* Subtle curatorial background motif */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1c1917_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200/70 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Open Cultural Heritage Archive</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-stone-900 leading-[1.15] mb-5">
            Rayan Culture Explorer
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Explore cultures, traditions, clothing, food, and heritage through authentic images.
          </p>
        </div>

        {/* Search Bar Container */}
        <div id="search-section" className="max-w-2xl mx-auto mb-6">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            onClear={onSearchClear}
            isLoading={isLoading}
          />
        </div>

        {/* Suggestion Chips */}
        <div className="max-w-3xl mx-auto mb-12">
          <CategoryChips
            onSelectTopic={onSearchSubmit}
            activeQuery={searchQuery}
          />
        </div>

        {/* Short Note on Rights & Attribution */}
        <div className="max-w-2xl mx-auto mb-14 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-stone-500 font-sans bg-stone-100/70 px-3.5 py-1.5 rounded-lg border border-stone-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>
              Images belong to their respective creators and source repositories. Results include direct source links, attribution, and open licenses.
            </span>
          </div>
        </div>

        {/* Curated Heritage Highlights Showcase */}
        <div id="curated-showcase" className="pt-4">
          <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 font-sans block">
                Featured Highlights
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-stone-900">
                Preserving Living Traditions
              </h2>
            </div>
            <span className="text-xs text-stone-400 font-sans hidden sm:inline">
              Curated Archival Specimens
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Sindhi Ajrak */}
            <div
              onClick={() => onSearchSubmit('Sindhi Ajrak')}
              className="group cursor-pointer bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSearchSubmit('Sindhi Ajrak');
              }}
              aria-label="Explore Sindhi Ajrak craft"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                <img
                  src="/src/assets/images/sindhi_ajrak_textile_1793204319940.jpg"
                  alt="Authentic Sindhi Ajrak geometric woodblock textile"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-[11px] font-sans px-2 py-0.5 rounded-md">
                  Sindh
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-800 transition-colors">
                    Sindhi Ajrak Craft
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    Centuries-old geometric block printing tradition using natural indigo, pomegranate, and madder dyes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-teal-800 font-medium">
                  <span>Explore Ajrak images</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 2: Pakhtoon Culture */}
            <div
              onClick={() => onSearchSubmit('Pakhtoon culture')}
              className="group cursor-pointer bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSearchSubmit('Pakhtoon culture');
              }}
              aria-label="Explore Pakhtoon culture"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                <img
                  src="/src/assets/images/pakhtoon_heritage_craft_1793204319870.jpg"
                  alt="Pakhtoon hand-embroidered tribal fabric with coin craft"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-[11px] font-sans px-2 py-0.5 rounded-md">
                  Khyber
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-800 transition-colors">
                    Pakhtoon Handcrafts & Attire
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    Tribal embroidery with silk needlework, Peshawar chappal footwear, and traditional Khet Partug attire.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-teal-800 font-medium">
                  <span>Explore Pashtun heritage</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Card 3: Heritage Pavilion */}
            <div
              onClick={() => onSearchSubmit('Cultural festivals')}
              className="group cursor-pointer bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSearchSubmit('Cultural festivals');
              }}
              aria-label="Explore Cultural festivals"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                <img
                  src="/src/assets/images/hero_culture_heritage_1793204319123.jpg"
                  alt="South and Central Asian cultural heritage artifacts and textiles"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-[11px] font-sans px-2 py-0.5 rounded-md">
                  National Heritage
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-teal-800 transition-colors">
                    Folk Melas & Living Crafts
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    National festivals like Lok Virsa bringing together regional artisans, musicians, and culinary masters.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-teal-800 font-medium">
                  <span>Explore festivals & arts</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
