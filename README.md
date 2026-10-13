# Getting Out — promo site

React 18 + TypeScript + Vite 6 + React Router 7, built from the Hisense scaffold.
Design: Paper file "Getting Out v3", page **Promo**.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # → dist/
```

## Where things live

- `src/app/content/site.ts` — every fact: brand, email, App Store ID, features, FAQ. Values marked `PLACEHOLDER` still need real data (App Store ID → refresh from `https://itunes.apple.com/lookup?id=<ID>`).
- `src/app/content/legal.ts` — Privacy Policy and Terms of Use **verbatim** from the owner. Only markup changed (`## ` headings, `- ` lists). Never edit the wording.
- `public/images/` — always referenced through `img()` from `src/app/utils/img.ts`.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds with pnpm and copies `index.html` to `404.html` for client routing.
`base` in `vite.config.ts`: `/` with a custom domain (and `public/CNAME`), `/<repo>/` without one — a wrong `base` gives a white screen.

## Reveal rule

Scroll reveals use CSS transitions driven by `utils/useReveal.ts`. Its fallbacks are gated on real geometry, so content is never left hidden and the page never plays every animation on load. Keep it.
