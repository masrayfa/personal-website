import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Outlet, useMatches } from "@tanstack/react-router";
import ShortStoriesMDsCollections from "./md";
import { useFilterStore } from "@/stores/filter-store";
import { filterCollections } from "@/lib/utils/filter-collections";

const ShortStoriesComponent = () => {
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes("$contentId"),
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();
  const activefilters = getActiveFilters("short-stories");

  const filteredCollections = filterCollections(
    ShortStoriesMDsCollections,
    'full',
    activefilters,
  );

  const shortStories =
    filteredCollections.length > 0 ? filteredCollections : null;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Short Stories</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents */}
      <ul className="flex flex-col space-y-20">
        {shortStories && shortStories.length > 0 ? (
          shortStories.map((story) => (
            <li key={story.id}>
              <Link
                to={"/$widgetId/$contentId"}
                params={{
                  widgetId: "short-stories",
                  contentId: String(story.id),
                }}
              >
                {story.metadata.image_url ? (
                  // Film with image - Reviews style
                  <>
                    <div className="w-full">
                      <div className="relative w-full max-h-56 aspect-video bg-gray-100 border-2 border-black overflow-hidden group flex justify-center items-center">
                        <img
                          src={story.metadata.image_url}
                          alt={story.metadata.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Film Info */}
                    <div className="mt-4 space-y-2">
                      <h3 className="text-xl font-bold">{story.metadata.title}</h3>

                      {story.metadata.desc && (
                        <span>
                          <p className="text-sm text-gray-600">{story.metadata.date}</p>
                        <p className="text-sm text-gray-600">{story.metadata.desc}</p>
                        </span>
                      )}

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2">
                        {story.metadata.year && (
                          <span className="text-xs bg-gray-100 border border-gray-300 px-2 py-1">
                            {story.metadata.year}
                          </span>
                        )}
                        {story.metadata.genre &&
                          story.metadata.genre.map((g: string) => (
                            <span
                              key={g}
                              className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                            >
                              {g}
                            </span>
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Film without image - Blog card style
                  <Card className="rounded-none cursor-pointer border-black">
                    <CardHeader>
                      <CardTitle>{story.metadata.title}</CardTitle>
                      <CardDescription>{story.metadata.date} • {story.metadata.desc}</CardDescription>

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {story.metadata.year && (
                          <span className="text-xs bg-gray-100 border border-gray-300 px-2 py-1">
                            {story.metadata.year}
                          </span>
                        )}
                        {story.metadata.genre &&
                          story.metadata.genre.map((g: string) => (
                            <span
                              key={g}
                              className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                            >
                              {g}
                            </span>
                          ))}
                      </div>
                    </CardHeader>
                  </Card>
                )}
              </Link>
            </li>
          ))
        ) : (
          <div>
            <p>No Content found</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ShortStoriesComponent;
