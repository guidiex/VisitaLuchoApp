const CACHE_NAME = "roca-con-lucho-v1";

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

  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];


/* =========================================================
   INSTALACIÓN
   ========================================================= */

self.addEventListener("install", event => {

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );

  self.skipWaiting();

});


/* =========================================================
   ACTIVACIÓN
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
   ========================================================= */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request).then(cachedResponse => {

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then(networkResponse => {

          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type === "opaque"
          ) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();

          caches
            .open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });

          return networkResponse;

        })
        .catch(() => {

          if (event.request.mode === "navigate") {
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