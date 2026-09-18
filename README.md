# Under One Roof — Gwinnett County landing page

Static HTML/CSS/JavaScript site. No build dependencies. Run `python -m http.server 8123` and open http://localhost:8123.

## Included
- Repository logo, blue/lime identity, responsive layout modeled on the Ozarks landing-page section order.
- 25-year written warranty and financing messaging; no invented financing rates or monthly payments.
- Local, rebranded floor visualizer adapted from the supplied OCCLandingPage source. All 27 swatches, textures and the garage reference photo are hosted in `assets/`. The rendering engine remains intact.
- Calculator: decorative flake $6–$8/sq. ft.; metallic $14–$16/sq. ft., as supplied by Stephen. No minimum or additional charges were supplied; final quote requires inspection. Rates live at the top of `app.js`.
- Estimate form includes calculated range, project type, selected color, slab notes and financing interest.

## Type and theme
Headlines and numerals use Bebas Neue; labels, buttons and eyebrows use Barlow Condensed; body copy uses Barlow. All three load from Google Fonts in the `<head>` of `index.html`, `visualizer.html`, `privacy.html` and `thank-you.html`, with system fallbacks in the `--display` / `--cond` / `--body` variables in `styles.css`. The visualizer iframe was re-themed from the Ozarks red to the Under One Roof blue and lime so the embed matches the page around it.

## Calculator
`#calculator` is a single live panel: project type, square footage (presets plus a free entry), coating finish, and two slab-context selects. The range updates on every change, with no contact-information gate — the page states that, so keep it that way unless the owner asks otherwise.

Concrete condition and layout are collected **for the estimate only and deliberately do not change the price**. No repair, minimum or trip charges were supplied, so inventing multipliers would put fabricated numbers in front of customers. If the owner supplies real multipliers later, apply them in `app.js` next to `RATES`, and remove the "these don't change the range" hint from `index.html`.

Verified behavior: the math is area × rate for both finishes; non-integer, zero, negative and over-100,000 entries drop the panel into its invalid state; the "Get my free on-site estimate" button refuses to jump to the form until the area is valid; reset restores the defaults; and every valid state syncs the hidden lead fields and the summary chip on the estimate form.

## Photography
- `assets/garage.webp`, `patio.webp`, `pool.webp`, `commercial.webp`: Under One Roof's own photos, downloaded from under1roofservices.com. These carry the services grid and the "Our crew. Your concrete." gallery.
- `assets/hero.webp`: finished-floor shot used in the hero and the calculator side rail, credited on-page as finish inspiration supplied by The Farm Media.
- The six Ozarks Concrete Coatings installation photos (`glacier.jpg`, `domino.jpg`, `nightfall.jpg`, `orbit.jpg`, `creekbed.jpg`, `coyote.jpg`) have been **removed** — another company's installs no longer appear anywhere on the page. They remain in git history if needed.
- `pool.webp` is only 294×196 and is visibly the softest tile in the gallery. Replace it with a full-resolution original when one is available.
- Named color previews now live only inside the visualizer, which uses genuine flake swatch and texture images rather than job photos.

To add more of the company's own photography, drop full-resolution files into `assets/` and swap the `src` attributes in the `.service-grid` and `.work-grid` blocks of `index.html`; both grids crop with `object-fit:cover`, so any landscape aspect ratio works.

## Sales-call demo
This build is a sales-call demo, not a public launch. Submitting the form only displays a demo confirmation. No data is transmitted. The native dialog method also prevents submission if JavaScript is disabled.

## Future deployment and lead delivery
After approval, wire up a real backend and deploy the repository as a static Netlify site (publish directory `.`; no build command). Enable Netlify form detection and configure estimate-form email notifications to the owner before sending traffic. Test a real submission and verify delivery in the owner's inbox. No form delivery or hosting account has been configured from this repository alone. The form deliberately reports preview mode on localhost rather than claiming delivery.

On a different host, replace the form submission handler with that host's confirmed backend. The form is designed for Netlify, not arbitrary static hosting. The current phone is (404) 470-3497, taken from the existing website's primary header/footer. Confirm the phone and warranty terms with the owner before launch.

## Known cosmetic issue
The visualizer requests `visualizer-previews/<color>.jpg` before falling back to the live canvas compositor. That directory is not in the repository, so every color selection logs one 404 in the console. The fallback is silent to the customer and the preview still renders. Pre-render that directory with the same compositor to remove the 404 and speed up color switching on phones.

## Asset sources
- `under1roof-r.png`: original supplied repository logo.
- `garage.webp`, `patio.webp`, `pool.webp`, `commercial.webp`: downloaded from under1roofservices.com, October 2024 media uploads.
- Visualizer source: thefarmmedia/OCCLandingPage/visualizer-embed.html; referenced swatches/textures and garage photo downloaded from ozarkconcretecoatings.com to remove runtime dependency on another company's website.
- Blue #006ab5 and lime #b4ed24 are selected to match the supplied logo. No review counts or testimonials from another company are used.
