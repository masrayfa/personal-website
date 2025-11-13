import { useEffect } from 'react';
import { useFilterStore } from '@/stores/filter-store';
import { FilterPill } from '../components/filter-pill';
import { FilterSection } from '../components/filter-section';
import { filterCollections } from '@/lib/utils/filter-collections';
import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';
import { workProjects } from '@/features/contents/constants';

const TECH_STACK_OPTIONS = [
  { label: 'TypeScript', value: 'typeScript' },
  { label: 'Tauri', value: 'tauri' },
  { label: 'SolidJS', value: 'solidjs' },
  { label: 'Rust', value: 'rust' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
];

const CATEGORY_OPTIONS = [
  { label: 'Web', value: 'web' },
  { label: 'App', value: 'app' },
  { label: 'Desktop', value: 'desktop' },
  { label: 'Product', value: 'product' },
  { label: 'Brand', value: 'brand' },
];

const WorkFilter = () => {
  const {
    getActiveFilters,
    setFilteredCollections,
    clearAllFilters,
    toggleTechStackFilter,
    toggleCategoryFilter,
  } = useFilterStore();

  const activeFilters = getActiveFilters('work');

  useEffect(() => {
    const filtered = filterCollections(
      workProjects,
      'simplified',
      activeFilters
    );
    setFilteredCollections(
      'work',
      filtered as ContentsCollectionsTypeSimplified[]
    );
  }, [activeFilters, setFilteredCollections]);

  const handleClearAll = () => {
    clearAllFilters('work');
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

      <FilterSection title="By Category">
        {CATEGORY_OPTIONS.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.category?.includes(option.value) || false}
            onClick={() => toggleCategoryFilter('work', option.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="By Tech Stack">
        {TECH_STACK_OPTIONS.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.techStack?.includes(option.value) || false}
            onClick={() => toggleTechStackFilter('work', option.value)}
          />
        ))}
      </FilterSection>
    </div>
  );
};

export default WorkFilter;
