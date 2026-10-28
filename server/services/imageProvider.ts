/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ImageResult, ImageSearchFilters, ImageSearchResponse } from '../../src/types/culture';
import { enrichCulturalQuery, sanitizeQuery } from '../../src/utils/queryHelper';

// Labeled curated fallback archive conforming to PRD: "Mock results, if used, are clearly labeled as demo data"
const DEMO_ARCHIVE_DATA: ImageResult[] = [
  {
    id: 'demo-sindhi-ajrak-01',
    title: 'Authentic Sindhi Ajrak Block-Printed Shawl',
    thumbnailUrl: '/src/assets/images/sindhi_ajrak_textile_1793204319940.jpg',
    imageUrl: '/src/assets/images/sindhi_ajrak_textile_1793204319940.jpg',
    sourceName: 'Demo Archive - Sindh Cultural Repository',
    sourcePageUrl: 'https://en.wikipedia.org/wiki/Ajrak',
    creatorName: 'Sindh Craft Council',
    licenseName: 'Creative Commons CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1200,
    altText: 'Traditional geometric blue and crimson woodblock printed Ajrak fabric',
    description: 'Authentic Ajrak craft using natural indigo, pomegranate rind, and madder dyes with centuries-old geometric block printing tradition.',
    cultureTag: 'Sindhi',
    isDemo: true
  },
  {
    id: 'demo-pakhtoon-craft-02',
    title: 'Pakhtoon Hand-Embroidered Tribal Textile',
    thumbnailUrl: '/src/assets/images/pakhtoon_heritage_craft_1793204319870.jpg',
    imageUrl: '/src/assets/images/pakhtoon_heritage_craft_1793204319870.jpg',
    sourceName: 'Demo Archive - Khyber Heritage Preservation',
    sourcePageUrl: 'https://en.wikipedia.org/wiki/Pashtun_culture',
    creatorName: 'Khyber Artisans Guild',
    licenseName: 'Creative Commons CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1600,
    height: 1200,
    altText: 'Intricate Pashtun needlework embroidery with brass embellishments',
    description: 'Traditional Pakhtoon tribal embroidery with silk threads and antique coins, characteristic of Khyber and Waziristan traditions.',
    cultureTag: 'Pakhtoon',
    isDemo: true
  },
  {
    id: 'demo-heritage-pavilion-03',
    title: 'South & Central Asian Cultural Heritage Exhibition',
    thumbnailUrl: '/src/assets/images/hero_culture_heritage_1793204319123.jpg',
    imageUrl: '/src/assets/images/hero_culture_heritage_1793204319123.jpg',
    sourceName: 'Demo Archive - National Heritage Center',
    sourcePageUrl: 'https://en.wikipedia.org/wiki/Culture_of_Pakistan',
    creatorName: 'Curatorial Archival Collection',
    licenseName: 'Public Domain Mark 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    width: 1920,
    height: 1080,
    altText: 'Exhibition of blue pottery, brass lamps, and traditional woven rugs',
    description: 'Masterworks of regional craftsmanship highlighting pottery from Multan, brassware from Peshawar, and hand-knotted kilims.',
    cultureTag: 'Heritage',
    isDemo: true
  },
  {
    id: 'demo-balochi-dress-04',
    title: 'Balochi Pashk Hand-Embroidered Dress with Mirrorwork',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Baloch_traditional_dress.jpg/640px-Baloch_traditional_dress.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Baloch_traditional_dress.jpg',
    sourceName: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Baloch_traditional_dress.jpg',
    creatorName: 'Balochi Cultural Archive',
    licenseName: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    width: 1024,
    height: 768,
    altText: 'Balochi women wearing traditional hand-embroidered pashk with intricate threadwork',
    description: 'Balochi female dress featuring the iconic front pocket (Pandol) and geometric silk needlework.',
    cultureTag: 'Balochi',
    isDemo: true
  },
  {
    id: 'demo-punjabi-phulkari-05',
    title: 'Punjabi Traditional Phulkari Floral Embroidery',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Phulkari_detail_Punjab.jpg/640px-Phulkari_detail_Punjab.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Phulkari_detail_Punjab.jpg',
    sourceName: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Phulkari_detail_Punjab.jpg',
    creatorName: 'Museum Archive Collection',
    licenseName: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    width: 1200,
    height: 800,
    altText: 'Phulkari embroidery on khaddar cotton fabric with silk thread floss',
    description: 'Phulkari is the traditional folk embroidery technique of Punjab, literally meaning flower work.',
    cultureTag: 'Punjabi',
    isDemo: true
  },
  {
    id: 'demo-imran-khan-06',
    title: 'Imran Khan Public Outfit - Traditional Kurta Shalwar & Waistcoat',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Imran_Khan_in_2019.jpg/640px-Imran_Khan_in_2019.jpg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Imran_Khan_in_2019.jpg',
    sourceName: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Imran_Khan_in_2019.jpg',
    creatorName: 'White House / Shealah Craighead',
    licenseName: 'Public Domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    width: 1200,
    height: 900,
    altText: 'Imran Khan wearing navy blue traditional kurta shalwar with dark waistcoat during public event',
    description: 'Imran Khan known for popularizing the crisp national attire (shalwar kameez with waistcoat) at international state meetings and rallies.',
    cultureTag: 'Public Figures',
    isDemo: true
  }
];

function stripHtml(input?: string): string {
  if (!input) return '';
  return input.replace(/<\/?[^>]+(>|$)/g, '').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&').trim();
}

/**
 * Searches Wikimedia Commons API for authentic cultural media.
 * Free, legitimate open-access repository requiring no private key.
 */
async function searchWikimediaCommons(
  enrichedQuery: string,
  page: number = 1,
  limit: number = 24
): Promise<{ results: ImageResult[]; totalEstimated: number }> {
  const offset = (page - 1) * limit;

  // Search in Wikimedia Commons file namespace (namespace 6 = File:)
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    enrichedQuery
  )}&gsrnamespace=6&gsrlimit=${limit}&gsroffset=${offset}&prop=imageinfo&iiprop=url|size|mime|extmetadata&iiurlwidth=800&format=json`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        // Wikimedia Terms of Use require a descriptive User-Agent
        'User-Agent': 'RayanCultureExplorer/1.0 (https://culture.rayan.app; cultural-heritage-search@rayan.app)',
        Accept: 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Wikimedia API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.query || !data.query.pages) {
      return { results: [], totalEstimated: 0 };
    }

    const pages = Object.values(data.query.pages) as any[];
    const results: ImageResult[] = [];

    for (const pageItem of pages) {
      if (!pageItem.imageinfo || pageItem.imageinfo.length === 0) continue;
      const info = pageItem.imageinfo[0];

      // Only include common web images
      const mime = info.mime || '';
      if (!mime.startsWith('image/') || mime.includes('tiff') || mime.includes('djvu') || mime.includes('svg')) {
        continue;
      }

      const meta = info.extmetadata || {};
      const rawTitle = pageItem.title ? pageItem.title.replace(/^File:/i, '') : 'Cultural Heritage Item';
      const cleanTitle = rawTitle.replace(/\.[a-zA-Z0-9]{3,4}$/, '').replace(/_/g, ' ');

      const artist = stripHtml(meta.Artist?.value || meta.Credit?.value || '');
      const licenseShort = meta.LicenseShortName?.value || meta.License?.value || 'Open License';
      const licenseUrl = meta.LicenseUrl?.value || null;
      const description = stripHtml(meta.ImageDescription?.value || meta.ObjectName?.value || cleanTitle);

      const thumbUrl = info.thumburl || info.url;
      const fullUrl = info.url;
      const descUrl = info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(pageItem.title)}`;

      results.push({
        id: `wiki-${pageItem.pageid}`,
        title: cleanTitle,
        thumbnailUrl: thumbUrl,
        imageUrl: fullUrl,
        sourceName: 'Wikimedia Commons',
        sourcePageUrl: descUrl,
        creatorName: artist || 'Wikimedia Contributor',
        licenseName: licenseShort,
        licenseUrl: licenseUrl,
        width: info.width,
        height: info.height,
        altText: description || cleanTitle,
        description: description,
        isDemo: false
      });
    }

    return {
      results,
      totalEstimated: (data.query.searchinfo?.totalhits) || results.length * 5
    };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Searches Pexels API if PEXELS_API_KEY is configured.
 */
async function searchPexels(
  query: string,
  apiKey: string,
  page: number = 1,
  limit: number = 20,
  orientation?: string
): Promise<{ results: ImageResult[]; totalEstimated: number }> {
  let url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${limit}`;
  if (orientation && orientation !== 'all') {
    url += `&orientation=${orientation}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.statusText}`);
  }

  const data = await response.json();
  const results: ImageResult[] = (data.photos || []).map((photo: any) => ({
    id: `pexels-${photo.id}`,
    title: photo.alt || `Culture Photo by ${photo.photographer}`,
    thumbnailUrl: photo.src.medium || photo.src.small,
    imageUrl: photo.src.large2x || photo.src.large || photo.src.original,
    sourceName: 'Pexels',
    sourcePageUrl: photo.url,
    creatorName: photo.photographer,
    licenseName: 'Pexels Free-to-Use License',
    licenseUrl: 'https://www.pexels.com/license/',
    width: photo.width,
    height: photo.height,
    altText: photo.alt || 'Cultural photography on Pexels',
    description: photo.alt,
    isDemo: false
  }));

  return {
    results,
    totalEstimated: data.total_results || results.length,
  };
}

/**
 * Filter results by orientation in memory if needed.
 */
export function filterByOrientation(items: ImageResult[], orientation?: string): ImageResult[] {
  if (!orientation || orientation === 'all') return items;

  return items.filter(item => {
    if (!item.width || !item.height) return true;
    const ratio = item.width / item.height;
    if (orientation === 'landscape') return ratio > 1.15;
    if (orientation === 'portrait') return ratio < 0.85;
    if (orientation === 'square') return ratio >= 0.85 && ratio <= 1.15;
    return true;
  });
}

/**
 * Main swappable backend image search function conforming to PRD specifications.
 */
export async function searchImages(
  query: string,
  page: number = 1,
  filters: ImageSearchFilters = {}
): Promise<ImageSearchResponse> {
  const sanitized = sanitizeQuery(query);
  if (!sanitized) {
    return {
      query: '',
      page: 1,
      results: [],
      hasMore: false,
      provider: 'none',
      isDemo: false,
    };
  }

  const enrichment = enrichCulturalQuery(sanitized);
  const provider = filters.provider || (process.env.IMAGE_PROVIDER as any) || 'wikimedia';
  const pexelsKey = process.env.PEXELS_API_KEY;

  // Handle explicit demo request
  if (provider === 'demo') {
    const qLower = sanitized.toLowerCase();
    const filtered = DEMO_ARCHIVE_DATA.filter(item => 
      item.title.toLowerCase().includes(qLower) ||
      (item.description && item.description.toLowerCase().includes(qLower)) ||
      (item.cultureTag && item.cultureTag.toLowerCase().includes(qLower)) ||
      (item.altText && item.altText.toLowerCase().includes(qLower))
    );
    const results = filtered.length > 0 ? filtered : DEMO_ARCHIVE_DATA;
    const oriented = filterByOrientation(results, filters.orientation);

    return {
      query: sanitized,
      page,
      results: oriented,
      hasMore: false,
      totalEstimated: results.length,
      provider: 'Curated Demo Archive (Simulated Data)',
      isDemo: true,
    };
  }

  // Handle Pexels if requested and configured
  if (provider === 'pexels' && pexelsKey) {
    try {
      const pexelsRes = await searchPexels(enrichment.searchQuery, pexelsKey, page, 24, filters.orientation);
      return {
        query: sanitized,
        page,
        results: pexelsRes.results,
        hasMore: pexelsRes.results.length >= 24,
        totalEstimated: pexelsRes.totalEstimated,
        provider: 'Pexels Open Curated API',
        isDemo: false,
      };
    } catch (err: any) {
      console.warn('Pexels search failed, falling back to Wikimedia:', err.message);
    }
  }

  // Primary: Wikimedia Commons Open Archive
  try {
    const wikiRes = await searchWikimediaCommons(enrichment.searchQuery, page, 24);
    let results = filterByOrientation(wikiRes.results, filters.orientation);

    // If query was very specific and returned 0 results, retry with original sanitized query
    if (results.length === 0 && enrichment.searchQuery !== sanitized) {
      const retryRes = await searchWikimediaCommons(sanitized, page, 24);
      results = filterByOrientation(retryRes.results, filters.orientation);
    }

    // If still 0 results and multi-word, try first primary cultural term
    if (results.length === 0) {
      const words = sanitized.split(' ').filter(w => w.length > 3 && !['culture', 'traditional', 'style', 'dress'].includes(w.toLowerCase()));
      if (words.length > 0) {
        const fallbackRes = await searchWikimediaCommons(words[0], page, 24);
        results = filterByOrientation(fallbackRes.results, filters.orientation);
      }
    }

    // If still 0 results and it matches demo archives, provide labeled demo data
    if (results.length === 0 && page === 1) {
      const demoMatches = DEMO_ARCHIVE_DATA.filter(item =>
        item.title.toLowerCase().includes(sanitized.toLowerCase()) ||
        (item.cultureTag && item.cultureTag.toLowerCase().includes(sanitized.toLowerCase()))
      );
      if (demoMatches.length > 0) {
        return {
          query: sanitized,
          page: 1,
          results: demoMatches,
          hasMore: false,
          totalEstimated: demoMatches.length,
          provider: 'Curated Demo Archive (Simulated Data)',
          isDemo: true,
        };
      }
    }

    return {
      query: sanitized,
      page,
      results,
      hasMore: results.length >= 20,
      totalEstimated: wikiRes.totalEstimated,
      provider: 'Wikimedia Commons Open Cultural Archive',
      isDemo: false,
    };
  } catch (err: any) {
    console.error('Error in searchImages provider:', err.message);
    // Graceful fallback with labeled demo data
    const orientedDemo = filterByOrientation(DEMO_ARCHIVE_DATA, filters.orientation);
    return {
      query: sanitized,
      page: 1,
      results: orientedDemo,
      hasMore: false,
      totalEstimated: orientedDemo.length,
      provider: 'Curated Demo Archive (Fallback Mode)',
      isDemo: true,
      error: 'Live provider connection encountered an issue; displaying clearly labeled sample records.',
    };
  }
}
