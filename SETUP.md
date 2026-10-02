# Deploying the BloodLink backend

This is a small Express + TypeScript API that the BloodLink mobile app talks to.
Right now it only runs on whoever's laptop starts it — deploying it puts it on
a public URL so the app works from anywhere, not just one Wi-Fi network.

## 1. Sign up for Render (free)

Go to [render.com](https://render.com) and sign up — GitHub login works, no
card needed for the free tier.

## 2. Deploy this repo

1. In the Render dashboard, click **New → Blueprint**
2. Connect your GitHub account if asked, then select the `BloodLinkBackend`
   repo
3. Render reads `render.yaml` in this repo automatically and sets everything
   up — build command, start command, free plan. Just click **Apply**.
4. Wait for the first deploy to finish (a few minutes). You'll get a URL like:

   ```
   https://bloodlink-backend.onrender.com
   ```

## 3. Point the mobile app at it

In the `BloodLinkMobile` repo, copy `.env.example` to `.env` and set:

```
EXPO_PUBLIC_API_URL=https://bloodlink-backend.onrender.com/api
```

(your actual Render URL + `/api` at the end)

Restart the Expo dev server (`npx expo start`) after changing `.env` — it only
reads it on startup.

## Good to know

- **Free tier sleeps after 15 minutes idle.** The first request after that
  takes ~30-50 seconds to wake back up — expected, not a bug. Fine for a demo;
  worth upgrading if this ever needs to feel instant for real users.
- **Data resets on redeploy.** The backend stores data in a local
  `data.json` file (see `src/db.ts`). Render's free tier doesn't persist disk
  across deploys, so every redeploy starts back at the seed data in
  `src/seed.ts`. That's fine for a demo. If this becomes a real app, swap
  `db.ts` for an actual database (Render's free Postgres tier is a natural
  next step).
- **To reset data on demand** without redeploying: `POST /api/reset` restores
  the seed data.
