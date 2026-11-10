const CACHE_NAME = "travelguide-pwa-v1";
const APP_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./style.css",
    "./tailwind.css",
    "./script.js",
    "./favicon.svg",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./images/TravelGuide.webp",
    "./images/History.webp",
    "./images/Nature.webp",
    "./images/Culture.webp",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_FILES))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith("travelguide-pwa-") && key !== CACHE_NAME)
                    .map((key) => caches.delete(key)),
            ))
            .then(() => self.clients.claim()),
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    const requestUrl = new URL(request.url);
    const scopeUrl = new URL(self.registration.scope);

    if (
        request.method !== "GET"
        || requestUrl.origin !== scopeUrl.origin
        || !requestUrl.pathname.startsWith(scopeUrl.pathname)
    ) {
        return;
    }

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        if (request.mode === "navigate") {
            try {
                const response = await fetch(request);

                if (response.ok) {
                    await cache.put(new URL("./", scopeUrl), response.clone());
                }

                return response;
            } catch {
                return await cache.match(request)
                    || await cache.match(new URL("./", scopeUrl))
                    || await cache.match(new URL("./index.html", scopeUrl));
            }
        }

        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        const response = await fetch(request);

        if (response.ok) {
            await cache.put(request, response.clone());
        }

        return response;
    })());
});
