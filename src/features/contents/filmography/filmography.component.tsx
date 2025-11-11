import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, Outlet, useMatches } from '@tanstack/react-router';
import FilmographyCollections from './md';
import { useFilterStore } from '@/stores/filter-store';
import { filterCollections } from '@/lib/utils/filter-collections';

const FilmographyComponent = () => {
  const matches = useMatches();

  const hasChildRoute = matches.some((match) =>
    match.id.includes('$contentId')
  );

  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();
  const activeFilters = getActiveFilters('filmography');

  const filteredCollections = filterCollections(
    FilmographyCollections,
    'full',
    activeFilters
  );

  // Filter out dream status films
  const capturedFilms = filteredCollections.filter(
    (film) => film.metadata.status !== 'dream'
  );

  const filmography = capturedFilms.length > 0 ? capturedFilms : null;

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

      {/* List of Contents */}
      <ul className="flex flex-col space-y-20">
        {activeFilters && filmography?.length! > 0 ? (
          filmography?.map((film) => (
            <li key={film.id}>
              <Link
                to={'/$widgetId/$contentId'}
                params={{
                  widgetId: 'filmography',
                  contentId: String(film.id),
                }}
              >
                {film.metadata.image_url ? (
                  // Film with image - Reviews style
                  <>
                    <div className="w-full">
                      <div className="relative w-full max-h-56 aspect-video bg-gray-100 border-2 border-black overflow-hidden group flex justify-center items-center">
                        <img
                          src={film.metadata.image_url}
                          alt={film.metadata.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Film Info */}
                    <div className="mt-4 space-y-2">
                      <h3 className="text-xl font-bold">
                        {film.metadata.title}
                      </h3>

                      {film.metadata.desc && (
                        <p className="text-sm text-gray-600">
                          {film.metadata.desc}
                        </p>
                      )}

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2">
                        {film.metadata.year && (
                          <span className="text-xs bg-gray-100 border border-gray-300 px-2 py-1">
                            {film.metadata.year}
                          </span>
                        )}
                        {film.metadata.region &&
                          film.metadata.region.map((r) => (
                            <span
                              key={r}
                              className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                            >
                              {r}
                            </span>
                          ))}
                        {film.metadata.subject &&
                          film.metadata.subject.map((s) => (
                            <span
                              key={s}
                              className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                            >
                              {s}
                            </span>
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Film without image - Blog card style
                  <Card className="rounded-none cursor-pointer border-black">
                    <CardHeader>
                      <CardTitle>{film.metadata.title}</CardTitle>
                      <CardDescription>{film.metadata.desc}</CardDescription>

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {film.metadata.year && (
                          <span className="text-xs bg-gray-100 border border-gray-300 px-2 py-1">
                            {film.metadata.year}
                          </span>
                        )}
                        {film.metadata.region &&
                          film.metadata.region.map((r) => (
                            <span
                              key={r}
                              className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                            >
                              {r}
                            </span>
                          ))}
                        {film.metadata.subject &&
                          film.metadata.subject.map((s) => (
                            <span
                              key={s}
                              className="text-xs bg-gray-100 border border-gray-300 px-2 py-1"
                            >
                              {s}
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

export default FilmographyComponent;
