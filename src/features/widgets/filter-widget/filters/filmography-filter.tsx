import { useEffect, useMemo } from 'react';
import { useFilterStore } from '@/stores/filter-store';
import { FilterPill } from '../components/filter-pill';
import { FilterSection } from '../components/filter-section';
import { filterCollections } from '@/lib/utils/filter-collections';
import FilmographyCollections from '@/features/contents/filmography/md';
import { ContentsCollectionsType } from '@/lib/types/post-collections-type';

const STATUS_OPTIONS = [
  { label: 'Dream Destination', value: 'dream' },
  { label: 'Captured', value: 'captured' },
];

const REGION_OPTIONS = [
  { label: 'Asia', value: 'Asia' },
  { label: 'Southeast Asia', value: 'Southeast Asia' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Western Europe', value: 'Western Europe' },
  { label: 'Oceania', value: 'Oceania' },
];

const SUBJECT_OPTIONS = [
  { label: 'Architecture', value: 'architecture' },
  { label: 'Culture', value: 'culture' },
  { label: 'Nature', value: 'nature' },
  { label: 'Landscape', value: 'landscape' },
  { label: 'Street', value: 'street' },
  { label: 'People', value: 'people' },
  { label: 'Products', value: 'products' },
];

const VISUAL_STYLE_OPTIONS = [
  { label: 'Cinematic', value: 'cinematic' },
  { label: 'Minimalist', value: 'minimalist' },
  { label: 'Vintage', value: 'vintage' },
  { label: 'Moody', value: 'moody' },
  { label: 'Vibrant', value: 'vibrant' },
  { label: 'B&W', value: 'b&w' },
];

const TECHNICAL_OPTIONS = [
  { label: '4K', value: '4K' },
  { label: '8K', value: '8K' },
  { label: 'Drone', value: 'drone' },
  { label: 'Digital', value: 'digital' },
  { label: 'Film', value: 'film' },
  { label: 'Mobile', value: 'mobile' },
];

const YEAR_OPTIONS = [
  { label: '2024', value: 2024 },
  { label: '2025', value: 2025 },
];

const FilmographyFilter = () => {
  const {
    getActiveFilters,
    setFilteredCollections,
    clearAllFilters,
    toggleStatusFilter,
    toggleRegionFilter,
    toggleSubjectFilter,
    toggleVisualStyleFilter,
    toggleTechnicalFilter,
    toggleYearFilter,
  } = useFilterStore();

  const activeFilters = getActiveFilters('filmography');

  // Apply filters whenever active filters change
  useEffect(() => {
    const filtered = filterCollections(
      FilmographyCollections,
      'full',
      activeFilters
    );
    setFilteredCollections(
      'filmography',
      filtered as ContentsCollectionsType[]
    );
  }, [activeFilters, setFilteredCollections]);

  // Check which filter options are actually used in the collections
  const availableFilters = useMemo(() => {
    const hasStatus = FilmographyCollections.some(
      (film) => film.metadata.status
    );
    const hasRegion = FilmographyCollections.some(
      (film) => film.metadata.region?.length
    );
    const hasSubject = FilmographyCollections.some(
      (film) => film.metadata.subject?.length
    );
    const hasVisualStyle = FilmographyCollections.some(
      (film) => film.metadata.visualStyle?.length
    );
    const hasTechnical = FilmographyCollections.some(
      (film) => film.metadata.technical?.length
    );
    const hasYear = FilmographyCollections.some((film) => film.metadata.year);

    // Get unique values from collections
    const usedRegions = new Set<string>();
    const usedSubjects = new Set<string>();
    const usedVisualStyles = new Set<string>();
    const usedTechnicals = new Set<string>();
    const usedYears = new Set<number>();

    FilmographyCollections.forEach((film) => {
      film.metadata.region?.forEach((r) => usedRegions.add(r));
      film.metadata.subject?.forEach((s) => usedSubjects.add(s));
      film.metadata.visualStyle?.forEach((v) => usedVisualStyles.add(v));
      film.metadata.technical?.forEach((t) => usedTechnicals.add(t));
      if (film.metadata.year) usedYears.add(film.metadata.year);
    });

    return {
      status: hasStatus,
      region: hasRegion,
      subject: hasSubject,
      visualStyle: hasVisualStyle,
      technical: hasTechnical,
      year: hasYear,
      usedRegions,
      usedSubjects,
      usedVisualStyles,
      usedTechnicals,
      usedYears,
    };
  }, []);

  const handleStatusClick = (status: string) => {
    toggleStatusFilter('filmography', status);
  };

  const handleRegionClick = (region: string) => {
    toggleRegionFilter('filmography', region);
  };

  const handleSubjectClick = (subject: string) => {
    toggleSubjectFilter('filmography', subject);
  };

  const handleVisualStyleClick = (visualStyle: string) => {
    toggleVisualStyleFilter('filmography', visualStyle);
  };

  const handleTechnicalClick = (technical: string) => {
    toggleTechnicalFilter('filmography', technical);
  };

  const handleYearClick = (year: number) => {
    toggleYearFilter('filmography', year);
  };

  const handleClearAll = () => {
    clearAllFilters('filmography');
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

      {/* Status Filter */}
      <FilterSection title="By Status" disabled={!availableFilters.status}>
        {STATUS_OPTIONS.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.status?.includes(option.value) || false}
            onClick={() => handleStatusClick(option.value)}
            disabled={!availableFilters.status}
          />
        ))}
      </FilterSection>

      {/* Region Filter */}
      <FilterSection title="By Region" disabled={!availableFilters.region}>
        {REGION_OPTIONS.map((option) => {
          const isUsed = availableFilters.usedRegions.has(option.value);
          return (
            <FilterPill
              key={option.value}
              label={option.label}
              value={option.value}
              isActive={activeFilters.region?.includes(option.value) || false}
              onClick={() => handleRegionClick(option.value)}
              disabled={!isUsed}
            />
          );
        })}
      </FilterSection>

      {/* Subject Filter */}
      <FilterSection title="By Subject" disabled={!availableFilters.subject}>
        {SUBJECT_OPTIONS.map((option) => {
          const isUsed = availableFilters.usedSubjects.has(option.value);
          return (
            <FilterPill
              key={option.value}
              label={option.label}
              value={option.value}
              isActive={activeFilters.subject?.includes(option.value) || false}
              onClick={() => handleSubjectClick(option.value)}
              disabled={!isUsed}
            />
          );
        })}
      </FilterSection>

      {/* Visual Style Filter */}
      <FilterSection
        title="By Visual Style"
        disabled={!availableFilters.visualStyle}
      >
        {VISUAL_STYLE_OPTIONS.map((option) => {
          const isUsed = availableFilters.usedVisualStyles.has(option.value);
          return (
            <FilterPill
              key={option.value}
              label={option.label}
              value={option.value}
              isActive={
                activeFilters.visualStyle?.includes(option.value) || false
              }
              onClick={() => handleVisualStyleClick(option.value)}
              disabled={!isUsed}
            />
          );
        })}
      </FilterSection>

      {/* Technical Filter */}
      <FilterSection
        title="By Technical"
        disabled={!availableFilters.technical}
      >
        {TECHNICAL_OPTIONS.map((option) => {
          const isUsed = availableFilters.usedTechnicals.has(option.value);
          return (
            <FilterPill
              key={option.value}
              label={option.label}
              value={option.value}
              isActive={
                activeFilters.technical?.includes(option.value) || false
              }
              onClick={() => handleTechnicalClick(option.value)}
              disabled={!isUsed}
            />
          );
        })}
      </FilterSection>

      {/* Year Filter */}
      <FilterSection title="By Year" disabled={!availableFilters.year}>
        {YEAR_OPTIONS.map((option) => {
          const isUsed = availableFilters.usedYears.has(option.value);
          return (
            <FilterPill
              key={option.value}
              label={option.label}
              value={String(option.value)}
              isActive={activeFilters.year?.includes(option.value) || false}
              onClick={() => handleYearClick(option.value)}
              disabled={!isUsed}
            />
          );
        })}
      </FilterSection>
    </div>
  );
};

export default FilmographyFilter;
