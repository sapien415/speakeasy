/**
 * The tour speaks English and French (Canada), like the rest of the site.
 *
 * The language arrives in the URL — the parent page appends `?lang=fr` to the
 * iframe (see js/site.js) — and every string is written as `L(english, french)`
 * so both versions sit side by side wherever the copy lives.
 */

/* guarded: the data modules import this, and the unit tests run under node */
const search = typeof window === 'undefined' ? '' : window.location.search
const raw = new URLSearchParams(search).get('lang') ?? ''
export const LANG: 'en' | 'fr' = raw.toLowerCase().startsWith('fr') ? 'fr' : 'en'
export const isFR = LANG === 'fr'

/** Pick the copy for the current language. */
export function L<T>(en: T, fr: T): T {
  return isFR ? fr : en
}

/** Document-level bits the static index.html can't switch on its own. */
export function applyDocumentLang(): void {
  document.documentElement.lang = isFR ? 'fr-CA' : 'en'
  document.title = L(
    'Speakeasy Tapas Lounge — 3D Venue Tour',
    'Speakeasy Tapas Lounge — visite 3D de la salle',
  )
}
