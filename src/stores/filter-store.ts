import { create } from 'zustand';
import { WidgetType } from '@/lib/types/widget-type';

/**
 * Active filters state for a specific widget
 */
export type ActiveFilters = {
  // Blog / Short Stories / Reviews filters
  genre?: string[] | null;
  mood?: string[] | null;
  reviewType?: string[] | null;

  // Filmography filters
  status?: string[] | null;
  region?: string[] | null;
  subject?: string[] | null;
  visualStyle?: string[] | null;
  technical?: string[] | null;
  year?: number[] | null;

  // All time fav
  category?: string[] | null;
  allTimeFavName?: string;

  // Peripherals
  brand?: string[] | null;

  // Work Projects
  techStack?: string[] | null;
  mediaUrl?: string;
  url?: string;
  mediaType?: 'image' | 'video';
  canvasColors?: [number, number, number][];

  // Content version filter (for blog, short-stories, reviews)
  contentVersion?: 'short' | 'long' | null;
};

/**
 * Global filter store state, keyed by widgetId
 */
type FilterStore = {
  widgetFilters: Record<string, ActiveFilters>;

  setFilter: (
    widgetId: WidgetType,
    filterKey: keyof ActiveFilters,
    value: string | number | string[] | null
  ) => void;

  toggleFilter: (
    widgetId: WidgetType,
    filterKey: keyof ActiveFilters,
    value: string | number
  ) => void;

  setContentVersion: (widgetId: WidgetType, version: 'short' | 'long') => void;

  clearFilter: (widgetId: WidgetType, filterKey: keyof ActiveFilters) => void;

  clearAllFilters: (widgetId: WidgetType) => void;

  getActiveFilters: (widgetId: WidgetType) => ActiveFilters;
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  widgetFilters: {},

  setFilter: (widgetId, filterKey, value) =>
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: { ...state.widgetFilters[widgetId], [filterKey]: value },
      },
    })),

  toggleFilter: (widgetId, filterKey, value) =>
    set((state) => {
      const current = (state.widgetFilters[widgetId]?.[filterKey] ?? []) as Array<
        string | number
      >;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...(state.widgetFilters[widgetId] as ActiveFilters | undefined),
            [filterKey]: next.length > 0 ? next : null,
          } as ActiveFilters,
        },
      };
    }),

  setContentVersion: (widgetId, version) =>
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: {
          ...state.widgetFilters[widgetId],
          contentVersion: version,
        },
      },
    })),

  clearFilter: (widgetId, filterKey) =>
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: { ...state.widgetFilters[widgetId], [filterKey]: null },
      },
    })),

  clearAllFilters: (widgetId) =>
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: {},
      },
    })),

  getActiveFilters: (widgetId) => get().widgetFilters[widgetId] || {},
}));