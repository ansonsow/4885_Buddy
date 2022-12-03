self.addEventListener('install', event => {
    event.waitUntil((async () => {
    const cache = await caches.open("offline");
    console.log("installed");
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request('./html/offline.html', {cache: 'reload'}));


    })());
    self.skipWaiting();

})

self.addEventListener('fetch', event => {
    // Fires whenever the app requests a resource (file or data)  normally this is where the service worker would check to see
    // if the requested resource is in the local cache before going to the server to get it. 
    console.log(`[SW] Fetch event for ${event.request.url}`);


    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
          try {
            // First, try to use the navigation preload response if it's supported.
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            }
    
            // Always try the network first.
            const networkResponse = await fetch(event.request);
            return networkResponse;
          } catch (error) {
            // catch is only triggered if an exception is thrown, which is likely
            // due to a network error.
            // If fetch() returns a valid HTTP response with a response code in
            // the 4xx or 5xx range, the catch() will NOT be called.
            console.log('Fetch failed; returning offline page instead.', error);
    
            const cache = await caches.open("offline");
            const cachedResponse = await cache.match('./html/offline.html');
    
            return cachedResponse;
          }
        })());
      }

});