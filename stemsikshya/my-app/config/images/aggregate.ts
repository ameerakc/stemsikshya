/**
 * Aggregate Image Exports
 * 
 * Single object containing all categorized images for easy importing.
 * 
 * @packageDocumentation
 */

import { TESTIMONIAL_IMAGES } from './testimonials';
import { LOGO_IMAGES } from './logos';
import { NEWS_IMAGES } from './news';
import { EXPERTISE_IMAGES } from './expertise';
import { CTA_IMAGES } from './cta';
import { AVATAR_IMAGES } from './avatars';
import { PARTNER_IMAGES } from './partners';
import { TEAM_IMAGES } from './team';
import { SERVICE_IMAGES } from './services';
import { HERO_IMAGES } from './hero';

// All images exported as a single object for easy importing
export const IMAGES = {
  testimonials: TESTIMONIAL_IMAGES,
  logos: LOGO_IMAGES,
  news: NEWS_IMAGES,
  expertise: EXPERTISE_IMAGES,
  cta: CTA_IMAGES,
  avatars: AVATAR_IMAGES,
  partners: PARTNER_IMAGES,
  team: TEAM_IMAGES,
  services: SERVICE_IMAGES,
  hero: HERO_IMAGES,
} as const;

// Type for the IMAGES object
export type AllImages = typeof IMAGES;

// Category keys
export type ImageCategoryKey = keyof AllImages;

// Flattened type for all image keys
export type AnyImageKey = {
  [K in ImageCategoryKey]: keyof AllImages[K];
}[ImageCategoryKey];

// Helper to get image by category and key
export function getImage<K extends ImageCategoryKey>(
  category: K,
  key: keyof AllImages[K]
): AllImages[K][keyof AllImages[K]] {
  return IMAGES[category][key];
}

// Get all images for a category
export function getCategoryImages<K extends ImageCategoryKey>(category: K): AllImages[K] {
  return IMAGES[category];
}

// List all available image paths
export function listAllImagePaths(): string[] {
  const paths: string[] = [];
  for (const category of Object.keys(IMAGES) as ImageCategoryKey[]) {
    const categoryImages = IMAGES[category] as Record<string, string>;
    for (const key of Object.keys(categoryImages)) {
      paths.push(categoryImages[key]);
    }
  }
  return paths;
}

// Count images per category
export function getImageCounts(): Record<ImageCategoryKey, number> {
  const counts: Record<ImageCategoryKey, number> = {} as Record<ImageCategoryKey, number>;
  for (const category of Object.keys(IMAGES) as ImageCategoryKey[]) {
    counts[category] = Object.keys(IMAGES[category]).length;
  }
  return counts;
}