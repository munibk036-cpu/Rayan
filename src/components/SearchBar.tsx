/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { Search, X, CornerDownLeft } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onClear,
  isLoading = false,
  autoFocus = false,
  placeholder = 'Search culture, traditional dress, Ajrak, food, Imran Khan style...'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative" role="search">
      <div className="relative flex items-center bg-white border border-stone-300 rounded-xl shadow-xs hover:border-stone-400 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20 transition-all">
        <div className="pl-4 pr-2 text-stone-400 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-stone-500" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search cultural subjects, attire, food, traditions, or figures"
          className="w-full py-3.5 pr-20 text-stone-900 placeholder:text-stone-400 bg-transparent text-sm sm:text-base focus:outline-none"
        />

        <div className="absolute right-2 flex items-center gap-1.5">
          {value && (
            <button
              type="button"
              onClick={() => {
                onClear();
                inputRef.current?.focus();
              }}
              aria-label="Clear search input"
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            aria-label="Submit search"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Search</span>
                <CornerDownLeft className="w-3 h-3 hidden sm:inline" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
