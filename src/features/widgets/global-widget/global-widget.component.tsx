import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme-provider';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'id', label: 'ID', name: 'Indonesia' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'it', label: 'IT', name: 'Italiano' },
] as const;

const GlobalWidget = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageMenuOpen]);

  return (
    <div className="p-5 flex items-center justify-center gap-3">
      <div className="relative" ref={menuRef}>
        <Button
          type="button"
          variant={'outline'}
          className="px-4 py-2 cursor-pointer rounded-none border hover:bg-accent"
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        >
          <p className="text-sm font-mono">{currentLanguage.label}</p>
        </Button>

        {isLanguageMenuOpen && (
          <div className="absolute top-full mt-1 right-0 bg-background border rounded-none shadow-lg z-50 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${
                  i18n.language === lang.code ? 'bg-accent font-bold' : ''
                }`}
              >
                <span className="font-mono mr-2">{lang.label}</span>
                <span className="text-muted-foreground">{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

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
