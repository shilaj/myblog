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
