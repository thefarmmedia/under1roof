# Under One Roof — Gwinnett County landing page

Static HTML/CSS/JavaScript site. No build dependencies. Run `python -m http.server 8123` and open http://localhost:8123.

## Included
- Repository logo, blue/lime identity, responsive layout modeled on the Ozarks landing-page section order.
- 25-year written warranty and financing messaging; no invented financing rates or monthly payments.
- Local, rebranded floor visualizer adapted from the supplied OCCLandingPage source. All 27 swatches, textures and the garage reference photo are hosted in `assets/`. The rendering engine remains intact.
- Calculator: decorative flake $6–$8/sq. ft.; metallic $14–$16/sq. ft., as supplied by Stephen. No minimum or additional charges were supplied; final quote requires inspection. Rates live at the top of `app.js`.
- Estimate form includes calculated range, project type, selected color and financing interest.

## Sales-call demo
This build is a sales-call demo, not a public launch. Submitting the form only displays a demo confirmation. No data is transmitted. The native dialog method also prevents submission if JavaScript is disabled.

## Future deployment and lead delivery
After approval, wire up a real backend and deploy the repository as a static Netlify site (publish directory `.`; no build command). Enable Netlify form detection and configure estimate-form email notifications to the owner before sending traffic. Test a real submission and verify delivery in the owner's inbox. No form delivery or hosting account has been configured from this repository alone. The form deliberately reports preview mode on localhost rather than claiming delivery.

On a different host, replace the form submission handler with that host's confirmed backend. The form is designed for Netlify, not arbitrary static hosting. The current phone is (404) 470-3497, taken from the existing website's primary header/footer. Confirm the phone and warranty terms with the owner before launch.

## Asset sources
- `under1roof-r.png`: original supplied repository logo.
- `garage.webp`, `patio.webp`, `pool.webp`, `commercial.webp`: downloaded from under1roofservices.com, October 2024 media uploads.
- Named gallery JPGs: user-authorized thefarmmedia/OCCLandingPage repository; visibly presented as finish inspiration, not Under One Roof installations.
- Visualizer source: thefarmmedia/OCCLandingPage/visualizer-embed.html; referenced swatches/textures and garage photo downloaded from ozarkconcretecoatings.com to remove runtime dependency on another company's website.
- Blue #006ab5 and lime #b4ed24 are selected to match the supplied logo. No review counts or testimonials from another company are used.
