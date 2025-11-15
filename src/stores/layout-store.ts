import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LayoutType = 'grid-2' | 'grid-3' | 'grid-4' | 'list-comfortable' | 'list-compact';

export type WidgetId =
  | 'blog'
  | 'work'
  | 'peripherals'
  | 'short-stories'
  | 'filmography'
  | 'reviews'
  | 'all-time-fav'
  | 'love';

// Breakpoints for responsive behavior
export const BREAKPOINTS = {
  SMALL: 1024,  // < 1024px: both sidebars hidden
  MEDIUM: 1536, // 1024-1536px: right sidebar hidden
  // > 1536px: both sidebars visible
} as const;

// Helper to get responsive sidebar defaults based on window width
export const getResponsiveSidebarDefaults = (width: number) => {
  if (width < BREAKPOINTS.SMALL) {
    // Small screens: hide both
    return { left: false, right: false };
  } else if (width < BREAKPOINTS.MEDIUM) {
    // Medium screens: hide right only
    return { left: true, right: false };
  } else {
    // Large screens: show both
    return { left: true, right: true };
  }
};

interface LayoutState {
  // Sidebar visibility
  leftSidebarVisible: boolean;
  rightSidebarVisible: boolean;

  // Layout preferences per widget
  widgetLayouts: Record<WidgetId, LayoutType>;

  // Actions
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setWidgetLayout: (widgetId: WidgetId, layout: LayoutType) => void;
  getWidgetLayout: (widgetId: WidgetId) => LayoutType;
  syncSidebarsToScreenSize: (width: number) => void;
}

// Default layouts for each widget type
const defaultWidgetLayouts: Record<WidgetId, LayoutType> = {
  blog: 'list-comfortable',
  work: 'grid-3',
  peripherals: 'grid-4',
  'short-stories': 'list-comfortable',
  filmography: 'grid-3',
  reviews: 'grid-3',
  'all-time-fav': 'grid-4',
  love: 'list-comfortable',
};

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      leftSidebarVisible: true,
      rightSidebarVisible: true,
      widgetLayouts: defaultWidgetLayouts,

      toggleLeftSidebar: () =>
        set((state) => ({
          leftSidebarVisible: !state.leftSidebarVisible,
        })),

      toggleRightSidebar: () =>
        set((state) => ({
          rightSidebarVisible: !state.rightSidebarVisible,
        })),

      setWidgetLayout: (widgetId: WidgetId, layout: LayoutType) =>
        set((state) => ({
          widgetLayouts: {
            ...state.widgetLayouts,
            [widgetId]: layout,
          },
        })),

      getWidgetLayout: (widgetId: WidgetId) => {
        const state = get();
        return state.widgetLayouts[widgetId] || defaultWidgetLayouts[widgetId];
      },

      syncSidebarsToScreenSize: (width: number) => {
        const defaults = getResponsiveSidebarDefaults(width);
        set({
          leftSidebarVisible: defaults.left,
          rightSidebarVisible: defaults.right,
        });
      },
    }),
    {
      name: 'layout-preferences',
    }
  )
);
