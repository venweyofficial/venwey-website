# Venwey website — Astro + TypeScript + Tailwind CSS

Port of the original static site (HTML/CSS/JS) to Astro. Markup, styles, assets and
behaviour are carried over unchanged.

## Run
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-checks, then writes ./dist
npm run preview
```

## Structure
- `src/pages/` – `index`, `privacy-policy`, `terms`, `disclaimer` (built as `*.html`, same URLs as before)
- `src/layouts/` – `BaseLayout` (head/fonts/meta), `LegalLayout` (legal page shell)
- `src/components/` – Header, Hero, About, Capabilities, Vision, Approach, Contact, Footer, WhatsAppFloat
- `src/scripts/main.ts` – mobile nav, service preselect, mailto contact form, footer year (typed port of `script.js`)
- `src/styles/global.css` – Tailwind v4 + brand tokens (`@theme`) + the original stylesheet, preserved verbatim
- `public/assets/` – logos, favicon, W mark (swap files here, same names)

## Tailwind notes
Brand colours/fonts are Tailwind theme tokens (`bg-gold`, `text-ink`, `font-heading`, …) and utilities
work in any `.astro` file. The original stylesheet is kept as-is in the `components` layer (utilities
override it), and Tailwind's preflight reset is deliberately not loaded so nothing shifts visually.
New work can use utility classes; existing rules can be migrated gradually.

## Brand
Gold #FDB924 · Ink #231F20 · Deep Amber #C98B0F · Warm Ink #3A3634 · Stone Grey #B1B0B0 · Cream #FFF6E4
Headings: Space Grotesk · Body: Sora

Contact form opens the visitor's email app (venweyofficial@gmail.com). WhatsApp: +91 9496011781.
