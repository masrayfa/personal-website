import { create } from "zustand";
import { ContentsCollectionsType } from "@/lib/types/post-collections-type";

/**
 * Filter configuration for each widget type
 * Defines what filters are available and their possible values
 */
export type FilterConfig = {
  genre?: string[];
  mood?: string[];
  // Filmography filters
  status?: string[];
  region?: string[];
  subject?: string[];
  visualStyle?: string[];
  technical?: string[];
  year?: number[];
  // Future filters (disabled for now):
  // likes?: number;
  // claps?: number;
};

/**
 * Active filters state for a specific widget
 */
export type ActiveFilters = {
  // Blog filters
  // // Short Stories
  genre?: string[] | null;
  mood?: string[] | null;
  // Reviews filters
  reviewType?: string[] | null;
  // Filmography filters
  status?: string[] | null;
  region?: string[] | null;
  subject?: string[] | null;
  visualStyle?: string[] | null;
  technical?: string[] | null;
  year?: number[] | null;
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
    value: string | number | string[] | null,
  ) => void;

  toggleReviewTypeFilter: (widgetId: WidgetType, reviewType: string) => void;

  toggleGenreFilter: (widgetId: WidgetType, genre: string) => void;

  toggleMoodFilter: (widgetId: WidgetType, mood: string) => void;

  toggleStatusFilter: (widgetId: WidgetType, status: string) => void;

  toggleRegionFilter: (widgetId: WidgetType, region: string) => void;

  toggleSubjectFilter: (widgetId: WidgetType, subject: string) => void;

  toggleVisualStyleFilter: (widgetId: WidgetType, visualStyle: string) => void;

  toggleTechnicalFilter: (widgetId: WidgetType, technical: string) => void;

  toggleYearFilter: (widgetId: WidgetType, year: number) => void;

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

  toggleReviewTypeFilter: (widgetId, reviewType) => {
    set((state) => {
      const currentReviewTypes =
        state.widgetFilters[widgetId]?.activeFilters?.reviewType || [];
      const newReviewTypes = currentReviewTypes.includes(reviewType)
        ? currentReviewTypes.filter((g) => g !== reviewType) 
        : [...currentReviewTypes, reviewType]; 

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              reviewType: newReviewTypes.length > 0 ? newReviewTypes : null,
            },
          },
        },
      };
    });
  },

  toggleGenreFilter: (widgetId, genre) => {
    set((state) => {
      const currentGenres =
        state.widgetFilters[widgetId]?.activeFilters?.genre || [];
      const newGenres = currentGenres.includes(genre)
        ? currentGenres.filter((g) => g !== genre) // Remove if exists
        : [...currentGenres, genre]; // Add if doesn't exist

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              genre: newGenres.length > 0 ? newGenres : null,
            },
          },
        },
      };
    });
  },

  toggleMoodFilter: (widgetId, mood) => {
    set((state) => {
      const currentMood =
        state.widgetFilters[widgetId]?.activeFilters?.mood || [];
      const newMoods = currentMood.includes(mood)
        ? currentMood.filter((currMood) => currMood !== mood)
        : [...currentMood, mood];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              mood: newMoods.length > 0 ? newMoods : null,
            },
          },
        },
      };
    });
  },

  toggleStatusFilter: (widgetId, status) => {
    set((state) => {
      const currentStatus =
        state.widgetFilters[widgetId]?.activeFilters?.status || [];
      const newStatus = currentStatus.includes(status)
        ? currentStatus.filter((s) => s !== status)
        : [...currentStatus, status];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              status: newStatus.length > 0 ? newStatus : null,
            },
          },
        },
      };
    });
  },

  toggleRegionFilter: (widgetId, region) => {
    set((state) => {
      const currentRegion =
        state.widgetFilters[widgetId]?.activeFilters?.region || [];
      const newRegion = currentRegion.includes(region)
        ? currentRegion.filter((r) => r !== region)
        : [...currentRegion, region];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              region: newRegion.length > 0 ? newRegion : null,
            },
          },
        },
      };
    });
  },

  toggleSubjectFilter: (widgetId, subject) => {
    set((state) => {
      const currentSubject =
        state.widgetFilters[widgetId]?.activeFilters?.subject || [];
      const newSubject = currentSubject.includes(subject)
        ? currentSubject.filter((s) => s !== subject)
        : [...currentSubject, subject];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              subject: newSubject.length > 0 ? newSubject : null,
            },
          },
        },
      };
    });
  },

  toggleVisualStyleFilter: (widgetId, visualStyle) => {
    set((state) => {
      const currentVisualStyle =
        state.widgetFilters[widgetId]?.activeFilters?.visualStyle || [];
      const newVisualStyle = currentVisualStyle.includes(visualStyle)
        ? currentVisualStyle.filter((v) => v !== visualStyle)
        : [...currentVisualStyle, visualStyle];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              visualStyle: newVisualStyle.length > 0 ? newVisualStyle : null,
            },
          },
        },
      };
    });
  },

  toggleTechnicalFilter: (widgetId, technical) => {
    set((state) => {
      const currentTechnical =
        state.widgetFilters[widgetId]?.activeFilters?.technical || [];
      const newTechnical = currentTechnical.includes(technical)
        ? currentTechnical.filter((t) => t !== technical)
        : [...currentTechnical, technical];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              technical: newTechnical.length > 0 ? newTechnical : null,
            },
          },
        },
      };
    });
  },

  toggleYearFilter: (widgetId, year) => {
    set((state) => {
      const currentYear =
        state.widgetFilters[widgetId]?.activeFilters?.year || [];
      const newYear = currentYear.includes(year)
        ? currentYear.filter((y) => y !== year)
        : [...currentYear, year];

      return {
        widgetFilters: {
          ...state.widgetFilters,
          [widgetId]: {
            ...state.widgetFilters[widgetId],
            activeFilters: {
              ...state.widgetFilters[widgetId]?.activeFilters,
              year: newYear.length > 0 ? newYear : null,
            },
          },
        },
      };
    });
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
