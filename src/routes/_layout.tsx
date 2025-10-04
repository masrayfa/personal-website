import { createFileRoute, Outlet } from '@tanstack/react-router';
import ChooseYourPersona from '@/features/choose-your-persona/choose-your-persona.component';
import WidgetsMenu from '@/features/widget-action-menu/widgets-action-menu.component';
import GlobalWidget from '@/features/global-widget/global-widget.component';
import CollabWidget from '@/features/collab-widget/collab-widget.component';
import Socials from '@/features/socials/socials.component';
import FilterWidget from '@/features/filter-widget/filter-widget.component';

export const Route = createFileRoute('/_layout')({
  component: App,
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

const tags: string[] = ['most likes', 'favs', 'most claps'];

function App() {
  return (
    <div className="flex h-screen">
      {/* Left Wing */}
      <div className="border-r-2 border-black">
        <ChooseYourPersona />
        <WidgetsMenu widgets={WidgetsAction} />
      </div>

      {/* Middle */}
      <div className="p-10 flex-1 overflow-y-auto border-r-2 border-black">
        <Outlet />
      </div>

      {/* Right Wing */}
      <div className="w-80 flex flex-col">
        {/* Global Widget - EN & Dark Mode buttons */}
        <div className="border-b-2 border-black">
          <GlobalWidget />
        </div>

        {/* Empty space / Unknown Widget */}
        <div className="border-b-2 border-black p-20"></div>

        {/* Filter Widget - most likes, favs, most claps */}
        <div className="flex flex-col h-full justify-between border-b-2 border-black">
          <FilterWidget tags={tags} />
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
