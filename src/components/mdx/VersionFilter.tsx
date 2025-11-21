import { useFilterStore } from '@/stores/filter-store';
import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { WidgetType } from '@/lib/types/widget-type';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const VERSION_OPTIONS = [
  { label: 'Long Version', value: 'long' },
  { label: 'Short Version', value: 'short' },
] as const;

export const VersionFilter = () => {
  const { widgetId } = useParams({ strict: false });
  const { setContentVersion, getActiveFilters } = useFilterStore();

  const supportedWidgets: string[] = ['blog', 'short-stories', 'reviews'];
  if (!widgetId || !supportedWidgets.includes(widgetId)) {
    return null;
  }

  const typedWidgetId = widgetId as WidgetType;
  const activeFilters = getActiveFilters(typedWidgetId);
  const selectedVersion = activeFilters.contentVersion || 'long';

  useEffect(() => {
    setContentVersion(typedWidgetId, 'long');
  }, [typedWidgetId, setContentVersion]);

  const handleVersionChange = (version: 'short' | 'long') => {
    setContentVersion(typedWidgetId, version);
  };

  return (
    <div className="mb-6 pb-6 border-b dark:border-gray-700">
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
        Reading Version
      </h3>
      <RadioGroup
        className="flex gap-4"
        value={selectedVersion}
        onValueChange={handleVersionChange}
      >
        {VERSION_OPTIONS.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <RadioGroupItem id={option.value} value={option.value} />
            <Label
              htmlFor={option.value}
              className={cn(
                'text-sm transition-colors cursor-pointer',
                selectedVersion === option.value
                  ? 'font-semibold'
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
              )}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
