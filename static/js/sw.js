const CACHE = "v0.0.1";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                "/imgs/hopstr.png",
                "/css/pwa_app.css",
                "/css/pwa_shell.css",
                "/js/app.js",
                "/js/modules/search.js",
                "/js/modules/card.js",
                "/js/modules/snackbar.js",
                "/js/modules/context.js",
                "/css/base.css",
                "/css/forms.css",
                "/css/cards.css",
                "/css/buttons.css",
                "/favicon.ico"
            ])
        })
    )
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.open(CACHE).then((cache) => {
            return cache.match(e.request).then((response) => {
                return response || fetch(e.request).then((response) => {
                    cache.put(e.request, response.clone())
                    return response;
                })
            })
        })
    )
})
