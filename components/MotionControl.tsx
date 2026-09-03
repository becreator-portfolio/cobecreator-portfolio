"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cobecreator:motion-paused";
const MOTION_EVENT = "cobecreator:motion";

function applyMotionState(paused: boolean) {
  document.documentElement.dataset.motionPaused = paused ? "true" : "false";
  window.dispatchEvent(new CustomEvent(MOTION_EVENT, { detail: { paused } }));
}

export function MotionControl() {
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY) === "true";
    setPaused(stored);
    applyMotionState(stored);
    setMounted(true);
  }, []);

  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    sessionStorage.setItem(STORAGE_KEY, String(next));
    applyMotionState(next);
  };

  if (!mounted) return null;

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
