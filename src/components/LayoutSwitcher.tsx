import { useLayoutStore, LayoutType, WidgetId, BREAKPOINTS } from '@/stores/layout-store';
import { layoutConfigs, widgetLayoutOptions } from '@/lib/types/layout-type';
import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/theme-provider';
import { LayoutGrid, List, Grid2x2, Grid3x3 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LayoutSwitcherProps {
  widgetId: WidgetId;
}

const iconMap = {
  'grid-2': Grid2x2,
  'grid-3': Grid3x3,
  'grid-4': LayoutGrid,
  list: List,
};

export const LayoutSwitcher = ({ widgetId }: LayoutSwitcherProps) => {
  const { theme } = useTheme();
  const { getWidgetLayout, setWidgetLayout } = useLayoutStore();
  const currentLayout = getWidgetLayout(widgetId);
  const availableLayouts = widgetLayoutOptions[widgetId] || [];
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide on small screens (< 1024px) - focus on content only
  if (windowWidth < BREAKPOINTS.SMALL) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      {availableLayouts.map((layoutType) => {
        const config = layoutConfigs[layoutType];
        const Icon = iconMap[config.icon];
        const isActive = currentLayout === layoutType;

        return (
          <button
            key={layoutType}
            onClick={() => setWidgetLayout(widgetId, layoutType)}
            className={cn(
              'p-2 border transition-colors',
              theme === 'dark' ? 'border-white' : 'border-black',
              isActive
                ? theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : theme === 'dark'
                  ? 'bg-black text-white hover:bg-zinc-900'
                  : 'bg-white text-black hover:bg-gray-100'
            )}
            title={config.label}
            aria-label={config.label}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
};
