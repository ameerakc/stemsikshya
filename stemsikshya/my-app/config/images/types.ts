/**
 * TypeScript Types for Image Configuration
 * 
 * Provides strict typing for image categories, specifications, and utilities.
 * 
 * @packageDocumentation
 */

// Base path for all images
export const IMAGE_BASE_PATH = '/' as const;

// Image categories with their public folder paths
export const IMAGE_CATEGORIES = {
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

// Type for image category keys
export type ImageCategory = keyof typeof IMAGE_CATEGORIES;

// Type for image category paths
export type ImageCategoryPath = typeof IMAGE_CATEGORIES[ImageCategory];

// Image specification type
export interface ImageSpec {
  width: number;
  height: number;
  format: 'webp' | 'png' | 'svg' | 'jpg' | 'jpeg';
  aspectRatio?: number;
}

// Responsive image sizes type (CSS sizes attribute)
export type ImageSizes = string;

// Image metadata for optimization
export interface ImageMetadata {
  category: ImageCategory;
  filename: string;
  path: string;
  spec: ImageSpec;
  sizes: ImageSizes;
  alt?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty' | 'data:image/...';
  blurDataURL?: string;
}

// Image configuration for a category
export interface CategoryConfig {
  category: ImageCategory;
  path: ImageCategoryPath;
  spec: ImageSpec;
  sizes: ImageSizes;
  images: Record<string, string>;
}

// Validation result type
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Image import type for dynamic imports
export type ImageImport = () => Promise<{ default: string }>;

// Next.js Image component props extension
export interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Responsive image configuration
export interface ResponsiveImageConfig {
  mobile: string;
  tablet: string;
  desktop: string;
  fallback: string;
}

// Image set for different densities
export interface ImageSet {
  '1x': string;
  '2x': string;
  '3x'?: string;
}

// Validate category exists
export function isValidCategory(category: string): category is ImageCategory {
  return category in IMAGE_CATEGORIES;
}