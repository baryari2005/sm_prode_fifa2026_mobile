const LIVE_EVENT_IMAGE_BASE = "/mascotas/festejos";

export function getKickoffLiveEventImage() {
  return `${LIVE_EVENT_IMAGE_BASE}/comienza.png`;
}

export function getHalftimeLiveEventImage() {
  return `${LIVE_EVENT_IMAGE_BASE}/entretiempo.png`;
}

export function getFinalLiveEventImage() {
  return `${LIVE_EVENT_IMAGE_BASE}/finalizado.png`;
}

export function getRandomGoalLiveEventImage() {
  const goalIndex = Math.floor(Math.random() * 6) + 1;
  return `${LIVE_EVENT_IMAGE_BASE}/gol${goalIndex}.png`;
}
