import { create } from "zustand";
import { ContentsCollectionsType } from "@/lib/types/post-collections-type";

/**
 * Filter configuration for each widget type
 * Defines what filters are available and their possible values
 */
export type FilterConfig = {
  genre?: string[];
  mood?: string[];
  // Future filters (disabled for now):
  // likes?: number;
  // claps?: number;
};

/**
 * Active filters state for a specific widget
 */
export type ActiveFilters = {
  genre?: string | null;
  mood?: string | null;
  // Future filters:
  // likes?: number | null;
  // claps?: number | null;
};

/**
 * Widget-specific filter state
 */
type WidgetFilterState = {
  activeFilters: ActiveFilters;
  filteredCollections: ContentsCollectionsType[];
};

/**
 * Global filter store state
 */
type FilterStore = {
  // Store filter state for each widget by widgetId
  widgetFilters: Record<string, WidgetFilterState>;

  // Actions
  setFilter: (
    widgetId: WidgetType,
    filterKey: keyof ActiveFilters,
    value: string | number | null,
  ) => void;

  clearFilter: (widgetId: WidgetType, filterKey: keyof ActiveFilters) => void;

  clearAllFilters: (widgetId: WidgetType) => void;

  setFilteredCollections: (
    widgetId: WidgetType,
    collections: ContentsCollectionsType[],
  ) => void;

  getActiveFilters: (widgetId: WidgetType) => ActiveFilters;

  getFilteredCollections: (widgetId: WidgetType) => ContentsCollectionsType[];
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  widgetFilters: {},

  setFilter: (widgetId, filterKey, value) => {
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: {
          ...state.widgetFilters[widgetId],
          activeFilters: {
            ...state.widgetFilters[widgetId]?.activeFilters,
            [filterKey]: value,
          },
        },
      },
    }));
  },

  clearFilter: (widgetId, filterKey) => {
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: {
          ...state.widgetFilters[widgetId],
          activeFilters: {
            ...state.widgetFilters[widgetId]?.activeFilters,
            [filterKey]: null,
          },
        },
      },
    }));
  },

  clearAllFilters: (widgetId) => {
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: {
          ...state.widgetFilters[widgetId],
          activeFilters: {},
        },
      },
    }));
  },

  setFilteredCollections: (widgetId, collections) => {
    set((state) => ({
      widgetFilters: {
        ...state.widgetFilters,
        [widgetId]: {
          ...state.widgetFilters[widgetId],
          activeFilters: state.widgetFilters[widgetId]?.activeFilters || {},
          filteredCollections: collections,
        },
      },
    }));
  },

  getActiveFilters: (widgetId) => {
    return get().widgetFilters[widgetId]?.activeFilters || {};
  },

  getFilteredCollections: (widgetId) => {
    return get().widgetFilters[widgetId]?.filteredCollections || [];
  },
}));
