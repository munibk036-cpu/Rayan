/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ImageGrid } from './components/ImageGrid';
import { ImageModal } from './components/ImageModal';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { EmptyState } from './components/EmptyState';
import { ErrorState } from './components/ErrorState';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { fetchImages, fetchProviderInfo } from './services/imageSearch';
import { ImageResult, ImageOrientation, ProviderType } from './types/culture';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');

  // Search state
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [images, setImages] = useState<ImageResult[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalEstimated, setTotalEstimated] = useState<number | undefined>(undefined);

  // Status & Filters
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<ImageOrientation>('all');
  const [provider, setProvider] = useState<ProviderType>('wikimedia');
  const [activeProviderName, setActiveProviderName] = useState('Wikimedia Commons');
  const [isDemoActive, setIsDemoActive] = useState(false);

  // Modal preview state
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch initial provider information
  useEffect(() => {
    fetchProviderInfo()
      .then((data) => {
        if (data.activeProvider) {
          setProvider(data.activeProvider as ProviderType);
        }
      })
      .catch((err) => {
        console.warn('Could not load initial provider info:', err);
      });
  }, []);

  // Sync with URL query parameter on initial mount and browser back/forward
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      const view = urlParams.get('view');

      if (view === 'about') {
        setCurrentView('about');
      } else {
        setCurrentView('home');
      }

      if (q && q.trim()) {
        const trimmed = q.trim();
        setSearchInput(trimmed);
        setActiveQuery(trimmed);
        executeSearch(trimmed, 1, orientation, provider, false);
        setTimeout(() => {
          const resultsSection = document.getElementById('search-results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Update browser URL query parameter so searches can be bookmarked and shared
  const updateUrlQuery = (q: string, view: 'home' | 'about' = 'home') => {
    const url = new URL(window.location.href);
    if (view === 'about') {
      url.searchParams.set('view', 'about');
      url.searchParams.delete('q');
    } else {
      url.searchParams.delete('view');
      if (q) {
        url.searchParams.set('q', q);
      } else {
        url.searchParams.delete('q');
      }
    }
    window.history.pushState({}, '', url.toString());
  };

  // Main search execution function
  const executeSearch = useCallback(
    async (
      queryToSearch: string,
      pageToFetch: number = 1,
      currentOrientation: ImageOrientation = orientation,
      currentProvider: ProviderType = provider,
      isAppending: boolean = false
    ) => {
      if (!queryToSearch.trim()) return;

      if (isAppending) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      try {
        const response = await fetchImages(queryToSearch.trim(), pageToFetch, {
          orientation: currentOrientation,
          provider: currentProvider,
        });

        if (isAppending) {
          setImages((prev) => [...prev, ...response.results]);
        } else {
          setImages(response.results);
        }

        setPage(response.page);
        setHasMore(response.hasMore);
        setTotalEstimated(response.totalEstimated);
        setActiveProviderName(response.provider || 'Open Cultural Archive');
        setIsDemoActive(Boolean(response.isDemo));

        if (response.error) {
          console.warn('Provider message:', response.error);
        }
      } catch (err: any) {
        console.error('Search error:', err);
        setError(err.message || 'Failed to search images.');
        if (!isAppending) {
          setImages([]);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [orientation, provider]
  );

  // User submits a search
  const handleSearchSubmit = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setCurrentView('home');
    setSearchInput(trimmed);
    setActiveQuery(trimmed);
    updateUrlQuery(trimmed, 'home');
    executeSearch(trimmed, 1, orientation, provider, false);

    // Scroll smoothly to results area
    setTimeout(() => {
      const resultsSection = document.getElementById('search-results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // User clears search
  const handleSearchClear = () => {
    setSearchInput('');
    setActiveQuery('');
    setImages([]);
    setError(null);
    updateUrlQuery('', 'home');
  };

  // User changes orientation filter
  const handleOrientationChange = (newOrientation: ImageOrientation) => {
    setOrientation(newOrientation);
    if (activeQuery) {
      executeSearch(activeQuery, 1, newOrientation, provider, false);
    }
  };

  // User changes provider
  const handleProviderChange = (newProvider: ProviderType) => {
    setProvider(newProvider);
    if (activeQuery) {
      executeSearch(activeQuery, 1, orientation, newProvider, false);
    }
  };

  // Load more pages
  const handleLoadMore = () => {
    if (activeQuery && !isLoadingMore && hasMore) {
      executeSearch(activeQuery, page + 1, orientation, provider, true);
    }
  };

  // Modal navigation helpers
  const handleSelectImage = (image: ImageResult) => {
    setSelectedImage(image);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex !== -1 && currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  const selectedIndex = selectedImage ? images.findIndex((img) => img.id === selectedImage.id) : -1;
  const hasNextImage = selectedIndex !== -1 && selectedIndex < images.length - 1;
  const hasPrevImage = selectedIndex > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Header Contract */}
      <Header
        onNavigateHome={() => {
          setCurrentView('home');
          updateUrlQuery(activeQuery, 'home');
        }}
        onNavigateAbout={() => {
          setCurrentView('about');
          updateUrlQuery('', 'about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFocusSearch={() => {
          setCurrentView('home');
          const searchInputEl = document.querySelector('input[type="text"]') as HTMLInputElement;
          searchInputEl?.focus();
          searchInputEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
        activeProviderName={activeProviderName}
        isDemoActive={isDemoActive}
      />

      <main className="flex-grow">
        {currentView === 'about' ? (
          <AboutView
            onBack={() => {
              setCurrentView('home');
              updateUrlQuery(activeQuery, 'home');
            }}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              searchQuery={searchInput}
              onSearchChange={setSearchInput}
              onSearchSubmit={handleSearchSubmit}
              onSearchClear={handleSearchClear}
              isLoading={isLoading}
            />

            {/* Results Section */}
            {activeQuery && (
              <section id="search-results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
                {/* Query Header and Breadcrumb */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6 pb-4 border-b border-stone-200">
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 font-sans block">
                      Search Results
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 mt-1">
                      Results for “<span className="text-teal-900">{activeQuery}</span>”
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSearchClear}
                      className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Clear search</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Provider Options */}
                <FilterBar
                  orientation={orientation}
                  onOrientationChange={handleOrientationChange}
                  provider={provider}
                  onProviderChange={handleProviderChange}
                  totalResults={images.length}
                  providerName={activeProviderName}
                  isDemo={isDemoActive}
                />

                {/* Content States */}
                {isLoading ? (
                  <LoadingSkeleton />
                ) : error ? (
                  <ErrorState
                    message={error}
                    onRetry={() => executeSearch(activeQuery, 1, orientation, provider, false)}
                    onUseDemoArchive={() => handleProviderChange('demo')}
                  />
                ) : images.length === 0 ? (
                  <EmptyState
                    query={activeQuery}
                    onSelectSuggestion={handleSearchSubmit}
                    onReset={handleSearchClear}
                  />
                ) : (
                  <ImageGrid
                    images={images}
                    onSelectImage={handleSelectImage}
                    hasMore={hasMore}
                    onLoadMore={handleLoadMore}
                    isLoadingMore={isLoadingMore}
                  />
                )}
              </section>
            )}
          </>
        )}
      </main>

      {/* Image Preview Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        hasPrev={hasPrevImage}
        hasNext={hasNextImage}
      />

      {/* Curatorial Footer */}
      <Footer
        onNavigateHome={() => {
          setCurrentView('home');
          updateUrlQuery(activeQuery, 'home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateAbout={() => {
          setCurrentView('about');
          updateUrlQuery('', 'about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTopic={handleSearchSubmit}
      />
    </div>
  );
}
