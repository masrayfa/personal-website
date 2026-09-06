import { createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './lib/theme-provider';

// Create a new router instance
export const getRouter = () =>
  createRouter({
    routeTree,
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => (
      <ThemeProvider>{props.children}</ThemeProvider>
    ),
  });