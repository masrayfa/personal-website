import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';

export const workProjects: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      title: 'Beacon',
      desc: 'A beautiful Linear portal for clients',
      techStack: ['React', 'TypeScript', 'Tailwind'],
      mediaUrl: '/images/beacon-preview.png',
      url: 'https://www.youtube.com/watch?v=fmHP7pSNhk0',
      mediaType: 'image' as const,
      category: 'Brand / Product / Growth',
    },
  },
  {
    id: 2,
    metadata: {
      title: 'Antigravity A1',
      desc: 'Next-gen drone technology',
      techStack: ['Three.js', 'WebGL', 'Node.js'],
      mediaUrl: '/images/antigravity-preview.jpg',
      url: 'https://www.youtube.com/watch?v=fmHP7pSNhk0',
      mediaType: 'image' as const,
      category: 'Product / Growth',
    },
  },
  {
    id: 3,
    metadata: {
      title: 'Rayzen',
      desc: 'Modern design system',
      techStack: ['TypeScript', 'Tauri', 'SolidJS', 'Rust'],
      url: 'https://www.youtube.com/watch?v=fmHP7pSNhk0',
      canvasColors: [
        [255, 99, 71],
        [255, 140, 0],
      ],
      category: 'Brand',
    },
  },
];

export const peripherals: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      category: 'camera',
      allTimeFavName: 'zv-e10',
    },
  },
  {
    id: 2,
    metadata: {
      category: 'audio',
      allTimeFavName: 'Rexus Sedna',
    },
  },
  {
    id: 3,
    metadata: {
      category: 'gamepad',
      allTimeFavName: 'Fantech WGP',
    },
  },
  {
    id: 4,
    metadata: {
      category: 'lamp',
      allTimeFavName: 'IKEA BLÅSVERK',
    },
  },
  {
    id: 5,
    metadata: {
      category: 'gamepad',
      allTimeFavName: 'Fantech WGP',
    },
  },
  {
    id: 6,
    metadata: {
      category: 'gamepad',
      allTimeFavName: 'Fantech WGP',
    },
  },
  {
    id: 7,
    metadata: {
      category: 'fragrance',
      allTimeFavName: 'Metaverse',
    },
  },
];

export const wallOfFavsCollections: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      category: 'movies',
      allTimeFavName: 'Satu Kakak 7 Keponakan',
    },
  },
  {
    id: 2,
    metadata: {
      category: 'director',
      allTimeFavName: 'Christopher Nolan',
    },
  },
  {
    id: 3,
    metadata: {
      category: 'movies',
      allTimeFavName: 'The Batman',
    },
  },
  {
    id: 4,
    metadata: {
      category: 'director',
      allTimeFavName: 'James Gunn',
    },
  },
  {
    id: 5,
    metadata: {
      category: 'movies',
      allTimeFavName: 'minari',
    },
  },
  {
    id: 6,
    metadata: {
      category: 'movies',
      allTimeFavName: 'oppenheimer',
    },
  },
  {
    id: 7,
    metadata: {
      category: 'movies',
      allTimeFavName: 'SORE',
    },
  },
];
