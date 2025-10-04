import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$widgetId')({
  component: MainContent,
});

function MainContent() {
  const { widgetId } = Route.useParams();

  return <div>Hello {widgetId}</div>;
}
