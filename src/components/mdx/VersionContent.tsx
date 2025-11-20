import { useFilterStore } from '@/stores/filter-store';
import { ReactNode } from 'react';
import { WidgetType } from '@/lib/types/widget-type';

interface VersionContentProps {
  children: ReactNode;
  version: 'short' | 'long';
}

export const VersionContent = ({ children, version }: VersionContentProps) => {
  const { getActiveFilters } = useFilterStore();

  const widgetIds: WidgetType[] = ['blog', 'short-stories', 'reviews'];

  let selectedVersion: 'short' | 'long' = 'long'; // default

  for (const widgetId of widgetIds) {
    const filters = getActiveFilters(widgetId);
    if (filters.contentVersion) {
      selectedVersion = filters.contentVersion as 'short' | 'long';
      break;
    }
  }

  if (selectedVersion === version) {
    return <>{children}</>;
  }

  return null;
};
