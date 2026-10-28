/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ImageResult } from '../types/culture';
import { ImageCard } from './ImageCard';
import { ChevronDown } from 'lucide-react';

interface ImageGridProps {
  images: ImageResult[];
  onSelectImage: (image: ImageResult) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onSelectImage,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={onSelectImage}
          />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="mt-12 text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-all disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
          >
            {isLoadingMore ? (
              <>
                <span className="w-4 h-4 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
                <span>Loading more images...</span>
              </>
            ) : (
              <>
                <span>Load More Cultural Images</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
