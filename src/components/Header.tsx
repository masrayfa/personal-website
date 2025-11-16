import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">{t('nav.home')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/start/server-funcs">{t('nav.serverFunctions')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/start/api-request">{t('nav.apiRequest')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/examples/demo/neon">{t('nav.neon')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">{t('nav.tanstackQuery')}</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/store">{t('nav.store')}</Link>
        </div>
      </nav>

      <LanguageSwitcher />
    </header>
  );
}
