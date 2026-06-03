"use client";

import { AxiosError } from "axios";

import { axiosInstance } from "@/lib/axios";
import { env } from "@/lib/env";

const PUSH_SW_PATH = "/push-sw.js";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);

  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
}

async function registerPushServiceWorker() {
  return navigator.serviceWorker.register(PUSH_SW_PATH, { scope: "/" });
}

async function getOrCreateSubscription(registration: ServiceWorkerRegistration) {
  const existingSubscription = await registration.pushManager.getSubscription();

  if (existingSubscription) {
    return existingSubscription;
  }

  if (!env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY) {
    return null;
  }

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
  });
}

async function syncSubscriptionToApi(
  subscription: PushSubscription,
  registration: ServiceWorkerRegistration
) {
  if (!env.NEXT_PUBLIC_PUSH_SUBSCRIBE_PATH) {
    return;
  }

  await axiosInstance.post(env.NEXT_PUBLIC_PUSH_SUBSCRIBE_PATH, {
    subscription: subscription.toJSON(),
    endpoint: subscription.endpoint,
    scope: registration.scope,
    userAgent: navigator.userAgent,
  });
}

export async function preparePushNotifications() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return null;
  }

  return registerPushServiceWorker();
}

export async function requestAndEnablePushNotifications() {
  if (typeof window === "undefined") {
    throw new Error("Las notificaciones solo se pueden activar en el navegador.");
  }

  if (!("Notification" in window)) {
    throw new Error("Este dispositivo no soporta notificaciones.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("No habilitaste los permisos de notificaciones.");
  }

  const registration = await preparePushNotifications();

  if (!registration) {
    throw new Error("No pudimos preparar el service worker para notificaciones.");
  }

  const subscription = await getOrCreateSubscription(registration);

  if (!subscription) {
    throw new Error("Falta configurar la clave pública de Web Push.");
  }

  try {
    await syncSubscriptionToApi(subscription, registration);
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return subscription;
    }

    throw error;
  }

  return subscription;
}

export async function syncExistingPushSubscription() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!("Notification" in window) || Notification.permission !== "granted") {
    return null;
  }

  const registration = await preparePushNotifications();

  if (!registration) {
    return null;
  }

  const subscription = await getOrCreateSubscription(registration);

  if (!subscription) {
    return null;
  }

  try {
    await syncSubscriptionToApi(subscription, registration);
  } catch (error) {
    if (!(error instanceof AxiosError && error.response?.status === 404)) {
      throw error;
    }
  }

  return subscription;
}

export async function disablePushNotifications() {
  if (typeof window === "undefined") {
    return;
  }

  const registration = await navigator.serviceWorker.getRegistration(PUSH_SW_PATH);
  const subscription = await registration?.pushManager.getSubscription();

  if (!subscription) {
    return;
  }

  try {
    if (env.NEXT_PUBLIC_PUSH_UNSUBSCRIBE_PATH) {
      await axiosInstance.post(env.NEXT_PUBLIC_PUSH_UNSUBSCRIBE_PATH, {
        endpoint: subscription.endpoint,
      });
    }
  } catch (error) {
    if (!(error instanceof AxiosError && error.response?.status === 404)) {
      throw error;
    }
  }

  await subscription.unsubscribe();
}
