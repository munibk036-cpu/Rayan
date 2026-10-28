/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ImageSearchFilters, ImageSearchResponse } from '../types/culture';

export async function fetchImages(
  query: string,
  page: number = 1,
  filters: ImageSearchFilters = {}
): Promise<ImageSearchResponse> {
  const params = new URLSearchParams();
  params.set('q', query);
  params.set('page', String(page));

  if (filters.orientation && filters.orientation !== 'all') {
    params.set('orientation', filters.orientation);
  }
  if (filters.provider) {
    params.set('provider', filters.provider);
  }

  const response = await fetch(`/api/images?${params.toString()}`);

  if (!response.ok) {
    let errorMessage = `Search failed with status ${response.status}`;
    try {
      const errData = await response.json();
      if (errData.error) {
        errorMessage = errData.error;
      }
    } catch {
      // fallback to status text
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function fetchProviderInfo(): Promise<{
  activeProvider: string;
  providers: Array<{
    id: string;
    name: string;
    description: string;
    status: string;
    isDefault: boolean;
    setupInstruction?: string;
  }>;
}> {
  const res = await fetch('/api/provider-info');
  if (!res.ok) {
    throw new Error('Failed to retrieve provider configuration');
  }
  return res.json();
}
