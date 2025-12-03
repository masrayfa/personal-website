import { MDXProps } from 'mdx/types';
import { JSX } from 'react';

type ContentCollectionsMetadata = {
  // Blog
  // // Short stories
  title?: string;
  desc?: string;
  date?: string;
  image_url?: string;
  likes?: number;
  genre?: string[];
  mood?: string[];

  // Reviews
  reviewType?: string[];

  // Filmography specific fields
  status?: 'dream' | 'captured';
  region?: string[];
  subject?: string[];
  visualStyle?: string[];
  technical?: string[];
  year?: number;

  // All times fav
  category?: string;
  allTimeFavName?: string;
  allTimeReason?: string;
  reviewLink?: string;

  // Peripherals
  peripheralName?: string;
  brand?: string;

  // Work Projects
  techStack?: string[];
  mediaUrl?: string;
  url?: string;
  mediaType?: 'image' | 'video';
  // // Canvas colors for videos
  canvasColors?: [number, number, number][];
};

export type ContentsCollectionsType = {
  id: number;
  component?: (props: MDXProps) => JSX.Element;
  metadata: ContentCollectionsMetadata;
};

export type ContentsCollectionsTypeSimplified = {
  id: number;
  metadata: ContentCollectionsMetadata;
};
