const CACHE = 'tagesplaner-v6';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      './',
      './index.html',
      './manifest.json',
      './sw.js',
      './icons/icon-72.png',
      './icons/icon-96.png',
      './icons/icon-128.png',
      './icons/icon-144.png',
      './icons/icon-152.png',
      './icons/icon-192.png',
      './icons/icon-384.png',
      './icons/icon-512.png'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
