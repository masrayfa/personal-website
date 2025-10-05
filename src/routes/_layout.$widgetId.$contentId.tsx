import BlogComponent from '@/features/contents/blog/blog.component';
import { createFileRoute, NotFoundRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/$widgetId/$contentId')({
  component: RouteComponent,
});

function RouteComponent() {
  // const { widgetId, contentId } = Route.useParams();

  return <div>Hello "/_layout/$widgetId/$contentId"!</div>;
}
