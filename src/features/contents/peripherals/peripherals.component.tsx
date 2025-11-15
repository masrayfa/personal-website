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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-provider';

const PeripheralsComponent = () => {
  const { theme } = useTheme();

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

  /**
   * Disabled grouping by category for now
   * since the peripherals collections are still few
   */
  // // Group collections by category
  // const groupedByCategory = filteredCollections.reduce(
  //   (acc, item) => {
  //     const category = item.metadata.category || 'Uncategorized';
  //     if (!acc[category]) {
  //       acc[category] = [];
  //     }
  //     acc[category].push(item);
  //     return acc;
  //   },
  //   {} as Record<string, ContentsCollectionsTypeSimplified[]>
  // );

  const hasResults = filteredCollections.length > 0;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl">Peripherals</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam.
          </p>
        </div>
      </div>

      {/* List of contents grouped by category */}
      {hasResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredCollections.map((item) => (
            <div key={item.id}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card
                    className={cn(
                      'rounded-none cursor-pointer',
                      theme === 'dark' ? 'border-white' : 'border-black'
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{item.metadata.peripheralName}</CardTitle>
                      <CardDescription>
                        {item.metadata.category}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col space-y-4 p-4">
                    <img src={item.metadata.image_url} />
                    <h2 className="text-2xl font-bold">
                      {item.metadata.peripheralName}
                    </h2>
                  </div>
                </DialogContent>
              </Dialog>
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
