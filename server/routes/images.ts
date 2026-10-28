/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response, Router } from 'express';
import { searchImages } from '../services/imageProvider';
import { ImageOrientation, ProviderType } from '../../src/types/culture';

export const imagesRouter = Router();

// In-memory rate limiting map: ip -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  clientData.count++;
  return true;
}

// Clean up stale rate limit entries periodically without keeping the process alive
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);
cleanupTimer.unref();

/**
 * GET /api/images
 * Query parameters:
 *  - q: search query string (required, 1-150 chars)
 *  - page: page number (optional, default 1)
 *  - orientation: 'all' | 'landscape' | 'portrait' | 'square'
 *  - provider: 'wikimedia' | 'pexels' | 'demo'
 */
imagesRouter.get('/images', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      error: 'Too many search requests. Please wait a moment before trying again.',
      results: [],
      hasMore: false,
    });
    return;
  }

  const rawQuery = req.query.q;
  if (!rawQuery || typeof rawQuery !== 'string' || rawQuery.trim().length === 0) {
    res.status(400).json({
      error: 'A search query is required.',
      query: '',
      page: 1,
      results: [],
      hasMore: false,
    });
    return;
  }

  if (rawQuery.length > 200) {
    res.status(400).json({
      error: 'Search query exceeds maximum allowed length of 200 characters.',
      query: rawQuery.slice(0, 50),
      page: 1,
      results: [],
      hasMore: false,
    });
    return;
  }

  const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
  const orientation = (req.query.orientation as ImageOrientation) || 'all';
  const provider = (req.query.provider as ProviderType) || undefined;

  try {
    const data = await searchImages(rawQuery, page, {
      orientation,
      provider,
    });

    res.json(data);
  } catch (err: any) {
    console.error('API /api/images route error:', err);
    res.status(500).json({
      error: 'Failed to retrieve image results. Please try again.',
      query: rawQuery,
      page,
      results: [],
      hasMore: false,
    });
  }
});

/**
 * GET /api/provider-info
 * Returns status of available image search providers
 */
imagesRouter.get('/provider-info', (_req: Request, res: Response) => {
  const hasPexels = Boolean(process.env.PEXELS_API_KEY);
  const configuredProvider = process.env.IMAGE_PROVIDER || 'wikimedia';

  res.json({
    activeProvider: configuredProvider,
    providers: [
      {
        id: 'wikimedia',
        name: 'Wikimedia Commons Open Archive',
        description: 'Authentic open-access cultural repository with Creative Commons and Public Domain metadata. Requires no API key.',
        status: 'active',
        isDefault: configuredProvider === 'wikimedia',
      },
      {
        id: 'pexels',
        name: 'Pexels Curated Photography',
        description: 'Curated high-resolution photography API.',
        status: hasPexels ? 'configured' : 'unconfigured',
        isDefault: configuredProvider === 'pexels',
        setupInstruction: hasPexels ? undefined : 'Set PEXELS_API_KEY in .env to enable.',
      },
      {
        id: 'demo',
        name: 'Curated Demo Cultural Archive',
        description: 'Locally curated authentic heritage specimens (Ajrak, Balochi, Pashtun, Phulkari) for testing and offline inspection.',
        status: 'available',
        isDefault: configuredProvider === 'demo',
      }
    ]
  });
});
