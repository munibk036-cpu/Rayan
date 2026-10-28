/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ImageResult } from '../types/culture';
import { formatCitation } from '../utils/queryHelper';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Info,
  Scale,
  Maximize2
} from 'lucide-react';

interface ImageModalProps {
  image: ImageResult | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  image,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [image]);

  if (!image) return null;

  const handleCopyCitation = () => {
    const citation = formatCitation(image);
    navigator.clipboard.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-image-title"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500">
              Cultural Archival Record
            </span>
            {image.isDemo && (
              <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Sample Demo Data
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Nav Arrows */}
            {hasPrev && onPrev && (
              <button
                onClick={onPrev}
                aria-label="Previous image"
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {hasNext && onNext && (
              <button
                onClick={onNext}
                aria-label="Next image"
                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close image preview"
              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left / Top: High-Res Image Display */}
          <div className="lg:col-span-7 bg-stone-900 flex items-center justify-center p-4 relative min-h-[320px] lg:min-h-[500px]">
            <img
              src={image.imageUrl || image.thumbnailUrl}
              alt={image.altText || image.title}
              className={`max-h-[70vh] w-auto max-w-full object-contain rounded transition-all duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              referrerPolicy="no-referrer"
            />

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute bottom-4 right-4 bg-stone-900/80 hover:bg-stone-800 text-white p-2 rounded-lg text-xs flex items-center gap-1.5 backdrop-blur-xs transition-colors"
              title="Toggle zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
            </button>
          </div>

          {/* Right: Curatorial Metadata Details */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white overflow-y-auto">
            <div>
              <h2
                id="modal-image-title"
                className="text-xl sm:text-2xl font-serif font-medium text-stone-900 leading-snug mb-3"
              >
                {image.title}
              </h2>

              {image.description && image.description !== image.title && (
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mb-6 pb-4 border-b border-stone-100">
                  {image.description}
                </p>
              )}

              {/* Museum Accession Definition List Pattern B */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 block mb-3 font-sans">
                  Provenance & License Metadata
                </span>

                <dl className="divide-y divide-stone-100 text-xs">
                  <div className="py-2.5 grid grid-cols-3 gap-2">
                    <dt className="text-stone-500 font-medium">Source</dt>
                    <dd className="col-span-2 text-stone-900 font-semibold flex items-center gap-1">
                      <span>{image.sourceName}</span>
                    </dd>
                  </div>

                  <div className="py-2.5 grid grid-cols-3 gap-2">
                    <dt className="text-stone-500 font-medium">Creator / Credit</dt>
                    <dd className="col-span-2 text-stone-900">
                      {image.creatorName || 'Not specified by provider'}
                    </dd>
                  </div>

                  <div className="py-2.5 grid grid-cols-3 gap-2">
                    <dt className="text-stone-500 font-medium">License</dt>
                    <dd className="col-span-2 text-stone-900 flex items-center gap-1 flex-wrap">
                      <span>{image.licenseName || 'Standard Source License'}</span>
                      {image.licenseUrl && (
                        <a
                          href={image.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-800 hover:underline inline-flex items-center gap-0.5 ml-1 font-medium"
                        >
                          <Scale className="w-3 h-3" />
                          <span>Terms</span>
                        </a>
                      )}
                    </dd>
                  </div>

                  {image.width && image.height && (
                    <div className="py-2.5 grid grid-cols-3 gap-2">
                      <dt className="text-stone-500 font-medium">Dimensions</dt>
                      <dd className="col-span-2 text-stone-900 font-mono">
                        {image.width} × {image.height} px
                      </dd>
                    </div>
                  )}

                  {image.altText && (
                    <div className="py-2.5 grid grid-cols-3 gap-2">
                      <dt className="text-stone-500 font-medium">Accessibility Alt</dt>
                      <dd className="col-span-2 text-stone-600 italic">
                        "{image.altText}"
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Cultural Authenticity & Public Figure Disclaimer Notice */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-amber-900/90 text-[11px] leading-relaxed mb-6 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block mb-0.5">Authenticity Notice:</strong>
                  Do not claim an image is authentic or belongs to a named person unless its original source supports that claim. Images reflect public archival documentation.
                </div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-2.5">
              <a
                href={image.sourcePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition-colors"
              >
                <span>View Original Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Citation Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
