import { useEffect, useMemo } from 'react';
import { useFilterStore } from '@/stores/filter-store';
import { FilterPill } from '../components/filter-pill';
import { FilterSection } from '../components/filter-section';
import { filterCollections } from '@/lib/utils/filter-collections';
import { wallOfFavsCollections } from '@/features/contents/constants';
import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';

const AllTimeFavFilter = () => {
  const {
    getActiveFilters,
    toggleCategoryFilter,
    setFilteredCollections,
    clearAllFilters,
    clearFilter,
  } = useFilterStore();

  const activeFilters = getActiveFilters('all-time-fav');

  // Apply filters whenever active filters change
  useEffect(() => {
    const filtered = filterCollections(
      wallOfFavsCollections,
      'simplified',
      activeFilters
    );
    setFilteredCollections(
      'all-time-fav',
      filtered as ContentsCollectionsTypeSimplified[]
    );
  }, [activeFilters, setFilteredCollections]);

  // Get unique categories from wall of favs data
  const categoryOptions = useMemo(() => {
    const categories = new Set<string>();
    wallOfFavsCollections.forEach((item) => {
      if (item.metadata.category) {
        categories.add(item.metadata.category);
      }
    });
    return Array.from(categories)
      .sort()
      .map((category) => ({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        value: category,
      }));
  }, []);

  const handleCategoryClick = (category: string) => {
    toggleCategoryFilter('all-time-fav', category);
  };
  const handleClearAll = () => {
    clearAllFilters('all-time-fav');
  };

  const hasActiveFilters =
    activeFilters.category !== null && activeFilters.category !== undefined;

  return (
    <div className="space-y-6 w-full">
      {/* Header with clear all button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <FilterSection
        title="By Category"
        disabled={categoryOptions.length === 0}
      >
        {categoryOptions.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.category?.includes(option.value) || false}
            onClick={() => handleCategoryClick(option.value)}
            disabled={false}
          />
        ))}
      </FilterSection>
    </div>
  );
};

export default AllTimeFavFilter;
