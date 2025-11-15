import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { workProjects } from '../constants';
import { WorkProjectCard } from '@/components/WorkCanvasRealEffect';
import { VscLinkExternal } from 'react-icons/vsc';
import { useFilterStore } from '@/stores/filter-store';
import { filterCollections } from '@/lib/utils/filter-collections';
import { useEffect } from 'react';

const WorkComponent = () => {
  const matches = useMatches();

  // Checking if child route (contentId) is activated
  const hasChildRoute = matches.some((match) =>
    match.id.includes('$contentId')
  );

  // If child route exists, render Outlet (for detail page)
  if (hasChildRoute) {
    return <Outlet />;
  }

  const { getActiveFilters } = useFilterStore();

  const activeFilters = getActiveFilters('work');

  const filteredCollections = filterCollections(
    workProjects,
    'simplified',
    activeFilters
  );

  const worksCollections =
    filteredCollections.length > 0 ? filteredCollections : null;

  useEffect(() => {
    console.log('@ReviesComponent - activeFilters:', activeFilters);
    console.log('@ReviesComponent - reviews:', worksCollections);
  }, [activeFilters, worksCollections]);

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl">Work</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p>
        </div>
      </div>

      {/* List of contents */}
      {activeFilters && worksCollections?.length! > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {(worksCollections ?? []).map((work) => (
            <div key={work.id}>
              <Link
                id={String(work.id)}
                to={work.metadata.url || '#'}
                params={{ widgetId: 'work', contentId: String(work.id) }}
              >
                <WorkProjectCard
                  key={work.id}
                  title={work.metadata.title ?? ''}
                  description={work.metadata.desc}
                  techStack={work.metadata.techStack || []}
                  mediaUrl={work.metadata.mediaUrl}
                  mediaType={work.metadata.mediaType}
                  canvasColors={
                    work.metadata.mediaUrl ? work.metadata.canvasColors : null
                  }
                />
              </Link>
              {/* Project Info */}
              <div className="mt-4 mb-10 space-y-2">
                <Link
                  to={work.metadata.url || '#'}
                  className="flex items-start justify-between cursor-pointer"
                >
                  <h3 className="text-xl font-bold">{work.metadata.title}</h3>
                  <button className="text-sm hover:underline flex items-center gap-1">
                    View
                    <VscLinkExternal />
                  </button>
                </Link>

                {work.metadata.desc && (
                  <p className="text-sm text-gray-600">{work.metadata.desc}</p>
                )}

                {work.metadata.techStack && (
                  <div className="flex flex-wrap gap-2">
                    {work.metadata.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 border border-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No Work content is found</p>
        </div>
      )}
    </div>
  );
};

export default WorkComponent;
