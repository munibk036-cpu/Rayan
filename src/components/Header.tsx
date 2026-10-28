/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, Search, Menu, X, BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onFocusSearch: () => void;
  activeProviderName?: string;
  isDemoActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onFocusSearch,
  activeProviderName = 'Wikimedia Commons',
  isDemoActive = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-md py-1"
          aria-label="Rayan Culture Explorer Home"
        >
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-100 flex items-center justify-center shadow-xs group-hover:bg-teal-900 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-stone-900 whitespace-nowrap">
              Rayan Culture Explorer
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={onNavigateHome}
            className="hover:text-stone-900 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-sm"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('curated-showcase');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-sm"
          >
            Curated Heritage
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('search-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-sm"
          >
            Cultural Subjects
          </button>
          <button
            onClick={onNavigateAbout}
            className="hover:text-stone-900 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 rounded-sm"
          >
            About & Privacy
          </button>
        </nav>

        {/* Zone 3: Primary Action & Provider status */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isDemoActive ? (
            <span className="hidden sm:inline-flex items-center text-xs font-medium text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-300/60">
              Demo Archive
            </span>
          ) : (
            <span className="hidden lg:inline-flex text-xs text-stone-500 font-sans" title="Active Image Search Provider">
              Provider: {activeProviderName.split(' ')[0]}
            </span>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onFocusSearch();
            }}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            aria-label="Search cultural archive"
          >
            <Search className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Search Heritage</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 py-4 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-stone-700">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('curated-showcase');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              Curated Heritage
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('search-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              Cultural Subjects
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateAbout();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-200/60 transition-colors font-semibold text-teal-900"
            >
              About & Privacy
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
