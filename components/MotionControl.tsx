"use client";

import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "cobecreator:motion-paused";
const MOTION_EVENT = "cobecreator:motion";

function applyMotionState(paused: boolean) {
  document.documentElement.dataset.motionPaused = paused ? "true" : "false";
  window.dispatchEvent(new CustomEvent(MOTION_EVENT, { detail: { paused } }));
}

function subscribeToMotion(onStoreChange: () => void) {
  window.addEventListener(MOTION_EVENT, onStoreChange);
  return () => window.removeEventListener(MOTION_EVENT, onStoreChange);
}

function getMotionSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

function getServerMotionSnapshot() {
  return false;
}

export function MotionControl() {
  const paused = useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    getServerMotionSnapshot,
  );

  useEffect(() => {
    applyMotionState(paused);
  }, [paused]);

  const toggleMotion = () => {
    const next = !paused;
    sessionStorage.setItem(STORAGE_KEY, String(next));
    applyMotionState(next);
  };

  return (
    <button
      type="button"
      className="motionControl"
      onClick={toggleMotion}
      aria-pressed={paused}
      aria-label={paused ? "Retomar movimento do site" : "Pausar movimento do site"}
    >
      <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
      {paused ? "RETOMAR MOVIMENTO" : "PAUSAR MOVIMENTO"}
    </button>
  );
}
