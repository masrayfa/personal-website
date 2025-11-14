import { createFileRoute } from '@tanstack/react-router';
import { usePersonaStore } from '@/stores/persona-store';
import MasRayfaPrivate from '@/features/mas-rayfa-private/mas-rayfa-private.component';

export const Route = createFileRoute('/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { selectedPersona } = usePersonaStore();

  if (selectedPersona === 'mas-rayfa') {
    return <MasRayfaPrivate />;
  }

  if (selectedPersona === 'sani-uong') {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">welcome to sani uong's realm</h1>
          <p className="text-xl text-muted-foreground">
            explore the widgets on the left to see what i've been working on
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">choose a persona to begin</h1>
        <p className="text-xl text-muted-foreground">
          select either mas rayfa or sani uong from the left panel
        </p>
      </div>
    </div>
  );
}
