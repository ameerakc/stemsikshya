/**
 * Avatar Images Configuration
 * 
 * Home page testimonial avatar images.
 * Path: /public/avatars/
 * Spec: 100x100, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'avatars';

export const AVATAR_IMAGES = {
  anita: getImagePath(CATEGORY, 'anita.webp'),
  bradley: getImagePath(CATEGORY, 'bradley.webp'),
} as const;

export type AvatarImageKey = keyof typeof AVATAR_IMAGES;

// Home page testimonial data
export interface AvatarTestimonialData {
  key: AvatarImageKey;
  name: string;
  role: string;
  quote: string;
  image: string;
  avatar: string; // Alias for image for backward compatibility
}

export const AVATAR_TESTIMONIALS: AvatarTestimonialData[] = [
  {
    key: 'anita',
    name: 'Anita Sharma',
    role: 'Parent, Grade 5 Student',
    quote: 'STEM Sikshya has transformed my child\'s approach to technology. The instructors are amazing!',
    image: AVATAR_IMAGES.anita,
    avatar: AVATAR_IMAGES.anita,
  },
  {
    key: 'bradley',
    name: 'Bradley Gordon',
    role: 'Founder of Archin Studio',
    quote: 'The curriculum is world-class. Students learn real skills that prepare them for the future.',
    image: AVATAR_IMAGES.bradley,
    avatar: AVATAR_IMAGES.bradley,
  },
] as const;