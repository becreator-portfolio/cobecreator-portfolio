"use client";

import { useEffect } from "react";

const MOTION_EVENT = "cobecreator:motion";

export function MotionSystem() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => undefined;

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 900px)").matches;
      const tablet = window.matchMedia("(min-width: 700px) and (max-width: 899px)").matches;
      let paused = document.documentElement.dataset.motionPaused === "true";

      document.documentElement.classList.add("motion-runtime");

      const disposers: Array<() => void> = [];

      if (!reducedMotion && desktop) {
        const cards = Array.from(document.querySelectorAll<HTMLElement>(".projectCard"));

        cards.forEach((card, index) => {
          const open = card.querySelector<HTMLElement>(".projectOpen");
          const title = card.querySelector<HTMLElement>(".projectCaption h3");
          const meta = card.querySelector<HTMLElement>(".projectCaption p");
          const watch = card.querySelector<HTMLElement>(".watchLabel");

          if (!open) return;

          gsap.fromTo(
            open,
            { scale: 0.95 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 62%",
                scrub: true,
              },
            },
          );

          if (title) {
            gsap.fromTo(title, { opacity: 0 }, {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 58%", end: "top 50%", scrub: true },
            });
          }

          if (meta) {
            gsap.fromTo(meta, { opacity: 0 }, {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 52%", end: "top 45%", scrub: true },
            });
          }

          if (watch) {
            gsap.fromTo(watch, { opacity: 0 }, {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top 47%", end: "top 40%", scrub: true },
            });
          }

          if (index > 0) {
            const previousOpen = cards[index - 1]?.querySelector<HTMLElement>(".projectOpen");
            if (previousOpen) {
              gsap.to(previousOpen, {
                scale: 0.985,
                opacity: 0.74,
                filter: "brightness(0.72)",
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top 68%",
                  end: "top 20%",
                  scrub: true,
                },
              });
            }
          }
        });
      }

      const marquee = document.querySelector<HTMLElement>(".marqueeTrack");
      if (!reducedMotion && marquee) {
        const baseSpeed = desktop ? -26 : -18;
        let impulse = 0;
        let x = 0;

        const velocityTrigger = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            impulse = gsap.utils.clamp(-65, 65, -self.getVelocity() * 0.03);
          },
        });

        const tick = () => {
          if (paused) return;

          impulse += (0 - impulse) * 0.08;
          const frameRatio = gsap.ticker.deltaRatio(60);
          x += ((baseSpeed + impulse) / 60) * frameRatio;

          const loopWidth = marquee.scrollWidth / 2;
          if (loopWidth > 0) {
            if (x <= -loopWidth) x += loopWidth;
            if (x > 0) x -= loopWidth;
          }

          gsap.set(marquee, { x });
        };

        gsap.ticker.add(tick);
        disposers.push(() => {
          gsap.ticker.remove(tick);
          velocityTrigger.kill();
        });
      }

      const process = document.querySelector<HTMLElement>(".process");
      if (!reducedMotion && process && (desktop || tablet)) {
        const rail = process.querySelector<HTMLElement>(".processRail span");
        const steps = Array.from(process.querySelectorAll<HTMLElement>(".processStep"));

        const trigger = ScrollTrigger.create({
          trigger: process,
          start: "top 75%",
          end: "bottom 35%",
          onUpdate: (self) => {
            const progress = self.progress;
            const activeIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));

            if (rail) {
              gsap.set(rail, { scaleX: Math.max(0.25, progress) });
            }

            steps.forEach((step, index) => {
              gsap.to(step, {
                opacity: index === activeIndex ? 1 : 0.38,
                duration: 0.18,
                overwrite: true,
              });
            });
          },
        });

        disposers.push(() => trigger.kill());
      }

      const experiments = document.querySelector<HTMLElement>(".experiments");
      if (!reducedMotion && experiments) {
        const experimentNodes = Array.from(experiments.querySelectorAll<HTMLElement>(".experiment"));
        const desktopOffsets = [-36, 22, -28, 16];
        const tabletOffsets = [-18, 12, -14, 8];
        const offsets = desktop ? desktopOffsets : tablet ? tabletOffsets : [0, 0, 0, 0];

        experimentNodes.forEach((node, index) => {
          const media = node.querySelector<HTMLElement>(".mediaPlaceholder");
          if (!media) return;

          const fromClip = index % 2 === 0 ? "inset(0 100% 0 0 round 25px)" : "inset(0 0 0 100% round 25px)";

          gsap.fromTo(media, { opacity: 0, y: desktop || tablet ? 0 : 8, clipPath: fromClip }, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0% 0 0 round 25px)",
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true,
            },
          });

          const offset = offsets[index] ?? 0;
          if (offset !== 0) {
            gsap.fromTo(node, { y: -offset / 2 }, {
              y: offset / 2,
              ease: "none",
              scrollTrigger: {
                trigger: experiments,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });
      }

      const positioning = document.querySelector<HTMLElement>(".positioning");
      if (!reducedMotion && positioning) {
        const loop = positioning.querySelector<HTMLElement>(".positioningLoop");
        const orbA = positioning.querySelector<HTMLElement>(".positioningOrbA");
        const orbB = positioning.querySelector<HTMLElement>(".positioningOrbB");

        if (loop) {
          gsap.fromTo(loop, { scale: 0.985 }, {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: positioning, start: "top 82%", end: "center 50%", scrub: true },
          });
        }

        if (desktop || tablet) {
          if (orbA) {
            gsap.fromTo(orbA, { y: 8 }, {
              y: -8,
              ease: "none",
              scrollTrigger: { trigger: positioning, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
          if (orbB) {
            gsap.fromTo(orbB, { y: -10 }, {
              y: 10,
              ease: "none",
              scrollTrigger: { trigger: positioning, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        }
      }

      const onMotionChange = (event: Event) => {
        paused = Boolean((event as CustomEvent<{ paused: boolean }>).detail?.paused);
        ScrollTrigger.getAll().forEach((trigger) => {
          if (paused) trigger.disable(false);
          else trigger.enable();
        });

        if (!paused) ScrollTrigger.refresh();
      };

      window.addEventListener(MOTION_EVENT, onMotionChange);
      ScrollTrigger.refresh();

      cleanup = () => {
        window.removeEventListener(MOTION_EVENT, onMotionChange);
        disposers.forEach((dispose) => dispose());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        document.documentElement.classList.remove("motion-runtime");
      };
    };

    void setup();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
