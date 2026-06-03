"use client";

import { useEffect } from "react";

import {
  preparePushNotifications,
  syncExistingPushSubscription,
} from "@/features/notifications/services/push-notifications.service";
import { useAuthStore } from "@/stores/auth.store";

export function PushNotificationsBootstrap() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    void preparePushNotifications();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    void syncExistingPushSubscription().catch(() => {
      // Si el backend todavÃ­a no expone el alta de suscripciones, no rompemos la app.
    });
  }, [isAuthenticated]);

  return null;
}
