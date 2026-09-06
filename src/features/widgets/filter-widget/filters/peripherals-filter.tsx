import { useMemo } from 'react';
import { useFilterStore } from '@/stores/filter-store';
import { FilterPill } from '../components/filter-pill';
import { FilterSection } from '../components/filter-section';
import { peripherals } from '@/features/contents/constants';

const PeripheralsFilter = () => {
  const { getActiveFilters, toggleFilter, clearAllFilters } = useFilterStore();

  const activeFilters = getActiveFilters('peripherals');

  // Get unique categories from peripherals data
  const categoryOptions = useMemo(() => {
    const categories = new Set<string>();
    peripherals.forEach((item) => {
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

  const brandOptions = useMemo(() => {
    const brands = new Set<string>();
    peripherals.forEach((item) => {
      if (item.metadata.brand) {
        brands.add(item.metadata.brand);
      }
    });
    return Array.from(brands)
      .sort()
      .map((brand) => ({
        label: brand.charAt(0).toUpperCase() + brand.slice(1),
        value: brand,
      }));
  }, []);

  const handleCategoryClick = (category: string) => {
    toggleFilter('peripherals', 'category', category);
  };

  const handleBrandClick = (brand: string) => {
    toggleFilter('peripherals', 'brand', brand);
  };

  const handleClearAll = () => {
    clearAllFilters('peripherals');
  };

  const hasActiveFilters =
    (activeFilters.category !== null &&
      activeFilters.category !== undefined &&
      activeFilters.category.length > 0) ||
    (activeFilters.brand !== null &&
      activeFilters.brand !== undefined &&
      activeFilters.brand.length > 0);

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

      {/* Brand Filter */}
      <FilterSection title="By Brand" disabled={brandOptions.length === 0}>
        {brandOptions.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            value={option.value}
            isActive={activeFilters.brand?.includes(option.value) || false}
            onClick={() => handleBrandClick(option.value)}
            disabled={false}
          />
        ))}
      </FilterSection>
    </div>
  );
};

export default PeripheralsFilter;
