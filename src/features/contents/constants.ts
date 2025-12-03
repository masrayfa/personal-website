import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';

export const workProjects: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      title: 'Rayzen',
      desc: 'Modern design system',
      mediaUrl: './img/work/rayzen.png',
      techStack: ['typeScript', 'tauri', 'solidjs', 'rust'],
      url: 'https://smntcs.vercel.app/',
      category: 'desktop',
    },
  },
  {
    id: 2,
    metadata: {
      title: 'Netflix Clone',
      desc: 'Watch movies trailers',
      mediaUrl: './img/work/netflix-clone.png',
      techStack: ['typeScript', 'nextjs', 'tailwindcss'],
      url: 'https://netflix-clone-next-typescript-tailwind.vercel.app/login',
      category: 'web',
    },
  },
];

export const peripherals: ContentsCollectionsTypeSimplified[] = [
  {
    id: 1,
    metadata: {
      category: 'camera',
      peripheralName: 'zv-e10',
      // image_url: '/img/peripherals/camera-zv-e10.png',
      brand: 'sony',
    },
  },
  {
    id: 2,
    metadata: {
      category: 'audio',
      peripheralName: 'Rexus Sedna Headset',
      image_url: '/img/peripherals/headset-rexus-sedna.JPG',
      brand: 'rexus',
    },
  },
  {
    id: 3,
    metadata: {
      category: 'gamepad',
      peripheralName: 'Fantech WGP',
      image_url: '/img/peripherals/gamepad-fantech-wgp.JPG',
      brand: 'fantech',
    },
  },
  {
    id: 4,
    metadata: {
      category: 'lamp',
      peripheralName: 'IKEA BLÅSVERK',
      image_url: '/img/peripherals/lamp-IKEA-BLÅSVERK.JPG',
      brand: 'ikea',
    },
  },
  {
    id: 5,
    metadata: {
      category: 'keyboard',
      peripheralName: 'Keychron B1 Pro',
      image_url: '/img/peripherals/keyboard-keychron-b1-pro.JPG',
      brand: 'keychron',
    },
  },
  {
    id: 6,
    metadata: {
      category: 'audio',
      peripheralName: "old logitech (i don't know the type)",
      image_url: '/img/peripherals/audio-logitech.JPG',
      brand: 'logitech',
    },
  },
  {
    id: 7,
    metadata: {
      category: 'PC',
      peripheralName: 'my sheila',
      image_url: '/img/peripherals/pc-my-sheila.JPG',
      brand: 'custom-built',
    },
  },
  {
    id: 8,
    metadata: {
      category: 'Desk',
      peripheralName: 'Fantech WS311',
      image_url: '/img/peripherals/desk-fantech-WS311.JPG',
      brand: 'fantech',
    },
  },
  {
    id: 9,
    metadata: {
      category: 'audio',
      peripheralName: 'Focusrite Scarlett Solo',
      image_url: '/img/peripherals/audio-focusrite-scarlett-solo.JPG',
      brand: 'focusrite',
    },
  },
  {
    id: 10,
    metadata: {
      category: 'cleaner',
      peripheralName: 'cleaner i dont know',
      image_url: '/img/peripherals/cleaner.JPG',
      brand: 'unknown',
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
      allTimeReason:
        'almost every movie i watch from him is a masterpiece. be it oppenheimer, interstellar, inception, dunkirk, and most importantly the dark knight trilogy.',
      image_url: '/img/directors/nolan.jpg',
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
      image_url: '/img/directors/gunn.jpg',
      allTimeReason:
        'i love his style of storytelling for underdog characters. be it in guardians of the galaxy, the suicide squad, peacemaker. Lastly, he is a director (CEO) of all DC Studios movies.',
    },
  },
  {
    id: 5,
    metadata: {
      category: 'movies',
      allTimeFavName: 'Inglorious Basterds',
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
      allTimeFavName: 'Moonrise Kingdom',
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
        "i resonated with the characters struggle that no matter how much we want the best for our significant other, sometimes we simply can't.",
      reviewLink: '/reviews/1',
    },
  },
  {
    id: 8,
    metadata: {
      category: 'movies',
      allTimeFavName: 'Whiplash',
      image_url: '/img/movies/whiplash.png',
      allTimeReason:
        'feels like unorthodox tense music film. it was tiring a** movie to follow because the intensity on every scene but it left me marks to be better at my craft.',
      reviewLink: '/reviews/1',
    },
  },
  {
    id: 9,
    metadata: {
      category: 'director',
      allTimeFavName: 'Denis Villeneuve',
      allTimeReason: 'made me fall in love with dune and bladerunner 2049',
      image_url: '/img/directors/denis.jpg',
    },
  },
  {
    id: 10,
    metadata: {
      category: 'director',
      allTimeFavName: 'Yandy Laurens',
      allTimeReason:
        'mas yandy membuat cerita yang sangat dekat dengan kehidupan menjadi lebih hangat',
      image_url: '/img/directors/yandy.jpg',
    },
  },
];
