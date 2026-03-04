import { browser } from '$app/environment';
import { derived } from 'svelte/store';
import { init, register, locale, _ } from 'svelte-i18n';

const LOCALE_KEY = 'cplq-locale';

register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));
register('es', () => import('./locales/es.json'));
register('qya', () => import('./locales/qya.json'));

export function setupI18n() {
  const savedLocale = browser ? (localStorage.getItem(LOCALE_KEY) ?? 'fr') : 'fr';
  init({ fallbackLocale: 'fr', initialLocale: savedLocale });
}

// Persiste le changement de langue
if (browser) {
  locale.subscribe((value) => {
    if (value) localStorage.setItem(LOCALE_KEY, value);
  });
}

// Locale Intl pour les dates
export const dateLocale = derived(locale, ($l) => {
  return { fr: 'fr-FR', en: 'en-US', es: 'es-ES', qya: 'en-GB' }[$l] ?? 'fr-FR';
});

export { locale, _ };
