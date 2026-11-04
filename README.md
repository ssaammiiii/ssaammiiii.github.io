# Samia Soleimani

Personal site, live at https://ssaammiiii.github.io.

Built with Next.js (App Router, static export), Tailwind CSS v4 and Motion.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The static site is written to `out/`. Pushing to `main` builds and deploys it through `.github/workflows/deploy.yml` (Pages source must be set to **GitHub Actions**).

## Where things live

- `lib/content.ts`: experience, honours and links
- `components/sections/`: page sections
- `components/illustrations/`: animated SVG illustrations
- `components/signspeak/`: the interactive glove playground
- `public/`: CV and photo
