# Security notes

## What can and cannot be protected
This is a static site: everything the browser runs (HTML, JS, CSS) is **public by nature**. Nobody can truly hide
front-end code; minified code can still be read. What we do instead:

- **No secrets in the code.** There is no backend, database, API key or login to steal. Never put secrets in `NEXT_PUBLIC_*` variables.
- **No source maps** in production (`productionBrowserSourceMaps: false`; verified: 0 `.map` files in `out/`).
- **Minified, hashed bundles** from `next build`.
- **Your real source** (the repository) stays private: use a **private GitHub repo**, 2FA on GitHub/Cloudflare/domain registrar, protected `main`, no shared passwords.

## Defences shipped
- `public/_headers` (Cloudflare Pages / Netlify): CSP, HSTS, `X-Frame-Options: DENY` (anti-clickjacking), `nosniff`, strict referrer policy, permissions policy, COOP/CORP, immutable caching for hashed assets. **Headers only work on a host that reads `_headers`**; verify with securityheaders.com after deploy.
- No `eval`, no user HTML rendered (React escapes by default); JSON-LD escapes `<`.
- Calculator input is parsed by a strict parser (`parseNumber`) and validated; errors are caught by `ErrorBoundary`, never log user values.
- Previews are `noindex` + `Disallow: /` unless `NEXT_PUBLIC_ALLOW_INDEXING=true`.
- `.github/dependabot.yml` + CI (`lint`, `test`, `build`, `npm audit --omit=dev`).

## Known trade-off
CSP uses `'unsafe-inline'` for scripts because Next.js static export emits inline bootstrap scripts and we use a tiny theme-init script. Upgrading to hash-based CSP is a possible later hardening step.

## When enabling Analytics / AdSense
Update the CSP in `public/_headers` (add `https://www.googletagmanager.com`, `https://www.google-analytics.com`, Google ad domains to `script-src`, `connect-src`, `img-src`, `frame-src`), update the Privacy Policy, and add a consent notice where required. The QR, image and PDF tools work under the shipped CSP without `blob:` (they draw on canvases and save files through temporary download links); this was tested in a browser with the CSP applied. All file tools process files on the device and never upload them.

## Host hardening checklist
Enable HTTPS-only/auto-redirect, 2FA everywhere, registrar lock on the domain, DNSSEC if offered, and keep `main` protected.
