"use client";

import { useEffect, useRef, useState } from "react";

type ManagedVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  variant?: "hero" | "portfolio" | "project";
  objectPosition?: string;
};

const MOTION_EVENT = "cobecreator:motion";

export function ManagedVideo({
  src,
  poster,
  className,
  variant = "portfolio",
  objectPosition = "50% 50%",
}: ManagedVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(variant === "hero" || variant === "project");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 899px)").matches;
    const playThreshold = variant === "hero" ? 0.01 : isMobile ? 0.55 : 0.4;
    const pauseThreshold = variant === "hero" ? 0 : isMobile ? 0.2 : 0.15;
    const preloadMargin = isMobile ? 500 : 900;

    const isMotionPaused = () => document.documentElement.dataset.motionPaused === "true";

    const stop = () => video.pause();
    const maybePlay = () => {
      if (reduceMotion || isMotionPaused()) return stop();
      void video.play().catch(() => undefined);
    };

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: `${preloadMargin}px 0px` },
    );

    if (!shouldLoad) preloadObserver.observe(video);

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= playThreshold) {
          maybePlay();
        } else if (entry.intersectionRatio <= pauseThreshold) {
          stop();
        }
      },
      { threshold: [0, 0.15, 0.2, 0.4, 0.55, 0.75, 1] },
    );

    playbackObserver.observe(video);

    const onMotionChange = (event: Event) => {
      const paused = (event as CustomEvent<{ paused: boolean }>).detail?.paused;
      if (paused) stop();
      else maybePlay();
    };

    window.addEventListener(MOTION_EVENT, onMotionChange);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
      window.removeEventListener(MOTION_EVENT, onMotionChange);
      stop();
    };
  }, [shouldLoad, variant]);

  if (hasError) {
    return <div className={`${className ?? ""} mediaFallback`} aria-hidden="true" />;
  }

  return (
    <video
      ref={ref}
      className={`${className ?? ""}${ready ? " isReady" : ""}`}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      style={{ objectPosition }}
      onLoadedData={() => setReady(true)}
      onError={() => setHasError(true)}
    />
  );
}
