import { createFileRoute } from '@tanstack/react-router';
import { ContentsCollections } from '@/lib/posts-collections';

export const Route = createFileRoute('/_layout/$widgetId/$contentId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { widgetId, contentId } = Route.useParams();

  const collectionKey = `${widgetId}_${contentId}`;

  const PostComponent = ContentsCollections(collectionKey);

  if (!PostComponent) {
    return <div>Post not found</div>;
  }

  return <PostComponent />;
}
