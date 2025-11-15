import { LayoutType } from '@/stores/layout-store';

export interface LayoutConfig {
  type: LayoutType;
  label: string;
  icon: 'grid-2' | 'grid-3' | 'grid-4' | 'list';
  // Responsive grid classes
  gridClasses?: string;
  // For list layouts
  itemClasses?: string;
}

export const layoutConfigs: Record<LayoutType, LayoutConfig> = {
  'grid-2': {
    type: 'grid-2',
    label: '2 Columns',
    icon: 'grid-2',
    gridClasses: 'grid grid-cols-1 md:grid-cols-2 gap-3',
  },
  'grid-3': {
    type: 'grid-3',
    label: '3 Columns',
    icon: 'grid-3',
    gridClasses: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3',
  },
  'grid-4': {
    type: 'grid-4',
    label: '4 Columns',
    icon: 'grid-4',
    gridClasses: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3',
  },
  'list-comfortable': {
    type: 'list-comfortable',
    label: 'Comfortable List',
    icon: 'list',
    itemClasses: 'flex flex-col gap-5',
  },
  'list-compact': {
    type: 'list-compact',
    label: 'Compact List',
    icon: 'list',
    itemClasses: 'flex flex-col gap-3',
  },
};

// Available layouts per widget type
export const widgetLayoutOptions: Record<
  string,
  LayoutType[]
> = {
  blog: ['list-comfortable', 'list-compact', 'grid-2', 'grid-3'],
  work: ['grid-2', 'grid-3', 'grid-4', 'list-comfortable'],
  peripherals: ['grid-2', 'grid-3', 'grid-4', 'list-comfortable'],
  'short-stories': ['list-comfortable', 'list-compact', 'grid-2', 'grid-3'],
  filmography: ['grid-2', 'grid-3', 'grid-4', 'list-comfortable'],
  reviews: ['grid-2', 'grid-3', 'list-comfortable', 'list-compact'],
  'all-time-fav': ['grid-2', 'grid-3', 'grid-4', 'list-comfortable'],
  love: ['list-comfortable', 'list-compact', 'grid-2'],
};
