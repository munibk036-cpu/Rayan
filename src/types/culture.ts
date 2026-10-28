/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ImageOrientation = 'all' | 'landscape' | 'portrait' | 'square';

export type ProviderType = 'wikimedia' | 'pexels' | 'demo';

export interface ImageResult {
  id: string;
  title: string;
  thumbnailUrl: string;
  imageUrl: string;
  sourceName: string;
  sourcePageUrl: string;
  creatorName: string | null;
  licenseName: string | null;
  licenseUrl: string | null;
  width?: number;
  height?: number;
  altText: string;
  description?: string;
  cultureTag?: string;
  isDemo?: boolean;
}

export interface ImageSearchResponse {
  query: string;
  page: number;
  results: ImageResult[];
  hasMore: boolean;
  totalEstimated?: number;
  provider: string;
  isDemo: boolean;
  error?: string;
}

export interface ImageSearchFilters {
  orientation?: ImageOrientation;
  provider?: ProviderType;
}

export interface SuggestionTopic {
  label: string;
  query: string;
  urduLabel?: string;
  category: 'culture' | 'textile' | 'attire' | 'cuisine' | 'figure' | 'craft';
  description: string;
}
