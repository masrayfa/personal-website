import { ContentsCollectionsType } from '@/lib/types/post-collections-type';
import BonnGermany from './bonn-germany.mdx';
import AustraliaCoast from './australia-coast.mdx';
import AmsterdamCanals from './amsterdam-canals.mdx';
import NetherlandsCountryside from './netherlands-countryside.mdx';
import BandungLocal from './bandung-local.mdx';

const FilmographyCollections: ContentsCollectionsType[] = [
  {
    id: 1,
    component: BonnGermany,
    metadata: {
      title: 'Bonn, Germany',
      desc: 'The city of Beethoven - historic architecture meets Rhine River serenity',
      date: '2025-06-15',
      status: 'dream',
      region: ['Europe', 'Western Europe'],
      subject: ['architecture', 'culture', 'nature'],
      visualStyle: ['cinematic', 'moody'],
      technical: ['4K', 'digital'],
      year: 2025,
    },
  },
  {
    id: 2,
    component: AustraliaCoast,
    metadata: {
      title: 'Australian Coastline',
      desc: 'Where the ocean meets the sky - capturing the raw beauty of Australian beaches',
      date: '2025-08-20',
      status: 'dream',
      region: ['Oceania'],
      subject: ['nature', 'landscape'],
      visualStyle: ['cinematic', 'vibrant'],
      technical: ['4K', 'drone', 'digital'],
      year: 2025,
    },
  },
  {
    id: 3,
    component: AmsterdamCanals,
    metadata: {
      title: 'Amsterdam Canals',
      desc: 'Venice of the North - iconic canals and Dutch architecture',
      date: '2025-04-10',
      status: 'dream',
      region: ['Europe', 'Western Europe'],
      subject: ['architecture', 'culture', 'street'],
      visualStyle: ['vintage', 'vibrant'],
      technical: ['4K', 'digital'],
      year: 2025,
    },
  },
  {
    id: 4,
    component: NetherlandsCountryside,
    metadata: {
      title: 'Netherlands Countryside',
      desc: 'Windmills, tulips, and endless horizons of pastoral Dutch beauty',
      date: '2025-04-25',
      status: 'dream',
      region: ['Europe', 'Western Europe'],
      subject: ['nature', 'landscape'],
      visualStyle: ['minimalist', 'vibrant'],
      technical: ['4K', 'drone', 'digital'],
      year: 2025,
    },
  },
  {
    id: 5,
    component: BandungLocal,
    metadata: {
      title: 'Bandung - Home Base',
      desc: 'My city through my lens - Art Deco architecture and creative energy',
      image_url: '/w-harry.jpg',
      date: '2024-12-01',
      status: 'captured',
      region: ['Asia', 'Southeast Asia'],
      subject: ['architecture', 'culture', 'street', 'nature'],
      visualStyle: ['cinematic', 'moody', 'vibrant'],
      technical: ['4K', 'digital'],
      year: 2024,
    },
  },
  // {
  //   id: 6,
  //   component: BandungLocal,
  //   metadata: {
  //     title: 'Bandung - Home Base',
  //     desc: 'My city through my lens - Art Deco architecture and creative energy',
  //     date: '2024-12-01',
  //     status: 'captured',
  //     region: ['Asia', 'Southeast Asia'],
  //     subject: ['architecture', 'culture', 'street', 'nature'],
  //     visualStyle: ['cinematic', 'moody', 'vibrant'],
  //     technical: ['4K', 'digital'],
  //     year: 2024,
  //   },
  // },
  // {
  //   id: 7,
  //   component: BandungLocal,
  //   metadata: {
  //     title: 'Bandung - Home Base',
  //     desc: 'My city through my lens - Art Deco architecture and creative energy',
  //     date: '2024-12-01',
  //     status: 'captured',
  //     region: ['Asia', 'Southeast Asia'],
  //     subject: ['architecture', 'culture', 'street', 'nature'],
  //     visualStyle: ['cinematic', 'moody', 'vibrant'],
  //     technical: ['4K', 'digital'],
  //     year: 2024,
  //   },
  // },
];

export default FilmographyCollections;
