# Push Notifications - Contrato Backend

## Objetivo

La PWA mobile ya quedó preparada para:

- registrar `service worker`
- pedir permiso de notificaciones
- generar `PushSubscription`
- guardar esa suscripción en backend
- recibir y mostrar notificaciones aunque la app esté cerrada

Lo que falta implementar en el proyecto web/PC es:

1. guardar la suscripción push del usuario
2. eliminarla cuando se desuscriba
3. enviar notificaciones con Web Push

---

## Variables que usa la PWA

Definir en `.env.local` de la app mobile:

```env
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=TU_CLAVE_PUBLICA_VAPID
NEXT_PUBLIC_PUSH_SUBSCRIBE_PATH=/push/subscriptions
NEXT_PUBLIC_PUSH_UNSUBSCRIBE_PATH=/push/unsubscribe
```

Notas:

- `NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY` es la clave pública VAPID
- las rutas pueden cambiar, pero deben coincidir con el backend
- si las rutas no existen todavía, la app no se rompe

---

## Endpoint para guardar suscripción

### Request

`POST /push/subscriptions`

Body esperado:

```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/xxxx",
  "scope": "https://tu-app.com/",
  "userAgent": "Mozilla/5.0 ...",
  "subscription": {
    "endpoint": "https://fcm.googleapis.com/fcm/send/xxxx",
    "expirationTime": null,
    "keys": {
      "p256dh": "....",
      "auth": "...."
    }
  }
}
```

### Reglas sugeridas

- requiere usuario autenticado
- guardar la suscripción asociada al usuario actual
- si ya existe la misma `endpoint`, actualizar en lugar de duplicar
- responder `200` o `201`

### Response sugerida

```json
{
  "ok": true
}
```

---

## Endpoint para desuscribir

### Request

`POST /push/unsubscribe`

Body esperado:

```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/xxxx"
}
```

### Reglas sugeridas

- requiere usuario autenticado
- borrar o desactivar la suscripción del usuario para ese `endpoint`
- si no existe, responder igual `200`

### Response sugerida

```json
{
  "ok": true
}
```

---

## Modelo sugerido

Nombre orientativo:

```ts
type PushSubscriptionRecord = {
  id: string;
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  userAgent?: string | null;
  scope?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
```

Mínimos importantes:

- `userId`
- `endpoint`
- `p256dh`
- `auth`
- `isActive`

---

## Payload que puede enviar el backend

El `service worker` mobile espera un payload como este:

```json
{
  "title": "Gol de Argentina",
  "body": "Messi puso el 1-0",
  "url": "/fixture",
  "icon": "/ico/trofeo.ico",
  "badge": "/ico/pelota.ico",
  "image": "/mascotas/festejos/gol1.png",
  "tag": "partido-123",
  "requireInteraction": false,
  "data": {
    "partidoId": "123"
  }
}
```

Campos soportados:

- `title`
- `body`
- `url`
- `icon`
- `badge`
- `image`
- `tag`
- `requireInteraction`
- `data`

Si no llega `url`, abre `/inicio`.

---

## Ejemplo backend con `web-push`

Instalación:

```bash
npm install web-push
```

Variables sugeridas en el backend:

```env
WEB_PUSH_PUBLIC_KEY=
WEB_PUSH_PRIVATE_KEY=
WEB_PUSH_SUBJECT=mailto:tu-email@dominio.com
```

Inicialización:

```ts
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.WEB_PUSH_SUBJECT!,
  process.env.WEB_PUSH_PUBLIC_KEY!,
  process.env.WEB_PUSH_PRIVATE_KEY!
);
```

Envío:

```ts
await webpush.sendNotification(
  {
    endpoint: record.endpoint,
    keys: {
      p256dh: record.p256dh,
      auth: record.auth,
    },
  },
  JSON.stringify({
    title: "Se cerró el pronóstico",
    body: "El partido Argentina vs Brasil ya no admite cambios.",
    url: "/mis-pronosticos",
    tag: `partido-${partidoId}`,
  })
);
```

---

## Casos de uso recomendados

- cierre de pronóstico próximo
- partido en vivo
- gol
- final del partido
- actualización de ranking
- aprobación de usuario pendiente

---

## Manejo de errores recomendado

Si `web-push` responde `404` o `410`:

- marcar la suscripción como inactiva
- o eliminarla

Eso evita seguir intentando enviar a endpoints vencidos.

---

## Dónde se usa en mobile

Archivos principales:

- `src/features/notifications/services/push-notifications.service.ts`
- `src/features/notifications/components/push-notifications-bootstrap.tsx`
- `src/features/notifications/components/enable-push-notifications-card.tsx`
- `public/push-sw.js`

---

## Estado actual

Frontend mobile:

- listo

Backend web/PC:

- pendiente de implementar persistencia y envío
