/**
 * Detects the browser's preferred language and returns the best matching locale
 * from the available ones.
 */
export function getBrowserLocale(): string {
  const availableLocales = ['es', 'en', 'pt'];
  const defaultLocale = 'en';

  // Get browser language (e.g., 'es-ES', 'en-US', 'pt-BR')
  const browserLang =
    (typeof navigator !== 'undefined' &&
      (navigator.language || (navigator as any).languages?.[0])) ||
    'en';

  // Extract the primary language code (e.g., 'es' from 'es-ES')
  const primaryLang = browserLang.split('-')[0].toLowerCase();

  // Check if the primary language is available
  if (availableLocales.includes(primaryLang)) {
    return primaryLang;
  }

  // Fallback to default
  return defaultLocale;
}

/**
 * Handles the status text cycling on the redirect page
 */
export function initStatusCycler(
  elementId: string,
  phrases: string[]
): () => void {
  const statusText = document.getElementById(elementId);
  if (!statusText || !phrases || !phrases.length) return () => {};

  let i = 0;

  const interval = setInterval(() => {
    statusText.style.opacity = '0';

    setTimeout(() => {
      statusText.textContent = phrases[i];
      statusText.style.opacity = '1';
      i = (i + 1) % phrases.length;
    }, 300);
  }, 2300);

  // Return a cleanup function
  return () => clearInterval(interval);
}

/**
 * Applies translations to the redirect page elements and returns phrases for cycler
 */
export function applyLocalizedContent(
  locale: string,
  allTranslations: any
): string[] {
  if (!allTranslations) return [];

  const translations =
    allTranslations[locale]?.redirect_page ||
    allTranslations['en']?.redirect_page;
  if (!translations) return [];

  const titleElement = document.getElementById('redirect-title');
  const statusElement = document.getElementById('status-text');

  if (titleElement) titleElement.textContent = translations.title;
  if (statusElement) statusElement.textContent = translations.status;

  // Update document title and html lang
  document.title = `Key Protocol | ${translations.title}...`;
  document.documentElement.lang = locale;

  return translations.phrases || [];
}

/**
 * Main redirect logic
 */
export function performRedirect(delay: number = 2500): void {
  const locale = getBrowserLocale();

  setTimeout(() => {
    window.location.href = `/${locale}`;
  }, delay);
}
