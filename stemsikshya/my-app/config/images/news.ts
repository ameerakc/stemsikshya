/**
 * News Images Configuration
 * 
 * News article thumbnail images.
 * Path: /public/news/
 * Spec: 800x600, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'news';

export const NEWS_IMAGES = {
  news1: getImagePath(CATEGORY, 'news-1.webp'),
  news2: getImagePath(CATEGORY, 'news-2.webp'),
  news3: getImagePath(CATEGORY, 'news-3.webp'),
} as const;

export type NewsImageKey = keyof typeof NEWS_IMAGES;

// News article data with images
export interface NewsData {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageKey: NewsImageKey;
  category: string;
  readTime: string;
}

export const NEWS_DATA: NewsData[] = [
  {
    id: 1,
    title: 'STEM Sikshya Launches New AI Curriculum for Schools',
    excerpt: 'Our comprehensive AI curriculum is now available for grades 6-12, covering machine learning fundamentals, computer vision, and ethical AI.',
    date: '2024-03-15',
    image: NEWS_IMAGES.news1,
    imageKey: 'news1',
    category: 'Announcement',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Robotics Competition Winners Announced',
    excerpt: 'Students from partner schools showcased innovative robots at the regional STEM competition. Congratulations to all participants!',
    date: '2024-02-28',
    image: NEWS_IMAGES.news2,
    imageKey: 'news2',
    category: 'Events',
    readTime: '3 min read',
  },
  {
    id: 3,
    title: 'New Partnership with Leading Tech Companies',
    excerpt: 'STEM Sikshya partners with industry leaders to bring cutting-edge technology education to classrooms across the region.',
    date: '2024-01-20',
    image: NEWS_IMAGES.news3,
    imageKey: 'news3',
    category: 'Partnerships',
    readTime: '4 min read',
  },
] as const;