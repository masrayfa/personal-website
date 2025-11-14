import { createFileRoute } from '@tanstack/react-router';
import { ContentsCollections } from '@/lib/posts-collections';
import MasRayfaPrivate from '@/features/mas-rayfa-private/mas-rayfa-private.component';
import { usePersonaStore } from '@/stores/persona-store';

export const Route = createFileRoute('/_layout/$widgetId/$contentId')({
  component: RouteComponent,
});

async function RouteComponent() {
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

  return <SelectedContent />;
}
