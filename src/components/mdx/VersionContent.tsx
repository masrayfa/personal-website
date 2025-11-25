import { useFilterStore } from '@/stores/filter-store';
import { useParams } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { WidgetType } from '@/lib/types/widget-type';

interface VersionContentProps {
  children: ReactNode;
  version: 'short' | 'long';
}

export const VersionContent = ({ children, version }: VersionContentProps) => {
  const { getActiveFilters } = useFilterStore();
  const { widgetId } = useParams({ strict: false });

  // Get the content version for the current widget only
  const filters = getActiveFilters(widgetId as WidgetType);
  const selectedVersion = (filters.contentVersion as 'short' | 'long') || 'long';

  if (selectedVersion === version) {
    return <>{children}</>;
  }

  return null;
};
