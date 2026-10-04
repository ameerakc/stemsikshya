/**
 * Team Images Configuration
 * 
 * Team member profile photos.
 * Path: /public/team/
 * Spec: 1000x1060, WebP
 * 
 * @packageDocumentation
 */

import { getImagePath } from './utils';
import type { ImageCategory } from './types';

const CATEGORY: ImageCategory = 'team';

export const TEAM_IMAGES = {
  member1: getImagePath(CATEGORY, 'member-1.webp'),
  member2: getImagePath(CATEGORY, 'member-2.webp'),
  member3: getImagePath(CATEGORY, 'member-3.webp'),
  member4: getImagePath(CATEGORY, 'member-4.webp'),
} as const;

export type TeamImageKey = keyof typeof TEAM_IMAGES;

// Team member data
export interface TeamMemberData {
  key: TeamImageKey;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  expertise: string[];
}

export const TEAM_DATA: TeamMemberData[] = [
  {
    key: 'member1',
    name: 'Dr. Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'PhD in Computer Science with 15+ years in EdTech. Passionate about making STEM accessible to all.',
    image: TEAM_IMAGES.member1,
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
    },
    expertise: ['AI Education', 'Curriculum Design', 'EdTech Strategy'],
  },
  {
    key: 'member2',
    name: 'Prof. Michael Chen',
    role: 'Head of Robotics',
    bio: 'Robotics engineer and educator. Led multiple teams to international robotics competitions.',
    image: TEAM_IMAGES.member2,
    social: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
    },
    expertise: ['Robotics', 'Embedded Systems', 'Competition Coaching'],
  },
  {
    key: 'member3',
    name: 'Emily Rodriguez',
    role: 'Lead Coding Instructor',
    bio: 'Full-stack developer turned educator. Specializes in making coding fun for young learners.',
    image: TEAM_IMAGES.member3,
    social: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      github: 'https://github.com/emilyrodriguez',
    },
    expertise: ['Python', 'JavaScript', 'Game Development', 'Web Development'],
  },
  {
    key: 'member4',
    name: 'David Kim',
    role: 'Drone Technology Specialist',
    bio: 'Certified drone pilot and software engineer. Develops autonomous drone applications.',
    image: TEAM_IMAGES.member4,
    social: {
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim',
    },
    expertise: ['Drone Programming', 'Computer Vision', 'Aerial Mapping'],
  },
] as const;