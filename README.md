# My Blog

## Firebase comments configuration

The Google/Facebook comments widget relies on Firebase Authentication and Firestore. Deployments will show a warning panel or fail to sign users in unless the following steps are completed:

1. Create or reuse a Firebase project and enable both **Firestore** and **Authentication**.
2. Under **Authentication → Sign-in method**, enable the **Google** and **Facebook** providers. Facebook requires an App ID/secret and you must copy the OAuth redirect URI that Firebase shows back into the Facebook console.
3. Under **Authentication → Settings → Authorized domains**, add every origin that will host the site (e.g., `localhost`, `127.0.0.1`, production domains, GitHub Pages URL).
4. Generate a Web App config from Firebase and copy the values into an `.env.local` file using the following keys:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

> `.env.local` is ignored by git; do **not** commit your real credentials.

5. Restart `npm run dev` (or rebuild in CI) whenever these values change so Next.js can inline them for the client bundle.

If sign-in still fails, open the browser console to read the exact Firebase error code. The UI now surfaces the most common failure causes (popup blocked, unauthorized domain, provider mismatch, etc.) so you can correct the Firebase console settings without digging through logs.

## GitHub Pages deployment checklist

Static export is already enabled via `next.config.mjs` (`output: 'export'`). Use the following workflow whenever you want to publish an update:

1. **Install dependencies**
	```bash
	npm install
	```
	Ensure `.env.local` exists before the next step so Firebase keys are inlined during the build.

2. **Build the static site**
	```bash
	npm run build
	```
	This produces an `out/` directory containing HTML/CSS/JS that GitHub Pages can host. Delete any previous `out/` before copying to avoid stale files.

3. **Publish to the `gh-pages` branch**
	```bash
	git checkout --orphan gh-pages
	rm -rf .
	cp -R ../myblog/out/* .
	touch .nojekyll
	git add .
	git commit -m "Deploy static export"
	git push -f origin gh-pages
	git checkout main
	```
	- Keep a `CNAME` file inside `public/` so it is copied into `out/` and your custom domain remains linked in Pages.
	- `.nojekyll` prevents GitHub Pages from stripping the `_next` folder.

4. **Configure GitHub Pages**
	In the repository → **Settings → Pages**, choose **Deploy from a branch**, select `gh-pages`, and set the folder to `/`. Save the change. Pages will serve the contents of that branch at `https://<username>.github.io/<repo>` (or your custom domain if DNS is already configured).

5. **Update DNS/custom domain**
	If you use a custom domain, keep the DNS `CNAME` pointing to `<username>.github.io`. GitHub will read the `CNAME` file from the deployment and issue certificates automatically.

Repeat steps 2–3 for future releases. Only the compiled `out/` directory belongs on `gh-pages`; all source code and history remain on `main`.
