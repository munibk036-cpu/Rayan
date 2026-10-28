/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Compass } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onSelectTopic: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onSelectTopic,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-md bg-stone-800 flex items-center justify-center text-amber-200">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-semibold tracking-tight">
                Rayan Culture Explorer
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans max-w-md leading-relaxed">
              An open cultural image exploration catalog documenting ethnic heritage, traditional attire, cuisines, festivals, and folk craftsmanship across South and Central Asia.
            </p>
            <p className="text-[11px] text-stone-500 font-sans">
              Images retrieved dynamically from open-access repositories including Wikimedia Commons. All media rights remain with respective original creators.
            </p>
          </div>

          {/* Quick Cultural Topics */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3 font-sans">
              Cultural Traditions
            </span>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li>
                <button
                  onClick={() => onSelectTopic('Pakhtoon culture')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Pakhtoon Traditions & Attire
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic('Sindhi Ajrak')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Sindhi Ajrak & Ralli
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic('Balochi traditional dress')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Balochi Pashk Embroidery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic('Punjabi culture')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Punjabi Folk & Phulkari
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTopic('Traditional food')}
                  className="hover:text-amber-200 transition-colors"
                >
                  Regional Heritage Cuisines
                </button>
              </li>
            </ul>
          </div>

          {/* Site & Legal */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-3 font-sans">
              Archive Resources
            </span>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li>
                <button
                  onClick={onNavigateHome}
                  className="hover:text-amber-200 transition-colors"
                >
                  Explore Home
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAbout}
                  className="hover:text-amber-200 transition-colors"
                >
                  About Rayan Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAbout}
                  className="hover:text-amber-200 transition-colors"
                >
                  Image Sourcing & Licensing Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAbout}
                  className="hover:text-amber-200 transition-colors"
                >
                  Privacy & Data Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <div>
            © {new Date().getFullYear()} Rayan Culture Explorer · Curated for cultural appreciation and open heritage education.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Open Cultural Archives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
