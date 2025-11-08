import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Outlet, useMatches } from "@tanstack/react-router";
import { FaHeart, FaCamera, FaStar } from "react-icons/fa";
import FilmographyCollections from "./md";
import { useFilterStore } from "@/stores/filter-store";
import { filterCollections } from "@/lib/utils/filter-collections";

const FilmographyComponent = () => {
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes("$contentId"),
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();
  const activefilters = getActiveFilters("filmography");

  const filteredCollections = filterCollections(
    FilmographyCollections,
    activefilters,
  );

  const filmography =
    filteredCollections.length > 0 ? filteredCollections : null;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Filmography</h2>
        <p>
          A visual journey through places I've captured and dreams yet to be
          realized. Each frame tells a story - some already lived, others
          waiting to unfold through my lens.
        </p>
      </div>

      {/* List of contents */}
      <ul className="flex flex-col gap-5">
        {(filmography ?? []).length > 0 ? (
          filmography?.map((film) => {
            const isDream = film.metadata.status === "dream";

            const CardContent = (
              <Card
                className={`rounded-none border-black relative ${isDream ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
              >
                {/* Dream Destination Badge */}
                {film.metadata.status === "dream" && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="flex items-center gap-1.5 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-300">
                      <FaStar className="text-sm" />
                      Dream Destination
                    </span>
                  </div>
                )}

                {/* Captured Badge */}
                {film.metadata.status === "captured" && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-300">
                      <FaCamera className="text-sm" />
                      Captured
                    </span>
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{film.metadata.title}</CardTitle>
                  <CardDescription>{film.metadata.desc}</CardDescription>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {film.metadata.year && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {film.metadata.year}
                      </span>
                    )}
                    {film.metadata.region && film.metadata.region[0] && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {film.metadata.region[0]}
                      </span>
                    )}
                    {film.metadata.subject && film.metadata.subject[0] && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                        {film.metadata.subject[0]}
                      </span>
                    )}
                  </div>
                </CardHeader>
                {film.metadata.likes && (
                  <CardFooter className="justify-end gap-2">
                    <span>
                      <FaHeart />
                    </span>
                    <span>{film.metadata.likes}</span>
                  </CardFooter>
                )}
              </Card>
            );

            return (
              <li key={film.id}>
                {isDream ? (
                  // Dream destinations are not clickable
                  <div className="relative group">
                    {CardContent}
                    {/* Overlay tooltip */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600 text-white text-sm px-4 py-2 rounded-full">
                        Coming Soon - Dream in Progress
                      </span>
                    </div>
                  </div>
                ) : (
                  // Captured content is clickable
                  <Link
                    id={String(film.id)}
                    to={"/$widgetId/$contentId"}
                    params={{
                      widgetId: "filmography",
                      contentId: String(film.id),
                    }}
                  >
                    {CardContent}
                  </Link>
                )}
              </li>
            );
          })
        ) : (
          <div>
            <p>No Content found</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default FilmographyComponent;
