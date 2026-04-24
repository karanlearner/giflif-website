# giflif-website

The marketing website for **GIFLIF Fest** — a creative consultancy and IP builder.

> **Positioning:** We build cultural IPs. For brands. And our own.
> **IPs we own:** The Great Indian Film & Literature Festival · Indiestaan Music Festival.
> **Consultancy:** Creative curation · Audience intelligence · Production.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (brand tokens in `app/globals.css`)
- **Fonts:** Fraunces (serif, editorial) · Geist (sans)
- **Motion:** Framer Motion + GSAP (to be added)
- **Hosting:** Vercel (Hobby)
- **CMS:** Sanity (to be wired up)
- **Video:** Mux (to be wired up)

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `red` | `#B3121A` | Primary — CTAs, accents |
| `cream` | `#FAF4EA` | Text on dark, soft backgrounds |
| `ink` | `#1A1A1A` | Dark backgrounds, primary text |
| `accent` | `#E87722` | Reserved for Audience Intelligence callouts |

## Local dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Auto-deploys to Vercel on every push to `main`. Preview URL updates in ~30 seconds.

## Source of truth

- **Design spec:** `../docs/superpowers/specs/2026-04-24-giflif-website-design.md`
- **Structure workbook:** `../GIFLIF_Website_Structure.xlsx`
