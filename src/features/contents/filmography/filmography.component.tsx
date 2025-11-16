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
import { useTheme } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const FilmographyComponent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
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
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl">{t('filmography.title')}</h2>
          <p>{t('filmography.description')}</p>
        </div>
      </div>

      {/* List of Contents */}
      {activeFilters && filmography?.length! > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filmography?.map((film) => (
            <div key={film.id}>
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
                      <div
                        className={cn(
                          'relative w-full max-h-56 aspect-video bg-gray-100 border-2 overflow-hidden group flex justify-center items-center',
                          theme === 'dark' ? 'border-white' : 'border-black'
                        )}
                      >
                        <img
                          src={film.metadata.image_url}
                          alt={film.metadata.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Film Info */}
                    <div className="mt-4 mb-10 space-y-2">
                      <h3 className="text-xl font-bold">
                        {film.metadata.title}
                      </h3>

                      {film.metadata.desc && (
                        <p
                          className={cn(
                            'text-sm',
                            theme === 'dark'
                              ? 'text-neutral-400'
                              : 'text-gray-600'
                          )}
                        >
                          {film.metadata.desc}
                        </p>
                      )}

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2">
                        {film.metadata.region &&
                          film.metadata.region.map((r) => (
                            <span
                              key={r}
                              className={cn(
                                'text-xs border px-2 py-1',
                                theme === 'dark'
                                  ? 'bg-neutral-900 border-neutral-600 '
                                  : 'bg-gray-100 border-gray-300 '
                              )}
                            >
                              {r}
                            </span>
                          ))}
                        {film.metadata.subject &&
                          film.metadata.subject.map((s) => (
                            <span
                              key={s}
                              className={cn(
                                'text-xs border px-2 py-1',
                                theme === 'dark'
                                  ? 'bg-neutral-900 border-neutral-600 '
                                  : 'bg-gray-100 border-gray-300 '
                              )}
                            >
                              {s}
                            </span>
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Film without image - Blog card style
                  <Card
                    className={cn(
                      'rounded-none cursor-pointer ',
                      theme === 'dark' ? 'border-white' : 'border-black'
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{film.metadata.title}</CardTitle>
                      <CardDescription>{film.metadata.desc}</CardDescription>

                      {/* Metadata Pills */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {film.metadata.region &&
                          film.metadata.region.map((r) => (
                            <span
                              key={r}
                              className={cn(
                                'text-xs border px-2 py-1',
                                theme === 'dark'
                                  ? 'bg-neutral-900 border-neutral-600 '
                                  : 'bg-gray-100 border-gray-300 '
                              )}
                            >
                              {r}
                            </span>
                          ))}
                        {film.metadata.subject &&
                          film.metadata.subject.map((s) => (
                            <span
                              key={s}
                              className={cn(
                                'text-xs border px-2 py-1',
                                theme === 'dark'
                                  ? 'bg-neutral-900 border-neutral-600 '
                                  : 'bg-gray-100 border-gray-300 '
                              )}
                            >
                              {s}
                            </span>
                          ))}
                      </div>
                    </CardHeader>
                  </Card>
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>{t('common.noContentFound')}</p>
        </div>
      )}
    </div>
  );
};

export default FilmographyComponent;
