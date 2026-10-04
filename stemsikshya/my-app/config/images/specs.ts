/**
 * Image Specifications and Optimization Configuration
 * 
 * Contains image dimensions, formats, responsive sizes, and optimization hints.
 * 
 * @packageDocumentation
 */

import type { ImageCategory, ImageSpec, ImageSizes } from './types';
import { CATEGORY_SPECS, CATEGORY_SIZES, CATEGORY_PRIORITY, CATEGORY_PLACEHOLDER } from './categories';

// Re-export category specs and sizes
export { CATEGORY_SPECS as IMAGE_SPECS };
export { CATEGORY_SIZES as IMAGE_SIZES };
export { CATEGORY_PRIORITY as IMAGE_PRIORITY };
export { CATEGORY_PLACEHOLDER as IMAGE_PLACEHOLDER };

// Global image optimization settings
export const IMAGE_OPTIMIZATION = {
  // Default quality for WebP images
  defaultQuality: 85,
  
  // Maximum image dimensions
  maxWidth: 2560,
  maxHeight: 1440,
  
  // Supported formats in order of preference
  formats: ['webp', 'avif', 'png', 'jpg', 'svg'] as const,
  
  // Device pixel ratios to generate
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  
  // Image sizes for responsive images
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  
  // Minimum cache TTL (seconds)
  minimumCacheTTL: 31536000, // 1 year
  
  // Enable/disable optimization features
  enableOptimization: true,
  enableResponsive: true,
  enableLazyLoading: true,
  enableBlurPlaceholder: true,
} as const;

// Breakpoints for responsive images
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  large: 1280,
  xlarge: 1536,
} as const;

// Generate sizes attribute for a category
export function generateSizesAttribute(category: ImageCategory): ImageSizes {
  return CATEGORY_SIZES[category];
}

// Get optimal dimensions for a category at a specific breakpoint
export function getOptimalDimensions(
  category: ImageCategory,
  breakpoint: keyof typeof RESPONSIVE_BREAKPOINTS = 'desktop'
): { width: number; height: number } {
  const spec = CATEGORY_SPECS[category];
  const breakpointWidth = RESPONSIVE_BREAKPOINTS[breakpoint];
  
  // Calculate width based on sizes attribute
  const sizes = CATEGORY_SIZES[category];
  let width = spec.width;
  
  if (sizes.includes('vw')) {
    // Extract viewport percentage
    const match = sizes.match(/(\d+)vw/);
    if (match) {
      const vw = parseInt(match[1], 10);
      width = Math.round((breakpointWidth * vw) / 100);
    }
  } else if (sizes.includes('px')) {
    // Fixed pixel size
    const match = sizes.match(/(\d+)px/);
    if (match) {
      width = parseInt(match[1], 10);
    }
  }
  
  // Maintain aspect ratio
  const height = Math.round(width / spec.aspectRatio!);
  
  return { width, height };
}

// Get image format priority for a category
export function getFormatPriority(category: ImageCategory): readonly string[] {
  const spec = CATEGORY_SPECS[category];
  const baseFormats = IMAGE_OPTIMIZATION.formats;
  
  // Put the category's native format first
  return [spec.format, ...baseFormats.filter(f => f !== spec.format)];
}

// Validate image dimensions against category spec
export function validateDimensions(
  category: ImageCategory,
  width: number,
  height: number
): { valid: boolean; errors: string[] } {
  const spec = CATEGORY_SPECS[category];
  const errors: string[] = [];
  
  if (width > IMAGE_OPTIMIZATION.maxWidth) {
    errors.push(`Width ${width}px exceeds maximum ${IMAGE_OPTIMIZATION.maxWidth}px`);
  }
  
  if (height > IMAGE_OPTIMIZATION.maxHeight) {
    errors.push(`Height ${height}px exceeds maximum ${IMAGE_OPTIMIZATION.maxHeight}px`);
  }
  
  // Check aspect ratio (allow 10% tolerance)
    const expectedRatio = spec.aspectRatio ?? (spec.width / spec.height);
  const actualRatio = width / height;
  const tolerance = 0.1;
  
  if (Math.abs(actualRatio - expectedRatio) / expectedRatio > tolerance) {
    errors.push(
      `Aspect ratio ${actualRatio.toFixed(2)} doesn't match expected ${expectedRatio.toFixed(2)} ` +
      `(tolerance: ${(tolerance * 100).toFixed(0)}%)`
    );
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Get recommended image sizes for srcset
export function getSrcSetSizes(category: ImageCategory): number[] {
  const spec = CATEGORY_SPECS[category];
  const baseWidth = spec.width;
  
  // Generate sizes based on device pixel ratios
  return [1, 1.5, 2, 3].map(ratio => Math.round(baseWidth * ratio));
}