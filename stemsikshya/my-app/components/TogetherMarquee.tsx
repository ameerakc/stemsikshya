"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const sans = { fontFamily: "var(--font-poppins), system-ui, sans-serif" };

// One loop group: outline, outline, SOLID, outline
const words = [
  { t: "Learn", solid: false },
  { t: "Together", solid: false },
  { t: "CODE", solid: true },
  { t: "Together", solid: false },
];

export default function TogetherMarquee() {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Infinite marquee, LEFT -> RIGHT.
    // The track holds two identical halves. Sliding from -50% to 0%
    // moves everything right, then loops with no visible jump.
    const tween = gsap.fromTo(
      trackRef.current,
      { xPercent: -50 },
      { xPercent: 0, duration: 40, ease: "none", repeat: -1 }
    );

    // Slow down on hover, speed back up on leave
    const el = wrapRef.current;
    const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 });
    const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
    el?.addEventListener("mouseenter", slow);
    el?.addEventListener("mouseleave", fast);

    return () => {
      el?.removeEventListener("mouseenter", slow);
      el?.removeEventListener("mouseleave", fast);
      tween.kill();
    };
  }, []);

  const Group = () => (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span
          key={i}
          className="shrink-0 px-[clamp(1.5rem,4.5vw,5.5rem)] text-[clamp(3.5rem,9vw,9rem)] uppercase leading-none tracking-[-0.01em]"
          style={
            w.solid
              ? { ...sans, fontWeight: 600, color: "#0a0a0a" }
              : {
                  ...sans,
                  fontWeight: 400,
                  color: "transparent",
                  WebkitTextStroke: "1.5px #7a7a7a",
                }
          }
        >
          {w.t}
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={wrapRef}
      aria-hidden="true"
      className="relative z-10 select-none overflow-hidden bg-white py-[clamp(3rem,6vw,6rem)]"
      style={sans}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            <Group />
            <Group />
          </div>
        ))}
      </div>
    </section>
  );
}