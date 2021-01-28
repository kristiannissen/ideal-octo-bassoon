const CACHE = "v0.0.1";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                "/pwa/imgs/hopstr.png",
                "/pwa/css/pwa_app.css",
                "/pwa/css/pwa_shell.css",
                "/pwa/js/app.js",
                "/pwa/js/modules/search.js",
                "/pwa/js/modules/card.js",
                "/pwa/js/modules/snackbar.js",
                "/pwa/js/modules/context.js",
                "/pwa/css/base.css",
                "/pwa/css/forms.css",
                "/pwa/css/cards.css",
                "/pwa/css/buttons.css",
                "/favicon.ico"
            ])
        })
    )
});

self.addEventListener("fetch", (e) => {
})


self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then(keys => {
            keys.filter(key => CACHE !== key)
                .map(key => caches.delete(key))
        })
    )
})
