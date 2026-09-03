"use client";

import { useEffect, useRef, useState } from "react";

type ManagedVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export function ManagedVideo({ src, poster, className }: ManagedVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.25, 0.55, 0.8, 1] },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (hasError) {
    return <div className={`${className ?? ""} mediaFallback`} aria-hidden="true" />;
  }

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      onError={() => setHasError(true)}
    />
  );
}
