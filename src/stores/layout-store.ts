import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

  // Actions
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  syncSidebarsToScreenSize: (width: number) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      leftSidebarVisible: true,
      rightSidebarVisible: true,

      toggleLeftSidebar: () =>
        set((state) => ({
          leftSidebarVisible: !state.leftSidebarVisible,
        })),

      toggleRightSidebar: () =>
        set((state) => ({
          rightSidebarVisible: !state.rightSidebarVisible,
        })),

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