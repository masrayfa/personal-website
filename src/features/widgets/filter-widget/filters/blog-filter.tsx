import { useFilterStore } from '@/stores/filter-store';
import { FilterPill } from '../components/filter-pill';
import { FilterSection } from '../components/filter-section';

const GENRE_OPTIONS = [
  { label: 'Mundane', value: 'mundane' },
  { label: 'Tech', value: 'tech' },
];

const BlogFilter = () => {
  const { toggleFilter, getActiveFilters, clearAllFilters } = useFilterStore();

  const activeFilters = getActiveFilters('blog');

  const handleGenreClick = (genre: string) => {
    toggleFilter('blog', 'genre', genre);
  };

  const handleClearAll = () => {
    clearAllFilters('blog');
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

export default BlogFilter;
