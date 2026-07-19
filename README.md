# AbhinavInavolu.github.io

Source for [abhinavinavolu.github.io](https://abhinavinavolu.github.io/), a static portfolio
site built with [Next.js](https://nextjs.org) (static export) and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Produces a static export in `out/`. `next.config.js` sets `output: 'export'` and
`trailingSlash: true`, and `postcss.config.js` runs PurgeCSS against `src/**` and `public/**`
during the build.

## Deployment

Deployment is automatic: every push to `main` triggers `.github/workflows/deploy.yml`, which
builds the site and publishes `out/` to GitHub Pages via GitHub Actions. No manual deploy step
or cross-repository credentials are required. The workflow can also be run manually from the
Actions tab (`workflow_dispatch`).

Pages must be configured with **Settings > Pages > Build and deployment > Source: GitHub
Actions**.
