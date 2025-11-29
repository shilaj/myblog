# Portfolio Preview Guide

Follow these steps to view the Next.js app locally and see the markdown-driven pages in your browser.

## Prerequisites
- Node.js 18+ (matching the Next.js 14 requirement)
- npm 9+ (bundled with recent Node versions)

## Install dependencies
From the project root:

```bash
npm install
```

> If you encounter registry access errors for optional packages, retry the install or set a reachable registry mirror.

## Run the development server
Start Next.js with hot reloading:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser. Content updates in `content/` markdown files will hot-reload automatically, including blog posts under `content/blogs/`.

## Build for production
To verify a production build locally:

```bash
npm run build
npm run start
```

The app will serve on the same port (default 3000) in production mode.
