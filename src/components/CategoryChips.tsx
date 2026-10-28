/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SuggestionTopic } from '../types/culture';

export const SUGGESTED_TOPICS: SuggestionTopic[] = [
  { label: 'Pakhtoon Culture', query: 'Pakhtoon culture', urduLabel: 'پشتون ثقافت', category: 'culture', description: 'Traditional attire, hospitality, Jirga, and Pashtun heritage' },
  { label: 'Sindhi Ajrak', query: 'Sindhi Ajrak', urduLabel: 'سندھی اجرک', category: 'textile', description: 'Historic block-printed geometric patterns dyed with natural indigo' },
  { label: 'Balochi Dress', query: 'Balochi traditional dress', urduLabel: 'بلوچی لباس', category: 'attire', description: 'Intricate needlework embroidery with iconic mirrorwork' },
  { label: 'Punjabi Culture', query: 'Punjabi culture', urduLabel: 'پنجابی ثقافت', category: 'culture', description: 'Folk traditions, Phulkari shawls, and harvest celebrations' },
  { label: 'Traditional Food', query: 'Traditional food', urduLabel: 'روایتی کھانا', category: 'cuisine', description: 'Sajji, Biryani, Chapli Kebab, Nihari, and festive delicacies' },
  { label: 'Cultural Festivals', query: 'Cultural festivals', urduLabel: 'ثقافتی میلے', category: 'craft', description: 'Lok Virsa, Shandur Polo, Basant, and seasonal gatherings' },
  { label: "Imran Khan's Style", query: 'Imran Khan public attire style', urduLabel: 'عمران خان کا لباس', category: 'figure', description: 'Public attire documentation: traditional kurta shalwar and waistcoat' },
  { label: 'Musical Instruments', query: 'Traditional musical instruments', urduLabel: 'موسیقی کے آلات', category: 'craft', description: 'Rubab, Sarangi, Sitar, Dholak, and classical instruments' },
  { label: 'Handicrafts & Pottery', query: 'traditional handicrafts pottery', urduLabel: 'دستکاری اور مٹی کے برتن', category: 'craft', description: 'Multani blue pottery, brass craft, and handloom textiles' },
];

interface CategoryChipsProps {
  onSelectTopic: (query: string) => void;
  activeQuery?: string;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  onSelectTopic,
  activeQuery = '',
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 font-sans">
          Popular Curated Searches
        </span>
        <span className="text-xs text-stone-400">
          Click any topic to explore
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_TOPICS.map((topic) => {
          const isSelected = activeQuery.toLowerCase() === topic.query.toLowerCase() ||
                             activeQuery.toLowerCase() === topic.label.toLowerCase();

          return (
            <button
              key={topic.label}
              onClick={() => onSelectTopic(topic.query)}
              title={topic.description}
              aria-label={`Search topic: ${topic.label}`}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 ${
                isSelected
                  ? 'bg-stone-900 text-stone-50 border-stone-900 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
              }`}
            >
              <span>{topic.label}</span>
              {topic.urduLabel && (
                <span className="ml-1.5 opacity-60 font-serif text-[11px]" dir="rtl">
                  {topic.urduLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
