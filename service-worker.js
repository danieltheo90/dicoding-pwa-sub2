const CACHE_NAME = 'danielTheo';
var urlsToCache = [
	'/',
    '/manifest.json',
	'/nav.html',
    '/tim.html',
	'/index.html',
	'/pages/home.html',
    '/pages/scorer.html',
	'/pages/about.html',
	'/pages/branch.html',
	'/pages/contact.html',
	'/pages/favorit.html',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/images/img/klassen.jpg',
	'/images/img/lockson.png',
	'/images/img/usd.jpg',
	'/images/img/sti.png',
	'/images/img/stiPdg.jpg',
	'/images/img/stiPku.jpg',
	'/images/img/stiJmb.jpg',
    '/images/img/notification.png',
    '/js/api.js',
    '/js/main.js',
    '/js/idb.js',
    '/js/db.js',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker : cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

///Menyimpan Cache Secara Dinamis
self.addEventListener("fetch", function (event) {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: true
            }).then(function (response) {
                return response || fetch(event.request);
            })
        )
    }
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});