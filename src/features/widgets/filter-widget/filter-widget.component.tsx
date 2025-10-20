import { Button } from '@/components/ui/button';
import { useParams } from '@tanstack/react-router';
import AllTimeFavFilter from './filters/all-time-filter';
import BlogFilter from './filters/blog-filter';
import FilmographyFilter from './filters/filmography-filter';
import LoveFilter from './filters/love-filter';
import PeripheralsFilter from './filters/peripherals-filter';
import ReviewsFilter from './filters/reviews-filter';
import ShortStoriesFilter from './filters/short-stories-filter';
import WorkFilter from './filters/work-filter';

const FILTER_COMPONENTS: Record<string, React.ComponentType> = {
  'all-time-fav': AllTimeFavFilter,
  blog: BlogFilter,
  filmography: FilmographyFilter,
  love: LoveFilter,
  peripherals: PeripheralsFilter,
  reviews: ReviewsFilter,
  'short-stories': ShortStoriesFilter,
  work: WorkFilter,
};

const FilterWidget = ({ tags }: IFilterWidget) => {
  const params = useParams({ from: '/_layout/$widgetId' });
  const widgetId = params.widgetId;

  const FilterComponent = widgetId ? FILTER_COMPONENTS[widgetId] : null;

  if (FilterComponent) {
    return <FilterComponent />;
  }

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, i) => (
          <Button
            key={i}
            type="button"
            variant="outline"
            className={`
              px-4 py-2 text-sm font-mono
              border rounded-none cursor-pointer
              hover:bg-gray-50
              ${i === 0 ? 'bg-red-500 text-white hover:bg-red-600 border-red-500' : ''}
            `}
          >
            {tag}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FilterWidget;
