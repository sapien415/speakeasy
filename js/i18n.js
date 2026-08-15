/* =========================================================================
   SPEAKEASY — bilingual layer (English · français)

   English lives in the HTML, exactly as before. French lives in js/fr.js,
   keyed by the `data-i18n*` attributes sprinkled through the markup:

     <p data-i18n="home.lead">…</p>              → replaces the text
     <h2 data-i18n-html="home.title">…</h2>      → replaces the markup (<br>, <em>…)
     <img data-i18n-attr="alt=home.img.alt">     → replaces attributes
                (several: "alt=key, title=other.key")

   The original English is remembered the first time an element is touched,
   so switching back to English restores the page without a reload.

   Loaded as a module in <head> on every page, so it runs before js/site.js.
   ========================================================================= */
'use strict';

import FR from './fr.js';

export const LANGS = ['en', 'fr'];
const DICTS = { fr: FR };
const STORE_KEY = 'se_lang';

/* ---------- which language? ?lang=fr › saved choice › browser › English ---------- */
function detect() {
  const qs = new URLSearchParams(location.search).get('lang');
  if (qs && LANGS.includes(qs.toLowerCase())) return qs.toLowerCase();
  let saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (_) { /* private mode */ }
  if (saved && LANGS.includes(saved)) return saved;
  return (navigator.languages || [navigator.language || 'en'])
    .some(l => String(l).toLowerCase().startsWith('fr')) ? 'fr' : 'en';
}

let lang = detect();
export const getLang = () => lang;

/* ---------- lookup ---------- */
export function t(key, fallback = '') {
  const dict = DICTS[lang];
  if (!dict) return fallback;                 // English: the source text wins
  const val = dict[key];
  return val == null ? fallback : val;
}

/* ---------- original-English memory ---------- */
const originals = new WeakMap();               // el → { text, html, attrs:{} }
const remember = (el) => {
  let o = originals.get(el);
  if (!o) { o = { attrs: {} }; originals.set(el, o); }
  return o;
};

function applyTo(el) {
  const o = remember(el);

  const textKey = el.dataset.i18n;
  if (textKey) {
    if (o.text === undefined) o.text = el.textContent;
    el.textContent = t(textKey, o.text);
  }

  const htmlKey = el.dataset.i18nHtml;
  if (htmlKey) {
    if (o.html === undefined) o.html = el.innerHTML;
    el.innerHTML = t(htmlKey, o.html);
  }

  const attrSpec = el.dataset.i18nAttr;        // "alt=key, placeholder=other.key"
  if (attrSpec) {
    attrSpec.split(',').forEach(pair => {
      const [attr, key] = pair.split('=').map(s => s && s.trim());
      if (!attr || !key) return;
      if (o.attrs[attr] === undefined) o.attrs[attr] = el.getAttribute(attr) || '';
      el.setAttribute(attr, t(key, o.attrs[attr]));
    });
  }
}

/** Translate `root` (and everything under it) into the current language. */
export function apply(root = document) {
  const sel = '[data-i18n], [data-i18n-html], [data-i18n-attr]';
  if (root.matches?.(sel)) applyTo(root);
  root.querySelectorAll?.(sel).forEach(applyTo);
  document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en';
}

/** Switch language: re-translate the page and tell everyone who cares. */
export function setLang(next, { push = true } = {}) {
  if (!LANGS.includes(next) || next === lang) return;
  lang = next;
  try { localStorage.setItem(STORE_KEY, lang); } catch (_) { /* private mode */ }
  if (push) {
    const url = new URL(location.href);
    if (lang === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  }
  apply();
  dispatchEvent(new CustomEvent('se:lang', { detail: { lang } }));
}

/* Remember a language arriving by ?lang=… so it survives the next click. */
if (new URLSearchParams(location.search).get('lang')) {
  try { localStorage.setItem(STORE_KEY, lang); } catch (_) { /* private mode */ }
}

/* ---------- the EN · FR switch, injected into the header + mobile menu ---------- */
export function switcherHTML(variant = 'nav') {
  const btn = (code, label, full) =>
    `<button type="button" class="lang__btn${code === lang ? ' is-active' : ''}" data-lang="${code}"` +
    ` lang="${code}" aria-label="${full}"${code === lang ? ' aria-current="true"' : ''}>${label}</button>`;
  return `<div class="lang lang--${variant}" role="group" aria-label="${t('nav.language', 'Language')}">`
    + btn('en', 'EN', 'English') + '<span class="lang__sep" aria-hidden="true">·</span>' + btn('fr', 'FR', 'Français')
    + '</div>';
}

/** Wire every switcher on the page (once) and keep the active pill in sync. */
export function wireSwitchers() {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    if (btn.dataset.langReady) return;
    btn.dataset.langReady = '1';
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  const sync = () => document.querySelectorAll('[data-lang]').forEach(btn => {
    const on = btn.dataset.lang === lang;
    btn.classList.toggle('is-active', on);
    if (on) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
  });
  addEventListener('se:lang', sync);
  sync();
}

/* Translate whatever is already in the document as early as possible. */
apply();
