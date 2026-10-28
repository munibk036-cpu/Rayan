/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ImageOrientation, ProviderType } from '../types/culture';
import { SlidersHorizontal, Image, Database, Info } from 'lucide-react';

interface FilterBarProps {
  orientation: ImageOrientation;
  onOrientationChange: (orientation: ImageOrientation) => void;
  provider: ProviderType;
  onProviderChange: (provider: ProviderType) => void;
  totalResults?: number;
  providerName?: string;
  isDemo?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  orientation,
  onOrientationChange,
  provider,
  onProviderChange,
  totalResults,
  providerName = 'Wikimedia Commons',
  isDemo = false,
}) => {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-3.5 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
      {/* Left: Orientation Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans flex items-center gap-1.5 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Orientation:</span>
        </span>

        {(['all', 'landscape', 'portrait', 'square'] as ImageOrientation[]).map((mode) => {
          const isActive = orientation === mode;
          return (
            <button
              key={mode}
              onClick={() => onOrientationChange(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                isActive
                  ? 'bg-stone-900 text-stone-50 font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>

      {/* Right: Provider status & Demo toggle */}
      <div className="flex items-center gap-3 flex-wrap text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-stone-400" />
          <span>Source:</span>
          <span className="font-medium text-stone-800">
            {providerName}
          </span>
        </div>

        {/* Demo Mode Toggle for inspection */}
        <div className="flex items-center gap-1.5 pl-3 border-l border-stone-200">
          <button
            onClick={() => onProviderChange(provider === 'demo' ? 'wikimedia' : 'demo')}
            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
              provider === 'demo'
                ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
            title="Inspect labeled demo cultural archive or live open provider"
          >
            {provider === 'demo' ? 'Using Demo Data' : 'Sample Demo Archive'}
          </button>
        </div>

        {totalResults !== undefined && (
          <span className="text-stone-400 font-sans tabular-nums pl-2">
            ({totalResults} items)
          </span>
        )}
      </div>
    </div>
  );
};
