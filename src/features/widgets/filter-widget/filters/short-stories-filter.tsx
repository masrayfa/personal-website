import { useEffect } from "react";
import { useFilterStore } from "@/stores/filter-store";
import { FilterPill } from "../components/filter-pill";
import { FilterSection } from "../components/filter-section";
import { filterCollections } from "@/lib/utils/filter-collections";
import ShortStoriesMDsCollections from "@/features/contents/short-stories/md";

const GENRE_OPTIONS = [
  { label: "Drama", value: "drama" },
  { label: "Comedy", value: "comedy" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Romance", value: "romance" },
  { label: "Family", value: "family" },
];

const MOOD_OPTIONS = [
  { label: "Warm", value: "warm" },
  { label: "Cold", value: "cold" },
  { label: "Depressed", value: "depressed" },
  { label: "Hopeful", value: "hopeful" },
];

const ShortStoriesFilter = () => {
  const {
    getActiveFilters,
    setFilteredCollections,
    clearAllFilters,
    toggleGenreFilter,
    toggleMoodFilter,
  } = useFilterStore();

  const activeFilters = getActiveFilters("short-stories");

  // Apply filters whenever active filters change
  useEffect(() => {
    const filtered = filterCollections(
      ShortStoriesMDsCollections,
      activeFilters,
    );
    setFilteredCollections("short-stories", filtered);
  }, [activeFilters, setFilteredCollections]);

  const handleGenreClick = (genre: string) => {
    toggleGenreFilter("short-stories", genre);
  };

  const handleMoodClick = (mood: string) => {
    toggleMoodFilter("short-stories", mood);
  };

  const handleClearAll = () => {
    clearAllFilters("short-stories");
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value !== null && value !== undefined,
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

export default ShortStoriesFilter;
