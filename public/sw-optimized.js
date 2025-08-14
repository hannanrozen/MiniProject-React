// Performance-optimized Service Worker
const CACHE_NAME = "staffinity-v1";
const STATIC_CACHE = "static-v1";
const API_CACHE = "api-v1";

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Critical resources - Cache first
  static: ["/", "/index.html", "/manifest.json", "/favicon.ico"],

  // API responses - Network first with fallback
  api: ["https://reqres.in/api/users"],

  // Images - Cache first with stale-while-revalidate
  images: /\.(jpg|jpeg|png|gif|webp|svg)$/,

  // Fonts - Cache first (long-term)
  fonts: /\.(woff|woff2|ttf|eot)$/,

  // JS/CSS - Stale while revalidate
  assets: /\.(js|css)$/,
};

// Install event - Pre-cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .open(STATIC_CACHE)
        .then((cache) => cache.addAll(CACHE_STRATEGIES.static)),
      self.skipWaiting(),
    ])
  );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames
              .filter((name) => !["static-v1", "api-v1"].includes(name))
              .map((name) => caches.delete(name))
          )
        ),
      self.clients.claim(),
    ])
  );
});

// Fetch event - Implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Handle different resource types
  if (url.pathname.match(CACHE_STRATEGIES.images)) {
    // Images: Cache first with stale-while-revalidate
    event.respondWith(cacheFirstWithRefresh(request, STATIC_CACHE));
  } else if (url.pathname.match(CACHE_STRATEGIES.fonts)) {
    // Fonts: Cache first (long-term)
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.match(CACHE_STRATEGIES.assets)) {
    // JS/CSS: Stale while revalidate
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
  } else if (url.origin === "https://reqres.in") {
    // API: Network first with cache fallback
    event.respondWith(networkFirstWithCache(request, API_CACHE));
  } else if (CACHE_STRATEGIES.static.includes(url.pathname)) {
    // Static assets: Cache first
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  }
});

// Cache strategies implementation
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error("Fetch failed:", error);
    return new Response("Network error", { status: 408 });
  }
}

async function networkFirstWithCache(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Cache successful responses for 5 minutes
      const responseClone = response.clone();
      const headers = new Headers(responseClone.headers);
      headers.set("Cache-Control", "max-age=300");

      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: headers,
      });

      cache.put(request, cachedResponse);
    }
    return response;
  } catch (error) {
    console.error("Network failed, trying cache:", error);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return new Response("Offline", { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Always try to fetch and update cache in background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  // Return cached version immediately if available
  if (cached) {
    return cached;
  }

  // If no cache, wait for network
  return fetchPromise || new Response("Offline", { status: 503 });
}

async function cacheFirstWithRefresh(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Return cached immediately
  if (cached) {
    // Refresh in background
    fetch(request)
      .then((response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {});

    return cached;
  }

  // If not cached, fetch and cache
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("Network error", { status: 408 });
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle background sync tasks
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  try {
    // Implement background sync logic
    console.log("Background sync triggered");

    // Sync any pending API calls
    const cache = await caches.open(API_CACHE);
    const requests = await cache.keys();

    for (const request of requests) {
      try {
        await fetch(request);
      } catch {
        console.warn("Background sync failed for:", request.url);
      }
    }
  } catch (error) {
    console.error("Background sync error:", error);
  }
}

// Push notifications (if needed)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      })
    );
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow("/"));
});
