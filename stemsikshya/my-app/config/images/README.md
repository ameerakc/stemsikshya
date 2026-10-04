# Image Configuration

This folder contains the centralized image configuration for the STEM Sikshya application.

## Folder Structure

```
config/images/
├── index.ts          # Main barrel export
├── types.ts          # TypeScript types and interfaces
├── categories.ts     # Category definitions and metadata
├── specs.ts          # Image specifications and optimization settings
├── utils.ts          # Utility functions for image handling
├── aggregate.ts      # Combined exports and helpers
├── testimonials.ts   # Testimonial images & data
├── logos.ts          # Logo images & data
├── news.ts           # News images & data
├── expertise.ts      # Expertise images & data
├── cta.ts            # CTA images & data
├── avatars.ts        # Avatar images & data
├── partners.ts       # Partner images & data
├── team.ts           # Team images & data
├── services.ts       # Service images & data
└── hero.ts           # Hero images & data
```

All images should be placed in the corresponding folders under `/public/`:

```
/public/
├── testimonials/     # Testimonial avatar photos (800x840, WebP)
├── logos/            # Partner/technology logos (200x200, PNG)
├── news/             # News article images (800x600, WebP)
├── expertise/        # Expertise section images (1040x624, WebP)
├── cta/              # CTA banner images (2400x1200, WebP)
├── avatars/          # Testimonial avatars - home page (100x100, WebP)
├── partners/         # Partner school logos (200x200, PNG)
├── team/             # Team member photos (1000x1060, WebP)
├── services/         # Service detail images (440x560, WebP)
└── hero/             # Hero section images (1920x1080, SVG)
```

## Quick Start

```typescript
// Import everything from the main entry point
import { 
  IMAGES,           // All images organized by category
  getImagePath,     // Generate image paths dynamically
  getNextImageProps, // Get Next.js Image component props
  TESTIMONIAL_IMAGES, // Direct category import
  TESTIMONIALS_DATA,  // Pre-built data with images
} from '@/config/images';

// Use predefined images
const anitaPhoto = IMAGES.testimonials.anita;
const codingLogo = IMAGES.logos.coding;

// Generate paths dynamically
const customImage = getImagePath('testimonials', 'custom.webp');

// Get optimized Next.js Image props
const imageProps = getNextImageProps('testimonials', 'anita.webp', 'Anita Sharma');
```

## Category Imports

Import specific categories for better tree-shaking:

```typescript
// Import only what you need
import { TESTIMONIAL_IMAGES, TESTIMONIALS_DATA } from '@/config/images/testimonials';
import { LOGO_IMAGES, LOGOS_DATA } from '@/config/images/logos';
import { EXPERTISE_IMAGES, EXPERTISE_DATA } from '@/config/images/expertise';
import { SERVICE_IMAGES, SERVICES_DATA } from '@/config/images/services';
import { HERO_IMAGES, HERO_DATA } from '@/config/images/hero';
import { TEAM_IMAGES, TEAM_DATA } from '@/config/images/team';
import { PARTNER_IMAGES, PARTNERS_DATA } from '@/config/images/partners';
import { AVATAR_IMAGES, AVATAR_TESTIMONIALS } from '@/config/images/avatars';
import { NEWS_IMAGES, NEWS_DATA } from '@/config/images/news';
import { CTA_IMAGES, CTA_DATA } from '@/config/images/cta';
```

## Image Specifications

| Category | Dimensions | Format | Aspect Ratio | Priority | Placeholder |
|----------|------------|--------|--------------|----------|-------------|
| testimonials | 800x840 | WebP | 0.95 | No | Blur |
| logos | 200x200 | PNG | 1.0 | No | Empty |
| news | 800x600 | WebP | 1.33 | No | Blur |
| expertise | 1040x624 | WebP | 1.67 | No | Blur |
| cta | 2400x1200 | WebP | 2.0 | Yes | Blur |
| avatars | 100x100 | WebP | 1.0 | No | Blur |
| partners | 200x200 | PNG | 1.0 | No | Empty |
| team | 1000x1060 | WebP | 0.94 | No | Blur |
| services | 440x560 | WebP | 0.79 | No | Blur |
| hero | 1920x1080 | SVG | 1.78 | Yes | Blur |

## Utility Functions

### `getImagePath(category, filename)`
Generate a full public path for an image.

```typescript
const path = getImagePath('testimonials', 'anita.webp');
// Returns: '/testimonials/anita.webp'
```

### `getNextImageProps(category, filename, alt, customProps)`
Get optimized props for Next.js Image component.

```typescript
const props = getNextImageProps('hero', 'hero-coding.svg', 'Coding Hero');
// Returns: { src, alt, width, height, sizes, priority, placeholder, quality, loading }
```

### `validateImagePath(category, filename)`
Validate image path and naming conventions.

```typescript
const result = validateImagePath('testimonials', 'anita.webp');
// Returns: { valid: true, errors: [], warnings: [] }
```

### `createImageMetadata(category, filename, alt, options)`
Create complete image metadata object.

```typescript
const metadata = createImageMetadata('team', 'member-1.webp', 'Dr. Sarah Johnson', {
  priority: true,
});
```

## Responsive Images

Generate responsive image paths for different breakpoints:

```typescript
import { getResponsiveImagePath, generateSrcSet } from '@/config/images';

const responsive = getResponsiveImagePath('services', 'coding', 'webp');
// Returns: { mobile, tablet, desktop, fallback }

const srcset = generateSrcSet('services', 'coding', 'webp');
// Returns: "path-mobile.webp 640w, path-tablet.webp 768w, path-desktop.webp 1024w"
```

## Adding New Images

1. **Place the image file** in the appropriate `/public/<category>/` folder
2. **Add to category file** (e.g., `testimonials.ts`):
   ```typescript
   export const TESTIMONIAL_IMAGES = {
     anita: getImagePath(CATEGORY, 'anita.webp'),
     bradley: getImagePath(CATEGORY, 'bradley.webp'),
     newPerson: getImagePath(CATEGORY, 'new-person.webp'), // Add here
   } as const;
   ```
3. **Update data array** if applicable (e.g., `TESTIMONIALS_DATA`)
4. **Run validation** (optional): `validateImagePath('testimonials', 'new-person.webp')`

## Next.js Configuration

The image optimization is configured in `next.config.ts`:

```typescript
// next.config.ts
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
};
```

## TypeScript Support

All images and data are fully typed:

```typescript
import type { 
  TestimonialImageKey, 
  TestimonialData,
  ImageCategory,
  ImageSpec,
} from '@/config/images';

// Type-safe access
const key: TestimonialImageKey = 'anita'; // ✓
const invalid: TestimonialImageKey = 'invalid'; // ✗ TypeScript error
```

## Best Practices

1. **Use WebP format** for photos and complex images
2. **Use PNG** for logos and graphics with transparency
3. **Use SVG** for illustrations and icons (scalable)
4. **Follow naming convention**: `kebab-case.webp` (e.g., `hero-coding.svg`)
5. **Optimize before upload**: Target file sizes < 200KB for web
6. **Use descriptive alt text** for accessibility
7. **Set priority=true** for above-the-fold images
8. **Use blur placeholders** for better perceived performance