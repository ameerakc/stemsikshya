/**
 * Partner Images Configuration
 * 
 * Partner school and organization logos.
 * Path: /public/partners/
 * Spec: 200x200, PNG
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'partners';

export const PARTNER_IMAGES = {
  chandragiri: getImagePath(CATEGORY, 'chandragiri.png'),
  newa: getImagePath(CATEGORY, 'newa.png'),
  littleStar: getImagePath(CATEGORY, 'little-star.png'),
  everVision: getImagePath(CATEGORY, 'ever-vision.png'),
  milestone: getImagePath(CATEGORY, 'milestone.png'),
  basicLearning: getImagePath(CATEGORY, 'basic-learning.png'),
  partner6: getImagePath(CATEGORY, 'partner-6.png'),
} as const;

export type PartnerImageKey = keyof typeof PARTNER_IMAGES;

// Partner data
export interface PartnerData {
  key: PartnerImageKey;
  name: string;
  image: string;
  alt: string;
  website?: string;
  location?: string;
  type: 'school' | 'organization' | 'institution';
}

export const PARTNERS_DATA: PartnerData[] = [
  {
    key: 'chandragiri',
    name: 'Chandragiri School',
    image: PARTNER_IMAGES.chandragiri,
    alt: 'Chandragiri School Logo',
    type: 'school',
    location: 'Kathmandu, Nepal',
  },
  {
    key: 'newa',
    name: 'Newa Academy',
    image: PARTNER_IMAGES.newa,
    alt: 'Newa Academy Logo',
    type: 'school',
    location: 'Lalitpur, Nepal',
  },
  {
    key: 'littleStar',
    name: 'Little Star School',
    image: PARTNER_IMAGES.littleStar,
    alt: 'Little Star School Logo',
    type: 'school',
    location: 'Bhaktapur, Nepal',
  },
  {
    key: 'everVision',
    name: 'Ever Vision Academy',
    image: PARTNER_IMAGES.everVision,
    alt: 'Ever Vision Academy Logo',
    type: 'school',
    location: 'Kathmandu, Nepal',
  },
  {
    key: 'milestone',
    name: 'Milestone Education',
    image: PARTNER_IMAGES.milestone,
    alt: 'Milestone Education Logo',
    type: 'institution',
    location: 'Kathmandu, Nepal',
  },
  {
    key: 'basicLearning',
    name: 'Basic Learning Center',
    image: PARTNER_IMAGES.basicLearning,
    alt: 'Basic Learning Center Logo',
    type: 'organization',
    location: 'Lalitpur, Nepal',
  },
  {
    key: 'partner6',
    name: 'Partner School 6',
    image: PARTNER_IMAGES.partner6,
    alt: 'Partner School 6 Logo',
    type: 'school',
    location: 'Kathmandu, Nepal',
  },
] as const;