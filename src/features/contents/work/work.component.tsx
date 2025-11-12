import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { workProjects } from '../constants';
import { WorkProjectCard } from '@/components/WorkCanvasRealEffect';
import { VscLinkExternal } from 'react-icons/vsc';

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

  return (
    <div className="flex flex-col space-y-16">
      {/* Intro */}
      <div>
        <h2 className="text-4xl">Work</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>

      {/* List of contents */}
      <ul className="flex flex-col gap-12">
        {workProjects.map((project) => (
          <li key={project.id}>
            <Link
              id={String(project.id)}
              to={project.metadata.url || '#'}
              params={{ widgetId: 'work', contentId: String(project.id) }}
            >
              <WorkProjectCard
                key={project.id}
                title={project.metadata.title}
                description={project.metadata.desc}
                techStack={project.metadata.techStack || []}
                mediaUrl={project.metadata.mediaUrl}
                mediaType={project.metadata.mediaType}
                canvasColors={
                  project.metadata.mediaUrl
                    ? project.metadata.canvasColors
                    : null
                }
              />
            </Link>
            {/* Project Info */}
            <div className="mt-4 space-y-2">
              <Link
                to={project.metadata.url || '#'}
                className="flex items-start justify-between cursor-pointer"
              >
                <h3 className="text-xl font-bold">{project.metadata.title}</h3>
                <button className="text-sm hover:underline flex items-center gap-1">
                  View
                  <VscLinkExternal />
                </button>
              </Link>

              {project.metadata.desc && (
                <p className="text-sm text-gray-600">{project.metadata.desc}</p>
              )}

              {project.metadata.techStack && (
                <div className="flex flex-wrap gap-2">
                  {project.metadata.techStack.map((tech, index) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkComponent;
