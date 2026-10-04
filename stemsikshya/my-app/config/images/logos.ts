/**
 * Logo Images Configuration
 * 
 * Technology and partner logos.
 * Path: /public/logos/
 * Spec: 200x200, PNG
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'logos';

export const LOGO_IMAGES = {
  ai: getImagePath(CATEGORY, 'ai.png'),
  robotics: getImagePath(CATEGORY, 'robotics.png'),
  pictoblox: getImagePath(CATEGORY, 'pictoblox.png'),
  drone: getImagePath(CATEGORY, 'drone.png'),
  blix: getImagePath(CATEGORY, 'blix.png'),
  abacus: getImagePath(CATEGORY, 'abacus.png'),
} as const;

export type LogoImageKey = keyof typeof LOGO_IMAGES;

// Logo metadata for display
export interface LogoData {
  key: LogoImageKey;
  src: string;
  alt: string;
  title: string;
  category: 'technology' | 'partner' | 'platform';
}

export const LOGOS_DATA: LogoData[] = [
  { key: 'ai', src: LOGO_IMAGES.ai, alt: 'AI Logo', title: 'Artificial Intelligence', category: 'technology' },
  { key: 'robotics', src: LOGO_IMAGES.robotics, alt: 'Robotics Logo', title: 'Robotics', category: 'technology' },
  { key: 'pictoblox', src: LOGO_IMAGES.pictoblox, alt: 'PictoBlox Logo', title: 'PictoBlox', category: 'platform' },
  { key: 'drone', src: LOGO_IMAGES.drone, alt: 'Drone Logo', title: 'Drone Technology', category: 'technology' },
  { key: 'blix', src: LOGO_IMAGES.blix, alt: 'Blix Logo', title: 'Blix', category: 'partner' },
  { key: 'abacus', src: LOGO_IMAGES.abacus, alt: 'Abacus Logo', title: 'Abacus', category: 'partner' },
] as const;