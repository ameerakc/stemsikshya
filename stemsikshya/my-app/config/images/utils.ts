/**
 * Image Utility Functions
 * 
 * Provides helper functions for image path generation, validation, and optimization.
 * 
 * @packageDocumentation
 */

import type { ImageCategory, ValidationResult, ImageMetadata } from './types';
import { IMAGE_CATEGORIES, IMAGE_BASE_PATH, isValidCategory } from './types';
import { CATEGORY_SPECS, CATEGORY_SIZES, CATEGORY_PRIORITY, CATEGORY_PLACEHOLDER, getCategoryConfig } from './categories';

/**
 * Generate full image path from category and filename
 * @param category - Image category
 * @param filename - Image filename (with extension)
 * @returns Full public path to image
 */
export function getImagePath(category: ImageCategory, filename: string): string {
  if (!isValidCategory(category)) {
    throw new Error(`Invalid image category: ${category}`);
  }
  
  // Ensure filename doesn't start with slash
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename;
  
  return `${IMAGE_CATEGORIES[category]}${cleanFilename}`;
}

/**
 * Generate responsive image paths for different breakpoints
 * @param category - Image category
 * @param baseFilename - Base filename without extension
 * @param extension - File extension (default: webp)
 * @returns Object with paths for different breakpoints
 */
export function getResponsiveImagePath(
  category: ImageCategory,
  baseFilename: string,
  extension: string = 'webp'
): Record<string, string> {
  const config = getCategoryConfig(category);
  const path = IMAGE_CATEGORIES[category];
  
  return {
    mobile: `${path}${baseFilename}-mobile.${extension}`,
    tablet: `${path}${baseFilename}-tablet.${extension}`,
    desktop: `${path}${baseFilename}-desktop.${extension}`,
    fallback: `${path}${baseFilename}.${extension}`,
  };
}

/**
 * Generate srcset string for responsive images
 * @param category - Image category
 * @param baseFilename - Base filename without extension
 * @param extension - File extension (default: webp)
 * @returns srcset string for Next.js Image component
 */
export function generateSrcSet(
  category: ImageCategory,
  baseFilename: string,
  extension: string = 'webp'
): string {
  const responsivePaths = getResponsiveImagePath(category, baseFilename, extension);
  const spec = CATEGORY_SPECS[category];
  
  return Object.entries(responsivePaths)
    .filter(([key]) => key !== 'fallback')
    .map(([key, path]) => {
      const width = getWidthForBreakpoint(category, key);
      return `${path} ${width}w`;
    })
    .join(', ');
}

/**
 * Get width for a specific breakpoint
 */
function getWidthForBreakpoint(category: ImageCategory, breakpoint: string): number {
  const spec = CATEGORY_SPECS[category];
  const breakpoints = { mobile: 640, tablet: 768, desktop: 1024, large: 1280 };
  const viewportWidth = breakpoints[breakpoint as keyof typeof breakpoints] || 1024;
  
  const sizes = CATEGORY_SIZES[category];
  const match = sizes.match(/(\d+)vw/);
  
  if (match) {
    const vw = parseInt(match[1], 10);
    return Math.round((viewportWidth * vw) / 100);
  }
  
  return spec.width;
}

/**
 * Validate image path exists and matches category spec
 * @param category - Image category
 * @param filename - Image filename
 * @returns Validation result
 */
export function validateImagePath(category: ImageCategory, filename: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  if (!isValidCategory(category)) {
    errors.push(`Invalid category: ${category}`);
    return { valid: false, errors, warnings };
  }
  
  const path = getImagePath(category, filename);
  
  // Check file extension matches category spec
  const spec = CATEGORY_SPECS[category];
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (ext && ext !== spec.format) {
    warnings.push(
      `File extension ".${ext}" doesn't match category format "${spec.format}". ` +
      `Consider using .${spec.format} for optimal performance.`
    );
  }
  
  // Check for common naming issues
  if (filename.includes(' ')) {
    warnings.push('Filename contains spaces. Use hyphens or underscores instead.');
  }
  
  if (filename.toUpperCase() !== filename.toLowerCase() && filename !== filename.toLowerCase()) {
    warnings.push('Filename contains uppercase letters. Use lowercase for consistency.');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Create complete image metadata for Next.js Image component
 * @param category - Image category
 * @param filename - Image filename
 * @param alt - Alt text for accessibility
 * @param options - Additional options
 * @returns Complete image metadata object
 */
export function createImageMetadata(
  category: ImageCategory,
  filename: string,
  alt: string,
  options: {
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    className?: string;
  } = {}
): ImageMetadata {
  const config = getCategoryConfig(category);
  const path = getImagePath(category, filename);
  
  return {
    category,
    filename,
    path,
    spec: config.spec,
    sizes: config.sizes,
    alt,
    priority: options.priority ?? config.priority,
    placeholder: options.placeholder ?? config.placeholder,
    blurDataURL: options.blurDataURL,
  };
}

/**
 * Get Next.js Image component props for an image
 * @param category - Image category
 * @param filename - Image filename
 * @param alt - Alt text
 * @param customProps - Custom props to override defaults
 * @returns Props for Next.js Image component
 */
export function getNextImageProps(
  category: ImageCategory,
  filename: string,
  alt: string,
  customProps: Partial<{
    width: number;
    height: number;
    sizes: string;
    priority: boolean;
    placeholder: 'blur' | 'empty';
    blurDataURL: string;
    quality: number;
    loading: 'lazy' | 'eager';
    className: string;
  }> = {}
) {
  const config = getCategoryConfig(category);
  const path = getImagePath(category, filename);
  const spec = config.spec;
  
  return {
    src: path,
    alt,
    width: customProps.width ?? spec.width,
    height: customProps.height ?? spec.height,
    sizes: customProps.sizes ?? config.sizes,
    priority: customProps.priority ?? config.priority,
    placeholder: customProps.placeholder ?? config.placeholder,
    blurDataURL: customProps.blurDataURL,
    quality: customProps.quality ?? 85,
    loading: customProps.loading ?? (config.priority ? 'eager' : 'lazy'),
    className: customProps.className,
  };
}

/**
 * Generate blur data URL for placeholder
 * @param category - Image category
 * @param filename - Image filename
 * @returns Base64 encoded blur placeholder
 */
export async function generateBlurDataURL(category: ImageCategory, filename: string): Promise<string> {
  // This would typically be done at build time
  // For now, return a simple gradient placeholder
  const config = getCategoryConfig(category);
  const spec = config.spec;
  
  // Create a tiny base64 encoded SVG as blur placeholder
  const svg = `
    <svg width="${spec.width}" height="${spec.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e0e0e0"/>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * List all images in a category (for build-time generation)
 * @param category - Image category
 * @returns Array of image filenames
 */
export function listCategoryImages(category: ImageCategory): string[] {
  // This would be populated at build time by scanning the public folder
  // For now, return empty array - actual implementation would use fs
  return [];
}

/**
 * Check if image exists in public folder
 * @param category - Image category
 * @param filename - Image filename
 * @returns Promise resolving to boolean
 */
export async function imageExists(category: ImageCategory, filename: string): Promise<boolean> {
  // This would check the filesystem at build time
  // For runtime, we'd need an API endpoint or build-time manifest
  const path = getImagePath(category, filename);
  
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}