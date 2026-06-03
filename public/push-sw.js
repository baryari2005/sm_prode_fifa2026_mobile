self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  let payload = {};

  try {
    payload = event.data.json();
  } catch {
    payload = {
      title: "Prode Mundial 2026",
      body: event.data.text(),
    };
  }

  const {
    title = "Prode Mundial 2026",
    body = "Tenés una nueva notificación.",
    icon = "/ico/trofeo.ico",
    badge = "/ico/pelota.ico",
    image,
    url = "/inicio",
    tag,
    requireInteraction = false,
    data = {},
  } = payload;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge,
      image,
      tag,
      requireInteraction,
      data: {
        url,
        ...data,
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/inicio";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }

      return undefined;
    })
  );
});
