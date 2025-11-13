import { useEffect } from 'react';
import { useFilterStore } from '@/stores/filter-store';
import { FilterPill } from '../components/filter-pill';
import { FilterSection } from '../components/filter-section';
import ReviewsMDsCollections from '@/features/contents/reviews/md';
import { filterCollections } from '@/lib/utils/filter-collections';
import { ContentsCollectionsType } from '@/lib/types/post-collections-type';

const REVIEW_TYPE_OPTIONS = [
  { label: 'Movie', value: 'movie' },
  { label: 'Book', value: 'book' },
  { label: 'Music', value: 'music' },
  { label: 'Game', value: 'game' },
  { label: 'Tech', value: 'tech' },
  { label: 'Product', value: 'product' },
];

const GENRE_OPTIONS = [
  { label: 'Action', value: 'action' },
  { label: 'Drama', value: 'drama' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'Horror', value: 'horror' },
  { label: 'Sci-Fi', value: 'sci-fi' },
  { label: 'Romance', value: 'romance' },
];

const MOOD_OPTIONS = [
  { label: 'Warm', value: 'warm' },
  { label: 'Cold', value: 'cold' },
  { label: 'Depressed', value: 'depressed' },
  { label: 'Hopeful', value: 'hopeful' },
];

const ReviewsFilter = () => {
  const {
    getActiveFilters,
    setFilteredCollections,
    clearAllFilters,
    toggleGenreFilter,
    toggleMoodFilter,
    toggleReviewTypeFilter,
  } = useFilterStore();

  const activeFilters = getActiveFilters('reviews');

  // Apply filters whenever active filters change
  useEffect(() => {
    const filtered = filterCollections(
      ReviewsMDsCollections,
      'full',
      activeFilters
    );
    setFilteredCollections('reviews', filtered as ContentsCollectionsType[]);
  }, [activeFilters, setFilteredCollections]);

  const handleReviewTypeClick = (reviewType: string) => {
    toggleReviewTypeFilter('reviews', reviewType);
  };

  const handleGenreClick = (genre: string) => {
    toggleGenreFilter('reviews', genre);
  };

  const handleMoodClick = (mood: string) => {
    toggleMoodFilter('reviews', mood);
  };

  const handleClearAll = () => {
    clearAllFilters('reviews');
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value !== null && value !== undefined
  );

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

      {/* Review Type Filter */}
      <FilterSection title="By Review Type">
        {REVIEW_TYPE_OPTIONS.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.reviewType?.includes(option.value) || false}
            onClick={() => handleReviewTypeClick(option.value)}
          />
        ))}
      </FilterSection>

      {/* Genre Filter */}
      <FilterSection title="By Genre">
        {GENRE_OPTIONS.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.genre?.includes(option.value) || false}
            onClick={() => handleGenreClick(option.value)}
          />
        ))}
      </FilterSection>

      {/* Mood Filter */}
      <FilterSection title="By Mood">
        {MOOD_OPTIONS.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.mood?.includes(option.value) || false}
            onClick={() => handleMoodClick(option.value)}
          />
        ))}
      </FilterSection>

      {/* Disabled Filters - For Future Use */}
      <FilterSection title="By Engagement" disabled>
        <FilterPill
          label="Most Likes"
          value="likes"
          isActive={false}
          onClick={() => {}}
          disabled
        />
        <FilterPill
          label="Most Claps"
          value="claps"
          isActive={false}
          onClick={() => {}}
          disabled
        />
      </FilterSection>
    </div>
  );
};

export default ReviewsFilter;
