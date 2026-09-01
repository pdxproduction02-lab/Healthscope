const CACHE_NAME = 'healthscope-v3';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              key.startsWith('healthscope-') &&
              key !== CACHE_NAME
          )
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});


/* =========================================================
   NORMAL FETCH BEHAVIOUR
   ========================================================= */

self.addEventListener('fetch', () => {
  // Let Vercel/browser handle requests normally.
});


/* =========================================================
   REAL WEB PUSH NOTIFICATIONS
   ========================================================= */

self.addEventListener('push', (event) => {

  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = {
      title: 'HealthScope',
      body: event.data
        ? event.data.text()
        : 'You have a new reminder.'
    };
  }

  const title = data.title || 'HealthScope';

  const options = {
    body: data.body || 'You have a new reminder.',

    icon:
      data.icon ||
      '/healthscope-icon-192.png',

    badge:
      data.badge ||
      '/healthscope-icon-192.png',

    tag:
      data.tag ||
      'healthscope-notification',

    renotify: true,

    data: {
      url: data.url || '/',
      reminderId: data.reminderId || null
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      title,
      options
    )
  );
});


/* =========================================================
   NOTIFICATION CLICK
   ========================================================= */

self.addEventListener('notificationclick', (event) => {

  event.notification.close();

  const targetUrl =
    event.notification?.data?.url || '/';

  event.waitUntil(

    self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then((clientList) => {

        // If HealthScope is already open,
        // focus the existing window.
        for (const client of clientList) {

          if ('focus' in client) {

            return client
              .navigate(targetUrl)
              .then(() => client.focus());

          }
        }

        // Otherwise open HealthScope.
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }

      })

  );
});
