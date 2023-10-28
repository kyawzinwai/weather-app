import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-http-backend';

import enTranslation from '../locales/en.json';
import viTranslation from '../locales/vi.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      vi: { translation: viTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      order: ['cookie', 'htmlTag', 'navigator'],
      caches: ['cookie'],
    },
  });

export default i18n;
