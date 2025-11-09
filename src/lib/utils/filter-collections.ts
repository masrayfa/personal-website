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

    if(activeFilters.reviewType && activeFilters.reviewType.length > 0) {
      const itemReviewType = item.metadata.reviewType;
      const hasReviewType = activeFilters.reviewType.some((selectedType) =>
        itemReviewType?.includes(selectedType)
      );
      if(!hasReviewType) return false;
    }

    // Apply genre filter (OR logic - matches ANY selected genre)
    if (activeFilters.genre && activeFilters.genre.length > 0) {
      const itemGenres = item.metadata.genre || [];
      const hasAnyGenre = activeFilters.genre.some((selectedGenre) =>
        itemGenres.includes(selectedGenre),
      );
      if (!hasAnyGenre) return false;
    }

    // Apply mood filter (OR logic - matches ANY selected mood)
    if (activeFilters.mood && activeFilters.mood.length > 0) {
      const itemMoods = item.metadata.mood || [];
      const hasAnyMood = activeFilters.mood.some((selectedMood) =>
        itemMoods.includes(selectedMood),
      );
      if (!hasAnyMood) return false;
    }

    // Apply status filter (filmography)
    if (activeFilters.status && activeFilters.status.length > 0) {
      const itemStatus = item.metadata.status;
      const hasStatus = activeFilters.status.includes(itemStatus || '');
      if (!hasStatus) return false;
    }

    // Apply region filter (filmography - OR logic)
    if (activeFilters.region && activeFilters.region.length > 0) {
      const itemRegions = item.metadata.region || [];
      const hasAnyRegion = activeFilters.region.some((selectedRegion) =>
        itemRegions.includes(selectedRegion),
      );
      if (!hasAnyRegion) return false;
    }

    // Apply subject filter (filmography - OR logic)
    if (activeFilters.subject && activeFilters.subject.length > 0) {
      const itemSubjects = item.metadata.subject || [];
      const hasAnySubject = activeFilters.subject.some((selectedSubject) =>
        itemSubjects.includes(selectedSubject),
      );
      if (!hasAnySubject) return false;
    }

    // Apply visual style filter (filmography - OR logic)
    if (activeFilters.visualStyle && activeFilters.visualStyle.length > 0) {
      const itemVisualStyles = item.metadata.visualStyle || [];
      const hasAnyVisualStyle = activeFilters.visualStyle.some((selectedStyle) =>
        itemVisualStyles.includes(selectedStyle),
      );
      if (!hasAnyVisualStyle) return false;
    }

    // Apply technical filter (filmography - OR logic)
    if (activeFilters.technical && activeFilters.technical.length > 0) {
      const itemTechnicals = item.metadata.technical || [];
      const hasAnyTechnical = activeFilters.technical.some((selectedTech) =>
        itemTechnicals.includes(selectedTech),
      );
      if (!hasAnyTechnical) return false;
    }

    // Apply year filter (filmography - OR logic)
    if (activeFilters.year && activeFilters.year.length > 0) {
      const itemYear = item.metadata.year;
      const hasYear = activeFilters.year.includes(itemYear || 0);
      if (!hasYear) return false;
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
