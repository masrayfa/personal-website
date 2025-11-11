import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Outlet, useMatches } from '@tanstack/react-router';
import { peripherals } from '../constants';
import { useFilterStore } from '@/stores/filter-store';
import { filterCollections } from '@/lib/utils/filter-collections';
import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';

const PeripheralsComponent = () => {
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes('$contentId')
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();
  const activefilters = getActiveFilters('peripherals');

  const filteredCollections = filterCollections(
    peripherals,
    'simplified',
    activefilters
  ) as ContentsCollectionsTypeSimplified[];

  // Group collections by category
  const groupedByCategory = filteredCollections.reduce(
    (acc, item) => {
      const category = item.metadata.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, ContentsCollectionsTypeSimplified[]>
  );

  const hasResults = filteredCollections.length > 0;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Peripherals</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents grouped by category */}
      {hasResults ? (
        <div className="flex flex-col space-y-12">
          {Object.entries(groupedByCategory).map(([category, items]) => (
            <div key={category} className="flex flex-col space-y-5">
              {/* Category Header */}
              <h3 className="text-2xl font-bold capitalize">{category}</h3>

              {/* Items in this category */}
              <ul className="grid grid-cols-4 gap-5">
                {items.map((item) => (
                  <li key={item.id}>
                    <Card className="rounded-none cursor-pointer border-black">
                      <CardHeader>
                        <CardTitle>{item.metadata.allTimeFavName}</CardTitle>
                        <CardDescription>{item.metadata.category}</CardDescription>
                      </CardHeader>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No Content found</p>
        </div>
      )}
    </div>
  );
};

export default PeripheralsComponent;
