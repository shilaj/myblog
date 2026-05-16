# Shilaj Baral — Personal Site

Next.js 16 (static export) → GitHub Pages. Custom domain: **shilaj.com.np**.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy

Just push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to GitHub Pages automatically.

```bash
git add .
git commit -m "Update content"
git push origin main
```

Watch the build at `https://github.com/shilaj/myblog/actions`. The site is live at https://shilaj.com.np once the green check appears (usually ~2 min).

## One-time setup (done already, here for reference)

1. **Repo → Settings → Pages → Source: "GitHub Actions"** (not "Deploy from a branch").
2. **Repo → Settings → Pages → Custom domain: `shilaj.com.np`** (the workflow keeps the `CNAME` from `public/CNAME`).
3. (Optional) For Firebase comments to work in production, add these secrets under
   **Repo → Settings → Secrets and variables → Actions → New repository secret**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

   Without these the comment widgets stay disabled, but the rest of the site works fine.

## Adding content

- **Blog post:** drop a Markdown file in `content/blogs/<slug>.md` with frontmatter `title`, `date`, optional `excerpt`/`tags`.
- **Poem:** drop a Markdown file in `_posts/<slug>.md` with frontmatter `title`, `date`, optional `subtitle`/`tags`.
- **Project:** drop a Markdown file in `content/projects/<slug>.md` with frontmatter `title`, `summary`, optional `tags`/`image`/`link`/`repo`/`embedPath`.
- **Publications / CV / Talks / Hobbies intro:** edit the relevant file in `content/`.
- **Home bio (EN/NE/KO):** edit `content/home.md`, `content/home.ne.md`, `content/home.ko.md`.

Then commit & push — no build step needed locally.

## Project structure

```
app/                  # Next.js routes (App Router)
components/           # React components (Nav, Footer, etc.)
content/              # Markdown content
_posts/               # Poetry notebooks
public/               # Static assets — CNAME, profile.jpg, /assets/*
.github/workflows/    # CI: deploy.yml builds & publishes the site
next.config.mjs       # Static-export config
tailwind.config.ts    # Tailwind theme
```

## If something goes wrong

- **Build fails in Actions:** open the failed run on GitHub, click the `build` job to see the error. Fix locally with `npm run build`, push again.
- **Domain stops resolving:** confirm your DNS still points `shilaj.com.np` at GitHub Pages and `public/CNAME` still says `shilaj.com.np`.
- **Pages serves the wrong source:** check Repo → Settings → Pages is set to *GitHub Actions*, not *Deploy from a branch*.

## Local build (optional)

If you want to verify before pushing:

```bash
npm run build        # outputs to ./out
OR npx -y -p node@20 -- npm run build
npx serve out        # preview locally
```
