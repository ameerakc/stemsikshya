/**
 * Image Categories Configuration
 * 
 * Defines all image categories with their paths and base configurations.
 * 
 * @packageDocumentation
 */

import type { ImageCategory, ImageCategoryPath, ImageSpec, ImageSizes } from './types';

// Image categories with their public folder paths
export const IMAGE_CATEGORIES: Record<ImageCategory, ImageCategoryPath> = {
  testimonials: '/testimonials/',
  logos: '/logos/',
  news: '/news/',
  expertise: '/expertise/',
  cta: '/cta/',
  avatars: '/avatars/',
  partners: '/partners/',
  team: '/team/',
  services: '/services/',
  hero: '/hero/',
} as const;

// Category display names for UI
export const CATEGORY_LABELS: Record<ImageCategory, string> = {
  testimonials: 'Testimonials',
  logos: 'Logos',
  news: 'News',
  expertise: 'Expertise',
  cta: 'CTA Banners',
  avatars: 'Avatars',
  partners: 'Partners',
  team: 'Team',
  services: 'Services',
  hero: 'Hero',
} as const;

// Category descriptions
export const CATEGORY_DESCRIPTIONS: Record<ImageCategory, string> = {
  testimonials: 'Testimonial avatar photos for about page',
  logos: 'Technology and partner logos',
  news: 'News article thumbnail images',
  expertise: 'Expertise section card images',
  cta: 'Call-to-action banner background images',
  avatars: 'Home page testimonial avatar images',
  partners: 'Partner school and organization logos',
  team: 'Team member profile photos',
  services: 'Service detail and feature images',
  hero: 'Hero section illustration images',
} as const;

// Default image specifications per category
export const CATEGORY_SPECS: Record<ImageCategory, ImageSpec> = {
  testimonials: { width: 800, height: 840, format: 'webp', aspectRatio: 800 / 840 },
  logos: { width: 200, height: 200, format: 'png', aspectRatio: 1 },
  news: { width: 800, height: 600, format: 'webp', aspectRatio: 800 / 600 },
  expertise: { width: 1040, height: 624, format: 'webp', aspectRatio: 1040 / 624 },
  cta: { width: 2400, height: 1200, format: 'webp', aspectRatio: 2 },
  avatars: { width: 100, height: 100, format: 'webp', aspectRatio: 1 },
  partners: { width: 200, height: 200, format: 'png', aspectRatio: 1 },
  team: { width: 1000, height: 1060, format: 'webp', aspectRatio: 1000 / 1060 },
  services: { width: 440, height: 560, format: 'webp', aspectRatio: 440 / 560 },
  hero: { width: 1920, height: 1080, format: 'svg', aspectRatio: 16 / 9 },
} as const;

// Next.js Image component sizes per category
export const CATEGORY_SIZES: Record<ImageCategory, ImageSizes> = {
  testimonials: '(min-width: 1024px) 30vw, 100vw',
  logos: '(min-width: 1024px) 14vw, 40vw',
  news: '(min-width: 1024px) 33vw, 100vw',
  expertise: '(min-width: 1024px) 50vw, 100vw',
  cta: '100vw',
  avatars: '(min-width: 1024px) 80px, 60px',
  partners: '(min-width: 1024px) 14vw, 40vw',
  team: '(min-width: 1024px) 25vw, 50vw',
  services: '(min-width: 1024px) 33vw, 100vw',
  hero: '100vw',
} as const;

// Category priority settings (for Next.js Image priority prop)
export const CATEGORY_PRIORITY: Record<ImageCategory, boolean> = {
  testimonials: false,
  logos: false,
  news: false,
  expertise: false,
  cta: true, // CTA banners often above fold
  avatars: false,
  partners: false,
  team: false,
  services: false,
  hero: true, // Hero images usually above fold
} as const;

// Category placeholder settings
export const CATEGORY_PLACEHOLDER: Record<ImageCategory, 'blur' | 'empty'> = {
  testimonials: 'blur',
  logos: 'empty',
  news: 'blur',
  expertise: 'blur',
  cta: 'blur',
  avatars: 'blur',
  partners: 'empty',
  team: 'blur',
  services: 'blur',
  hero: 'blur',
} as const;

// Get all category keys
export const ALL_CATEGORIES: ImageCategory[] = Object.keys(IMAGE_CATEGORIES) as ImageCategory[];

// Validate category exists
export function isValidCategory(category: string): category is ImageCategory {
  return category in IMAGE_CATEGORIES;
}

// Get category config
export function getCategoryConfig(category: ImageCategory) {
  return {
    category,
    path: IMAGE_CATEGORIES[category],
    label: CATEGORY_LABELS[category],
    description: CATEGORY_DESCRIPTIONS[category],
    spec: CATEGORY_SPECS[category],
    sizes: CATEGORY_SIZES[category],
    priority: CATEGORY_PRIORITY[category],
    placeholder: CATEGORY_PLACEHOLDER[category],
  };
}