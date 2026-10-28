/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { SUGGESTED_TOPICS } from './CategoryChips';

interface EmptyStateProps {
  query: string;
  onSelectSuggestion: (query: string) => void;
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  query,
  onSelectSuggestion,
  onReset,
}) => {
  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-stone-200 rounded-2xl text-center shadow-xs">
      <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 mx-auto mb-4 flex items-center justify-center">
        <SearchX className="w-6 h-6 text-stone-600" />
      </div>

      <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">
        No cultural media found for “{query}”
      </h3>

      <p className="text-sm text-stone-600 font-sans leading-relaxed mb-6">
        Try adjusting your keywords, using broader terms, or searching in English, Urdu, or Roman Urdu (e.g. “Sindhi Ajrak”, “Pakhtoon culture”, or “Traditional food”).
      </p>

      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-3 font-sans">
          Recommended Search Topics
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTED_TOPICS.slice(0, 5).map((topic) => (
            <button
              key={topic.label}
              onClick={() => onSelectSuggestion(topic.query)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 underline"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Return to home showcase</span>
      </button>
    </div>
  );
};
