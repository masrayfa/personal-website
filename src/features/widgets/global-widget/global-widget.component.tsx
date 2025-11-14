import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme-provider';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const GlobalWidget = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="p-5 flex items-center justify-center gap-3">
      <Button
        type="button"
        variant={'outline'}
        className="px-4 py-2 cursor-pointer rounded-none border hover:bg-accent"
      >
        <p className="text-sm font-mono">EN</p>
      </Button>
      <Button
        type="button"
        variant={'outline'}
        className="px-4 py-2 cursor-pointer rounded-none border hover:bg-accent"
        onClick={toggleTheme}
      >
        {theme === 'dark' ? (
          <MdOutlineLightMode className="text-lg" />
        ) : (
          <MdOutlineDarkMode className="text-lg" />
        )}
      </Button>
    </div>
  );
};

export default GlobalWidget;
