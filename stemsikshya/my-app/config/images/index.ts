/**
 * Centralized Image Configuration - Main Entry Point
 * 
 * This is the main barrel export for all image configuration.
 * Import from '@/config/images' to access all image utilities and configurations.
 * 
 * @packageDocumentation
 */

// Re-export all modules (explicit to avoid conflicts)
export { 
  IMAGE_CATEGORIES, 
  CATEGORY_LABELS, 
  CATEGORY_DESCRIPTIONS, 
  CATEGORY_SPECS, 
  CATEGORY_SIZES, 
  CATEGORY_PRIORITY, 
  CATEGORY_PLACEHOLDER, 
  ALL_CATEGORIES, 
  isValidCategory, 
  getCategoryConfig 
} from './categories';

export { 
  IMAGE_OPTIMIZATION, 
  RESPONSIVE_BREAKPOINTS, 
  generateSizesAttribute, 
  getOptimalDimensions, 
  getFormatPriority, 
  validateDimensions, 
  getSrcSetSizes 
} from './specs';

export { 
  getImagePath, 
  getResponsiveImagePath, 
  generateSrcSet, 
  validateImagePath, 
  createImageMetadata, 
  getNextImageProps, 
  generateBlurDataURL, 
  listCategoryImages, 
  imageExists 
} from './utils';

export type { 
  ImageCategory, 
  ImageCategoryPath, 
  ImageSpec, 
  ImageSizes, 
  ImageMetadata, 
  CategoryConfig, 
  ValidationResult, 
  ImageImport, 
  NextImageProps, 
  ResponsiveImageConfig, 
  ImageSet 
} from './types';

// Re-export category-specific images
export * from './testimonials';
export * from './logos';
export * from './news';
export * from './expertise';
export * from './cta';
export * from './avatars';
export * from './partners';
export * from './team';
export * from './services';
export * from './hero';

// Convenience aggregate exports
export { IMAGES } from './aggregate';
export { IMAGE_SPECS, IMAGE_SIZES } from './specs';