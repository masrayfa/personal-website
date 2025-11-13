import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';

export const workProjects: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      title: 'Rayzen',
      desc: 'Modern design system',
      mediaUrl: './w-edna.jpg',
      techStack: ['TypeScript', 'Tauri', 'SolidJS', 'Rust'],
      url: 'https://www.youtube.com/watch?v=fmHP7pSNhk0',
      category: 'Brand',
    },
  },
  {
    id: 2,
    metadata: {
      title: 'Rayzen',
      desc: 'Modern design system',
      mediaUrl: './w-harry.jpg',
      techStack: ['TypeScript', 'Tauri', 'SolidJS', 'Rust'],
      url: 'https://www.youtube.com/watch?v=fmHP7pSNhk0',
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
];

export const wallOfFavsCollections: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      category: 'movies',
      allTimeFavName: 'Satu Kakak 7 Keponakan',
      image_url: '/img/movies/sakatupo.png',
      allTimeReason:
        'i felt warm from the writings that talks about family bonds, love, and personal struggles as a son.',
      reviewLink: '/reviews/2',
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
      allTimeReason:
        'i feel the rawness of becoming a hero through his journey. love the detective side and grounded version of a batman. Cinematic at its finest 🤌',
      image_url: '/img/movies/the-batman-2022.png',
      reviewLink: '/reviews/3',
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
      allTimeFavName: 'inglorious basterds',
      image_url: '/img/movies/inglorious-basterds.png',
      allTimeReason:
        'the characters depth. the directing style. the script. the picture',
      reviewLink: '/reviews/4',
    },
  },
  {
    id: 6,
    metadata: {
      category: 'movies',
      allTimeFavName: 'moonrise kingdom',
      image_url: '/img/movies/moonrise-kingdom.png',
      allTimeReason:
        'a wes anderson movie that inspires me to make film in junior high. it influenced my aesthetic film making style till now.',
    },
  },
  {
    id: 7,
    metadata: {
      category: 'movies',
      allTimeFavName: 'SORE',
      image_url: '/img/movies/sore.png',
      allTimeReason:
        'i resonated with the characters struggle that as much as we want to change our partner, we cannot.',
      reviewLink: '/reviews/1',
    },
  },
];
