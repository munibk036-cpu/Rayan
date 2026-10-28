/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ImageResult } from '../types/culture';
import { ExternalLink, Image as ImageIcon, Eye, Scale } from 'lucide-react';

interface ImageCardProps {
  image: ImageResult;
  onClick: (image: ImageResult) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article
      onClick={() => onClick(image)}
      className="group cursor-pointer bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-300 flex flex-col focus-within:ring-2 focus-within:ring-teal-700"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onClick(image);
      }}
      aria-label={`View details for ${image.title}`}
    >
      {/* Image Container with Fallback */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 flex items-center justify-center">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-stone-200/60 animate-pulse flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-stone-400 opacity-40" />
          </div>
        )}

        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-stone-100 text-stone-500">
            <ImageIcon className="w-8 h-8 text-stone-300 mb-2" />
            <span className="text-xs font-serif font-medium line-clamp-2">{image.title}</span>
            <span className="text-[10px] text-stone-400 mt-1">Archival record preview</span>
          </div>
        ) : (
          <img
            src={image.thumbnailUrl}
            alt={image.altText || image.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Hover Quick Action Badge */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 backdrop-blur-xs text-white p-1.5 rounded-md shadow-xs flex items-center gap-1 text-[11px]">
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Inspect</span>
        </div>

        {/* Demo Label if applicable */}
        {image.isDemo && (
          <div className="absolute top-2.5 left-2.5 bg-amber-900/85 backdrop-blur-xs text-amber-100 text-[10px] font-sans px-2 py-0.5 rounded">
            Demo Archive
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-serif text-sm sm:text-base font-semibold text-stone-900 line-clamp-2 group-hover:text-teal-900 transition-colors leading-snug">
            {image.title}
          </h3>

          {/* Clean Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2 flex-wrap">
            <span className="font-medium text-stone-700">{image.sourceName}</span>
            {image.creatorName && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="truncate max-w-[140px]" title={image.creatorName}>
                  {image.creatorName}
                </span>
              </>
            )}
            {image.licenseName && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="truncate max-w-[120px]" title={image.licenseName}>
                  {image.licenseName}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Card Footer with Direct Source Link */}
        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-400 text-[11px]">
            {image.width && image.height ? `${image.width} × ${image.height}` : 'Verified source'}
          </span>

          <a
            href={image.sourcePageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-teal-800 hover:text-teal-950 font-medium hover:underline p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
            aria-label={`Open original source page for ${image.title} in new tab`}
          >
            <span>Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};
