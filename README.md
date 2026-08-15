# Speakeasy Tapas Lounge — website

A cinematic, multi-page site for **Speakeasy Tapas Lounge** · 55 York Street, ByWard Market, Ottawa · ☎ 613-241-6221.
The home page opens with the house crest whispering **“Shhh…”**, then art-deco doors swing open into the room.

> **“This must be the place.”**

Built as a **zero-build static site** — plain HTML, CSS and vanilla-JS ES modules. No framework, no bundler for the
main site. Host the folder anywhere (GitHub Pages, Netlify, any web server) or open `index.html` directly.

The whole site is **bilingual — English and French (Canada)**. An **EN · FR** switch sits in the header on every page;
see [Français / English](#français--english).

---

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home — “shhh” door intro, hero, about, the six **stamps**, house signatures, 3D-tour teaser, gallery |
| `drinks.html` | The Bar — blue-cocktail hero, 13 signature cocktails, wine, local draught |
| `menu.html` | The Menu — one page, **toggle** between **Shareables · Dinner · Desserts** (also deep-links: `menu.html#dinner`) |
| `events.html` | Events — **swipe yes/no** on each event, like a dating app; saved nights → call / add-to-calendar |
| `private.html` | Private Events — the four hosting packages |
| `tour.html` | **3D Venue Tour** — the walkable 3D room embedded in an iframe |
| `visit.html` | Visit & Reserve — live open/closed badge, hours, map, contact + newsletter |

The header, footer and ambient layers are injected on every page by `js/site.js`, so there’s one source of truth for nav.

```
css/styles.css      design system + every animation
js/i18n.js          the EN · FR layer: language choice, the switch, applying translations
js/fr.js            every French string, one key per line — the file you edit to change French copy
js/site.js          shared: header/footer inject, nav, reveals, 3D tilt, menu tabs,
                    forms, live hours badge, toast
js/intro.js         home only: “shhh” doors, draggable crest coin, hero parallax, gallery/lightbox
js/events.js        events page: the swipe deck (+ .ics export), English & French line-up
assets/
  logo.png, favicon*, apple-touch-icon.png, og-image.jpg
  fonts/            self-hosted web fonts + fonts.css
  img/              photos, posters, and img/stamps/ (the six wax-seal badges)
  video/            real venue footage (webm + mp4) used as page backgrounds
tour/               the built, self-contained 3D venue tour (served as-is)
tour-src/           source for the 3D tour (React + three.js) — only needed to rebuild it
.nojekyll           lets GitHub Pages serve the files unchanged
```

---

## The interactive bits

- **Intro** (home) — the crest whispers “Shhh…”, then doors swing open. Plays once per browser session, honours
  `prefers-reduced-motion`, and is skippable (Skip → / `Esc` / tap). *Timing lives in `css/styles.css` (`.door`
  transition + `.intro__shh` delays) and `js/intro.js` (auto-open delay).*
- **Stamps** — the six red seals on the home page link to the matching pages.
- **Draggable 3D coin** in the hero, **3D tilt** on cards, restrained scroll reveals. (No particle effects —
  atmosphere comes from typography, hairline rules and negative space.)
- **Menu tabs** — Shareables / Dinner / Desserts on one page.
- **Swipe events** — drag a card (or use ✕ / ♥, or ← → keys). Swipe right saves the night; at the end you can call to
  reserve or download an `.ics`.
- **3D tour** — the walkable venue, embedded from `tour/`. The **setup switcher** re-loads the room as
  Intimate Dining / Cocktail Reception / Artistic Showcase via `?layout=`, and the **booking form** below composes
  a private-event request.
- **Video backgrounds** — real footage of the room (home), the stage (events) and the pass (menu). Each is muted,
  looping, `playsinline`, with a poster fallback and disabled under `prefers-reduced-motion`.
- **Live hours badge** (visit) — “Open now / Closed” computed in real time for Ottawa (America/Toronto),
  in English (`4 PM – 10:30 PM`) or French (`16 h – 22 h 30`).
- **EN · FR switch** — in the header of every page, and in the mobile menu. See below.
- **Easter egg** — click the footer crest three times. 🤫

---

## Français / English

Every page, the injected header and footer, the swipe deck, the forms, the live hours badge and the 3D tour
are available in **English** and **French (Canada)**.

**How the language is chosen**, in order:

1. `?lang=fr` (or `?lang=en`) in the URL — shareable, and what the `hreflang` tags and `sitemap.xml` point at;
2. the visitor’s saved choice (`localStorage`, set the moment they use the switch);
3. their browser language — a French browser lands on the French site by itself;
4. otherwise English.

Switching is instant: no reload, no second copy of the site, and the URL updates so the page can be shared as-is.
English lives in the HTML exactly as before, so if a French string is ever missing, that one line falls back to
English instead of breaking.

**Where the French copy lives**

| What | Where |
|------|-------|
| Every page’s French text | `js/fr.js` — one key per line, grouped by page |
| The machinery (choice, switch, applying it) | `js/i18n.js` |
| Events line-up | the `fr:` block inside each event in `js/events.js` |
| 3D tour | `tour-src/src/**` — written as `L('English', 'Français')`, then rebuilt (see below) |

**To change a French string**, edit its value in `js/fr.js`. **To translate new copy**, tag the element in the HTML
and add the matching key:

```html
<p data-i18n="visit.know7.d">Valet parking on Fridays.</p>          <!-- plain text -->
<h2 data-i18n-html="home.about.title">Pull Up a<br><em>Seat.</em></h2>  <!-- text with markup -->
<img data-i18n-attr="alt=home.host.imgAlt" src="…" alt="The doorman"/> <!-- attributes -->
```

```js
// js/fr.js
'visit.know7.d': 'Service de voiturier le vendredi.',
```

**Canadian conventions** are handled for you: prices flip from `$18` to `18 $` (in `css/styles.css`), times from
`10:30 PM` to `22 h 30`, and day names, the open/closed badge and the `.ics` calendar export all follow the language.
A price that writes its own unit (`3.5 ea`) uses `class="price price--txt"` and is translated as a whole string.

**Not translated:** proper names (the venue, cocktail names such as *Corpse Reviver #2*, wine and beer producers),
the Google/Instagram/OpenTable destinations, and the JSON-LD block in `index.html` — search engines want that one
in a single language.

---

## Editing the content

Everything is hand-editable — no database.

- **Menus & cocktails** — edit the item blocks in `drinks.html` / `menu.html`. `<span class="price">18</span>` renders as
  **$18** automatically (**18 $** in French). Give a new dish a `data-i18n` key and add the French to `js/fr.js`.
- **Events** (the swipe deck) — edit the `EVENTS` array at the top of `js/events.js`. A card shows a photo if it has
  `img`, or the matching wax-seal stamp if it has `art`. Give each new event an `fr:` block (`kicker`, `title`,
  `when`, `meta`, `blurb`) so it reads in both languages.
- **Business hours & the “Open now” badge** — edit the single `SCHEDULE` object in `js/site.js` (minutes from midnight;
  `24*60` = midnight; `null` = closed). The badge and the hours table both read from it.
- **Gallery** — currently an empty “photographs coming soon” state. To fill it, drop `<figure class="gcard">` blocks
  into `<div class="gallery__grid" id="galleryGrid">` in `index.html` (set `data-full`, `src`, `alt`, `data-caption`,
  `data-cat`); the placeholder hides itself automatically once the grid has children. You may also re-add the
  filter chips above it.
- **Photos** — drop a JPG into `assets/img/` and point the matching `<img src>` at it. Current photos: `interior.jpg`,
  `tuna-tartare.jpg`, `rigatoni-bolognese.jpg`, `storefront.jpg`, `blue-lagoon.jpg`, `event-15-first-dates.jpg`.
- **Fonts** — swap the files in `assets/fonts/` and the `@font-face` rules in `assets/fonts/fonts.css`. The site uses
  **Cinzel** (display) and **Cormorant Garamond** (body/italic accents). No script/cursive faces —
  the elegance comes from letter-spacing and scale.
- **Contact / newsletter forms** — they validate and confirm in the browser (contact also opens a pre-filled email).
  To capture submissions, wire each `<form>` in `js/site.js` to Formspree / Netlify Forms / Supabase and update the
  fallback address.

---

## Rebuilding the 3D tour (only if you change `tour-src/`)

```bash
cd tour-src
npm install
npm run artifact          # → tour-src/dist/index.html (self-contained)
cp dist/index.html ../tour/index.html
```

The tour build is relocatable (`base: './'`) and inlines everything, so `tour/` works from any host or inside the iframe.
Deep links: `tour/index.html?layout=cocktail&autoenter`, and `?lang=fr` for French — `tour.html` appends it to the
iframe automatically, so the tour always matches the language of the page around it. Its copy is written inline as
`L('English', 'Français')` in `tour-src/src/` (`i18n.ts` picks the language); **any new string needs both**, then a
rebuild.

---

## Notes / assumptions to confirm

Menu/bar copy follows the supplied inventory, with a few details filled in — please review:

- **Cocktails** — the 10 named signatures plus three era-appropriate pours (French 75, Boulevardier, Clover Club) to reach
  the stated **13**. Ingredients and prices ($15–18) are placeholders.
- **Wine & beer** — representative selections with sample prices (local Ottawa draughts named).
- **Dish prices** — chosen inside the given ranges (Dinner $26–48, Desserts $12–18).
- **Hours** — modelled as Tue–Thu 4–10:30 PM, Fri–Sat 4 PM–Midnight, Sun–Mon closed. Adjust in `SCHEDULE`.
- **`interior.jpg`** (still used in the About block) is as supplied, including its “AI-generated content”
  watermark. The hero now uses real video instead.
- **Events** — the **15 First Dates** night (Jul 26) is real; the recurring nights are placeholders to edit.
- **French** — the translation is idiomatic Canadian French (*souper*, *fin de semaine*, *courriel*, `18 $`, `19 h`).
  Dish and cocktail descriptions were translated, not transliterated; have a native speaker on staff read the menu
  pages once before launch, since food copy is where house wording matters most.

---

## Running & deploying

**Locally:** any static server, e.g. `python3 -m http.server 8000` → http://localhost:8000

**GitHub Pages:** push and enable Pages on the branch (the included `.nojekyll` keeps the layout intact). Drop-in ready
for Netlify, Vercel or Cloudflare Pages too.

## Google reviews & Instagram (home page)

Both sections are in `index.html`.

- **Reviews** — the rating (`#gRating`), the star row and the three `<blockquote class="quote">` cards are
  **placeholders**. Paste your real rating and real review text from your Google Business Profile, and set the
  `placeid` on the "Leave a review" link (`https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`).
  Do not leave the placeholder quotes live — they are marked as such on the page.
- **Instagram** — the six tiles link to your profile. Replace the `https://www.instagram.com/` hrefs with your real
  handle, and swap the tile images for your latest posts. For a live feed, use a widget (Behold, EmbedSocial,
  Elfsight) or the Instagram Basic Display API and render into `.insta__grid`.
