import { Link, Outlet, useMatches } from '@tanstack/react-router';
import { listOfblogs, workProjects } from '../constants';
import { WorkProjectCard } from '@/components/WorkCanvasRealEffect';

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
          <li>
            <Link
              id={String(project.id)}
              to={'/$widgetId/$contentId'}
              params={{ widgetId: 'blog', contentId: String(project.id) }}
            >
              <WorkProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                mediaUrl={project.mediaUrl}
                mediaType={project.mediaType}
                canvasColors={project.mediaUrl ? project.canvasColors : null}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkComponent;
