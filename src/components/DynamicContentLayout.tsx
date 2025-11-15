import { ReactNode } from 'react';
import { LayoutType } from '@/stores/layout-store';
import { layoutConfigs } from '@/lib/types/layout-type';

interface DynamicContentLayoutProps {
  layoutType: LayoutType;
  children: ReactNode;
}

export const DynamicContentLayout = ({
  layoutType,
  children,
}: DynamicContentLayoutProps) => {
  const config = layoutConfigs[layoutType];

  // For grid layouts
  if (config.gridClasses) {
    return <div className={config.gridClasses}>{children}</div>;
  }

  // For list layouts
  if (config.itemClasses) {
    return <ul className={config.itemClasses}>{children}</ul>;
  }

  // Fallback
  return <div>{children}</div>;
};
