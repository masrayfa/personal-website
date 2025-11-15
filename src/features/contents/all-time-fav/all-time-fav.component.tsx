import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { wallOfFavsCollections } from '../constants';
import { useFilterStore } from '@/stores/filter-store';
import { filterCollections } from '@/lib/utils/filter-collections';
import { ContentsCollectionsTypeSimplified } from '@/lib/types/post-collections-type';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useTheme } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';

const AllTimeFavComponent = () => {
  const { theme } = useTheme();
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes('$contentId')
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();
  const activefilters = getActiveFilters('all-time-fav');

  const filteredCollections = filterCollections(
    wallOfFavsCollections,
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
        <h2 className="text-4xl">Wall of Fav</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojj
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {items.map((fav) => (
                  <div key={fav.id}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card
                          className={cn(
                            'rounded-none cursor-pointer',
                            theme === 'dark' ? 'border-white' : 'border-black'
                          )}
                        >
                          <CardHeader>
                            <CardTitle>{fav.metadata.allTimeFavName}</CardTitle>
                            <CardDescription>
                              {fav.metadata.category}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <div className="flex flex-col space-y-4">
                          <h2 className="text-3xl font-bold">
                            {fav.metadata.allTimeFavName}
                          </h2>
                          <img src={fav.metadata.image_url} />
                          <span></span>
                          <p>{fav.metadata.allTimeReason}</p>
                          {fav.metadata.reviewLink && (
                            <Link to={fav.metadata.reviewLink}>
                              <p className="text-sm underline">review link</p>
                            </Link>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
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

export default AllTimeFavComponent;
