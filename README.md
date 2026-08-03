# Hapex Banking

Modern banking web app built with React, Vite, Tailwind CSS, and Supabase.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deploy to Render

1. Push this project to a GitHub/GitLab repository.
2. Go to https://dashboard.render.com → **New** → **Blueprint**.
3. Select your repository. Render will detect `render.yaml` automatically.
4. Add these environment variables (under "Environment" on the service):
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon/public key
5. Click **Apply**. Render builds and deploys.

The app is served as a static site with SPA fallback routing (all paths serve `index.html` so React Router works).

### Manual setup (without render.yaml)

1. Go to https://dashboard.render.com → **New** → **Static Site**.
2. Connect your repo.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Add a rewrite rule: source `/*` → destination `/index.html`
6. Add the environment variables listed above.
7. Deploy.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
