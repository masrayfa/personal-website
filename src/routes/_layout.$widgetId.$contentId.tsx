import { createFileRoute } from '@tanstack/react-router';
import { ContentsCollections } from '@/lib/posts-collections';
import MasRayfaPrivate from '@/features/mas-rayfa-private/mas-rayfa-private.component';
import { usePersonaStore } from '@/stores/persona-store';
import { VersionFilter } from '@/components/mdx/VersionFilter';

export const Route = createFileRoute('/_layout/$widgetId/$contentId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { widgetId, contentId } = Route.useParams();
  const { selectedPersona } = usePersonaStore();

  if (selectedPersona === 'mas-rayfa') {
    return <MasRayfaPrivate />;
  }

  const collectionKey = `${widgetId}_${contentId}`;

  const SelectedContent = ContentsCollections(collectionKey);

  if (!SelectedContent) {
    return <div>Post not found</div>;
  }

  // Check if this widget supports version filtering
  const supportsVersioning = ['blog', 'short-stories', 'reviews'].includes(
    widgetId
  );

  return (
    <div>
      {supportsVersioning && <VersionFilter />}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <SelectedContent />
      </div>
    </div>
  );
}
