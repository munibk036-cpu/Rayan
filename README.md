# Rayan Culture Explorer

> "Explore cultures, traditions, clothing, food, and heritage through images."

Rayan Culture Explorer is a responsive cultural image search engine and curatorial archive. Visitors can explore regional cultures, traditional dress (Pakhtoon Khet Partug, Sindhi Ajrak, Balochi Pashk, Punjabi Kurta Tehmat), indigenous cuisines, festivals, handicrafts, musical instruments, and public figures' clothing styles with authentic real-time image retrieval, source provenance, and open licenses.

---

## Key Features

- **Live Cultural Image Retrieval**: Dynamically queries legitimate open archives (Wikimedia Commons Open Cultural Archive and optional Pexels API) rather than relying on a static hard-coded list.
- **Multilingual Query Support**: Supports search in English, Urdu (e.g. `سندھی اجرک`, `پشتون ثقافت`), and Roman Urdu (e.g. `balochi libas`, `sindhi ajrak`, `pakhtun riwayat`).
- **Institutional Provenance & Attribution**: Displays creator credits, open licenses (Creative Commons CC BY, CC BY-SA, Public Domain), dimensions, and direct links to original source repository pages.
- **Museum Accession Viewer**: High-resolution image modal with pan/zoom, museum catalog metadata (`<dl>` schema), keyboard navigation (arrows and Esc), and formatted APA/MLA citation copying.
- **Filter Bar**: Dynamic orientation filtering (Landscape, Portrait, Square, All) and provider selector.
- **URL Synchronization**: Shareable, bookmarkable search query URLs (e.g. `/?q=Sindhi+Ajrak`).
- **Resilient Fallback Policy**: Zero-broken-image containers and a clearly labeled, authentic cultural demo archive for offline exploration.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons
- **Backend**: Node.js, Express, Vite middleware mode in development
- **Image Provider**: Wikimedia Commons Action API (MediaWiki REST API), optional Pexels API
- **Testing**: Node built-in test runner (`node:test`, `node:assert/strict`) via `tsx --test`

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` (optional, as Wikimedia Commons requires NO API key):

```bash
cp .env.example .env
```

Available environment variables:
- `IMAGE_PROVIDER`: Preferred image search provider (`"wikimedia"` [default], `"pexels"`, or `"demo"`).
- `PEXELS_API_KEY`: Optional Pexels API key if using Pexels as secondary provider.
- `PORT`: Server port (default: `3000`).

### 3. Running Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 4. Running Unit Tests

```bash
npm test
```

### 5. Production Build

```bash
npm run build
npm start
```

---

## API Documentation

### `GET /api/images`

Parameters:
- `q`: Search query string (required, max 200 characters)
- `page`: Page number (optional, default: 1)
- `orientation`: Filter by `all` | `landscape` | `portrait` | `square`
- `provider`: `wikimedia` | `pexels` | `demo`

Example Response:
```json
{
  "query": "Sindhi Ajrak",
  "page": 1,
  "results": [
    {
      "id": "wiki-12345",
      "title": "Sindhi Ajrak block printed textile",
      "thumbnailUrl": "https://upload.wikimedia.org/...",
      "imageUrl": "https://upload.wikimedia.org/...",
      "sourceName": "Wikimedia Commons",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:...",
      "creatorName": "Cultural Contributor",
      "licenseName": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "width": 1920,
      "height": 1080,
      "altText": "Traditional geometric blue and red patterned cloth",
      "isDemo": false
    }
  ],
  "hasMore": true,
  "provider": "Wikimedia Commons Open Cultural Archive",
  "isDemo": false
}
```

### `GET /api/provider-info`

Returns statuses of active and configured image search providers.

---

## License & Attribution

All images belong to their respective creators, photographers, and source archives. Rayan Culture Explorer displays media in accordance with open access licenses and provides direct attribution links for every accession.
