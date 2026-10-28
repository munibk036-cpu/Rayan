/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, BookOpen, Scale, Globe, ArrowLeft, HeartHandshake } from 'lucide-react';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Return navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 mb-8 transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Cultural Explorer</span>
      </button>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="mb-8 pb-6 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-2">
            Institutional Purpose & Legal Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 leading-tight">
            About Rayan Culture Explorer
          </h1>
          <p className="text-base text-stone-600 mt-3 font-sans leading-relaxed">
            A curatorial digital platform dedicated to discovering and documenting South and Central Asian cultural heritages, textile arts, regional cuisines, and living traditions.
          </p>
        </div>

        <div className="space-y-8 text-stone-700 font-sans text-sm sm:text-base leading-relaxed">
          {/* Section 1: Purpose & Mission */}
          <section>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-800" />
              <span>1. Curatorial Purpose</span>
            </h2>
            <p className="text-stone-600">
              Rayan Culture Explorer provides an accessible, dignified gateway to exploring ethnic identities, handicraft mastery, festive traditions, and heritage dress from regions including Pakhtoonkhwa, Sindh, Balochistan, Punjab, and broader silk-route civilisations.
            </p>
          </section>

          {/* Section 2: Image Sourcing & Copyright Terms */}
          <section>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-800" />
              <span>2. Image Sourcing & Open Licensing Compliance</span>
            </h2>
            <p className="text-stone-600 mb-3">
              This platform does not scrape arbitrary websites, host unauthorized copies, or bypass copyrights. Images displayed on this website are dynamically queried from legitimate open-content repositories—principally the <strong>Wikimedia Commons Open Cultural Archive</strong>, and secondary supported open photography APIs (such as Pexels):
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600 text-sm">
              <li>
                <strong>Attribution & Provenance:</strong> Every image result provides a direct hyperlink to its authoritative source page, displaying creator and photographer credits wherever metadata exists.
              </li>
              <li>
                <strong>Open Licenses:</strong> Media is published under recognized open licenses (such as Creative Commons CC BY, CC BY-SA, or Public Domain). Term links are provided directly in the accession preview.
              </li>
              <li>
                <strong>Respect for Creators:</strong> Copyright remains exclusively with the original photographers, artists, and archival contributors.
              </li>
            </ul>
          </section>

          {/* Section 3: Public Figures & Attire Policy */}
          <section>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-800" />
              <span>3. Public Figures & Attire Style Neutrality</span>
            </h2>
            <p className="text-stone-600">
              For searches concerning public figures (such as former Prime Minister Imran Khan's traditional kurta-shalwar and waistcoat style), records represent objective documentary photography of public appearances. The website does not fabricate claims, make endorsements, or assert authentic ownership unless verified by the underlying source archive.
            </p>
          </section>

          {/* Section 4: Privacy & Query Processing */}
          <section>
            <h2 className="text-xl font-serif font-semibold text-stone-900 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-teal-800" />
              <span>4. Privacy & Data Minimization</span>
            </h2>
            <p className="text-stone-600 mb-3">
              We respect visitor privacy and practice data minimization:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-stone-600 text-sm">
              <li><strong>Zero Tracking Cookies:</strong> We do not deploy advertising cookies, behavioral trackers, or third-party fingerprinting scripts.</li>
              <li><strong>Server-Side Query Processing:</strong> Search queries are processed in-memory solely to retrieve matching images from the configured image provider and are not sold or linked to personal identities.</li>
              <li><strong>Secure Environment:</strong> Server API keys and provider secrets are strictly maintained server-side and are never exposed to browser clients.</li>
            </ul>
          </section>

          {/* Section 5: Cultural Respect */}
          <section className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-xl">
            <h3 className="font-serif text-lg font-semibold text-stone-900 mb-2 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-teal-800" />
              <span>5. Cultural Respect & Community Feedback</span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              We strive to represent all regional communities with accuracy, depth, and respect. If you notice an image that is misattributed, has outdated license metadata, or requires correction, please consult the source archive on Wikimedia Commons or notify the archive administrators.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
