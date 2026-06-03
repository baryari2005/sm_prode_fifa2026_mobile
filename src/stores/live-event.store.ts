import { create } from "zustand";

import type {
  LiveEventItem,
  LiveEventPayload,
} from "@/features/live-events/types/live-event.types";

type LiveEventStore = {
  currentEvent: LiveEventItem | null;
  queue: LiveEventItem[];
  enqueueEvent: (event: LiveEventPayload) => void;
  closeCurrentEvent: () => void;
};

function createLiveEventItem(event: LiveEventPayload): LiveEventItem {
  return {
    id: `${event.variant}-${event.partidoId ?? "global"}-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,
    event,
    createdAt: Date.now(),
  };
}

export const useLiveEventStore = create<LiveEventStore>((set) => ({
  currentEvent: null,
  queue: [],
  enqueueEvent: (event) =>
    set((state) => {
      const item = createLiveEventItem(event);

      if (!state.currentEvent) {
        return {
          currentEvent: item,
          queue: state.queue,
        };
      }

      return {
        currentEvent: state.currentEvent,
        queue: [...state.queue, item],
      };
    }),
  closeCurrentEvent: () =>
    set((state) => {
      const [next, ...rest] = state.queue;

      return {
        currentEvent: next ?? null,
        queue: rest,
      };
    }),
}));
