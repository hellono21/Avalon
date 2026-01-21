const CACHE_NAME = 'avalon-v1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Strategy: Stale-While-Revalidate for cached items, Network First for others, Cache new items
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        // Optional: Update cache in background
        fetch(event.request).then((networkResponse) => {
             if(networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                 caches.open(CACHE_NAME).then((cache) => {
                     cache.put(event.request, networkResponse.clone());
                 });
             }
        }).catch(() => {});
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Cache the response for future offline use
        // We only cache basic requests (same origin) or CORS requests (fonts, esm.sh)
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});