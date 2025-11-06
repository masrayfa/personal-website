import { useParams } from "@tanstack/react-router";
import AllTimeFavFilter from "./filters/all-time-filter";
import BlogFilter from "./filters/blog-filter";
import FilmographyFilter from "./filters/filmography-filter";
import LoveFilter from "./filters/love-filter";
import PeripheralsFilter from "./filters/peripherals-filter";
import ReviewsFilter from "./filters/reviews-filter";
import ShortStoriesFilter from "./filters/short-stories-filter";
import WorkFilter from "./filters/work-filter";

const FILTER_COMPONENTS: Record<string, React.ComponentType> = {
  "all-time-fav": AllTimeFavFilter,
  blog: BlogFilter,
  filmography: FilmographyFilter,
  love: LoveFilter,
  peripherals: PeripheralsFilter,
  reviews: ReviewsFilter,
  "short-stories": ShortStoriesFilter,
  work: WorkFilter,
};

const FilterWidget = () => {
  let widgetId: string | undefined;

  try {
    const params = useParams({ from: "/_layout/$widgetId" });
    widgetId = params.widgetId;
  } catch (error) {
    widgetId = undefined;
  }

  const FilterComponent = widgetId ? FILTER_COMPONENTS[widgetId] : null;

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-2">
        {FilterComponent && <FilterComponent />}
        {!FilterComponent && (
          <p className="text-gray-500">No filter selected</p>
        )}
      </div>
    </div>
  );
};

export default FilterWidget;
