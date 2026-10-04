/**
 * Hero Images Configuration
 * 
 * Hero section illustration images.
 * Path: /public/hero/
 * Spec: 1920x1080, SVG
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'hero';

export const HERO_IMAGES = {
  coding: getImagePath(CATEGORY, 'hero-coding.svg'),
  robotics: getImagePath(CATEGORY, 'hero-robotics.svg'),
  ai: getImagePath(CATEGORY, 'hero-ai.svg'),
  drone: getImagePath(CATEGORY, 'hero-drone.svg'),
  logo: getImagePath(CATEGORY, 'logo.svg'),
} as const;

export type HeroImageKey = keyof typeof HERO_IMAGES;

// Hero section data
export interface HeroData {
  key: HeroImageKey;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  variant: 'primary' | 'secondary';
}

export const HERO_DATA: HeroData[] = [
  {
    key: 'coding',
    title: 'Learn to Code',
    subtitle: 'Master programming from basics to advanced. Build games, apps, and websites.',
    image: HERO_IMAGES.coding,
    ctaText: 'Start Coding',
    ctaLink: '/services#coding',
    variant: 'primary',
  },
  {
    key: 'robotics',
    title: 'Build Robots',
    subtitle: 'Design, build, and program your own robots. Compete in challenges.',
    image: HERO_IMAGES.robotics,
    ctaText: 'Explore Robotics',
    ctaLink: '/services#robotics',
    variant: 'primary',
  },
  {
    key: 'ai',
    title: 'Discover AI',
    subtitle: 'Understand artificial intelligence. Create ML models and smart applications.',
    image: HERO_IMAGES.ai,
    ctaText: 'Learn AI',
    ctaLink: '/services#ai',
    variant: 'primary',
  },
  {
    key: 'drone',
    title: 'Fly Drones',
    subtitle: 'Master drone piloting and programming. Capture stunning aerial imagery.',
    image: HERO_IMAGES.drone,
    ctaText: 'Fly Drones',
    ctaLink: '/services#drone',
    variant: 'primary',
  },
] as const;

// Logo for navbar/footer
export const LOGO_IMAGE = HERO_IMAGES.logo;