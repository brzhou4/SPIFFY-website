# SPIFFY — STEAM For All

Marketing site for **SPIFFY** (_STEAM Pays It Forward For the Youth_), a hands-on
club that turns complex STEAM ideas into interactive projects for young builders.

A smooth-scroll, single-page experience: an interactive WebGL hero, scroll-driven
photo galleries, the three signature workshops, animated impact stats, and a
contact section.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** build tooling
- **Tailwind CSS** (shadcn-style structure — UI primitives live in `src/components/ui`)
- **Three.js** — the interactive cybernetic grid shader in the hero
- **Framer Motion** — scroll-linked parallax & reveals
- **Lenis** — buttery smooth scrolling

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
public/photos/                 optimized event photos used in the galleries
src/
  components/
    ui/                        reusable primitives (cybernetic-grid-shader)
    sections/                  page sections (Hero, Mission, Workshops, …)
  hooks/use-lenis.ts           smooth-scroll setup
  lib/                         photo manifest + utils
  index.css                    theme tokens & utilities
```

## Theme

White · black · blue — matching the SPIFFY logo.

## Contact

- Email: yash.bhavani28@bcp.org
- Phone: 732-783-6191
- Address: 960 W. Hedding St, 95126
