/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ImageResult } from '../types/culture';

/**
 * Common cultural translation map covering English, Urdu, and Roman Urdu.
 * Enriches queries so international open archives like Wikimedia Commons
 * return the most authentic cultural collections.
 */
const CULTURAL_DICTIONARY: Record<string, { english: string; culture: string }> = {
  // Urdu Script
  'پشتون ثقافت': { english: 'Pashtun culture', culture: 'Pakhtoon' },
  'پشتون': { english: 'Pashtun', culture: 'Pakhtoon' },
  'پختون': { english: 'Pakhtoon', culture: 'Pakhtoon' },
  'سندھی اجرک': { english: 'Sindhi Ajrak', culture: 'Sindhi' },
  'اجرک': { english: 'Ajrak', culture: 'Sindhi' },
  'سندھی ثقافت': { english: 'Sindhi culture', culture: 'Sindhi' },
  'بلوچی لباس': { english: 'Balochi dress', culture: 'Balochi' },
  'بلوچی ثقافت': { english: 'Balochi culture', culture: 'Balochi' },
  'بلوچی': { english: 'Balochi dress', culture: 'Balochi' },
  'پنجابی ثقافت': { english: 'Punjabi culture', culture: 'Punjabi' },
  'پنجابی لباس': { english: 'Punjabi dress', culture: 'Punjabi' },
  'روایتی کھانا': { english: 'Pakistani cuisine', culture: 'Cuisine' },
  'روایتی لباس': { english: 'traditional dress Pakistan', culture: 'Attire' },
  'ثقافتی میلے': { english: 'festival Pakistan', culture: 'Festivals' },
  'عمران خان': { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  'عمران خان کا لباس': { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  'دستکاری': { english: 'handicrafts Pakistan', culture: 'Crafts' },
  'موسیقی کے آلات': { english: 'musical instruments Pakistan', culture: 'Music' },

  // Roman Urdu & Keywords
  'pakhtoon culture': { english: 'Pashtun culture', culture: 'Pakhtoon' },
  'pakhtun culture': { english: 'Pashtun culture', culture: 'Pakhtoon' },
  'pashtun culture': { english: 'Pashtun culture', culture: 'Pakhtoon' },
  'pakhtoon saqafat': { english: 'Pashtun culture', culture: 'Pakhtoon' },
  'pakhtun riwayat': { english: 'Pashtun tradition', culture: 'Pakhtoon' },
  'khet partug': { english: 'Khet partug', culture: 'Pakhtoon' },
  'peshawari chappal': { english: 'Peshawari chappal', culture: 'Pakhtoon' },
  'pakol': { english: 'Pakol', culture: 'Pakhtoon' },

  'sindhi ajrak': { english: 'Sindhi Ajrak', culture: 'Sindhi' },
  'sindhi culture': { english: 'Sindhi culture', culture: 'Sindhi' },
  'sindhi topi': { english: 'Sindhi topi', culture: 'Sindhi' },
  'sindhi saqafat': { english: 'Sindhi culture', culture: 'Sindhi' },
  'ralli': { english: 'Ralli quilt', culture: 'Sindhi' },

  'balochi dress': { english: 'Balochi dress', culture: 'Balochi' },
  'balochi traditional dress': { english: 'Balochi dress', culture: 'Balochi' },
  'balochi libas': { english: 'Balochi dress', culture: 'Balochi' },
  'balochi culture': { english: 'Balochi culture', culture: 'Balochi' },
  'balochi turban': { english: 'Balochi turban', culture: 'Balochi' },

  'punjabi culture': { english: 'Punjabi culture', culture: 'Punjabi' },
  'punjabi dress': { english: 'Punjabi dress', culture: 'Punjabi' },
  'phulkari': { english: 'Phulkari', culture: 'Punjabi' },
  'punjabi pagri': { english: 'Punjabi turban', culture: 'Punjabi' },

  'traditional food': { english: 'cuisine Pakistan', culture: 'Cuisine' },
  'cultural festivals': { english: 'festival Pakistan', culture: 'Festivals' },
  'wedding clothes': { english: 'bridal dress Pakistan', culture: 'Attire' },
  'musical instruments': { english: 'musical instruments Pakistan', culture: 'Music' },
  'handicrafts': { english: 'handicrafts Pakistan', culture: 'Crafts' },

  'imran khan': { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  'imran khan clothes': { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  'imran khan clothing style': { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  "imran khan's style": { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  'imran khan style': { english: 'Imran Khan Pakistan', culture: 'Public Figures' },
  'imran khan outfit': { english: 'Imran Khan Pakistan', culture: 'Public Figures' }
};

/**
 * Sanitizes search queries: trims whitespace, removes control characters, caps length.
 */
export function sanitizeQuery(rawQuery: string): string {
  if (!rawQuery) return '';
  return rawQuery
    .trim()
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .slice(0, 150);
}

/**
 * Enriches queries by checking for Urdu or Roman Urdu cultural references.
 */
export function enrichCulturalQuery(rawQuery: string): {
  originalQuery: string;
  searchQuery: string;
  detectedLanguage: 'urdu' | 'roman-urdu' | 'english';
  suggestedCulture?: string;
} {
  const sanitized = sanitizeQuery(rawQuery);
  const normalized = sanitized.toLowerCase().trim();

  // Check if string contains Arabic/Urdu unicode range
  const isUrduScript = /[\u0600-\u06FF]/.test(sanitized);

  // Direct dictionary match
  if (CULTURAL_DICTIONARY[normalized]) {
    return {
      originalQuery: sanitized,
      searchQuery: CULTURAL_DICTIONARY[normalized].english,
      detectedLanguage: isUrduScript ? 'urdu' : 'roman-urdu',
      suggestedCulture: CULTURAL_DICTIONARY[normalized].culture,
    };
  }

  // Check partial dictionary matches
  for (const [key, val] of Object.entries(CULTURAL_DICTIONARY)) {
    if (normalized.includes(key)) {
      return {
        originalQuery: sanitized,
        searchQuery: `${sanitized} ${val.english}`,
        detectedLanguage: isUrduScript ? 'urdu' : 'roman-urdu',
        suggestedCulture: val.culture,
      };
    }
  }

  return {
    originalQuery: sanitized,
    searchQuery: sanitized,
    detectedLanguage: isUrduScript ? 'urdu' : 'english',
  };
}

/**
 * Generates an institutional citation for an image result.
 */
export function formatCitation(image: ImageResult): string {
  const creator = image.creatorName ? `${image.creatorName}. ` : '';
  const license = image.licenseName ? ` [${image.licenseName}]` : '';
  const year = new Date().getFullYear();
  return `${creator}"${image.title}". ${image.sourceName}, ${year}.${license} Retrieved from: ${image.sourcePageUrl}`;
}
