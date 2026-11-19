/* Service worker for SPSDPS Calculators.
 *
 * What it does
 *  - Pages (HTML): network first, so visitors always get the latest content. Every page that loads is saved,
 *    so calculators you have opened keep working with no connection. If a page is neither reachable nor saved,
 *    the /offline/ page is shown.
 *  - /_next/static/*: cache first. These files have content hashes in their names, so they never change.
 *  - Icons and images from this site: stale-while-revalidate.
 *  - Everything else (other origins such as analytics or ads, non-GET requests) is left to the browser.
 *
 * Updating: change VERSION to drop every old cache. HTML is network first, so this is rarely needed.
 * Privacy: only same-origin GET requests are stored. No form data or personal data is ever cached.
 */
const VERSION = "v1";
const OFFLINE_URL = "/offline/"; // keep equal to OFFLINE_PATH in lib/pwa/config.js
const PAGES_CACHE = `pages-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;
const ASSETS_CACHE = `assets-${VERSION}`;
const KNOWN_CACHES = [PAGES_CACHE, STATIC_CACHE, ASSETS_CACHE];
const MAX_PAGES = 80;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES_CACHE)
      .then((cache) => cache.add(new Request(OFFLINE_URL, { cache: "reload" })))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => !KNOWN_CACHES.includes(name)).map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});

/** Keep the pages cache bounded: drop the oldest entries beyond MAX_PAGES (the offline page is kept). */
async function trimPages() {
  const cache = await caches.open(PAGES_CACHE);
  const keys = await cache.keys();
  const removable = keys.filter((request) => new URL(request.url).pathname !== OFFLINE_URL);
  await Promise.all(removable.slice(0, Math.max(removable.length - (MAX_PAGES - 1), 0)).map((request) => cache.delete(request)));
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGES_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
      trimPages();
    }
    return response;
  } catch {
    return (await cache.match(request)) || (await cache.match(OFFLINE_URL)) || Response.error();
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached || Response.error());
  return cached || refresh;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
  } else if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.startsWith("/icons/") || ["image", "font"].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, ASSETS_CACHE));
  }
});
