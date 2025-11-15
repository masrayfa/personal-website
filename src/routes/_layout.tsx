import { createFileRoute, Outlet } from '@tanstack/react-router';
import ChooseYourPersona from '@/features/choose-your-persona/choose-your-persona.component';
import WidgetsActionMenu from '@/features/widgets/widget-action-menu/widgets-action-menu.component';
import GlobalWidget from '@/features/widgets/global-widget/global-widget.component';
import CollabWidget from '@/features/widgets/collab-widget/collab-widget.component';
import Socials from '@/features/socials/socials.component';
import FilterWidget from '@/features/widgets/filter-widget/filter-widget.component';
import { useTheme } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';
import { useLayoutStore, BREAKPOINTS } from '@/stores/layout-store';
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

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
  const { leftSidebarVisible, rightSidebarVisible, toggleLeftSidebar, toggleRightSidebar, syncSidebarsToScreenSize } = useLayoutStore();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  // Sync sidebars to screen size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      syncSidebarsToScreenSize(width);
    };

    // Set initial state
    handleResize();

    // Listen for resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [syncSidebarsToScreenSize]);

  // Determine if toggle buttons should be visible
  // Only show when sidebars are auto-hidden due to screen size
  const showToggleButtons = windowWidth < BREAKPOINTS.MEDIUM;

  // Determine if sidebars should be drawers (overlay) or static
  const useDrawerMode = windowWidth < BREAKPOINTS.MEDIUM;

  const leftSidebarContent = (
    <>
      <ChooseYourPersona />
      <WidgetsActionMenu widgets={WidgetsAction} />
    </>
  );

  const rightSidebarContent = (
    <>
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
    </>
  );

  return (
    <div className="flex h-screen relative">
      {/* Left Wing - Drawer or Static */}
      {useDrawerMode ? (
        <Drawer direction="left" open={leftSidebarVisible} onOpenChange={toggleLeftSidebar}>
          <DrawerContent
            className={cn(
              'border-r overflow-y-auto overflow-x-hidden max-w-[90vw]',
              theme === 'dark' ? 'border-white bg-black' : 'border-black bg-white'
            )}
          >
            <div className="min-w-0">
              {leftSidebarContent}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        leftSidebarVisible && (
          <div
            className={cn(
              'border-r relative overflow-y-auto',
              theme === 'dark' ? 'border-white bg-black' : 'border-black bg-white'
            )}
          >
            {leftSidebarContent}
          </div>
        )
      )}

      {/* Middle */}
      <div
        className={cn(
          'p-10 flex-1 overflow-y-auto scrollbar-hidden border-r relative',
          theme === 'dark' ? 'border-white' : 'border-black'
        )}
      >
        {/* Sidebar Toggle Buttons - only visible on smaller screens */}
        {showToggleButtons && (
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <button
              onClick={toggleLeftSidebar}
              className={cn(
                'p-2 border transition-colors',
                theme === 'dark' ? 'border-white bg-black text-white hover:bg-zinc-900' : 'border-black bg-white text-black hover:bg-gray-100'
              )}
              title={leftSidebarVisible ? 'Hide left sidebar' : 'Show left sidebar'}
              aria-label={leftSidebarVisible ? 'Hide left sidebar' : 'Show left sidebar'}
            >
              {leftSidebarVisible ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
            </button>
            <button
              onClick={toggleRightSidebar}
              className={cn(
                'p-2 border transition-colors',
                theme === 'dark' ? 'border-white bg-black text-white hover:bg-zinc-900' : 'border-black bg-white text-black hover:bg-gray-100'
              )}
              title={rightSidebarVisible ? 'Hide right sidebar' : 'Show right sidebar'}
              aria-label={rightSidebarVisible ? 'Hide right sidebar' : 'Show right sidebar'}
            >
              {rightSidebarVisible ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
            </button>
          </div>
        )}

        <Outlet />
      </div>

      {/* Right Wing - Drawer or Static */}
      {useDrawerMode ? (
        <Drawer direction="right" open={rightSidebarVisible} onOpenChange={toggleRightSidebar}>
          <DrawerContent
            className={cn(
              'w-80 flex flex-col h-screen overflow-y-auto overflow-x-hidden',
              theme === 'dark' ? 'bg-black' : 'bg-white'
            )}
          >
            {rightSidebarContent}
          </DrawerContent>
        </Drawer>
      ) : (
        rightSidebarVisible && (
          <div
            className={cn(
              'w-80 flex flex-col h-screen relative overflow-y-auto',
              theme === 'dark' ? 'bg-black' : 'bg-white'
            )}
          >
            {rightSidebarContent}
          </div>
        )
      )}
    </div>
  );
}
