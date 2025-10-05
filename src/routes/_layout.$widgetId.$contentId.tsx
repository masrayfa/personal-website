import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$widgetId/$contentId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { widgetId, contentId } = Route.useParams();

  return (
    <div>
      <h1>DETAIL PAGE WORKS!</h1>
      <p>Widget: {widgetId}</p>
      <p>Content: {contentId}</p>
    </div>
  );
}
