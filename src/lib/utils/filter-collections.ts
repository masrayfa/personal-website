import { ContentsCollectionsType } from "@/lib/types/post-collections-type";
import { ActiveFilters } from "@/stores/filter-store";

export function filterCollections(
  collections: ContentsCollectionsType[],
  activeFilters: ActiveFilters,
): ContentsCollectionsType[] {
  return collections.filter((item) => {
    // If no filters are active, return all items
    const hasActiveFilters = Object.values(activeFilters).some(
      (value) => value !== null && value !== undefined,
    );

    if (!hasActiveFilters) {
      return true;
    }

    // Apply genre filter
    if (activeFilters.genre) {
      const hasGenre = item.metadata.genre?.includes(activeFilters.genre);
      if (!hasGenre) return false;
    }

    // Apply mood filter (when implemented)
    if (activeFilters.mood) {
      // TODO: Implement mood filtering when metadata includes mood
      // const hasMood = item.metadata.mood?.includes(activeFilters.mood);
      // if (!hasMood) return false;
    }

    // Future filters (likes, claps) can be added here
    // if (activeFilters.likes) {
    //   if (item.metadata.likes < activeFilters.likes) return false;
    // }

    return true;
  });
}

/**
 * Extracts unique values for a specific filter from collections
 *
 * @param collections - The collection array to extract from
 * @param filterKey - The metadata key to extract (e.g., 'genre')
 * @returns Array of unique values
 *
 * @example
 * const genres = extractUniqueFilterValues(ReviewsMDsCollections, 'genre');
 * // Returns: ['action', 'drama', ...]
 */
export function extractUniqueFilterValues(
  collections: ContentsCollectionsType[],
  filterKey: keyof ContentsCollectionsType["metadata"],
): string[] {
  const values = collections.flatMap((item) => {
    const value = item.metadata[filterKey];
    if (Array.isArray(value)) {
      return value;
    }
    return value ? [String(value)] : [];
  });

  return Array.from(new Set(values));
}
