/* ================================================================
   SERVICE WORKER — Arena Audit (PERF-01)
   Fulfils the README "Offline Ready" claim. Cache-first shell:
   the app is a single HTML file, so offline = trivial and safe.
   Bump CACHE_VERSION on every deploy to invalidate old shells.
   ================================================================ */

const CACHE_VERSION = "arena-audit-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/og-preview.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Cache-first for app shell; network fallback. Nothing here is
   user data (all state lives in localStorage), so stale risk ≈ 0.
   HTML uses network-first so updates land within one reload. */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) return;

  const isHTML = request.mode === "navigate" || request.url.endsWith("index.html") || request.url.endsWith("/");

  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
