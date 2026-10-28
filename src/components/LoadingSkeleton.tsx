/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-5 w-48 bg-stone-200/80 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] w-full bg-stone-200/70 animate-pulse" />
            <div className="p-4 flex flex-col gap-2.5">
              <div className="h-4 bg-stone-200/70 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-stone-100 rounded w-1/2 animate-pulse" />
              <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between items-center">
                <div className="h-3 bg-stone-100 rounded w-16 animate-pulse" />
                <div className="h-3 bg-stone-100 rounded w-12 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
