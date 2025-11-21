/**
 * Service Worker - PWA offline support
 * 
 * PRODUCTION NOTES:
 * - Cache strategies for API calls
 * - Background sync for offline actions
 * - Push notifications support
 */
const CACHE_NAME = 'gsc-v1';
const urlsToCache = [
  '/',
  '/work',
  '/creators',
  '/pricing'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

