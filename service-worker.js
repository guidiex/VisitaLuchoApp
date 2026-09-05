const CACHE_NAME = "roca-con-lucho-current";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",

  "./assets/images/grupal-caricatura.jpg",
  "./assets/images/grupal-caricatura-lu.jpg",
  "./assets/images/lucho.jpg",
  "./assets/images/hero-roca.jpg",
  "./assets/images/paso-cordoba.jpg",

  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];


/* =========================================================
   INSTALL
   ========================================================= */

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});


/* =========================================================
   ACTIVATE
   ========================================================= */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }

          return null;
        })
      );
    })
  );

  self.clients.claim();
});


/* =========================================================
   FETCH
   NETWORK FIRST
   ========================================================= */

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }

  const request = event.request;

  event.respondWith(
    fetch(request)
      .then(networkResponse => {
        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });

        return networkResponse;
      })
      .catch(() => {
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          if (request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return new Response("", {
            status: 503,
            statusText: "Offline"
          });
        });
      })
  );
});