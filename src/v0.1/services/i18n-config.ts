import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/common.json';
import es from '../locales/es/common.json';
import pt from '../locales/pt/common.json';

const supportedLanguages = ['en', 'es', 'pt'];

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: 'es',
  defaultNS: 'common',
  ns: ['common'],
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      common: en,
    },
    es: {
      common: es,
    },
    pt: {
      common: pt,
    },
  },
});

export default i18n;
