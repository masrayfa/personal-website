import { useEffect } from "react";
import { useFilterStore } from "@/stores/filter-store";
import { FilterPill } from "../components/filter-pill";
import { FilterSection } from "../components/filter-section";
import { filterCollections } from "@/lib/utils/filter-collections";
import { BlogMDsCollections } from "@/features/contents/blog/md";

const GENRE_OPTIONS = [
  { label: "Mundane", value: "mundane" },
  { label: "Tech", value: "tech" },
];

const BlogFilter = () => {
  const {
    setFilter,
    clearFilter,
    getActiveFilters,
    setFilteredCollections,
    clearAllFilters,
  } = useFilterStore();

  const activeFilters = getActiveFilters("blog");

  // Apply filters whenever active filters change
  useEffect(() => {
    const filtered = filterCollections(BlogMDsCollections, activeFilters);
    setFilteredCollections("blog", filtered);
  }, [activeFilters, setFilteredCollections]);

  const handleGenreClick = (genre: string) => {
    console.log("Genre and Active Filters genre: ", {
      genre,
      active_filters_genr: activeFilters.genre,
    });
    if (genre === activeFilters.genre) {
      // If clicking the same genre, clear the filter
      clearFilter("blog", "genre");
    } else {
      setFilter("blog", "genre", genre);
    }
  };

  const handleClearAll = () => {
    clearAllFilters("blog");
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
            isActive={activeFilters.genre === option.value}
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
