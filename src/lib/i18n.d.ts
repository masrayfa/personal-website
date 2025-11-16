import 'i18next';
import { resources } from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    // This provides autocomplete for all your translation keys
    resources: (typeof resources)['en'];
  }
}
