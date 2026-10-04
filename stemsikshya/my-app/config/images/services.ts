/**
 * Service Images Configuration
 * 
 * Service detail and feature images.
 * Path: /public/services/
 * Spec: 440x560, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'services';

export const SERVICE_IMAGES = {
  coding: getImagePath(CATEGORY, 'coding.webp'),
  robotics: getImagePath(CATEGORY, 'robotics.webp'),
  ai: getImagePath(CATEGORY, 'ai.webp'),
  drone: getImagePath(CATEGORY, 'drone.webp'),
} as const;

export type ServiceImageKey = keyof typeof SERVICE_IMAGES;

// Service detail data
export interface ServiceData {
  key: ServiceImageKey;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  icon: string;
  features: string[];
  curriculum: string[];
  ageGroup: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price?: string;
}

export const SERVICES_DATA: ServiceData[] = [
  {
    key: 'coding',
    title: 'Coding & Programming',
    shortDescription: 'Learn to code with Scratch, Python, JavaScript, and more.',
    longDescription: 'Our comprehensive coding curriculum takes students from block-based programming to text-based languages. Students build games, websites, and applications while developing computational thinking skills.',
    image: SERVICE_IMAGES.coding,
    icon: 'code',
    features: [
      'Block-based coding (Scratch)',
      'Python programming fundamentals',
      'Web development (HTML/CSS/JS)',
      'Game development',
      'Mobile app basics',
      'Data structures & algorithms',
    ],
    curriculum: [
      'Module 1: Introduction to Programming',
      'Module 2: Variables & Data Types',
      'Module 3: Control Structures',
      'Module 4: Functions & Modules',
      'Module 5: Project Development',
    ],
    ageGroup: 'Ages 8-18',
    duration: '12 weeks',
    level: 'beginner',
    price: 'Starting at $299',
  },
  {
    key: 'robotics',
    title: 'Robotics & Engineering',
    shortDescription: 'Build and program robots using LEGO, Arduino, and custom kits.',
    longDescription: 'Hands-on robotics education combining mechanical engineering, electronics, and programming. Students design, build, and program robots for various challenges and competitions.',
    image: SERVICE_IMAGES.robotics,
    icon: 'bot',
    features: [
      'LEGO SPIKE Prime / EV3',
      'Arduino microcontrollers',
      'Sensor integration',
      'Motor control',
      'Competition preparation',
      'Custom robot design',
    ],
    curriculum: [
      'Module 1: Robotics Fundamentals',
      'Module 2: Mechanical Design',
      'Module 3: Programming Robots',
      'Module 4: Sensors & Actuators',
      'Module 5: Competition Robotics',
    ],
    ageGroup: 'Ages 10-18',
    duration: '16 weeks',
    level: 'intermediate',
    price: 'Starting at $399',
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence',
    shortDescription: 'Discover AI and machine learning through interactive projects.',
    longDescription: 'Introduction to artificial intelligence and machine learning concepts through hands-on projects. Students learn how AI works and build their own AI-powered applications.',
    image: SERVICE_IMAGES.ai,
    icon: 'brain',
    features: [
      'Machine learning basics',
      'Computer vision projects',
      'Natural language processing',
      'AI ethics & bias',
      'TensorFlow.js / Teachable Machine',
      'Real-world AI applications',
    ],
    curriculum: [
      'Module 1: What is AI?',
      'Module 2: Data & Training',
      'Module 3: Computer Vision',
      'Module 4: NLP Basics',
      'Module 5: AI Project',
    ],
    ageGroup: 'Ages 12-18',
    duration: '12 weeks',
    level: 'intermediate',
    price: 'Starting at $349',
  },
  {
    key: 'drone',
    title: 'Drone Technology',
    shortDescription: 'Learn to fly and program drones for photography and mapping.',
    longDescription: 'Comprehensive drone education covering flight safety, piloting skills, programming autonomous flights, and aerial photography/videography techniques.',
    image: SERVICE_IMAGES.drone,
    icon: 'drone',
    features: [
      'Flight safety & regulations',
      'Manual piloting skills',
      'Autonomous programming',
      'Aerial photography',
      'Photogrammetry & mapping',
      'Drone maintenance',
    ],
    curriculum: [
      'Module 1: Drone Basics & Safety',
      'Module 2: Flight Training',
      'Module 3: Programming Drones',
      'Module 4: Aerial Imaging',
      'Module 5: Advanced Applications',
    ],
    ageGroup: 'Ages 14-18',
    duration: '10 weeks',
    level: 'advanced',
    price: 'Starting at $449',
  },
] as const;