"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const RADIUS = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 157.08

export default function ScrollProgress() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const scrollerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const button = btnRef.current;
    const ring = ringRef.current;
    if (!button || !ring) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    scrollerRef.current =
      (document.scrollingElement as HTMLElement) || document.documentElement;

    // Start hidden, ring empty
    gsap.set(button, { autoAlpha: 0, y: 12, scale: 0.92 });
    ring.style.strokeDasharray = `${CIRCUMFERENCE}`;
    ring.style.strokeDashoffset = `${CIRCUMFERENCE}`;

    // Proxy object so the ring can ease toward the target smoothly
    const state = { p: 0 };
    const draw = () => {
      ring.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - state.p)}`;
    };

    let visible = false;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = scrollerRef.current;
      if (!el) return;

      const top = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0;

      if (reduceMotion) {
        state.p = progress;
        draw();
      } else {
        gsap.to(state, {
          p: progress,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
          onUpdate: draw,
        });
      }

      const shouldShow = top > 120;
      if (shouldShow !== visible) {
        visible = shouldShow;
        gsap.to(button, {
          autoAlpha: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 12,
          scale: shouldShow ? 1 : 0.92,
          duration: shouldShow ? 0.4 : 0.3,
          ease: shouldShow ? "power2.out" : "power2.in",
          overwrite: "auto",
        });
      }
    };

    const onScroll = (e: Event) => {
      const t = e.target;

      if (t === document || t === window) {
        scrollerRef.current =
          (document.scrollingElement as HTMLElement) ||
          document.documentElement;
      } else if (
        t instanceof HTMLElement &&
        t.clientHeight >= window.innerHeight * 0.8 // ignore small scroll boxes
      ) {
        scrollerRef.current = t;
      }

      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    // capture: true catches scroll events from ANY element, not just window
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    update();

    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
      gsap.killTweensOf([button, state]);
    };
  }, []);

  const scrollToTop = () => {
    const el = scrollerRef.current;
    if (el && el !== document.scrollingElement) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className="fixed bottom-[78px] right-[clamp(1rem,2.5vw,2.5rem)] z-[70] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/70 text-[#1c1cff] shadow-[0_6px_20px_rgba(0,0,0,0.08)] backdrop-blur-md will-change-transform"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      {/* Scroll progress ring */}
      <svg
        viewBox="0 0 54 54"
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="27"
          cy="27"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        <circle
          ref={ringRef}
          cx="27"
          cy="27"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Arrow */}
      <svg
        viewBox="0 0 24 24"
        className="relative h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 15l6-6 6 6" />
      </svg>
    </button>
  );
}