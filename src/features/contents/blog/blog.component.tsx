import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { BlogMDsCollections } from './md';
import { filterCollections } from '@/lib/utils/filter-collections';
import { useFilterStore } from '@/stores/filter-store';
import { useTheme } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const BlogComponent = () => {
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
  const activefilters = getActiveFilters('blog');

  const filteredCollections = filterCollections(
    BlogMDsCollections,
    'full',
    activefilters
  );

  const blogs = filteredCollections.length > 0 ? filteredCollections : null;

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">{t('blog.title')}</h2>
        <p>{t('blog.description')}</p>
      </div>

      {/* List of contents */}
      {(blogs ?? []).length > 0 ? (
        <div className="flex flex-col space-y-3">
          {blogs?.map((blog) => (
            <div key={blog.id}>
              <Link
                id={String(blog.id)}
                to={'/$widgetId/$contentId'}
                params={{ widgetId: 'blog', contentId: String(blog.id) }}
              >
                <Card
                  className={cn(
                    'rounded-none cursor-pointer',
                    theme === 'dark' ? 'border-white' : 'border-black'
                  )}
                >
                  <CardHeader>
                    <CardTitle>{blog.metadata.title}</CardTitle>
                    <CardDescription>
                      {blog.metadata.date} • {blog.metadata.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2">
                      {blog.metadata.genre &&
                        blog.metadata.genre.map((b: string) => (
                          <span
                            key={b}
                            className={cn(
                              'text-xs  border px-2 py-1',
                              theme === 'dark'
                                ? 'bg-neutral-900 border-neutral-600 '
                                : 'bg-gray-100 border-gray-300 '
                            )}
                          >
                            {b}
                          </span>
                        ))}
                    </div>
                  </CardFooter>
                </Card>
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

export default BlogComponent;
