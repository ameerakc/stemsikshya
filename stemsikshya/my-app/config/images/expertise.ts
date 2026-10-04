/**
 * Expertise Images Configuration
 * 
 * Expertise section card images.
 * Path: /public/expertise/
 * Spec: 1040x624, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'expertise';

export const EXPERTISE_IMAGES = {
  coding: getImagePath(CATEGORY, 'coding.webp'),
  robotics: getImagePath(CATEGORY, 'robotics.webp'),
  ai: getImagePath(CATEGORY, 'ai.webp'),
  drone: getImagePath(CATEGORY, 'drone.webp'),
} as const;

export type ExpertiseImageKey = keyof typeof EXPERTISE_IMAGES;

// Expertise data with images
export interface ExpertiseData {
  key: ExpertiseImageKey;
  title: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export const EXPERTISE_DATA: ExpertiseData[] = [
  {
    key: 'coding',
    title: 'Coding & Programming',
    description: 'Learn to code with Scratch, Python, JavaScript, and more. From basics to advanced concepts.',
    image: EXPERTISE_IMAGES.coding,
    icon: 'code',
    features: ['Block-based coding', 'Python programming', 'Web development', 'Game development'],
    ctaText: 'Explore Coding',
    ctaLink: '/services#coding',
  },
  {
    key: 'robotics',
    title: 'Robotics & Engineering',
    description: 'Build and program robots using LEGO, Arduino, and custom kits. Hands-on engineering.',
    image: EXPERTISE_IMAGES.robotics,
    icon: 'bot',
    features: ['LEGO robotics', 'Arduino projects', 'Sensor integration', 'Competition prep'],
    ctaText: 'Explore Robotics',
    ctaLink: '/services#robotics',
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    description: 'Discover AI and machine learning through interactive projects and real-world applications.',
    image: EXPERTISE_IMAGES.ai,
    icon: 'brain',
    features: ['ML fundamentals', 'Computer vision', 'Natural language processing', 'Ethical AI'],
    ctaText: 'Explore AI',
    ctaLink: '/services#ai',
  },
  {
    key: 'drone',
    title: 'Drone Technology',
    description: 'Learn to fly and program drones. Aerial photography, mapping, and autonomous flight.',
    image: EXPERTISE_IMAGES.drone,
    icon: 'drone',
    features: ['Flight training', 'Drone programming', 'Aerial photography', 'Safety & regulations'],
    ctaText: 'Explore Drones',
    ctaLink: '/services#drone',
  },
] as const;