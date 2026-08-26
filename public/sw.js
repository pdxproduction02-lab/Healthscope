const CACHE_NAME = 'healthscope-v3';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('healthscope-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// IMPORTANT:
// Don't cache Vite/Vercel HTML or JS automatically.
// This prevents old deployments from causing a blank page.
self.addEventListener('fetch', () => {
  // Let the browser handle requests normally.
});
