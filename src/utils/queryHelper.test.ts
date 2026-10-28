/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeQuery, enrichCulturalQuery, formatCitation } from './queryHelper';
import { ImageResult } from '../types/culture';

test('sanitizeQuery trims whitespace and caps length', () => {
  assert.equal(sanitizeQuery('  Sindhi Ajrak  '), 'Sindhi Ajrak');
  assert.equal(sanitizeQuery(''), '');
  const longQuery = 'a'.repeat(200);
  assert.equal(sanitizeQuery(longQuery).length, 150);
});

test('enrichCulturalQuery detects Urdu script and enriches query', () => {
  const result = enrichCulturalQuery('سندھی اجرک');
  assert.equal(result.detectedLanguage, 'urdu');
  assert.match(result.searchQuery.toLowerCase(), /sindhi ajrak/);
  assert.equal(result.suggestedCulture, 'Sindhi');
});

test('enrichCulturalQuery handles Pashtun in Urdu and Roman Urdu', () => {
  const urduRes = enrichCulturalQuery('پشتون ثقافت');
  assert.equal(urduRes.detectedLanguage, 'urdu');
  assert.equal(urduRes.suggestedCulture, 'Pakhtoon');

  const romanRes = enrichCulturalQuery('pakhtoon culture');
  assert.equal(romanRes.detectedLanguage, 'roman-urdu');
  assert.match(romanRes.searchQuery.toLowerCase(), /pashtun/);
});

test('enrichCulturalQuery maps Imran Khan public attire search', () => {
  const res = enrichCulturalQuery('imran khan clothes');
  assert.match(res.searchQuery.toLowerCase(), /imran khan/);
  assert.match(res.searchQuery.toLowerCase(), /pakistan/);
  assert.equal(res.suggestedCulture, 'Public Figures');
});

test('formatCitation creates institutional citation with author, title, source, license', () => {
  const sampleImage: ImageResult = {
    id: 'sample-01',
    title: 'Traditional Ajrak Pattern',
    thumbnailUrl: 'https://example.com/thumb.jpg',
    imageUrl: 'https://example.com/full.jpg',
    sourceName: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ajrak.jpg',
    creatorName: 'Karachi Craft Guild',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    altText: 'Traditional patterned textile'
  };

  const citation = formatCitation(sampleImage);
  assert.match(citation, /Karachi Craft Guild/);
  assert.match(citation, /Traditional Ajrak Pattern/);
  assert.match(citation, /Wikimedia Commons/);
  assert.match(citation, /CC BY-SA 4\.0/);
  assert.match(citation, /Retrieved from/);
});
