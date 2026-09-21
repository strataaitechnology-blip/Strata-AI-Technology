# STRATA Technologies — Website

Production-ready marketing site for STRATA Technologies, built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Lucide React** and **next-themes**.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                   # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.
Requires Node.js 20.9 or newer. Fonts (Sora, Instrument Sans) are downloaded and self-hosted by `next/font` at build time, so the first build needs internet access.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL. Used for canonical URLs, Open Graph, sitemap, robots and JSON-LD. **Set it at build time.** |
| `NEXT_PUBLIC_CONTACT_EMAIL / PHONE / ADDRESS` | Shown in the contact section; email and phone are added to JSON-LD only when set. |
| `NEXT_PUBLIC_LINKEDIN_URL / FACEBOOK_URL / INSTAGRAM_URL / X_URL` | Footer social links and JSON-LD `sameAs`. Empty = dashed placeholder icon. |
| `CONTACT_PROVIDER` | `none` (default), `console` (dev only) or `resend`. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Required when `CONTACT_PROVIDER=resend`. |

## Contact form

`ContactForm` → `POST /api/contact` → `getContactProvider()` (`src/lib/contact`). Validation is shared between browser and server. With `CONTACT_PROVIDER=none` the form honestly reports that delivery is not configured — it never claims an email was sent. To add another service (SendGrid, Postmark, SMTP, a CRM…), implement `ContactProvider` in `src/lib/contact/providers` and register it in `src/lib/contact/index.ts`. The rate limiter is in-memory; use a shared store on serverless hosting. The Resend provider has not been tested against a live account.

## Replacing placeholder content

All content lives in `src/data` and `src/config` — no component edits needed.

- `projects.ts`, `team.ts`, `testimonials.ts`: entries are marked `isPlaceholder: true` and show a "Placeholder" badge. Replace the content and set the flag to `false`. Placeholder case studies are `noindex` and excluded from the sitemap.
- `legal.ts`: privacy and terms are **templates**. Fill the `[bracketed]` items and have them reviewed by a legal professional.
- `public/images/projects/*.svg`: placeholder previews — replace with real images.

## Structure

```
src/app          routes, metadata, sitemap, robots, API route, error/loading/404
src/components   layout · sections · ui · animations
src/data         typed content (services, solutions, projects, team, faqs…)
src/config       site + social configuration
src/lib          seo, structured data, contact providers, utilities
src/types        shared TypeScript types
```

Theming is token-based (`src/app/globals.css`): light and dark are separate designed palettes, plus a `.force-dark` band used by the footer and feature sections.
