# AGENTS.md

## Project Context

This is a Base44 app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Base44 References

- CLI overview: https://docs.base44.com/developers/references/cli/get-started/overview.md
- Agent skills: https://docs.base44.com/developers/backend/overview/skills.md

If your agent supports Agent Skills, install or update Base44 skills before Base44-specific work:

```bash
npx skills add base44/skills
```

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: frontend Base44 SDK client.
- `vite.config.js`: Vite config and Base44 Vite plugin setup.
- `.env.local`: local-only environment values; never commit secrets.

## Docker Dev Environment (Base44 Sandbox)

- `docker-compose.base44.yml` runs the Vite dev server in a `node:22` container with the source bind-mounted.
- The `@base44/vite-plugin` auto-detects sandbox mode via `MODAL_SANDBOX_ID` and configures the server (host 0.0.0.0, port 5173, allowedHosts: true, polling watch).
- Port 5173 inside the container is mapped to host port 3000.
- `node_modules` uses a named volume so deps persist across container restarts; `npm install` runs as part of the container command.
- No external secrets are required to boot — the frontend renders static pages without the Base44 backend.
- The Base44 SDK's `getPublicSettings()` call returns 404 (no published backend), which sets `authError.type = 'unknown'` in `AuthContext`; this falls through to render the Routes, so all static pages display normally.
- API-dependent features (auth, entity data like delegate counts) will not work until the app is published and `VITE_BASE44_APP_ID` / `VITE_BASE44_APP_BASE_URL` are configured.

## Working Notes

- Use `base44 dev` as the default local development command when you need the local Base44 backend. It can run the backend and frontend together.
- When docs or code mention the frontend being started automatically, that usually means the Base44 project config includes `site.serveCommand`, for example `"serveCommand": "npm run dev"` in `base44/config.jsonc`.
- Use `npm run dev` only for frontend-only work against the hosted Base44 backend.
- Prefer the existing Base44 CLI workflow over adding new npm scripts for Base44-specific tasks.
- Reuse the existing SDK client and Vite plugin patterns before adding new Base44 integration paths.
- Run the relevant checks from `package.json` before finishing code changes.
