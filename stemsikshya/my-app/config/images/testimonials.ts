/**
 * Testimonial Images Configuration
 * 
 * Images for the About page testimonials section.
 * Path: /public/testimonials/
 * Spec: 800x840, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'testimonials';

export const TESTIMONIAL_IMAGES = {
  anita: getImagePath(CATEGORY, 'anita.webp'),
  bradley: getImagePath(CATEGORY, 'bradley.webp'),
} as const;

export type TestimonialImageKey = keyof typeof TESTIMONIAL_IMAGES;

// Testimonial data with images
export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  photo: string;
  imageKey: TestimonialImageKey;
}

export const TESTIMONIALS_DATA: TestimonialData[] = [
  {
    quote:
      "STEM Sikshya's ability to make coding, robotics, and AI simple and exciting for my child stands out. It's something we placed a premium on. An institute with passionate, professional, and genuinely caring instructors. Recommend!",
    name: 'Anita Sharma',
    role: 'Parent, Grade 5 Student',
    photo: TESTIMONIAL_IMAGES.anita,
    imageKey: 'anita',
  },
  {
    quote:
      "STEM Sikshya's ability to make coding, robotics, and AI simple and exciting for my child stands out. It's something we placed a premium on. An institute with passionate, professional, and genuinely caring instructors. Recommend!",
    name: 'Bradley Gordon',
    role: 'Founder of Archin Studio',
    photo: TESTIMONIAL_IMAGES.bradley,
    imageKey: 'bradley',
  },
] as const;