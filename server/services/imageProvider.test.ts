/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { filterByOrientation, searchImages } from './imageProvider';
import { checkRateLimit } from '../routes/images';
import { ImageResult } from '../../src/types/culture';

test('filterByOrientation correctly categorizes aspect ratios', () => {
  const images: ImageResult[] = [
    {
      id: '1',
      title: 'Landscape',
      thumbnailUrl: '',
      imageUrl: '',
      sourceName: '',
      sourcePageUrl: '',
      creatorName: null,
      licenseName: null,
      licenseUrl: null,
      altText: '',
      width: 1920,
      height: 1080
    },
    {
      id: '2',
      title: 'Portrait',
      thumbnailUrl: '',
      imageUrl: '',
      sourceName: '',
      sourcePageUrl: '',
      creatorName: null,
      licenseName: null,
      licenseUrl: null,
      altText: '',
      width: 800,
      height: 1200
    },
    {
      id: '3',
      title: 'Square',
      thumbnailUrl: '',
      imageUrl: '',
      sourceName: '',
      sourcePageUrl: '',
      creatorName: null,
      licenseName: null,
      licenseUrl: null,
      altText: '',
      width: 1000,
      height: 1000
    }
  ];

  const landscapes = filterByOrientation(images, 'landscape');
  assert.equal(landscapes.length, 1);
  assert.equal(landscapes[0].id, '1');

  const portraits = filterByOrientation(images, 'portrait');
  assert.equal(portraits.length, 1);
  assert.equal(portraits[0].id, '2');

  const squares = filterByOrientation(images, 'square');
  assert.equal(squares.length, 1);
  assert.equal(squares[0].id, '3');

  const all = filterByOrientation(images, 'all');
  assert.equal(all.length, 3);
});

test('searchImages demo mode returns valid image results with required fields', async () => {
  const response = await searchImages('ajrak', 1, { provider: 'demo' });
  assert.equal(response.isDemo, true);
  assert.ok(response.results.length > 0);

  const first = response.results[0];
  assert.ok(first.id, 'id is required');
  assert.ok(first.title, 'title is required');
  assert.ok(first.thumbnailUrl, 'thumbnailUrl is required');
  assert.ok(first.sourceName, 'sourceName is required');
  assert.ok(first.sourcePageUrl, 'sourcePageUrl is required');
  assert.ok(first.altText, 'altText is required');
});

test('checkRateLimit restricts excessive calls per IP', () => {
  const testIp = '192.0.2.100';
  let allowed = true;
  for (let i = 0; i < 60; i++) {
    allowed = checkRateLimit(testIp);
    assert.equal(allowed, true);
  }
  // 61st call should be rate-limited
  const blocked = checkRateLimit(testIp);
  assert.equal(blocked, false);
});
