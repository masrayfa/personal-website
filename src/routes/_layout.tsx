import { createFileRoute, Outlet } from '@tanstack/react-router';
import ChooseYourPersona from '@/features/choose-your-persona/choose-your-persona.component';
import WidgetsActionMenu from '@/features/widgets/widget-action-menu/widgets-action-menu.component';
import GlobalWidget from '@/features/widgets/global-widget/global-widget.component';
import CollabWidget from '@/features/widgets/collab-widget/collab-widget.component';
import Socials from '@/features/socials/socials.component';
import FilterWidget from '@/features/widgets/filter-widget/filter-widget.component';
import { useTheme } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

const WidgetsAction = [
  {
    id: 1,
    url: 'blog',
    label: 'blog',
    src: '',
  },
  {
    id: 2,
    url: 'work',
    label: 'work',
    src: '',
  },
  {
    id: 3,
    url: 'peripherals',
    label: 'peripherals',
    src: '',
  },
  {
    id: 4,
    url: 'short-stories',
    label: 'short stories',
    src: '',
  },
  {
    id: 5,
    url: 'filmography',
    label: 'filmography',
    src: '',
  },
  {
    id: 6,
    url: 'reviews',
    label: 'reviews',
    src: '',
  },
  {
    id: 7,
    url: 'all-time-fav',
    label: 'all time fav',
    src: '',
  },
  {
    id: 8,
    url: 'love',
    label: '<3',
    src: '',
  },
];

function RouteComponent() {
  const { theme } = useTheme();

  return (
    <div className="flex h-screen">
      {/* Left Wing */}
      <div
        className={cn(
          'border-r',
          theme === 'dark' ? 'border-white' : 'border-black'
        )}
      >
        <ChooseYourPersona />
        <WidgetsActionMenu widgets={WidgetsAction} />
      </div>

      {/* Middle */}
      <div
        className={cn(
          'p-10 flex-1 overflow-y-auto scrollbar-hidden border-r',
          theme === 'dark' ? 'border-white' : 'border-black'
        )}
      >
        <Outlet />
      </div>

      {/* Right Wing */}
      <div className="w-80 flex flex-col h-screen">
        {/* Global Widget - EN & Dark Mode buttons */}
        <div className="">
          <GlobalWidget />
        </div>

        {/* Empty space / Unknown Widget */}
        <div
          className={cn(
            'p-20',
            theme === 'dark' ? 'border-y border-white/20' : 'border'
          )}
        ></div>

        {/* Filter Widget - most likes, favs, most claps */}
        <div
          className={cn(
            'flex flex-col flex-1 justify-between overflow-hidden',
            theme === 'dark' ? 'border-b border-white/20' : 'border-b'
          )}
        >
          <FilterWidget />
          {/* Collab Widget - let's collab button */}
          <CollabWidget />
        </div>

        {/* Socials - at bottom */}
        <div className="mt-auto">
          <Socials />
        </div>
      </div>
    </div>
  );
}
