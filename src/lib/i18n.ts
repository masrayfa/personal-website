import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import id from './locales/id';
import de from './locales/de';
import fr from './locales/fr';
import es from './locales/es';
import it from './locales/it';

export const resources = {
  en: { translation: en },
  id: { translation: id },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
} as const;

i18next
  .use(initReactI18next) //
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
