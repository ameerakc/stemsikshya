/**
 * CTA Images Configuration
 * 
 * Call-to-action banner images.
 * Path: /public/cta/
 * Spec: 2400x1200, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'cta';

export const CTA_IMAGES = {
  // Using hero image as placeholder since cta/banner.webp doesn't exist yet
  banner: '/hero/hero-coding.svg',
} as const;

export type CTAImageKey = keyof typeof CTA_IMAGES;

// CTA banner data
export interface CTAData {
  key: CTAImageKey;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  variant: 'primary' | 'secondary';
}

export const CTA_DATA: CTAData[] = [
  {
    key: 'banner',
    title: 'Ready to Start Your STEM Journey?',
    description: 'Join thousands of students discovering the excitement of coding, robotics, AI, and drone technology.',
    image: CTA_IMAGES.banner,
    buttonText: 'Enroll Now',
    buttonLink: '/contact',
    variant: 'primary',
  },
] as const;